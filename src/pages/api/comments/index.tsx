import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { db } = await connectToDatabase();
    

  if (req.method === "GET"){
    const editionsCollection = db.collection("comments")
    const findResult = await editionsCollection.find({}).toArray();
    return res.json(findResult);
  }

}