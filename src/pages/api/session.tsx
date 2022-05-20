import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import { DBUser} from "../database.types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const email = req.cookies.token;

    const { db } = await connectToDatabase();
    
    if (req.method === "GET"){
        const editionsCollection = db.collection("users")
        const user = await editionsCollection.findOne({email: email}) as DBUser;

        
        if(!user){
            res.status(403).end;
        }

        res.status(200).json(user);
    }

}