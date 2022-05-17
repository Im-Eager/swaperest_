import { url } from "inspector";
import { PinProps } from "../Pin/Pin";
import styles from './DetailedPin.module.css';

interface DetailedPinProps{
    url: string;
    title: string;
    avatar: string;
    username: string;
    followers: number[];
}

function getWebsiteUrl(originalUrl: string){
    return originalUrl.slice(0, originalUrl.indexOf("/",14));
}

function DetailedPinComponent(props: DetailedPinProps) {
    const {url, title, avatar, username, followers} = props;
    const websiteUrl = getWebsiteUrl(url);

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
                                <img className={styles.pinDetailedAuthorAvatar} src={avatar} />
                                <div className={styles.pinDetailedAuthorUsernameAndFollowers}>
                                    <a className={styles.pinDetailedAuthorUsername}>
                                        {username}
                                    </a>
                                    <footer className={styles.pinDetailedAuthorFollowers}>{followers.length} followers</footer>
                                </div>
                            </div>
                            <button className={styles.pinDetailedFollowButton}>Follow</button>
                        </div>
                        <div className={styles.pinDetailedCommentsSection}>4 comments</div>
                    </aside>
                    
                </article>
            </main>
        </>
    );
}

export { DetailedPinComponent };    


