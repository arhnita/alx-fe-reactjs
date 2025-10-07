import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

const FormikForm = () => {
  return (
    <div>
      <h2>Registration Form (Formik)</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // Replace this with an API call as needed
          console.log("Formik submit:", values);
          resetForm();
        }}
      >
        <Form noValidate>
          <div>
            <label htmlFor="username">Username:</label>
            <Field id="username" name="username" placeholder="Enter username" />
            <ErrorMessage
              name="username"
              component="div"
              style={{ color: "red", fontSize: "0.9em" }}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red", fontSize: "0.9em" }}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red", fontSize: "0.9em" }}
            />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;
