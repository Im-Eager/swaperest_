import { GetServerSideProps } from "next/types";
import { NewPin } from "../components/NewPin";
import { LoggedInHeader } from "../components/LoggedInHeader"
import { Session } from "./index"
import { useState } from "react";
import { LogoutConfirm } from "../components/LogoutConfirm";
import { SessionContext } from "../components/SessionContext";
import Router from "next/router";

interface CreateNewPinProps{
    session: Session;
}

function CreateNewPin(props: CreateNewPinProps) {

    const { session } = props;
    const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

    function logoutConfirm() {
        setLogoutConfirmVisible(true);
    }

    function logoutCancel(){
        setLogoutConfirmVisible(false);
    }

    return <SessionContext.Provider value={session}>
        <LoggedInHeader avatar={session.avatar} username={session.username} logout={logoutConfirm}/>
        <NewPin />;
        {logoutConfirmVisible ? <LogoutConfirm logoutCancel={logoutCancel}/> : null}
        </SessionContext.Provider>
}

const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    const session=  await fetch("http://localhost:3000/api/session", {
            headers: {
                cookie: req.headers.cookie
            } as HeadersInit
        }).then(res => res.json() as Promise<Session>);
          
    return {
        props: {
            session: session,
        },
    };
}

export default CreateNewPin;
export { getServerSideProps };


