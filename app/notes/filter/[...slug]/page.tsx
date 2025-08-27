import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../lib/getQueryClient";
import { getNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const tagParam = slug?.[0] || "All";
  const tag = tagParam === "All" ? undefined : tagParam;

  const page = Number(resolvedSearchParams?.page ?? 1);
  const search = resolvedSearchParams?.q ?? "";

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      getNotes({
        page,
        ...(search ? { search } : {}),
        ...(tag ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tagParam} />
    </HydrationBoundary>
  );
}
