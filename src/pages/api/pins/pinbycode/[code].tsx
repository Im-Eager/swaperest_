import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../util/mongodb";
import { DBPin } from "../../../database.types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { code } = req.query;
  
  const [date, author] = code.toString().split(".");
  

  const { db } = await connectToDatabase();

    if (req.method === "GET"){
        const pinsCollection = db.collection("pins")
        const pin = await pinsCollection.findOne({date: Number(date), author: author}) as DBPin;

        if(!pin){
          return res.status(403).end;
        }

        return res.status(200).json({id: pin._id});
        
  }

}