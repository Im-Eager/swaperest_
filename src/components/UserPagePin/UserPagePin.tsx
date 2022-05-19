import styles from "./UserPagePin.module.css";
import { useRouter } from 'next/router'

interface UserPagePinProps{
    id: string;
    url: string;
}

function UserPagePin(props: UserPagePinProps) {
    const { id, url } = props;

    const router = useRouter();

    return (
        <>
            <div className={styles.pin}>
                <img className={styles.pinImage} onClick={() => router.push(`http://localhost:3000/pin/${id}`)} src={url} />
            </div>
        </>
    );
}

export { UserPagePin };    


