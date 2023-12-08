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
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <h1>Content Savior</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              type="search"
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search Contents"
              placeholder="Search"
              name="q"
              defaultValue={q}
              onChange={(e) => {
                const isFirstSearch = q == null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching}></div>
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contents.length ? (
            <ul>
              {contents.map((content) => (
                <li key={content.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={`contents/${content.id}`}
                  >
                    {content.title ? (
                      <>{content.title}</>
                    ) : (
                      <>
                        <i>No Name</i>
                      </>
                    )}{" "}
                    {content.favorite && <span> ⭐</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contents</i>
            </p>
          )}
        </nav>
      </div>
      <div
        className={navigation.state === "loading" ? "loading" : ""}
        id="detail"
      >
        <Outlet />
      </div>
    </>
  );
}

export default Root;
