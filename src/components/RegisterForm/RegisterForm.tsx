import { FormEvent, useRef, useState } from "react";
import styles from "./RegisterForm.module.css";

interface registerFormProps {
    onClose: () => void;
    onChangeToLogin: () => void;
    onSubmit: () => void;
}

function RegisterForm(props: registerFormProps) {
    const { onClose, onChangeToLogin, onSubmit } = props;
    const [isToggled, setIsToggled] = useState(false);

    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const avatarUrlRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsToggled(true);
        createAccount(); 
    }

    async function createAccount() {

        if(!emailRef.current ||  !passwordRef.current || !avatarUrlRef.current || !usernameRef.current){
            return;
        }

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const avatar = avatarUrlRef.current.value;;
        const username = usernameRef.current.value;
        
        const response = await fetch("https://swaperest-mindswap.vercel.app/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                avatar: avatar,
                email: email,
                password: password,
            }),
        })   

        onSubmit();
        
    }

    return (
        <>
            <div className={styles.registerForm}>
                <img className={styles.logo} src="/logo.png" alt="" />

                <button className={styles.closeButton} onClick={onClose}>
                    x
                </button>

                <p className={styles.welcome}>Welcome to Mindarest!</p>

                <form onSubmit={handleSubmit}>
                    <label className={styles.form}>
                        <input className={styles.input} type="text" placeholder="📧 E-mail" name="email" required ref={emailRef} />
                    </label>

                    <label className={styles.form}>
                        <input className={styles.input} type="text" placeholder="👩‍🦲 Username" name="username" required ref={usernameRef} />
                    </label>

                    <label className={styles.form}>
                        <input className={styles.input} type="password" placeholder="🔐 Password" name="password" required ref={passwordRef} />
                    </label>

                    <label className={styles.form}>
                        {" "}
                        <input className={styles.input} min="18" max="120" type="number" placeholder="🔞 Age" name="age" required />
                    </label>

                    <label className={styles.form}>
                        {" "}
                        <input
                            className={styles.input}
                            type="url"
                            placeholder="🖼 Please insert your avatar url"
                            name="avatarUrl"
                            required
                            ref={avatarUrlRef}
                        />
                    </label>

                    <button className={styles.registerButton} type="submit" disabled={isToggled}>
                        Continue
                    </button>
                </form>

                <p className={styles.pleaseLogin}>Already a member? Please <a className={styles.linkLogin} onClick={onChangeToLogin}>login here</a>.</p>
            </div>
        </>
    );
}

export { RegisterForm };
