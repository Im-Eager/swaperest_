import styles from './DetailedPinComments.module.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

interface DetailedPinCommentsProps{
    avatar: string;
    author: string;
    text: string;
    date: number;
}

function DetailedPinComments(props: DetailedPinCommentsProps) {
    const {avatar, author, text, date} = props;

    const time = timeAgo.format(new Date(date));
    
    return (
        <>
        <article className={styles.DetailedPinComment}>
            <img className={styles.DetailedPinCommentAvatar} src={avatar}/>
            <div className={styles.DetailedPinCommentRightPart}>
                <span className={styles.DetailedPinCommentNameAndText}><b>{author}</b> {text}</span>
                <footer className={styles.DetailedPinCommentTimeAgo}>{time}</footer>
            </div>
            </article>
    
             
        </>
    );
}

export { DetailedPinComments };    


