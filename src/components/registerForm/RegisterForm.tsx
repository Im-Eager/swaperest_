import styles from "./registerForm.module.css";

function RegisterForm() {
    return (
        <>
            <div className={styles.registerForm}>
                <img className={styles.logo} src="/logo.png" alt="" />

                <p className={styles.welcome}>Welcome to Mindarest!</p>

                <form>
                    <label className={styles.form}>
                        <input className={styles.input} type="text" placeholder="📧 E-mail" name="email" required />
                    </label>
                    <label className={styles.form}>
                        <input className={styles.input} type="password" placeholder="🔐 Password" name="password" required />
                    </label>

                    <label className={styles.form}>
                        {" "}
                        <input className={styles.input} min="16" max="120" type="number" placeholder="Age" name="age" required />
                    </label>
                    <button className={styles.registerButton} type="submit">
                        Continue
                    </button>
                </form>

                <p className={styles.pleaseLogin}>Already a member? Please login here.</p>
            </div>
        </>
    );
}

export { RegisterForm };
