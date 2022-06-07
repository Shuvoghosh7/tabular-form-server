const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json()) //use to get data req.body


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e7zdr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const personalDetailsCollection = client.db('applicationProcess').collection('personalDetails');
        console.log("i amm conn")

        app.get('/get-personalDetails', async (req, res) => {
            const query = {};
            const cursor = personalDetailsCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        // add persona lDetails
        app.post('/add-personalDetails', async (req, res) => {
            const parts = req.body
            const result = await personalDetailsCollection.insertOne(parts)
            res.send(result)
        });
    }
    finally {

    }

}
run().catch(console.dir)






//Get  
app.get('/', (req, res) => {
    res.send('running genuse server')
})

//Listen Port
app.listen(port, () => {
    console.log('lising the port', port)
})
