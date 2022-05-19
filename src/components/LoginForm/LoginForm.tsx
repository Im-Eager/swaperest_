import styles from "./loginForm.module.css";

interface loginFormProps {
    onClose: () => void;
}

function LoginForm(props: loginFormProps) {
    const { onClose } = props;
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

                <form>
                    <label className={styles.form}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="📧 Enter Your Email / User"
                            name="Email/User"
                            required
                        ></input>
                    </label>

                    <label className={styles.form}>
                        <input className={styles.input} type="password" placeholder="🔒 Password" name="Password" required></input>
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
