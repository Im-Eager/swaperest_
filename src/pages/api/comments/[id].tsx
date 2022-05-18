import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";
import {DBUser} from "../../index"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { id } = req.query;

    const { db } = await connectToDatabase();
    
    if (req.method === "POST") {
    const gamesCollection = db.collection("comments");
    const result = await gamesCollection.insertOne(req.body);
    res.status(201).json({ message: "Data inserted successfully!" });
  }

  if (req.method === "GET"){
    const commentsCollection = db.collection("comments")
    const comments = await commentsCollection.find({"pin": id}).toArray();

    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();

    const userById: Record<string, DBUser> = {};
    for(const user of users){
      userById[user._id]= user;    }

    const commentsWithUser = comments.map( comment => ({...comment, author: { id: comment.user, username: userById[comment.user].username, avatar:userById[comment.user].avatar}}));

    res.json(commentsWithUser);
  }

}