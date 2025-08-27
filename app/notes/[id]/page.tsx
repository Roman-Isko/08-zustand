// import NoteDetailsWrapper from "./NoteDetailsWrapper";

// interface NotePageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function NotePage({ params }: NotePageProps) {
//   const { id } = await params;
//   return <NoteDetailsWrapper noteId={id} />;
// }

import NoteDetailsWrapper from "./NoteDetailsWrapper";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  return <NoteDetailsWrapper noteId={id} />;
}
