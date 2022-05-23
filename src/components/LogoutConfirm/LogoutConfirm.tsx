import Router from "next/router";
import { FormEvent } from "react";
import styles from "./LogoutConfirm.module.css";

interface LogoutProps{
    logoutCancel: () => void;
}

function LogoutConfirm(props: LogoutProps) {

    const { logoutCancel } = props;

    function logout() {

        document.cookie = `token=logout; max-age=0`;

        Router.push("https://swaperest-mindswap.vercel.app/");
    }

    return (
        <>
            <div className={styles.logoutConfirm}>
                <img className={styles.logo} src="/logo.png" />
                <span>
                    <p className={styles.logoutConfirmMessage}>Are you sure that you want to exit?</p>
                </span>
                <div className={styles.buttons}>
                    <button className={styles.leaveButton} onClick={logout} type="submit">
                        Leave! 😥
                    </button>
                    <button className={styles.stayButton} onClick={logoutCancel}>
                        Stay! 😁
                    </button>
                </div>
            </div>
        </>
    );
}
export { LogoutConfirm };