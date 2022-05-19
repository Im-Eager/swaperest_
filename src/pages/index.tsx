import { useState } from "react";
import { Header } from "../components/Header";
import { LoggedInHeader } from "../components/LoggedInHeader";
import { Pin, PinProps } from "../components/Pin";
import { connectToDatabase } from "../../util/mongodb";
import styles from "./home.module.css";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/registerForm"
import{ DBPin , DBUser } from "./database.types"


interface HomepageProps{
  pinsArray: PinProps[];
}

function Homepage(props: HomepageProps) {
    const { pinsArray } = props;

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

    return (
        <>
            <Header login={handleLogin} register={handleRegister} />
            <LoggedInHeader />
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
                {loginFormVisible ? <LoginForm onClose={closeLoginAndRegister} /> : null}
                {registerFormVisible ? <RegisterForm onClose={closeLoginAndRegister} /> : null}
            </main>
        </>
    );
}

async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const [pins, users] = await Promise.all([
        db.collection("pins").find({}).toArray() as Promise<DBPin[]>,
        db.collection("users").find({}).toArray() as Promise<DBUser[]>,
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
        },
    };
}

export default Homepage;
export { getServerSideProps };
export type { DBPin, DBUser };
