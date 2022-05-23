import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { LoggedInHeader } from "../components/LoggedInHeader";
import { Pin, PinProps } from "../components/Pin";
import { connectToDatabase } from "../../util/mongodb";
import styles from "./home.module.css";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm"
import{ DBPin , DBUser } from "./database.types"
import { GetServerSideProps } from "next/types";
import Router from "next/router";
import {NewPinButton} from "../components/NewPinButton";
import { LogoutConfirm } from "../components/LogoutConfirm";
import { SessionContext } from "../components/SessionContext"
import { RegisterConfirm } from "../components/RegisterConfirm"
import { UserPagePin } from "../components/UserPagePin"




interface HomepageProps{
  pinsArray: PinProps[];
  session: Session;
}

interface Session {
    _id: string;
    username: string;
    avatar: string;
    saved: string[]
    following: string[];
    likesGiven: string[];
    dislikesGiven: string[];
};

function Homepage(props: HomepageProps) {

    const { pinsArray, session } = props;

    const [pins, setPins] = useState(pinsArray);
    const [loginFormVisible, setLoginFormVisible] = useState(false);
    const [registerFormVisible, setRegisterFormVisible] = useState(false);
    const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);
    const [registerConfirmVisible, setRegisterConfirmVisible] = useState(false);

    useEffect( () => {if(session._id==="unknown"){
        setLoginFormVisible(true);
    }}, [])
   

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

    function logoutConfirm() {
        setLogoutConfirmVisible(true);
    }

    function logoutCancel(){
        setLogoutConfirmVisible(false);
    }

    function onLoginSubmit(){
            Router.reload()
    }

    function onRegisterSubmit(){
        setRegisterFormVisible(false);
        setRegisterConfirmVisible(true);
        window.setTimeout(function(){
            window.location.href = "https://swaperest-mindswap.vercel.app/";
        }, 5000);
    }

    function handleSearchNotLoggedIn(){
        Router.reload();
    }

    function handleSearch(word: string){
         setPins(pinsArray.filter(pin => pin.title.toUpperCase().includes(word.toUpperCase())));
    }


    if (!session._id){
        return <>
            <Header login={handleLogin} register={handleRegister} search={handleSearchNotLoggedIn}/>
            <main className={styles.homepage_main}>
                {pins.map((pin) => (
                    <UserPagePin
                        key={pin._id}
                        id={pin._id}
                        url={pin.url}
                        
                    />
                ))}
                {loginFormVisible ? <LoginForm loginSubmit={onLoginSubmit} badLogin={false} onClose={closeLoginAndRegister} onChangeToRegister={handleRegister} /> : null}
                {registerFormVisible ? <RegisterForm onClose={closeLoginAndRegister} onChangeToLogin={handleLogin} onSubmit={onRegisterSubmit}/> : null}
                {registerConfirmVisible ? <RegisterConfirm /> : null}
            </main>
        </>
    }else if(session._id==="unknown"){
        return <>
        <Header login={handleLogin} register={handleRegister} search={handleSearchNotLoggedIn}/>
        <main className={styles.homepage_main}>
                {pins.map((pin) => (
                    <UserPagePin
                    key={pin._id}
                    id={pin._id}
                    url={pin.url}
                    />
                ))}
            {loginFormVisible ? <LoginForm loginSubmit={onLoginSubmit} badLogin={true} onClose={closeLoginAndRegister} onChangeToRegister={handleRegister} /> : null}
            {registerFormVisible ? <RegisterForm onClose={closeLoginAndRegister} onChangeToLogin={handleLogin} onSubmit={onRegisterSubmit} /> : null}
         </main>
        </>
    }else{
        return <SessionContext.Provider value={session} >
            <LoggedInHeader avatar={session.avatar} username={session.username} onSearch={handleSearch} logout={logoutConfirm}/>
            <main className={styles.homepage_main}>
                {pins.map((pin) => (
                    <Pin
                        key={pin._id}
                        _id={pin._id}
                        title={pin.title}
                        url={pin.url}
                        author={pin.author}
                        commentsCount={pin.commentsCount}
                        date={pin.date}
                        likesCount={pin.likesCount}
                        dislikesCount={pin.dislikesCount}
                        saved={session.saved}
                    />
                ))}
                <NewPinButton/>
                {logoutConfirmVisible ? <LogoutConfirm logoutCancel={logoutCancel}/> : null}
            </main>
        </SessionContext.Provider>

    }
}

const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const { db } = await connectToDatabase();

    const [pins, users, session] = await Promise.all([
        db.collection("pins").find({}).toArray() as Promise<DBPin[]>,
        db.collection("users").find({}).toArray() as Promise<DBUser[]>,
        fetch("https://swaperest-mindswap.vercel.app/api/session", {
            headers: {
                cookie: req.headers.cookie
            } as HeadersInit
        }).then(res => res.json() as Promise<Session>)
    ]);

    const randomPositionedPins = pins.sort((a, b) => 0.5 - Math.random());

    const userById: Record<string, DBUser> = {};
    for (const user of users) {
        userById[user._id] = user;
    }

    const pinsWithUsername = randomPositionedPins.map((pin) => ({
        ...pin,
        author: { id: pin.author, username: userById[pin.author].username },
    }));


    return {
        props: {
            pinsArray: JSON.parse(JSON.stringify(pinsWithUsername)),
            session: session,
        },
    };
}

export default Homepage;
export { getServerSideProps };
export type { Session };
