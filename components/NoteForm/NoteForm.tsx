"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import type { NewNote, Note } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [title, setTitle] = useState(draft.title);
  const [tag, setTag] = useState<string>(draft.tag);
  const [content, setContent] = useState(draft.content);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload: NewNote = { title, content, tag };
      const note: Note = await createNote(payload);

      clearDraft();

      router.push(`/notes/${note.id}`);
      router.refresh();
    } catch (err) {
      setError((err as Error)?.message || "Failed to create note");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    router.back();
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter title"
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
          placeholder="Write your note..."
        />
      </label>

      {error && <p className={css.error}>{error}</p>}

      <div className={css.actions}>
        <button type="submit" className={css.button} disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </button>

        <button type="button" className={css.secondary} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
