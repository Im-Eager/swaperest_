import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../util/mongodb";
import { DBPin } from "../../../database.types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { code } = req.query;
  
  const [date, author] = code.toString().split(".");
  

  const { db } = await connectToDatabase();

    if (req.method === "GET"){
        const commentsCollection = db.collection("comments")
        const comment = await commentsCollection.findOne({date: Number(date), author: author}) as DBPin;

        if(!comment){
          return res.status(403).end;
        }

        return res.status(200).json({id: comment._id});
        
  }

}