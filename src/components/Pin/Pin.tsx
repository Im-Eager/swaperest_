import { useState } from "react";
import styles from "./pin.module.css";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { useRouter } from 'next/router'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

interface PinProps {
    _id: string;
    title: string;
    url: string;
    author: {
        id: string;
        username: string;
    };
    commentsCount: number;
    date: number;
    likesCount: number;
    dislikesCount: number;
}

function Pin(props: PinProps) {
    const { _id, title, url, author, commentsCount, date, likesCount, dislikesCount } = props;

    const router = useRouter();

    const time = timeAgo.format(new Date(date), 'mini');

    const [isLiked, setIsLiked] = useState(0);
    const [isDisliked, setIsDisliked] = useState(0);

    function handleLiked() {
        setIsLiked((prevCount) => prevCount + 1);
    }

    function handleDisliked() {
        setIsDisliked((prevCount) => prevCount - 1);
    }

    function handleSave() {
        console.log("Saved");
    }

    function handleAuthor() {
        console.log("Author clicked");
    }

    
    return (
        <>
            <div className="pin">
                <img onClick={() => router.push(`http://localhost:3000/pin/${_id}`)} className={styles.pinImage} src={url} alt={title} />
                <div onClick={handleAuthor} className={styles.author}>
                    {author.username}<span className={styles.date}>  {time}</span>
                </div>

                <button onClick={handleSave} className={styles.pinSaveButton}>
                    Save
                </button>
                <div>
                    <button onClick={handleLiked} className={styles.pinLikeButton}>
                        {" "}
                        ❣️ {isLiked}
                    </button>

                    <button onClick={handleDisliked} className={styles.pinDislikeButton}>
                        💔 {isDisliked}
                    </button>
                </div>
            </div>
        </>
    );
}

export { Pin };    
export type { PinProps };

