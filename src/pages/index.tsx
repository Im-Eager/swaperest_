import { useState } from "react";
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
import {NewPinButton} from "../components/NewPinButton"


interface HomepageProps{
  pinsArray: PinProps[];
  session ?: Session;
}

interface Session extends DBUser{};

function Homepage(props: HomepageProps) {
    const { pinsArray, session } = props;

    const [pins, setPins] = useState(pinsArray);
    const [loginFormVisible, setLoginFormVisible] = useState(false);
    const [registerFormVisible, setRegisterFormVisible] = useState(false);

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

    function onLoginSubmit(){
        Router.reload()
    }

    let avatar = "";

    if(!session){
        avatar = "/logo.png";
    }else{
        avatar= session.avatar
    }

    return (
        <>
            {session ? <LoggedInHeader avatar={avatar} username={session.username} /> : <Header login={handleLogin} register={handleRegister}/>}
            
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
                    />
                ))}
                {loginFormVisible ? <LoginForm loginSubmit={onLoginSubmit} onClose={closeLoginAndRegister} onChangeToRegister={handleRegister}/> : null}
                {registerFormVisible ? <RegisterForm onClose={closeLoginAndRegister} onChangeToLogin={handleLogin} /> : null}
                <NewPinButton/>
            </main>
        </>
    );
}

const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const { db } = await connectToDatabase();

    const [pins, users, session] = await Promise.all([
        db.collection("pins").find({}).toArray() as Promise<DBPin[]>,
        db.collection("users").find({}).toArray() as Promise<DBUser[]>,
        fetch("http://localhost:3000/api/session", {
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
