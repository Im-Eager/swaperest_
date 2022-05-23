import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";
import { DBComment } from "../../database.types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { id } = req.query;

    const { db } = await connectToDatabase();
    
    if (req.method === "POST") {
    const gamesCollection = db.collection("comments");
    const result = await gamesCollection.insertOne(req.body) as DBComment;
    return res.status(201).json(result);
  }

  if (req.method === "GET"){
    const commentsCollection = db.collection("comments")
    const comments = await commentsCollection.find({pin: id}).toArray() as DBComment[];
    return res.status(200).json(comments);
  }

}