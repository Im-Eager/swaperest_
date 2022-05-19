import { User } from "../../components/User/User";
import { Header } from "../../components/Header/Header";
import {connectToDatabase} from "../../../util/mongodb"
import { GetServerSideProps } from "next";
import { DBUser, DBPin } from "../database.types"
import styles from "./User.module.css";
import { UserPagePin } from "../../components/UserPagePin/UserPagePin"
import { useState } from "react";

function UserDetailed(props: DBUser) {

    const {avatar, username, tag, saved, created, followers, following} = props;
    
    const [pins, setPins] = useState([[],[]] as DBPin[][])
    const [pinsAreLoaded, setPinsAreLoaded] = useState(false);
    const [pinsToShow, setPinsToShow] = useState([] as DBPin[])

    async function getUserPins(createdPinsIdArray: string[], savedPinsIdArray: string[]){
        
        const createdPromisesArray = createdPinsIdArray.map(pinId => fetch(`http://localhost:3000/api/pins/${pinId}`, {
            method: "GET",
            headers: 
        {
          "Content-Type": 
          "application/json",
        },
          })
        );

        const savedPromisesArray = savedPinsIdArray.map(pinId => fetch(`http://localhost:3000/api/pins/${pinId}`, {
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


    function changePins(pinsArrayIndex: number){
      if (pinsArrayIndex === 2){
        setPinsToShow([])
      } else {
        setPinsToShow(pins[pinsArrayIndex]);
      }
    }


    return (<>
        <Header />
        <User avatar={avatar} username={username} tag={tag} followers={followers} created={created} saved={saved} following={following} album={changePins}/>
        <div className={styles.UserDetailedPins}>
        {pinsToShow.map(pin =>  
          <UserPagePin key={pin._id} id={pin._id}  url={pin.url} />
        )}
        </div>
    </>)
}

const getServerSideProps: GetServerSideProps = async (context) => {

    const {tag} = context.params;
    
    const { db } = await connectToDatabase();

     const users = await  db.collection("users").find({tag : tag}).toArray() as DBUser[]; 

    return {
        props: JSON.parse(JSON.stringify(users[0]))}

}

export{ getServerSideProps};
export default UserDetailed;