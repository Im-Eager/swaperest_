import styles from "./CommentsSection.module.css"
import { DetailedPinComments } from "../DetailedPinComments/DetailedPinComments"
import {CommentDetailedPin } from "../DetailedPin/DetailedPin"

interface CommentsArrayProps{
    commentsArray: CommentDetailedPin[],
}

function CommentsSection(props: CommentsArrayProps) {
    const {commentsArray} = props;
    
    return (
        <div className={styles.CommentsSection}>
           <ul className={styles.CommentsList}>
            {commentsArray.map( comment => <DetailedPinComments date={comment.date} avatar={comment.author.avatar} author={comment.author.username} text={comment.text}/>)}
           </ul>
        </div>
    );
}

export { CommentsSection };    


