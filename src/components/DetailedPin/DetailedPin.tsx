import { useState } from "react";
import styles from './DetailedPin.module.css';
import { CommentsSection } from "../CommentsSection"
import { NewCommentSection } from "../NewCommentSection"
import Router from "next/router";
import { DBComment, DBUser } from "../../pages/database.types"
import { Db } from "mongodb";

interface DetailedPinProps{
    id: string;
    url: string;
    title: string;
    avatar: string;
    username: string;
    followers: number[];
    likes: number;
    dislikes: number;
    comments: string[];
    authorTag: string;
}

interface CommentDetailedPin{
    text:string,
    author:{
        avatar: string,
        username: string,
    }
    date: number;
}

function getWebsiteUrl(originalUrl: string){
    return originalUrl.slice(0, originalUrl.indexOf("/",14));
}


function DetailedPinComponent(props: DetailedPinProps) {
    const {id, url, title, avatar, username, followers, likes, dislikes, comments, authorTag} = props;
    const websiteUrl = getWebsiteUrl(url);

    const[commentButtonIsToggled, setCommentButtonIsToggled] = useState(false);
    const[commentsAreLoaded, setCommentsAreLoaded]= useState(false);
    const[commentsArray, setCommentsArray] = useState([] as CommentDetailedPin[])


    async function getComments(comments: string[]){

        const detailedComments = await fetch(`http://localhost:3000/api/comments/${id}`, {
                method: "GET",
                headers: 
            {
                "Content-Type": 
                "application/json",
            },
            }).then(res => res.json()) as DBComment[];

        const users = await fetch("http://localhost:3000/api/users").then(res=>res.json()) as DBUser[];


        const userById: Record<string, DBUser> = {};
        for (const user of users) {
            userById[user._id] = user;
        }

        const detailedCommentsWithAuthorDetails = detailedComments.map(comment => {
            return {
                text: comment.text,
                author:{
                    avatar: userById[comment.author].avatar,
                    username: userById[comment.author].username,
                },
                date: comment.date,
            }
        }) as CommentDetailedPin[];

      setCommentsAreLoaded(true);
      setCommentsArray(detailedCommentsWithAuthorDetails);

          
    }   
    
    if (!commentsAreLoaded){
        getComments(comments);
    }
    
    
    return (
        <>
            <main className={styles.pinDetailed}>
                <article className={styles.pinDetailedCenterBoard}>
                    <aside className={styles.pinDetailedAsideLeft}>
                    <img className={styles.pinDetailedImage} src={url} />
                    </aside>
                    <aside className={styles.pinDetailedAsideRight}>
                        <header className={styles.pinDetailedHeader}>
                            <a className={styles.pinDetailedUrl} target="blank" href={websiteUrl}>{websiteUrl.slice(websiteUrl.indexOf("/")+2)}</a> 
                            <div className={styles.pinDetailedHeaderRightSide}>
                                <div className={styles.pinDetailedLikeDislikeButton}>
                                    <button className={styles.pinDetailedLikeButton}>💗</button>
                                    <button className={styles.pinDetailedDislikeButton}>💔</button>
                                </div>
                                <button className={styles.pinDetailedSaveButton}>Save</button>
                            </div>
                        </header>
                        <h1 className={styles.pinDetailedTitle}>{title}</h1>
                        <div className={styles.pinDetailedAuthor}>
                            <div className={styles.pinDetailedAuthorLeftPart}>
                                <img 
                                    className={styles.pinDetailedAuthorAvatar} 
                                    onClick={() => Router.push(`http://localhost:3000/user/${authorTag}`)} 
                                    src={avatar} 
                                />
                                <div className={styles.pinDetailedAuthorUsernameAndFollowers}>
                                    <a className={styles.pinDetailedAuthorUsername}>
                                        {username}
                                    </a>
                                    <footer className={styles.pinDetailedAuthorFollowers}>{followers.length} followers</footer>
                                </div>
                            </div>
                            <button className={styles.pinDetailedFollowButton}>Follow</button>
                        </div>
                        <div className={styles.pinDetailedLikesSection}>
                            <span className={styles.pinDetailedLikes}>{likes} 💗</span>
                            <span className={styles.pinDetailedDisikes}>{dislikes} 💔</span>
                        </div>
                        <div className={styles.pinDetailedCommentsSection}>
                            <span className={styles.pinDetailedCommentsNumber}>{comments.length} comments</span>
                            <button className={styles.pinDetailedCommentsButton} disabled={commentsAreLoaded?false:true} onClick={() => setCommentButtonIsToggled(!commentButtonIsToggled)}>{commentButtonIsToggled ?"v":">"}</button>
                        </div>
                            {commentsAreLoaded && commentButtonIsToggled ? 
                            (<>
                                <CommentsSection commentsArray={commentsArray} />
                                <NewCommentSection pinId={id}/>
                            </>) : null}
                    </aside>
                    
                </article>
            </main>
        </>
    );
}

export { DetailedPinComponent };    
export type {CommentDetailedPin}


