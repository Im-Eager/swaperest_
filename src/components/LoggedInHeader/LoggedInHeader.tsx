import styles from "./LoggedInHeader.module.css";
import Router  from "next/router";
import Head from "next/head";
import { useRef } from "react";

interface LoggedInHeaderProps {
    avatar: string;
    username: string;
    logout: () => void;
    onSearch: (word: string) => void;
}

function LoggedInHeader(props: LoggedInHeaderProps) {
    
    const {avatar, username, logout, onSearch} = props;
    const searchRef = useRef<HTMLInputElement>(null);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key == "Enter" && !e.shiftKey) {
            if(!searchRef.current){
                return;
            }
            const search = searchRef.current.value;
            onSearch(search);
        }
    }

    return (
        <>
            <Head>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon16.png" />
            </Head>
            <header className={styles.header}>
                <title>Mindarest</title>

                <div className={styles.header_logo}>
                    <img
                        className={styles.header_logo_img}
                        onClick={() => Router.push(`https://swaperest-mindswap.vercel.app/`)}
                        src="/logo.png"
                        alt="logo"
                    />
                </div>

                <input className={styles.header_search_bar} onKeyDown={handleKeyDown} ref={searchRef} type="text" placeholder="Search"></input>

                <div className={styles.header_login_request}>
                    <div className={styles.header_avatar_logout_frame}>
                        <img className={styles.header_img_avatar} onClick={() => Router.push(`https://swaperest-mindswap.vercel.app/user/${username.toLowerCase()}`)} src={avatar} alt="logo" />
                    </div>
                    <div className={styles.header_avatar_logout_frame}>
                        <img className={styles.header_img_logout} src="/logout.png" onClick={logout}/>
                    </div>
                </div>
            </header>
        </>
    );
}

export { LoggedInHeader };
