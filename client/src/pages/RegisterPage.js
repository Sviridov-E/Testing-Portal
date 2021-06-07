import React, { useEffect, useCallback } from "react";
import "../styles/registerPage.scss";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { MaterializeFormikField } from "../components/MaterializeFormikField";
import { MaterializeFormikRadio } from "../components/MaterializeFormikRadio";
import { MaterializeFormikDatepicker } from "../components/MaterializeFormikDatepicker";
import { MaterializeFormikSelect } from "../components/MaterializeFormikSelect";
import * as yup from 'yup';

export const RegisterPage = () => {

    const history = useHistory();

    const { request, loading, error, clearError } = useHttp();

    useEffect(() => {
        console.log("Ошибка при авторизации: ", error);
        clearError();
        window.M.updateTextFields();
    }, [error, clearError]);

    const handleSubmit = useCallback(async (values) => {
        try {
            const data = await request("/api/auth/register", "POST", values);
            if (data) {
                history.push("/confirm");
            }
        } catch (e) {
            window.M.toast({ html: `Ошибка регистрации: ${e.message}` });
        }
    }, [request, history]);

    if (loading) {
        return <Loader size="big" />;
    }
    return (
        <div className="container register-page">
            <div className="row register-container">
                <div className="col s12 m10 l8 xl6 offset-m1 offset-l2 offset-xl3">
                    <div className="reg-wrapper">
                        <div className="card-panel indigo accent-3 white-text">
                            <h4>Регистрация</h4>
                            <Formik
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    birthdate: "",
                                    password: "",
                                    gradeNumber: "",
                                    gradeLetter: "",
                                    gender: "",
                                }}
                                validationSchema={yup.object({
                                  firstName: yup
                                    .string()
                                    .required('Обязательное поле'),
                                  lastName: yup
                                    .string()
                                    .required('Обязательное поле'),
                                  email: yup
                                    .string()
                                    .email('Неверный формат')
                                    .required('Обязательное поле'),
                                  birthdate: yup
                                    .date('Неверный формат')
                                    .required('Обязательное поле'),
                                  password: yup
                                    .string()
                                    .required('Обязательное поле'),
                                  gradeNumber: yup
                                    .number()
                                    .required('Обязательное поле'),
                                  gradeLetter: yup
                                    .string()
                                    .required('Обязательное поле'),
                                  gender: yup
                                    .string()
                                    .required('Обязательное поле')
                                })}
                                onSubmit={handleSubmit}
                            >
                                <Form className="reg-form">
                                    <div className="row">
                                        <MaterializeFormikField
                                            className="col m6 s12"
                                            name="firstName"
                                            label="Имя"
                                        />
                                        <MaterializeFormikField
                                            className="col m6 s12"
                                            name="lastName"
                                            label="Фамилия"
                                        />
                                    </div>
                                    <div className="row email-gender-row">
                                        <MaterializeFormikField
                                            className="col m7 s12"
                                            name="email"
                                            label="Электронная почта"
                                        />
                                        <div className="col m5 s10">
                                            <div className="gender">
                                                <span>Пол: </span>
                                                <MaterializeFormikRadio
                                                    name="gender"
                                                    label="М"
                                                    value="male"
                                                />
                                                <MaterializeFormikRadio
                                                    name="gender"
                                                    label="Ж"
                                                    value="female"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <MaterializeFormikDatepicker
                                            className="col s6"
                                            name="birthdate"
                                            label="Дата рождения"
                                        />
                                        <MaterializeFormikSelect
                                            className="col s3"
                                            name="gradeNumber"
                                            label="Класс"
                                        >
                                            <option value="" disabled>Класс</option>
                                            {[1,2,3,4,5,6,7,8,9,10,11].map(num => <option value={num} key={num}>{num}</option>)}
                                        </MaterializeFormikSelect>
                                        <MaterializeFormikSelect
                                            className="col s3"
                                            name="gradeLetter"
                                            label="Буква"
                                        >
                                            <option value="" disabled>Буква</option>
                                            {['А', 'Б', 'В', 'Г', 'Д', 'Е'].map(letter => <option value={letter} key={letter}>{letter}</option>)}
                                        </MaterializeFormikSelect>
                                    </div>
                                    <div className="row">
                                      <MaterializeFormikField
                                        className="col s12"
                                        name="password"
                                        type="password"
                                        label="Пароль"
                                      />
                                    </div>
                                    <div className="buttons">
                                        <button
                                            className="btn waves-effect waves-light indigo darken-2"
                                            type="submit"
                                            name="submit"
                                        >
                                            Зарегистрироваться
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
