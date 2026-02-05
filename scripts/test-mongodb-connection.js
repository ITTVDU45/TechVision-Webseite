import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually read .env.local to avoid dependency issues
const envPath = path.resolve(__dirname, '../.env.local');
let uri = '';

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.*)$/m);
    if (match) {
        uri = match[1].trim();
        // Try encoding the password part if it contains $
        if (uri.includes('$')) {
            console.log("Password contains '$', attempting to encode it...");
            const parts = uri.match(/^(mongodb\+srv:\/\/)([^:]+):([^@]+)(@.*)$/);
            if (parts) {
                const protocol = parts[1];
                const user = parts[2];
                const pass = parts[3];
                const rest = parts[4];
                uri = `${protocol}${user}:${encodeURIComponent(pass)}${rest}`;
            }
        }
    }
}

if (!uri) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
}

// Check for special characters in password that might need encoding
// Atlas URIs usually look like mongodb+srv://user:pass@host/
console.log("Testing connection to MongoDB...");
// Mask the password for safety
const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
console.log(`URI: ${maskedUri}`);

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    connectTimeoutMS: 10000,
    tlsAllowInvalidCertificates: false // Keep it secure by default
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
