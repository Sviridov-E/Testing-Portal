import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../styles/materializeFormikSelect.scss";

export const MaterializeFormikSelect = ({ name, label, className = "", children }) => {
    const [, { error, touched }, { setTouched }] = useField(name);
    const valid = touched ? (error ? "invalid" : "valid") : "";
    const selectRef = useRef(null);
    useEffect(() => {
        const select = selectRef.current;
        const instance = window.M.FormSelect.init(select);
        return () => instance.destroy();
    }, []);

    return (
        <div
            className={`input-field materialize-formik-select ${className} ${valid}`}
            onClick={() => setTouched(true)}
        >
            <Field id={name} name={name} innerRef={selectRef} as="select">
                {children}
            </Field>
            <label htmlFor={name}>{label}</label>
            <ErrorMessage name={name}>
                {(msg) => <span className="helper-text">{msg}</span>}
            </ErrorMessage>
        </div>
    );
};

MaterializeFormikSelect.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
};
