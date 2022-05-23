import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import { DBUser} from "../database.types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const email = req.cookies.token;
    const password = req.cookies.token2;
    
    if(!email){
        return res.status(200).json({
            _id: null,
    });
    }

    const { db } = await connectToDatabase();
    
    if (req.method === "GET"){
        const usersCollection = db.collection("users")
        const user = await usersCollection.findOne({email: email}) as DBUser;


    if (!password){
        if(user){
            return res.status(200).json(user);
        }else{
            return res.status(200).json({
                _id: "unknown",
        }); 
        }
    }else{
        if(!user){
            return res.status(200).json({
                    _id: "unknown",
            });
        }else if(user && password!==user.password){
            return res.status(200).json({
                _id: "unknown",
        });
        }else{
            return res.status(200).json(user);
        }
    }
  
    }

}