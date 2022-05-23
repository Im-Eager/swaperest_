import { useContext, useState } from "react";
import styles from './DetailedPin.module.css';
import { CommentsSection } from "../CommentsSection"
import { NewCommentSection } from "../NewCommentSection"
import Router from "next/router";
import { DBComment, DBUser } from "../../pages/database.types";
import { SessionContext } from "../SessionContext";

interface DetailedPinProps{
    id: string;
    url: string;
    title: string;
    avatar: string;
    authorId: string;
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
    const {id, url, title, avatar, username, followers, likes, dislikes, comments, authorTag, authorId} = props;
    const session = useContext(SessionContext);
    const websiteUrl = getWebsiteUrl(url);

    const[commentButtonIsToggled, setCommentButtonIsToggled] = useState(false);
    const[commentsAreLoaded, setCommentsAreLoaded]= useState(false);
    const[commentsArray, setCommentsArray] = useState([] as CommentDetailedPin[]);
    const [isSaved, setIsSaved] = useState(session.saved.includes(id));
    const [isFollowing, setIsFollowing] = useState(session.following.includes(authorId));
    const [followersCount, setFollowersCount] = useState(followers.length);
    const [ isLiked, setIsLiked ] = useState(session.likesGiven.includes(id));
    const [ isDisliked, setIsDisliked ] = useState(session.dislikesGiven.includes(id));
    const [ likesCount, setLikesCount ] = useState(likes);
    const [ dislikesCount, setDislikesCount ] = useState(dislikes);


    async function handleSaveButton(){

        await fetch("https://swaperest-mindswap.vercel.app/api/users/savedPins", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                userId: session._id,
                pinId: id,
                isSaved: isSaved,
              })
         }).then(res => res.json);

        setIsSaved(!isSaved);
    }

    async function handleFollowButton(){

        await fetch("https://swaperest-mindswap.vercel.app/api/users/following", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                userId: session._id,
                isFollowing: isFollowing,
                pinAuthorId: authorId,
              })
         }).then(res => res.json);

         if(!isFollowing){
            setFollowersCount(followersCount+1);
         }else{
            setFollowersCount(followersCount-1);
         }

        setIsFollowing(!isFollowing);
    }

    async function handleLiked() {

        await Promise.all([ fetch("https://swaperest-mindswap.vercel.app/api/users/likes", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                userId: session._id,
                pinId: id,
                isLiked: isLiked,
              })
         }), fetch("https://swaperest-mindswap.vercel.app/api/pins/likes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               likesCount: likesCount,
               pinId: id,
               isLiked: isLiked,
             })
        })]);

        
        if(!isLiked){
            setLikesCount(likesCount+1);
        }else{
            setLikesCount(likesCount-1);
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
                pinId: id,
                isDisliked: isDisliked,
              })
         }), fetch("https://swaperest-mindswap.vercel.app/api/pins/dislikes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               dislikesCount: dislikesCount,
               pinId: id,
               isDisliked: isDisliked,
             })
        })]);

        
        if(!isDisliked){
            setDislikesCount(dislikesCount+1);
        }else{
            setDislikesCount(dislikesCount-1);
        }

        setIsDisliked(!isDisliked);
    }

    async function getComments(comments: string[]){

        const detailedComments = await fetch(`https://swaperest-mindswap.vercel.app/api/comments/${id}`, {
                method: "GET",
                headers: 
            {
                "Content-Type": 
                "application/json",
            },
            }).then(res => res.json()) as DBComment[];

        const users = await fetch("https://swaperest-mindswap.vercel.app/api/users").then(res=>res.json()) as DBUser[];


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
                                    {isLiked ?
                                    <button className={styles.pinDetailedLikedButton} onClick={handleLiked}>❤</button>
                                    :
                                    <button className={styles.pinDetailedLikeButton} onClick={handleLiked}>❤</button>}
                                    {isDisliked ?
                                    <button className={styles.pinDetailedDislikedButton} onClick={handleDisliked}>💔</button>
                                    :
                                    <button className={styles.pinDetailedDislikeButton} onClick={handleDisliked}>💔</button>}
                                </div>
                                { isSaved ? 
                                 <button  className={styles.pinDetailedSavedButton} onClick={handleSaveButton}>Saved</button> 
                                :
                                <button  className={styles.pinDetailedSaveButton} onClick={handleSaveButton}>Save</button> 
                                }
                            </div>
                        </header>
                        <h1 className={styles.pinDetailedTitle}>{title}</h1>
                        <div className={styles.pinDetailedAuthor}>
                            <div className={styles.pinDetailedAuthorLeftPart}>
                                <img 
                                    className={styles.pinDetailedAuthorAvatar} 
                                    onClick={() => Router.push(`https://swaperest-mindswap.vercel.app/user/${authorTag}`)} 
                                    src={avatar} 
                                />
                                <div className={styles.pinDetailedAuthorUsernameAndFollowers}>
                                    <a className={styles.pinDetailedAuthorUsername}>
                                        {username}
                                    </a>
                                    <footer className={styles.pinDetailedAuthorFollowers}>{followersCount} followers</footer>
                                </div>
                            </div>
                            { isFollowing ? 
                                 <button className={styles.pinDetailedFollowButton} onClick={handleFollowButton}>Unfollow</button> 
                                :
                                <button className={styles.pinDetailedFollowButton} onClick={handleFollowButton}>Follow</button> 
                                }
                            
                        </div>
                        <div className={styles.pinDetailedLikesSection}>
                            <span className={styles.pinDetailedLikes}>{likesCount} 💗</span>
                            <span className={styles.pinDetailedDisikes}>{dislikesCount} 💔</span>
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


