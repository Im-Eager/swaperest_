import { LoginForm } from "../components/LoginForm/LoginForm";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import styles from "./registerForm.module.css";

import "../styles.css";
import "./home.css";
import { NewPin } from "../components/NewPin";

// TODO: Não devia ter aqui imports de Pin e Header? Como está a renderizar?

function MyApp(props: { Component: any; pageProps: any }) {
    const { Component, pageProps } = props;

    return (
        <>
            {/* <Component {...pageProps} /> */}
            <NewPin />
            {/* {<LoginForm />} */}
            {/* {<RegisterForm />} */}
        </>
    );
}

export default MyApp;
