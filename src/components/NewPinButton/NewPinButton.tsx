import Router from "next/router";
import styles from "./NewPinButton.module.css";
function NewPinButton() {
    return (
        <>
            <button className={styles.newPinButton} onClick={()=>Router.push("https://swaperest-mindswap.vercel.app/pin-builder")}>+</button>
        </>
    );
}
export { NewPinButton };