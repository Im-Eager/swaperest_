import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    const{userId, pinId, isSaved} = req.body;

    let userUpdated=null;
    
    if(!isSaved){
        userUpdated =  await db.collection("users").updateOne(
        { _id: new ObjectId(userId.toString())},
        {
        $push: { saved: pinId.toString() }
        })
    }else{
        userUpdated =  await db.collection("users").updateOne(
            { _id: new ObjectId(userId.toString())},
            {
            $pull: { saved: pinId.toString() }
            })
    }

    return res.status(200).json(userUpdated);
  }
}