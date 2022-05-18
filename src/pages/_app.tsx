import { LoginForm } from "../components/LoginForm/LoginForm";
import { RegisterForm } from "../components/registerForm/RegisterForm";
import styles from "./registerForm.module.css";

import "../styles.css";
import "./home.css";

// TODO: Não devia ter aqui imports de Pin e Header? Como está a renderizar?

function MyApp(props: { Component: any; pageProps: any }) {
    const { Component, pageProps } = props;

    return (
        <>
            <Component {...pageProps} />
            {<LoginForm />}
            {<RegisterForm />}
        </>
    );
}

export default MyApp;
