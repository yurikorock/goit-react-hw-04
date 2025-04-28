//ContactForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

import InputMask from "react-input-mask";

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    onAdd({
      name: values.name,
      number: values.number,
      id: nanoid(),
    });

    actions.resetForm();
  };
  //валідація даних в формі
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.field}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            placeholder="enter name"
            id={nameFieldId}
          />
          <ErrorMessage className={css.errormsg} name="name" component="span" />
        </div>
        <div className={css.field}>
          <label className={css.label} htmlFor={numberFieldId}>
            Number
          </label>
          <Field
            type="text"
            name="number"
            placeholder="enter number"
            id={numberFieldId}
          />
          <ErrorMessage
            className={css.errormsg}
            name="number"
            component="span"
          />
        </div>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
