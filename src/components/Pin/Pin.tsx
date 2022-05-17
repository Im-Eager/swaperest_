import { useDebugValue, useState } from "react";
import styles from "./pin.module.css";

export interface IPin {
    id: string;
    title: string;
    url: string;
    author: string;
    commentsCount: number;
    date: Date;
    likesCount: number;
    dislikesCount: number;
}

interface PinProps {
    value: IPin;
}

// function getHArdCodedProps() {}

// const [isLiked, setIsLiked] = useState(false);

// function likeHandler(pin: IPin) {
//   pin.likesCount++;
// }

// function unlikeHandler(pin: IPin) {
//   pin.likesCount--;
// }
// TODO: todas as funções que vão ter intervenção por exmeplo no onclick, tem de estar dentro da função que define a sincronização?

function Pin(props: PinProps) {
    const { value } = props;

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
                <img className={styles.pinImage} src={value.url} alt={value.title} />
                <div onClick={handleAuthor} className={styles.author}>
                    {value.author}
                    <span className={styles.date}> {value.date.toLocaleDateString()}</span>
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
