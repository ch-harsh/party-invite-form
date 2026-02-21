import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await client.connect();
    const db = client.db("partyDB");
    const collection = db.collection("invitations");

    await collection.insertOne({
      name: body.name,
      email: body.email,
      phone: body.phone,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Saved successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error saving data" },
      { status: 500 }
    );
  }
}