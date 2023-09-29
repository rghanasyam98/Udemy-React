import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const response = useActionData();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <ul>
          {response &&
            response.errors &&
            Object.values(response.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
        </ul>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// defining an action fn to be performed on form submit for new event or edit event that is reusing the same form
export async function action({ request, params }) {
  // entered data in form will be available in request since we used <Form> instead of <form>
  const data = await request.formData();
  // extracting individual fields from with name property
  const eventadata = {
    title: data.get("title"),
    date: data.get("date"),
    description: data.get("description"),
    image: data.get("image"),
  };
  console.log(eventadata);
  
  console.log("method",request.method,params.eventId);
  const id=params.eventId;
  let url = "http://localhost:8080/events";
  let method = "POST";
  if (request.method === "PATCH") {
    url = "http://localhost:8080/events/"+id;
    method = "PATCH";
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventadata),
  });

  // backend validates the code and report errors
  // in the case we need to indicate what are errors in the screen
  // response contains list of errors
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    // if failed to submit data then throw an error to render error page
    throw json({
      status: 500,
      message: "unable to submit event",
    });
  } else {
    // useNavigate hook cant be used inside action
    // so another method redirect is used
    return redirect("/events");
  }
}
