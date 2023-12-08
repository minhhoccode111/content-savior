import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContent, updateContent } from "../methods";
import PropTypes from "prop-types";

export const loader = async ({ params }) => {
  const content = await getContent(params.contentId);
  if (!content) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { content };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  return updateContent(params.contentId, {
    favorite: formData.get("favorite") === "true",
  });
};

const Favorite = ({ content }) => {
  const fetcher = useFetcher();
  let favorite = content.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <>
      <fetcher.Form method="post">
        <button
          id="button-favorite"
          className={
            "text-2xl" + " " + (!favorite ? "text-gray-300" : "text-yellow-400")
          }
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    </>
  );
};

export default function Content() {
  const { content } = useLoaderData();

  return (
    <div id="" className="flex gap-6">
      <div className="min-w-[200px] max-w-[300px]">
        <img
          className="w-full rounded"
          key={content.avatar}
          src={content.avatar || "/default-img.png"}
        />
      </div>

      <div className="flex flex-col justify-between">
        <h1 className="flex gap-4 text-4xl items-baseline">
          {content.title ? <>{content.title}</> : <i>No name</i>}
          <Favorite content={content} />
        </h1>
        {content.link && (
          <p className="">
            Go to{" "}
            <a
              className="underline decoration-dotted hover:decoration-solid text-blue-500"
              href={content.link}
            >
              {content.title}
            </a>
          </p>
        )}

        {content.notes && <p className="">{content.notes}</p>}
        <div className="flex items-center gap-4">
          <Form action="edit">
            <button className="" type="submit">
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            className=""
            onSubmit={(e) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                e.preventDefault();
              }
            }}
          >
            <button className="" type="submit">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

Favorite.propTypes = {
  content: PropTypes.object.isRequired,
};
