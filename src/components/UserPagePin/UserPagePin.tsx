import Router from "next/router";
import styles from "./UserPagePin.module.css";

interface UserPagePinProps{
    id: string;
    url: string;
}

function UserPagePin(props: UserPagePinProps) {
    const { id, url } = props;


    return (
        <>
            <div className={styles.pin}>
                <img className={styles.pinImage} onClick={() => Router.push(`https://swaperest-mindswap.vercel.app/pin/${id}`)} src={url} />
            </div>
        </>
    );
}

export { UserPagePin };    


