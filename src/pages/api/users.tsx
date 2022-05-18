import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();
    
    if (req.method === "POST") {
    const gamesCollection = db.collection("users");
    const result = await gamesCollection.insertOne(req.body);
    res.status(201).json({ message: "Data inserted successfully!" });
  }

  if (req.method === "GET"){
    const editionsCollection = db.collection("users")
    const findResult = await editionsCollection.find({}).toArray();
    return res.json(findResult);
    
  }

}