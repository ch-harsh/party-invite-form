import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to environment variables");
}

// Global is used to maintain cached connection in dev
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof global & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("partyDB");
    const collection = db.collection("invitations");

    await collection.insertOne({
      name: body.name,
      email: body.email,
      phone: body.phone,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Mongo Error:", error);

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}