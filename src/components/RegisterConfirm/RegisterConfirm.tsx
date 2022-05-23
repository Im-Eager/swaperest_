import Router from "next/router";
import styles from "./RegisterConfirm.module.css";

function RegisterConfirm() {
    
    return (
        <>
            <div className={styles.registerDiv}>
                <img className={styles.logo} src="/logo.png" />
                <span>
                    <p className={styles.registrationConfirm}>You are registered in our awesome site!</p>
                </span>
                <button className={styles.homeButton} onClick={()=>Router.push("https://swaperest-mindswap.vercel.app/")}>
                   🏠 Homepage!
                </button>
                <p className={styles.redirectMessage}>click or you will be redirected in 5 seconds.</p>
            </div>
        </>
    );
}
export { RegisterConfirm };