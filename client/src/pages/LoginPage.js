import React, { useCallback, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import "../styles/loginPage.scss";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { MaterializeFormikField } from "../components/MaterializeFormikField";

export const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const { request, loading, clearError } = useHttp();

    const handleSubmit = useCallback(async ({ email, password }) => {
        try {
            const data = await request("/api/auth/login", "POST", { email, password });
            login(data.userId, data.accessToken, data.refreshToken, data.isAdmin, data.isActive);
        } catch (e) {
            console.log("Ошибка при входе: ", e.message);
            clearError();
        }
    }, [login, request, clearError]);

    if (loading) {
        return <Loader size="big" />;
    }

    return (
        <div className="login-page">
            <div className="row login-container">
                <div className="col s12 m8 l4 offset-m2 offset-l4">
                    <div className="card-panel indigo accent-3 white-text">
                        <h4>Вход</h4>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={yup.object({
                                email: yup
                                    .string()
                                    .email("Неверный формат электронной почты")
                                    .required("Обязательное поле"),
                                password: yup.string().required("Обязательное поле"),
                            })}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <MaterializeFormikField
                                    className="col s12"
                                    name="email"
                                    label="Адрес электронной почты"
                                />
                                <MaterializeFormikField
                                    className="col s12"
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                />
                                <div className="submit-btn right-align">
                                    <button
                                        className="btn waves-effect waves-light indigo darken-2"
                                        type="submit"
                                        name="submit"
                                    >
                                        Войти
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
