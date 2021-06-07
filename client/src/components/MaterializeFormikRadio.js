import { Field } from "formik";
import React from "react";
import PropTypes from "prop-types";
import "../styles/materializeFormikRadio.scss";

export const MaterializeFormikRadio = ({ name, label, value, className = "" }) => {
    return (
        <label className={`materialize-formik-radio ${className}`}>
            <Field className="with-gap" type="radio" name={name} value={value} />
            <span className="label">{label}</span>
        </label>
    );
};

MaterializeFormikRadio.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};
