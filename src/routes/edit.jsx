import { redirect } from "react-router-dom";
import { updateContent } from "../methods";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContent(params.contentId, updates);
  return redirect(`/contents/${params.contentId}`);
};
export default function EditContent() {
  return;
}
