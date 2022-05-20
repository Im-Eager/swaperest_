import styles from "./newPin.module.css";
import { User } from "../User/User";

function NewPin() {
    return (
        <>
            <h2 className={styles.newPinDescription}>Please add your photo in the form below.</h2>

            <form className={styles.newPinForm}>
                <label className={styles.newPinLabel}>
                    {" "}
                    Please paste you photo URL
                    <input className={styles.newPinInput} type="url" name="photoUrl" required></input>
                </label>

                <label className={styles.newPinLabel}>
                    {" "}
                    Please add a title to your photo
                    <input className={styles.newPinInput} type="url" name="title" required></input>
                </label>

                <button className={styles.newPinSubmitButton}>Submit</button>
            </form>
        </>
    );
}

export { NewPin };
