import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    let{dislikesCount, pinId, isDisliked} = req.body;

    let pinUpdated=null;
    
    if(!isDisliked){

      dislikesCount++;

        pinUpdated =  await db.collection("pins").updateOne(
        { _id: new ObjectId(pinId.toString())},
        { $set: { dislikesCount: dislikesCount}});
        
        
    }else{

      dislikesCount--;

        pinUpdated =  await db.collection("pins").updateOne(
        { _id: new ObjectId(pinId.toString())},
        { $set: { dislikesCount: dislikesCount}});
        
    }

    return res.status(200).json(pinUpdated);
  }
}