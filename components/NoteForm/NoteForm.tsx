"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createNote } from "../../lib/api";
import { NewNote } from "../../types/note";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./NoteForm.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().max(500, "Max 500 characters"),
  tag: Yup.mixed<(typeof tags)[number]>()
    .oneOf(tags)
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: () => toast.error("Failed to create note"),
  });

  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    mutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Title
            <Field name="title" className={css.input} />
            {errors.title && touched.title && (
              <ErrorMessage message={errors.title} />
            )}
          </label>

          <label className={css.label}>
            Content
            <Field name="content" as="textarea" className={css.textarea} />
            {errors.content && touched.content && (
              <ErrorMessage message={errors.content} />
            )}
          </label>

          <label className={css.label}>
            Tag
            <Field name="tag" as="select" className={css.select}>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            {errors.tag && touched.tag && <ErrorMessage message={errors.tag} />}
          </label>

          <div className={css.actions}>
            <button type="submit" className={css.button}>
              Create note
            </button>
            <button type="button" onClick={onClose} className={css.cancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
