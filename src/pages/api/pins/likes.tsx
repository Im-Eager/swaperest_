import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    let{likesCount, pinId, isLiked} = req.body;

    let pinUpdated=null;
    
    if(!isLiked){

      likesCount++;

        pinUpdated =  await db.collection("pins").updateOne(
        { _id: new ObjectId(pinId.toString())},
        { $set: { likesCount: likesCount}});
        
        
    }else{

      likesCount--;

        pinUpdated =  await db.collection("pins").updateOne(
        { _id: new ObjectId(pinId.toString())},
        { $set: { likesCount: likesCount}});
        
    }

    return res.status(200).json(pinUpdated);
  }
}