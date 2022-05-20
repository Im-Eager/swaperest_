import { FormEvent, useRef } from "react";
import styles from "./loginForm.module.css";

interface loginFormProps {
    onClose: () => void;
}

function LoginForm(props: loginFormProps) {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { onClose } = props;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = emailRef.current.value;

        document.cookie = `token=${email}; max-age=9000`;
    }


    return (
        <>
            <div className={styles.loginForm}>
                <img className={styles.logo} src="/logo.png" />

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

                <span className={styles.signUp}>Not on Mindarest yet? Sign up!</span>
            </div>
        </>
    );
}
export { LoginForm };
