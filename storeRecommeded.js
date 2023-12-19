require('dotenv').config({ path: `.env.local` })  // to read .env.local variables
const SongsCollection = require('./models/song-model')
const data = require('./Data/data')
const connectDB = require('./database/connect')


store();

async function store() {
    try {
        await connectDB(process.env.MONGO_URI);
        await SongsCollection.deleteMany();
        await SongsCollection.create(data);
        process.exit(1);
    } catch (e) {
        console.log(e);
    }
}

