import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

interface newUserToDB{
  username: string;
  email: string;
  saved: string[];
  created: string[];
  followers: string[];
  avatar: string;
  password: string;
  tag: string;
  following: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();
    
    if (req.method === "POST") {
      const{email, username, avatar, password} = req.body;

    
      const usersCollection = db.collection("users");
      const tag = username.toLowerCase();

      const newUser: newUserToDB = {
        username,
        email,
        saved: [],
        created: [],
        followers: [],
        avatar,
        password,
        tag: tag,
        following: []
      }
    



    const result = await usersCollection.insertOne(newUser);
    res.status(201).send(newUser);
  }

  if (req.method === "GET"){
    const usersCollection = db.collection("users")
    const findResult = await usersCollection.find({}).toArray();
    return res.json(findResult);
    
  }

}