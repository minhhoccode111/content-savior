import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { updateContent } from "../methods";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContent(params.contentId, updates);
  return redirect(`/contents/${params.contentId}`);
};
export default function EditContent() {
  const { content } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Title</span>
        <input
          type="text"
          name="title"
          aria-label="Content title"
          placeholder="How to React Router"
          defaultValue={content.title}
        />
      </p>
      <label>
        <span>Tags</span>
        <input
          type="text"
          name="tags"
          aria-label="Content tags"
          placeholder="code, frontend, react, article, lesson,..."
          defaultValue={content.tags}
        />
      </label>
      <label>
        <span>Link</span>
        <input
          type="text"
          name="link"
          placeholder="https://www.theodinproject.com/lessons/node-path-react-new-fetching-data-in-react"
          defaultValue={content.link}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          type="text"
          aria-label="Avatar URL"
          name="avatar"
          defaultValue={content.avatar}
          placeholder="https://example.com/avatar.png"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          placeholder="Notes can be searched too"
          defaultValue={content.notes}
          rows="6"
        ></textarea>
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
