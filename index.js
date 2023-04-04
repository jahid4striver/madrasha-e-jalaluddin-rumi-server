const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        const subjectCollections = client.db('madrasha-e-rumi').collection('subjects');
        const qaCategoryCollections = client.db('madrasha-e-rumi').collection('qa_categories');
        const boyanCollections = client.db('madrasha-e-rumi').collection('boyans');
        const answerCollections = client.db('madrasha-e-rumi').collection('answers');
        const shortCollections = client.db('madrasha-e-rumi').collection('shorts');
        const kobitaCollections = client.db('madrasha-e-rumi').collection('kobitas');
        const liveCollections = client.db('madrasha-e-rumi').collection('islive');
        const latestCollections = client.db('madrasha-e-rumi').collection('latest');
        const queryCollections = client.db('madrasha-e-rumi').collection('querys');
        const userCollections = client.db('madrasha-e-rumi').collection('users');
        const noticeCollections = client.db('madrasha-e-rumi').collection('notices');
        const bookCollections = client.db('madrasha-e-rumi').collection('books');
        const recitationCollections = client.db('madrasha-e-rumi').collection('recitations');



        app.post('/categories', async (req, res) => {
            const category = req.body;
            const result = await categoryCollections.insertOne(category);
            res.send(result);
        });

        app.get('/getcategories', async (req, res) => {
            const result = await categoryCollections.find().toArray();
            res.send(result);
        });
        app.post('/addsubjects', async (req, res) => {
            const subject = req.body;
            const result = await subjectCollections.insertOne(subject);
            res.send(result);
        });

        app.get('/getsubjects', async (req, res) => {
            const result = await subjectCollections.find().toArray();
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
        app.put('/getboyans/:id', async (req, res) => {
            const id = req.params.id;
            const boyan = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: boyan
            }
            const updatedBoyan = await boyanCollections.updateOne(filter, updateDoc, options);
            res.send(updatedBoyan);
        })
        app.patch('/getboyans/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: update
            }
            const updatedBoyan = await boyanCollections.updateOne(filter, updateDoc);
            res.send(updatedBoyan);
        })

        app.delete('/getboyans/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await boyanCollections.deleteOne(filter);
            res.send(result);
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
        app.put('/getanswer/:id', async (req, res) => {
            const id = req.params.id;
            const boyan = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: boyan
            }
            const updatedBoyan = await answerCollections.updateOne(filter, updateDoc, options);
            res.send(updatedBoyan);
        })
        app.patch('/getanswer/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: update
            }
            const updatedAnswers = await answerCollections.updateOne(filter, updateDoc);
            res.send(updatedAnswers);
        })

        app.delete('/getanswer/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await answerCollections.deleteOne(filter);
            res.send(result);
        })

        app.post('/addkobita', async (req, res) => {
            const data = req.body;
            const result = await kobitaCollections.insertOne(data);
            res.send(result);
        });

        app.get('/getkobita', async (req, res) => {
            const result = await kobitaCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        })

        app.put('/getkobita/:id', async (req, res) => {
            const id = req.params.id;
            const boyan = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: boyan
            }
            const updatedBoyan = await kobitaCollections.updateOne(filter, updateDoc, options);
            res.send(updatedBoyan);
        })
        app.patch('/getkobita/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: update
            }
            const updatedKobita = await kobitaCollections.updateOne(filter, updateDoc);
            res.send(updatedKobita);
        })

        app.delete('/getkobita/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await kobitaCollections.deleteOne(filter);
            res.send(result);
        })
        app.post('/addshort', async (req, res) => {
            const data = req.body;
            const result = await shortCollections.insertOne(data);
            res.send(result);
        });

        app.get('/getshorts', async (req, res) => {
            const result = await shortCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        })

        app.put('/getshort/:id', async (req, res) => {
            const id = req.params.id;
            const short = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: short
            }
            const updatedShort = await shortCollections.updateOne(filter, updateDoc, options);
            res.send(updatedShort);
        })
        app.patch('/getshort/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: update
            }
            const updatedShort = await shortCollections.updateOne(filter, updateDoc);
            res.send(updatedShort);
        })

        app.delete('/getshort/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await shortCollections.deleteOne(filter);
            res.send(result);
        })

        app.get('/getlive', async (req, res) => {
            const result = await liveCollections.find().toArray();
            res.send(result);
        })

        app.put('/getlive/:id', async (req, res) => {
            const id = req.params.id;
            const live = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: live
            }
            const updatedLive = await liveCollections.updateOne(filter, updateDoc, options);
            res.send(updatedLive);
        })

        app.post('/latest', async (req, res) => {
            const latest = req.body;
            const result = await latestCollections.insertOne(latest);
            res.send(result);
        });

        app.get('/getlatest', async (req, res) => {
            const result = await latestCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        });
        app.post('/querys', async (req, res) => {
            const query = req.body;
            const result = await queryCollections.insertOne(query);
            res.send(result);
        });

        app.get('/getquerys', async (req, res) => {
            const result = await queryCollections.find().toArray();
            res.send(result);
        });
        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await userCollections.insertOne(users);
            res.send(result);
        });

        app.get('/getuser', async (req, res) => {
            const result = await userCollections.find().toArray();
            res.send(result);
        });
        app.post('/notices', async (req, res) => {
            const notices = req.body;
            const result = await noticeCollections.insertOne(notices);
            res.send(result);
        });

        app.get('/getnotices', async (req, res) => {
            const result = await noticeCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        });
        app.post('/books', async (req, res) => {
            const books = req.body;
            const result = await bookCollections.insertOne(books);
            res.send(result);
        });

        app.get('/getbooks', async (req, res) => {
            const result = await bookCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        });
        app.post('/recitation', async (req, res) => {
            const recitations = req.body;
            const result = await recitationCollections.insertOne(recitations);
            res.send(result);
        });

        app.get('/getrecitation', async (req, res) => {
            const result = await recitationCollections.find().sort({ $natural: -1 }).toArray();
            res.send(result);
        });

        app.put('/getrecitation/:id', async (req, res) => {
            const id = req.params.id;
            const recitation = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: recitation
            }
            const updatedRecitation = await recitationCollections.updateOne(filter, updateDoc, options);
            res.send(updatedRecitation);
        })
        app.patch('/getrecitation/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: update
            }
            const updatedRecitation = await recitationCollections.updateOne(filter, updateDoc);
            res.send(updatedRecitation);
        })

        app.delete('/getrecitation/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await recitationCollections.deleteOne(filter);
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