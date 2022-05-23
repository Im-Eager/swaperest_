import { useContext, useState } from "react";
import styles from "./pin.module.css";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import Router from 'next/router';
import { SessionContext } from "../SessionContext";

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
    saved: string[];
}

function Pin(props: PinProps) {
    const { _id, title, url, author, date, likesCount, dislikesCount, saved } = props;
    const session = useContext(SessionContext);

    const time = timeAgo.format(new Date(date), 'mini');

    const [ isSaved, setIsSaved ] = useState(saved.includes(_id));
    const [ isLiked, setIsLiked ] = useState(session.likesGiven.includes(_id));
    const [ isDisliked, setIsDisliked ] = useState(session.dislikesGiven.includes(_id));
    const [ likes, setLikes ] = useState(likesCount);
    const [ dislikes, setDislikes ] = useState(dislikesCount);

    async function handleLiked() {

        await Promise.all([ fetch("https://swaperest-mindswap.vercel.app/api/users/likes", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                userId: session._id,
                pinId: _id,
                isLiked: isLiked,
              })
         }), fetch("https://swaperest-mindswap.vercel.app/api/pins/likes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               likesCount: likes,
               pinId: _id,
               isLiked: isLiked,
             })
        })]);

        
        if(!isLiked){
            setLikes(likes+1);
        }else{
            setLikes(likes-1);
        }

        setIsLiked(!isLiked);
    }

    async function handleDisliked() {
        await Promise.all([ fetch("https://swaperest-mindswap.vercel.app/api/users/dislikes", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                userId: session._id,
                pinId: _id,
                isDisliked: isDisliked,
              })
         }), fetch("https://swaperest-mindswap.vercel.app/api/pins/dislikes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               dislikesCount: dislikes,
               pinId: _id,
               isDisliked: isDisliked,
             })
        })]);

        
        if(!isDisliked){
            setDislikes(dislikes+1);
        }else{
            setDislikes(dislikes-1);
        }

        setIsDisliked(!isDisliked);
    }

    async function handleSaveButton(){

        await fetch("https://swaperest-mindswap.vercel.app/api/users/savedPins", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                userId: session._id,
                pinId: _id,
                isSaved: isSaved,
              })
         }).then(res => res.json);

        setIsSaved(!isSaved);
    }

    
    return (
        <>
            <div className={styles.pin}>
                <img className={styles.pinImage} onClick={() => Router.push(`https://swaperest-mindswap.vercel.app/pin/${_id}`)} src={url} alt={title} />
                <div  className={styles.author}>
                    {author.username}<span className={styles.date}>  {time}</span>
                </div>
                { isSaved ? 
                <button  className={styles.pinSavedButton} onClick={handleSaveButton}>Saved</button> 
                :
                <button  className={styles.pinSaveButton} onClick={handleSaveButton}>Save</button> 
            }
                <div>
                    {isLiked ? 
                     <button onClick={handleLiked} className={styles.pinLikedButton}>
                     {likes}<span className={styles.heart}>❤</span>
                    </button>
                    :
                    <button onClick={handleLiked} className={styles.pinLikeButton}>
                    {likes}<span className={styles.heart}>❤</span>
                    </button>}
                    {isDisliked ? 
                     <button onClick={handleDisliked} className={styles.pinDislikedButton}>
                     {dislikes} 💔
                     </button>
                    :
                    <button onClick={handleDisliked} className={styles.pinDislikeButton}>
                    {dislikes} 💔
                    </button>}
                </div>
            </div>
        </>
    );
}

export { Pin };    
export type { PinProps };

