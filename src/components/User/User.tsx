import { useState } from "react";
import styles from "./user.module.css";

interface DetailedUserProps {
    avatar: string;
    username: string;
    tag: string;
    saved: string[];
    created: string[];
    followers: string[];
    following: string[];
    album: (pinArrayIndex: number) => void;
    
}

function User(props: DetailedUserProps) {

    const {avatar, username, tag, saved, created, followers, following, album} = props;
    
    const [createdButtonIsToggled, setCreatedButtonIsToggled] = useState(false);
    const [savedButtonIsToggled, setSavedButtonIsToggled] = useState(false);

    function createdButtonClick () {
        setCreatedButtonIsToggled(!createdButtonIsToggled);
        setSavedButtonIsToggled(false);
        if(!createdButtonIsToggled){
            album(0);
        }else{
            album(2);
        }
    }

    function savedButtonClick () {
        setCreatedButtonIsToggled(false);
        setSavedButtonIsToggled(!savedButtonIsToggled);
        if(!savedButtonIsToggled){
            album(1);
        }else{
            album(2);
        }
    }



    return (<>
            <div className={styles.content}>
                <img className={styles.image} src={avatar} alt={username} />
                <h1 className={styles.username}>{username}</h1>
                <h5 className={styles.DetailedUserTag}>{"@"+tag}</h5>
                <div className={styles.DetailedUserFollowersLikes}>
                    <span className={styles.DetailedUserSingleInfo}>{followers.length} followers</span>
                    <span className={styles.DetailedUserSingleInfo}>▪</span>
                    <span className={styles.DetailedUserSingleInfo}>Following: {following.length}</span>
                </div>
                <div className={styles.buttonsdiv}>
                    {createdButtonIsToggled ? <button onClick={createdButtonClick} className={styles.buttonsToggled}>Created</button> : <button onClick={createdButtonClick} className={styles.buttons}>Created</button>}
                    {savedButtonIsToggled ? <button onClick={savedButtonClick} className={styles.buttonsToggled}>Saved</button> : <button onClick={savedButtonClick} className={styles.buttons}>Saved</button>}
                </div>
            </div>
        </>
    );
}

export { User };
