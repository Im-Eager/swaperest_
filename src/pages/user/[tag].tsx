import { User } from "../../components/User";
import { LoggedInHeader } from "../../components/LoggedInHeader";
import {connectToDatabase} from "../../../util/mongodb"
import { GetServerSideProps } from "next";
import { DBUser, DBPin } from "../database.types"
import styles from "./User.module.css";
import { UserPagePin } from "../../components/UserPagePin"
import { useState } from "react";
import { Session } from "../index";
import { LogoutConfirm } from "../../components/LogoutConfirm";
import Router from "next/router";

interface UserPageProps{
  user: DBUser;
  session: Session;
}

function UserDetailed(props: UserPageProps) {



    const {avatar, username, tag, saved, created, followers, following} = props.user;
    const { session } = props;

    const [pins, setPins] = useState([[],[]] as DBPin[][])
    const [pinsAreLoaded, setPinsAreLoaded] = useState(false);
    const [pinsToShow, setPinsToShow] = useState([] as DBPin[])
    const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

    async function getUserPins(createdPinsIdArray: string[], savedPinsIdArray: string[]){
        
        const createdPromisesArray = createdPinsIdArray.map(pinId => fetch(`https://swaperest-mindswap.vercel.app/api/pins/${pinId}`, {
            method: "GET",
            headers: 
        {
          "Content-Type": 
          "application/json",
        },
          })
        );

        const savedPromisesArray = savedPinsIdArray.map(pinId => fetch(`https://swaperest-mindswap.vercel.app/api/pins/${pinId}`, {
            method: "GET",
            headers: 
        {
          "Content-Type": 
          "application/json",
        },
          })
        );

        const createdPromiseAll = Promise.all(createdPromisesArray) as Promise<Response[]>;
        const savedPromiseAll = Promise.all(savedPromisesArray) as Promise<Response[]>;

        const [createdResponse, savedResponse] = await Promise.all([createdPromiseAll, savedPromiseAll]) as Response[][];

        const createdResponseJsonPromise = Promise.all(createdResponse.map( response => response.json())) as Promise<DBPin[]>;
        const savedResponseJsonPromise = Promise.all(savedResponse.map( response => response.json())) as Promise<DBPin[]>;

        const [createdDBPins, savedDBPins] = await Promise.all([createdResponseJsonPromise, savedResponseJsonPromise]) as DBPin[][];
        
        setPins([createdDBPins, savedDBPins]);
        setPinsAreLoaded(true);
    } 

    if(!pinsAreLoaded){
      getUserPins(created, saved);
    }

  function logoutConfirm() {
    setLogoutConfirmVisible(true);
  }

  function logoutCancel(){
    setLogoutConfirmVisible(false);
  }


  function changePins(pinsArrayIndex: number){
    if (pinsArrayIndex === 2){
      setPinsToShow([])
    } else {
      setPinsToShow(pins[pinsArrayIndex]);
    }
  }

  function onSearch(word: string){
    Router.push("https://swaperest-mindswap.vercel.app/");
}


    return (<>
        <LoggedInHeader avatar={session.avatar} username={session.username} logout={logoutConfirm} onSearch={onSearch}/>
        <User avatar={avatar} username={username} tag={tag} followers={followers} created={created} saved={saved} following={following} album={changePins}/>
        <div className={styles.UserDetailedPins}>
        {pinsToShow.map(pin =>  
          <UserPagePin key={pin._id} id={pin._id}  url={pin.url} />
        )}
        </div>
        {logoutConfirmVisible ? <LogoutConfirm logoutCancel={logoutCancel}/> : null}
    </>)
}

const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { tag } = context.query;
    const { req } = context;
    
    const { db } = await connectToDatabase();

     const [user, session] = await Promise.all([ db.collection("users").findOne({tag : tag}) as Promise<DBUser>, 
      fetch("https://swaperest-mindswap.vercel.app/api/session", {
            headers: {
                cookie: req.headers.cookie
            } as HeadersInit
        }).then(res => res.json() as Promise<Session>)
    ]);
  

    return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
          session: session,
        }
      }
}

export{ getServerSideProps};
export default UserDetailed;