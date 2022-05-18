import { useState } from "react";
import { Header } from "../components/Header";
import { Pin, PinProps} from "../components/Pin";
import { connectToDatabase,  } from "../../util/mongodb";


interface DBPin{
  _id: string;
  title: string;
  url: string;
  author: string;
  commentsCount: number;
  date: number;
  likesCount: number;
  dislikesCount: number;
}

interface DBUser{
  _id: string;
  username: string;
  email: string;
  saved: string[];
  created: string[];
  followers: string[];
  avatar: string;
  password: string;
}

interface HomepageProps{
  pinsArray: PinProps[];
}

function Homepage(props: HomepageProps) {
  const {pinsArray} = props;

  const [pins, setPins] = useState(pinsArray);

  return (
    <>
  
      <Header />
      <main>
        {pins.map(pin =>  
<Pin key={pin._id} _id={pin._id} title={pin.title} url={pin.url} author={pin.author} commentsCount= {pin.commentsCount} date={pin.date}
          likesCount={pin.likesCount} dislikesCount={pin.dislikesCount} />
)}
      </main>
    </>
  );
}

async function getServerSideProps() {

  const { db } = await connectToDatabase();
  


  const[pins, users] = await Promise.all([ 
    db.collection("pins").find({}).toArray() as Promise<DBPin[]>, 
    db.collection("users").find({}).toArray() as Promise<DBUser[]>]);
    
    const randomPositionedPins=pins.sort((a, b) => 0.5 - Math.random())

    const userById: Record<string, DBUser> = {};
    for(const user of users){
      userById[user._id]= user;    }

    const pinsWithUsername = randomPositionedPins.map( pin => ({...pin, author: { id: pin.author, username: userById[pin.author].username}}));

    return {
    props: {
      pinsArray: JSON.parse(JSON.stringify(pinsWithUsername)),
    },
  };
}



export default Homepage;
export { getServerSideProps };  
export type { DBPin, DBUser };

