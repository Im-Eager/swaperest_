import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { db } = await connectToDatabase();

  if (req.method === "PUT") {
    const{userId, pinAuthorId, isFollowing} = req.body;

    let userUpdated=null;
    let authorUpdated=null;
    
    if(!isFollowing){

        userUpdated =  await db.collection("users").updateOne(
        { _id: new ObjectId(userId.toString())},
        {
        $push: { following: pinAuthorId.toString() }
        });

        authorUpdated =  await db.collection("users").updateOne(
        { _id: new ObjectId(pinAuthorId.toString())},
        {
        $push: { followers: userId.toString() }
        });

    }else{
        userUpdated =  await db.collection("users").updateOne(
        { _id: new ObjectId(userId.toString())},
        {
        $pull: { following: pinAuthorId.toString() }
        });
        
        authorUpdated =  await db.collection("users").updateOne(
        { _id: new ObjectId(pinAuthorId.toString())},
        {
        $pull: { followers: userId.toString() }
        })
    }

    return res.status(200).json([userUpdated, authorUpdated]);
  }
}