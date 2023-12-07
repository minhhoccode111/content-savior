import { deleteContent } from "../methods";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  await deleteContent(params.contentId);
  console.log("deleted: ", params.contentId, params);
  return redirect("/");
};
