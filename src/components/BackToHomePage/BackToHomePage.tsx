
import Router from "next/router";
import styles from "./BackToHomePage.module.css";
import { Header } from "../Header";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import { useState } from "react";
import { RegisterConfirm } from "../RegisterConfirm";

function BackToHomePage() {

    const [loginFormVisible, setLoginFormVisible] = useState(false);
    const [registerFormVisible, setRegisterFormVisible] = useState(false);
    const [registerConfirmVisible, setRegisterConfirmVisible] = useState(false)

    function handleLogin() {
        setLoginFormVisible(true);
        setRegisterFormVisible(false);
    }

    function handleRegister() {
        setLoginFormVisible(false);
        setRegisterFormVisible(true);
    }

    function closeLoginAndRegister() {
        setLoginFormVisible(false);
        setRegisterFormVisible(false);
    }

    function onRegisterSubmit(){
        setRegisterFormVisible(false);
        setRegisterConfirmVisible(true);
        window.setTimeout(function(){
            window.location.href = "https://swaperest-mindswap.vercel.app/";
        }, 5000);
    }


    return (
        <>
            <div className={styles.backHomeContent}>
            <Header login={handleLogin} register={handleRegister} search={()=> Router.push("https://swaperest-mindswap.vercel.app/")}/>
            <main className={styles.backHomePageMain}>
                <h1 className={styles.backHomeAvatar}>🏠</h1>
                <h2 className={styles.backHometext}> You are not logged in.</h2>
                <button className={styles.backHomeButton} onClick={() => Router.push(`https://swaperest-mindswap.vercel.app/`)}>Back To HomePage</button>
            </main>
            {loginFormVisible ? <LoginForm loginSubmit={() => Router.push(`https://swaperest-mindswap.vercel.app/`)} badLogin={false} onClose={closeLoginAndRegister} onChangeToRegister={handleRegister} /> : null}
            {registerFormVisible ? <RegisterForm onClose={closeLoginAndRegister} onChangeToLogin={handleLogin} onSubmit={onRegisterSubmit}/> : null}
            {registerConfirmVisible ? <RegisterConfirm /> : null}
            </div>
         </>
    );
}
export { BackToHomePage };