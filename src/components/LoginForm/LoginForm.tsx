import { FormEvent, useRef, useState } from "react";
import styles from "./loginForm.module.css";

interface loginFormProps {
    onClose: () => void;
    loginSubmit: () => void;
    onChangeToRegister: () => void;
    badLogin: boolean;
}

function LoginForm(props: loginFormProps) {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { onClose, loginSubmit, onChangeToRegister, badLogin } = props;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!emailRef.current || !passwordRef.current){
            return;
        }

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        document.cookie = `token=${email}; max-age=9000`;
        document.cookie = `token2=${password}; max-age=1`;
        loginSubmit();
    }


    return (
        <>
            <div className={styles.loginForm}>
                <img className={styles.logo} src="/logo.png" />

                {badLogin ? <h5 className={styles.invalidLoginDisclaimer}>Email and password did not match.</h5> : null}
                <button className={styles.closeButton} onClick={onClose}>
                    x
                </button>

                <span>
                    <p className={styles.welcome}>Welcome to Mindarest</p>
                </span>

                <form onSubmit={handleSubmit}>
                    <label className={styles.form}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="📧 Enter Your Email"
                            name="email"
                            required
                            ref={emailRef}
                        ></input>
                    </label>

                    <label className={styles.form}>
                        <input className={styles.input} 
                            type="password" 
                            placeholder="🔒 Password" 
                            name="password" 
                            required
                            ref={passwordRef}
                        >
                        </input>
                    </label>

                    <label></label>

                    <button className={styles.loginButton} type="submit">
                        Login
                    </button>
                </form>

                <span className={styles.signUp}>Not on Mindarest yet? <a className={styles.linkRegister} onClick={onChangeToRegister}>Sign up!</a></span>
            </div>
        </>
    );
}
export { LoginForm };
