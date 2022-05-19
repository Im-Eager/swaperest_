import styles from "./LoggedInHeader.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

interface LoggedInHeaderProps {
    login?: () => void;
    register?: () => void;
}

function LoggedInHeader(props: LoggedInHeaderProps) {
    const router = useRouter();
    const { login, register } = props;

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
                        onClick={() => router.push(`http://localhost:3000`)}
                        src="/logo.png"
                        alt="logo"
                    />
                </div>

                <input className={styles.header_search_bar} type="text" placeholder="Search"></input>

                <div className={styles.header_login_request}>
                    <div className={styles.header_login_create_frame}>
                        <img className={styles.header_img_create_account} onClick={() => register()} src="/notifications.png" alt="logo" />
                    </div>
                    <div className={styles.header_login_create_frame}>
                        <img className={styles.header_img_login} onClick={() => login()} src="/logout.png" />
                    </div>
                </div>
            </header>
        </>
    );
}

export { LoggedInHeader };
