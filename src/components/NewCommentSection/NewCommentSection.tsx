import { FormEvent, useContext, useRef, useState } from 'react';
import styles from './NewCommentSection.module.css';
import { SessionContext } from '../SessionContext';
import Router from 'next/router';

interface NewCommentProps{
    pinId: string;
}

function NewCommentSection(props: NewCommentProps) {
    const session = useContext(SessionContext);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const { pinId } = props;
    const [buttonToggled, setButtonToggled] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!textRef.current){
            return;
        }

        const date = Date.now();
        const text = textRef.current.value;
        const code = [date, session._id].join(".");
        
        await fetch("http://localhost:3000/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: session._id,
                date: date,
                pin: pinId,
                text: text,  
             })
        });

        const commentID = await fetch(`http://localhost:3000/api/comments/commentbycode/${code}`).then(res => res.json());


        await fetch("http://localhost:3000/api/pins/", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                  pinId: pinId,
                  commentId: commentID.id,
              })
         }).then(res => res.json);

        Router.reload();
        setButtonToggled(true);
    }

   
    return (
        <form className={styles.newCommentSection} onSubmit={handleSubmit}>
            <div className={styles.newCommentUpperPart}>
                <img className={styles.newCommentAvatar} src={session.avatar}></img>
                <textarea className={styles.newCommentText} ref={textRef} name="commentText" placeholder='Add a comment' ></textarea>
            </div>
            <div className={styles.newCommentFooter}>
                <button className={styles.newCommentSubmit} disabled={buttonToggled} type="submit">Submit</button>
            </div>
            

        </form>
        
    );
}

export { NewCommentSection };    


