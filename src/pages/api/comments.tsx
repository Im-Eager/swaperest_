import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  
    const { db } = await connectToDatabase();
    
    if (req.method === "comments") {
    const gamesCollection = db.collection("pins");
    const result = await gamesCollection.insertOne(req.body);
    res.status(201).json({ message: "Data inserted successfully!" });
  }

  if (req.method === "GET"){
    const editionsCollection = db.collection("comments")
    const findResult = await editionsCollection.find({}).toArray();
    return res.json(findResult);
    
  }

}