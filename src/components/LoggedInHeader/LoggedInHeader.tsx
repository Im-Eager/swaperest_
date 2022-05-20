import styles from "./LoggedInHeader.module.css";
import Router  from "next/router";
import Head from "next/head";

interface LoggedInHeaderProps {
    avatar: string;
    username: string;
}

function LoggedInHeader(props: LoggedInHeaderProps) {
    
    const {avatar, username} = props;

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
                        onClick={() => Router.push(`http://localhost:3000`)}
                        src="/logo.png"
                        alt="logo"
                    />
                </div>

                <input className={styles.header_search_bar} type="text" placeholder="Search"></input>

                <div className={styles.header_login_request}>
                    <div className={styles.header_avatar_logout_frame}>
                        <img className={styles.header_img_avatar} onClick={() => Router.push(`http://localhost:3000/user/${username}`)} src={avatar} alt="logo" />
                    </div>
                    <div className={styles.header_avatar_logout_frame}>
                        <img className={styles.header_img_logout} src="/logout.png" />
                    </div>
                </div>
            </header>
        </>
    );
}

export { LoggedInHeader };
