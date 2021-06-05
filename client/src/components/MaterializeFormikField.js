import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import PropTypes from 'prop-types';
import "/home/tomas/developing/node/testing-portal/client/src/styles/materializeFormikField.scss";

export const MaterializeFormikField = ({ name, label, type = "text", className }) => {
    const { error, touched } = useField(name)[1];
    return (
      <div className={`input-field ${className}`}>
        <Field
          id={name}
          className={touched ? (error ? "invalid" : "valid") : ""}
          name={name}
          type={type}
        />
        <label htmlFor={name}>{label}</label>
        <ErrorMessage name={name}>
          {(msg) => <span className="helper-text">{msg}</span>}
        </ErrorMessage>
      </div>
    );
  };

  MaterializeFormikField.propTypes = {
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      className: PropTypes.string
  }