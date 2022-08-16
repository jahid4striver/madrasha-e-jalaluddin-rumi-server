const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

//adminMadrasha
//0cORHcsv5Kk8b4YH


const uri = "mongodb+srv://adminMadrasha:0cORHcsv5Kk8b4YH@cluster0.z45x8ly.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        await client.connect();
        const categoryCollections = client.db('madrasha-e-rumi').collection('categories');
        const qaCategoryCollections = client.db('madrasha-e-rumi').collection('qa_categories');
        const boyanCollections = client.db('madrasha-e-rumi').collection('boyans');
        const answerCollections = client.db('madrasha-e-rumi').collection('answers');



        app.post('/categories', async (req, res) => {
            const category = req.body;
            const result = await categoryCollections.insertOne(category);
            res.send(result);
        });

        app.get('/getcategories', async (req, res) => {
            const result = await categoryCollections.find().toArray();
            res.send(result);
        });


        app.post('/qa_categories', async (req, res) => {
            const category = req.body;
            const result = await qaCategoryCollections.insertOne(category);
            res.send(result);
        });

        app.get('/get_qa_categories', async (req, res) => {
            const result = await qaCategoryCollections.find().toArray();
            res.send(result);
        });

        app.post('/addboyans', async (req, res) => {
            const data = req.body;
            const result = await boyanCollections.insertOne(data);
            res.send(result);
        });

        app.get('/gethomeboyans', async (req, res) => {
            const result = await boyanCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        })
        app.get('/getboyans', async (req, res) => {
            console.log(req.query);
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = boyanCollections.find(query).sort({ $natural: -1 });

            let boyans;
            if (page || size) {
                boyans = await cursor.skip(page * size).limit(size).toArray()
            } else {
                boyans = await cursor.toArray()
            }
            res.send(boyans);
        })
        app.post('/addanswer', async (req, res) => {
            const data = req.body;
            const result = await answerCollections.insertOne(data);
            res.send(result);
        });

        app.get('/getanswer', async (req, res) => {
            const result = await answerCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        })






        console.log('MongoDB Connected');

    } finally {

    }




}

run().catch(console.dir);









app.get('/', (req, res) => {
    res.send('Madrasha-e-jalaluddin-rumi-server-running')
});

app.listen(port, () => {
    console.log('listening to port', port);
})