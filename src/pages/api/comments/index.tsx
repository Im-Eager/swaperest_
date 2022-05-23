import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { db } = await connectToDatabase();
    

  if (req.method === "GET"){
    const commentsCollection = db.collection("comments")
    const findResult = await commentsCollection.find({}).toArray();

    return res.status(200).json(findResult);
  }

  if (req.method === "POST") {

    const commentsCollection = db.collection("comments");
    await commentsCollection.insertOne(req.body);
    return res.status(201).json(req.body);
}

}