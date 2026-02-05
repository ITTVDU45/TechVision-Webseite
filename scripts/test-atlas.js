import dns from 'dns';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Techvision:%248EVge%24b6gyX64z@techvision.abbybzn.mongodb.net/";

async function test() {
    console.log("Checking DNS for Atlas...");
    try {
        const records = await dns.promises.resolveSrv('_mongodb._tcp.techvision.abbybzn.mongodb.net');
        console.log("SRV Records found:", records.length);
    } catch (e) {
        console.error("DNS Resolution failed:", e.message);
    }

    console.log("\nAttempting connection with encoded password...");
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
    });

    try {
        await client.connect();
        console.log("SUCCESS: Connected to MongoDB!");
        await client.db("admin").command({ ping: 1 });
        console.log("SUCCESS: Pinged admin db!");
    } catch (e) {
        console.error("FAILURE: Connection failed");
        console.error("Error Name:", e.name);
        console.error("Error Message:", e.message);
        if (e.message.includes('alert number 80')) {
            console.log("\nTIP: SSL Alert 80 usually means your IP address is NOT whitelisted in MongoDB Atlas.");
        }
    } finally {
        await client.close();
    }
}

test();
