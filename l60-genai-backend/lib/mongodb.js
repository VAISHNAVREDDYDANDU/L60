import { MongoClient } from 'mongodb';

// Fallback connection string if MONGO_URI is not set
const DEFAULT_MONGO_URI = 'mongodb+srv://vaishnavreddy120103_db_user:Lh6UMlwKVi4IKIEn@genaistats.r2qkxlf.mongodb.net/';
const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

if (!uri) {
  throw new Error('Please define the MONGO_URI environment variable inside .env or provide a default connection string');
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  if (!global._mongoClientPromise) {
    try {
      console.log('Creating new MongoDB connection...');
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    } catch (e) {
      console.error('MongoDB connection error:', e);
      throw new Error(`Failed to connect to MongoDB: ${e.message}`);
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, avoid using a global variable
  try {
    console.log('Creating production MongoDB connection...');
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  } catch (e) {
    console.error('MongoDB connection error:', e);
    throw new Error(`Failed to connect to MongoDB: ${e.message}`);
  }
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db();
    console.log('Successfully connected to MongoDB');
    return { client, db };
  } catch (e) {
    console.error('Error in connectToDatabase:', e);
    throw new Error(`Database connection failed: ${e.message}`);
  }
}
