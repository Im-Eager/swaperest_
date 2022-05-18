import styles from "./registerForm.module.css";

function RegisterForm() {
    return (
        <>
            <div className={styles.registerForm}>
                <img className={styles.logo} src="/logo.png" alt="" />

                <p className={styles.welcome}>Welcome to Mindarest!!</p>

                <form>
                    <label className={styles.form}>
                        <b>Email</b>
                    </label>
                    <input className={styles.input} type="text" placeholder="E-mail" name="email" required />
                    <label htmlFor="">
                        <b>Password</b>
                    </label>
                    <input className={styles.input} type="password" placeholder="Password" name="password" required />
                    <label htmlFor="">
                        <b>Age</b>
                    </label>{" "}
                    <input type="number" placeholder="Age" name="age" required />{" "}
                    <button className={styles.registerButton} type="submit">
                        Continue
                    </button>
                </form>
            </div>
        </>
    );
}

export { RegisterForm };
