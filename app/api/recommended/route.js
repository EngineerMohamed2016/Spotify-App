require('dotenv').config({ path: `.env.local` })  // to read .env.local variables
const SongsCollection = require('../../../models/song-model')
const connectDB = require('../../../database/connect')
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const recommendedSongs = await SongsCollection.find().sort('index');
    return new NextResponse(JSON.stringify(recommendedSongs), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 404 });
  }
};