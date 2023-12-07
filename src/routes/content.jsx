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
    <div id="contact">
      <div>
        <img key={content.avatar} src={content.avatar || "/default-img.png"} />
      </div>

      <div>
        <h1>{content.title ? <>{content.title}</> : <i>No name</i>}</h1>
        {content.link && (
          <p>
            <a href={content.link}>{content.link}</a>
          </p>
        )}

        {content.notes && <p>{content.notes}</p>}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(e) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

Favorite.propTypes = {
  content: PropTypes.object.isRequired,
};
