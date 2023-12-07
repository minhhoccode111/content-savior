import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="grid place-items-center">
      <h1>Opps, something when wrong</h1>
      <p>
        <i>{error.stateText || error.message}</i>
      </p>
    </div>
  );
}
