import Router from "next/router";
import styles from "./NewPinButton.module.css";
function NewPinButton() {
    return (
        <>
            <button className={styles.newPinButton} onClick={()=>Router.push("http://localhost:3000/pin-builder")}>+</button>
        </>
    );
}
export { NewPinButton };