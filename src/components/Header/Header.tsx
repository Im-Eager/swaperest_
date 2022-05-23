import Router from 'next/router';
import Head from "next/head";
import styles from "./Header.module.css";
import { useEffect, useRef } from 'react';

interface HeaderProps{
    login : () => void;
    register : () => void;
    search: () => void;
}

function Header(props: HeaderProps) {

    const { login, register, search } = props;
    const searchRef = useRef<HTMLInputElement>(null);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key == "Enter" && !e.shiftKey) {
            search();
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
                    <img className={styles.header_logo_img} onClick={() => Router.push(`https://swaperest-mindswap.vercel.app/`)} src="/logo.png" alt="logo" />
                </div>

                
                <input className={styles.header_search_bar} type="text" ref={searchRef}  onKeyDown={handleKeyDown} placeholder="Search"/>
                
                    
                
                

                <div className={styles.header_login_request}>
                    <div className={styles.header_login_create_frame}>
                        <img className={styles.header_img_create_account} onClick={register} src="/notifications.png" alt="logo" />
                    </div>
                    <div className={styles.header_login_create_frame}>
                        <img className={styles.header_img_login} onClick={login} src="/user.png" />
                    </div>
                    
                </div>
            </header>
        </>
    );
}

export { Header };

