const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json()) //use to get data req.body



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e7zdr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const personalDetailsCollection = client.db('applicationProcess').collection('personalDetails');
        const businessDetailsCollection = client.db('applicationProcess').collection('businessDetails');
        const loanDetailsCollection = client.db('applicationProcess').collection('loanDetails');

        //get personal Details
        app.get('/get-personalDetails', async (req, res) => {
            const query = {};
            const cursor = personalDetailsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // add personal Details
        app.post('/add-personalDetails', async (req, res) => {
            const information = req.body
            const result = await personalDetailsCollection.insertOne(information)
            res.send(result)
        });
        // Delete personal Details
        app.delete('/delete-personalDetails/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await personalDetailsCollection.deleteOne(query)
            res.send(result)
        })
        //get Business details
        app.get('/get-Businessdetails', async (req, res) => {
            const query = {};
            const cursor = businessDetailsCollection.find(query);
            const Businessdetails = await cursor.toArray();
            res.send(Businessdetails);
        })
        // add Business Details
        app.post('/add-Businessdetails', async (req, res) => {
            const information = req.body
            const result = await businessDetailsCollection.insertOne(information)
            res.send(result)
        });
        // Delete Business Details
        app.delete('/delete-Businessdetails/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await businessDetailsCollection.deleteOne(query)
            res.send(result)
        })
        //get Loan Application details 
        app.get('/get-LoanDetails', async (req, res) => {
            const query = {};
            const cursor = loanDetailsCollection.find(query);
            const LoanDetails = await cursor.toArray();
            res.send(LoanDetails);
        })
        // add Loan Application details
        app.post('/add-LoanDetails', async (req, res) => {
            const information = req.body
            const result = await loanDetailsCollection.insertOne(information)
            res.send(result)
        });
        // Delete Business Details
        app.delete('/delete-LoanDetails/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await loanDetailsCollection.deleteOne(query)
            res.send(result)
        })
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
