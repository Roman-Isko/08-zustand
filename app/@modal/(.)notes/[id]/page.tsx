import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../lib/getQueryClient";
import { getNoteById } from "../../../../lib/api";
import NotePreview from "./NotePreview.client";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
