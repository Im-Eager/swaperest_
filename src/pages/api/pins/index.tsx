import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();
    
    if (req.method === "POST") {

      const pinsCollection = db.collection("pins");
      await pinsCollection.insertOne(req.body);
      res.status(201).send(req.body);
  }

  if (req.method === "GET"){
    const pinsCollection = db.collection("pins")
    const findResult = await pinsCollection.find({}).toArray();
    return res.json(findResult);
  }

  if (req.method === "PUT") {

    const{pinId, commentId} = req.body;

    const pinUpdated =  await db.collection("pins").updateOne(
      { _id: new ObjectId(pinId.toString())},
      {
      $push: { comments: commentId.toString() }
    })

    res.status(200).send(pinUpdated);
}

}

