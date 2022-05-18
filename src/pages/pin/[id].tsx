import {PinProps} from "../../components/Pin/Pin";
import { connectToDatabase } from "../../../util/mongodb";
import {DBUser, DBPin} from "../index"
import { GetServerSideProps } from "next/types";
import { ObjectId } from "bson";
import { Header } from "../../components/Header/Header";
import {DetailedPinComponent} from "../../components/DetailedPin"

interface DetailedPinProps {
    _id: string;
    url: string;
    title: string;
    author: {
        username: string;
        followers: number[];
        avatar: string;
    }
    likesCount: number;
    dislikesCount: number;
    comments: string[];
}

interface DetailedPin {
    pin: DetailedPinProps;
}

function DetailedPin(props: DetailedPin){
    const {_id, url, author, title, likesCount, dislikesCount, comments} = props.pin;
return <>
    <Header />
    <DetailedPinComponent id={_id} url={url} title={title} avatar={author.avatar} username={author.username} followers={author.followers} likes={likesCount} dislikes={dislikesCount} comments={comments}/>
</>
}


const getServerSideProps: GetServerSideProps = async (context) => {

    const {id} = context.params;
    
    const { db } = await connectToDatabase();

  const[pins, users] = await Promise.all([ 
    db.collection("pins").find({_id : new ObjectId(id.toString())}).toArray() as Promise<DBPin[]>, 
    db.collection("users").find({}).toArray() as Promise<DBUser[]>]);
    
    const userById: Record<string, DBUser> = {};
    for(const user of users){
      userById[user._id]= user;    
    }

    if (pins.length<1){
        return {
            props: {_id: null}
        }
    }

    const pin = {
        ...pins[0],
        author: {
            id: pins[0].author,
            username: userById[pins[0].author].username,
            avatar: userById[pins[0].author].avatar,
            followers:  userById[pins[0].author].followers
        }
    }

    return {
        props: {
            pin: JSON.parse(JSON.stringify(pin))},
    }

}

export default DetailedPin;
export{ getServerSideProps};