import { ErrorMessage, useField } from "formik";
import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import "../styles/materializeFormikDatepicker.scss";

export const MaterializeFormikDatepicker = ({ className = "", name, label }) => {
    const [, { error, touched }, { setValue, setTouched }] = useField(name);

    /* Datepicker options************************* */
    const options = useMemo(
        () => ({
            onSelect: (value) => setValue(value, true),
            onClose: () => setTouched(true),
            parse: (str) => {
                return new Date(Date.UTC(str.slice(6, 10), str.slice(3, 5) - 1, str.slice(0, 2)));
            },
            autoClose: true,
            format: "dd.mm.yyyy",
            firstDay: 1,
            defaultDate: new Date(),
            showDaysInNextAndPreviousMonths: false,
            yearRange: [1950, 2022],
            i18n: {
                cancel: "Отмена",
                months: [
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь",
                ],
                weekdays: [
                    "Воскресенье",
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота",
                ],
                weekdaysAbbrev: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                monthsShort: [
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь",
                ],
            },
        }),
        [setValue, setTouched]
    );
    /* ********************************************* */

    /* Initiallization ***************************** */
    const datepickerRef = useRef(null);
    useEffect(() => {
        const datepicker = datepickerRef.current;
        const instance = window.M.Datepicker.init(datepicker, options);
        return () => instance.destroy();
    }, [options]);
    /* ********************************************* */

    return (
        <div className={`input-field materialize-formik-datepicker ${className}`}>
            <input
                className={`datepicker${touched ? (error ? " invalid" : " valid") : ""}`}
                type="text"
                name={name}
                id={`mfd-${name}`}
                ref={datepickerRef}
            />
            <label htmlFor={`mfd-${name}`}>{label}</label>
            <ErrorMessage name={name}>
                {(msg) => <span className="helper-text">{msg}</span>}
            </ErrorMessage>
        </div>
    );
};

MaterializeFormikDatepicker.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
