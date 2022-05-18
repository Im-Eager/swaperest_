import styles from "./user.module.css";
function User() {
    return (
        <div className={styles.content}>
            <img className={styles.image} src="/tiago-correia-photo.png" alt="Tiago Correia" />
            <p className={styles.username}>Tiago Correia</p>
            <div className={styles.buttonsdiv}>
                <button className={styles.buttons}>Favourites</button>
                <button className={styles.buttons}>My Pins</button>
            </div>
            <a>Logout</a>
        </div>
    );
}

export { User };
