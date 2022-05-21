import { connectToDatabase } from "../../../util/mongodb";
import {DBUser, DBPin} from "../database.types";
import { GetServerSideProps } from "next/types";
import { DetailedPinComponent } from "../../components/DetailedPin";
import { DBDetailedPinProps } from "../database.types";
import { ObjectId } from "mongodb";
import { Session } from "../index";
import {LoggedInHeader} from "../../components/LoggedInHeader";
import { SessionContext } from "../../components/SessionContext";
import { useState } from "react";
import { LogoutConfirm } from "../../components/LogoutConfirm";

interface DetailedPin {
    pin: DBDetailedPinProps;
    session: Session
}

function DetailedPin(props: DetailedPin){
    const {_id, url, author, title, likesCount, dislikesCount, comments} = props.pin;
    const {session} = props;
    const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

function logoutConfirm() {
    setLogoutConfirmVisible(true);
}
    
function logoutCancel(){
    setLogoutConfirmVisible(false);
}

return <SessionContext.Provider value={session}>
    <LoggedInHeader avatar={session.avatar} username={session.username} logout={logoutConfirm}/>
    <DetailedPinComponent id={_id} url={url} title={title} authorTag={author.tag} avatar={author.avatar} username={author.username} followers={author.followers} likes={likesCount} dislikes={dislikesCount} comments={comments}/>
    {logoutConfirmVisible ? <LogoutConfirm logoutCancel={logoutCancel}/> : null}
</SessionContext.Provider>
}


const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.params;
    const { req } = context;

    const { db } = await connectToDatabase();

  const[pin, users, session] = await Promise.all([ 
    db.collection("pins").findOne({_id : new ObjectId(id.toString())}) as Promise<DBPin>, 
    db.collection("users").find({}).toArray() as Promise<DBUser[]>,
    fetch("http://localhost:3000/api/session", {
            headers: {
                cookie: req.headers.cookie
            } as HeadersInit
        }).then(res => res.json() as Promise<Session>)
    ]);
    
    const userById: Record<string, DBUser> = {};
    for(const user of users){
      userById[user._id]= user;    
    }

    if (!pin){
        return {
            props: {_id: null}
        }
    }

    const pinWithAuthor = {
         ...pin,
        author: {
            id: pin.author,
            username: userById[pin.author].username,
            avatar: userById[pin.author].avatar,
            followers:  userById[pin.author].followers,
            tag: userById[pin.author].tag,
            }
    }


    return {
        props: {  
            pin: JSON.parse(JSON.stringify(pinWithAuthor)),
            session: session
        }
    }

}

export default DetailedPin;
export{ getServerSideProps};