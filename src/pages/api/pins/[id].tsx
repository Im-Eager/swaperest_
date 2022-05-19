import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";
import { DBPin } from "../../databaseTypes"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { id } = req.query;

    const { db } = await connectToDatabase();
    
    if (req.method === "POST") {
    const gamesCollection = db.collection("comments");
    const result = await gamesCollection.insertOne(req.body);
    res.status(201).json({ message: "Data inserted successfully!" });
    }

    if (req.method === "GET"){
        const pinsCollection = db.collection("pins")
        const pin = await pinsCollection.findOne({"_id": new ObjectId(id.toString())}) as DBPin;
        res.json(pin);
  }

}