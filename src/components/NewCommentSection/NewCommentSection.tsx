import { useContext } from 'react';
import styles from './NewCommentSection.module.css';
import { SessionContext } from './SessionContext';

function NewCommentSection() {
    const session = useContext(SessionContext);
   
    return (
        <form className={styles.newCommentSection}>
            <div className={styles.newCommentUpperPart}>
                <img className={styles.newCommentAvatar} src={session.avatar}></img>
                <textarea className={styles.newCommentText} name="commentText" placeholder='Add a comment' ></textarea>
            </div>
            <div className={styles.newCommentFooter}>
                <button className={styles.newCommentSubmit} type="submit">Submit</button>
            </div>
            

        </form>
        
    );
}

export { NewCommentSection };    


