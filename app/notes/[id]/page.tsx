// import NoteDetailsWrapper from "./NoteDetailsWrapper";

// interface NotePageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function NotePage({ params }: NotePageProps) {
//   const { id } = await params;
//   return <NoteDetailsWrapper noteId={id} />;
// }

import type { Metadata } from "next";
import { getNoteById } from "../../../lib/api";
import NoteDetailsWrapper from "./NoteDetailsWrapper";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await getNoteById(id);

  return {
    title: `NoteHub – ${note.title || "Нотатка"}`,
    description:
      note.content?.slice(0, 150) || "Перегляньте нотатку у NoteHub.",
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  return <NoteDetailsWrapper noteId={id} />;
}
