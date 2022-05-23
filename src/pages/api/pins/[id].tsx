import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";
import { DBPin } from "../../database.types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { id } = req.query;

    const { db } = await connectToDatabase();

    if (req.method === "GET"){
        const pinsCollection = db.collection("pins")
        const pin = await pinsCollection.findOne({_id: new ObjectId(id.toString())}) as DBPin;
        return res.status(200).json(pin);
  }

}