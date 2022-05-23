import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    const{userId, pinId, isDisliked} = req.body;

    let userUpdated=null;
    
    if(!isDisliked){
        userUpdated =  await db.collection("users").updateOne(
        { _id: new ObjectId(userId.toString())},
        {
        $push: { dislikesGiven: pinId.toString() }
        })
    }else{
        userUpdated =  await db.collection("users").updateOne(
        { _id: new ObjectId(userId.toString())},
        {
        $pull: { dislikesGiven: pinId.toString() }
        })
    }

    return res.status(200).json(userUpdated);
  }
}