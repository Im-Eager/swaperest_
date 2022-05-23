import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";
import {DBUser, DBDetailedPinProps, DBComment } from "../../databaseTypes"

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
    const comments = await commentsCollection.find({pin: id}).toArray() as DBComment[];
    res.status(200).json(comments);
  }

}