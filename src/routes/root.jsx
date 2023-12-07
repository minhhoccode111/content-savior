import {
  Form,
  Outlet,
  NavLink,
  redirect,
  useSubmit,
  useNavigation,
  useLoaderData,
} from "react-router-dom";
import { getContents, createContent } from "../methods";
import { useEffect } from "react";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contents = await getContents(q);
  return { contents, q };
};

export const action = async () => {
  const content = await createContent();
  return redirect(`contents/${content.id}`);
};

function Root() {
  const { contents, q } = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <h1 className="">Hello, World!</h1>
    </>
  );
}

export default Root;
