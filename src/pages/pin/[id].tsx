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
import { BackToHomePage } from "../../components/BackToHomePage";
import Router from "next/router";

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

function onSearch(word: string){
    Router.push("https://swaperest-mindswap.vercel.app/");
}

if (!session._id || session._id==="unknown"){
    return <BackToHomePage />
}

return <SessionContext.Provider value={session}>
    <LoggedInHeader avatar={session.avatar} username={session.username} logout={logoutConfirm} onSearch={onSearch}/>
    <DetailedPinComponent id={_id} url={url} title={title} authorId={author.id} authorTag={author.tag} avatar={author.avatar} username={author.username} followers={author.followers} likes={likesCount} dislikes={dislikesCount} comments={comments}/>
    {logoutConfirmVisible ? <LogoutConfirm logoutCancel={logoutCancel}/> : null}
</SessionContext.Provider>
}


const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.query;
    const { req } = context;

    const { db } = await connectToDatabase();

    if(!id){
        return {props: { pin: null,
            session: null 
        }
    }
}

  const[pin, users, session] = await Promise.all([ 
    db.collection("pins").findOne({_id : new ObjectId(id.toString())}) as Promise<DBPin>, 
    db.collection("users").find({}).toArray() as Promise<DBUser[]>,
    fetch("https://swaperest-mindswap.vercel.app/api/session", {
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