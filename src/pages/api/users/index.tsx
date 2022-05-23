import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

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
  likesGiven: string[];
  dislikesGiven: string[];
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
        avatar,
        password,
        tag: tag,
        saved: [] as string[],
        created: [] as string[],
        followers: [] as string[],
        following: [] as string[],
        likesGiven: [] as string[],
        dislikesGiven: [] as string[],
      }
      await usersCollection.insertOne(newUser);
      return res.status(201).json(newUser);
  }

  if (req.method === "GET"){
    const usersCollection = db.collection("users")
    const findResult = await usersCollection.find({}).toArray();
    return res.status(200).json(findResult);
    
  }

  if (req.method === "PUT") {

    const{pinId, authorId} = req.body;

    const userUpdated =  await db.collection("users").updateOne(
      { _id: new ObjectId(authorId.toString())},
      {
      $push: { created: pinId.toString() }
    })

    return res.status(200).json(userUpdated);
  }
}