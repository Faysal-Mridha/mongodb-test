const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const bodyparser = require('body-parser');
const env = require('dotenv').config();


const app = express();

// TODO this is also work but try to body-paser
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// ?for the body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// TODO for intialization the static folder
app.use(express.static(__dirname + '/public'));


// ?mongodb information
const uri = "mongodb+srv://faysal:faysal111@cluster0.xtvu2.mongodb.net/first?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// TODO home route
app.get('/', (req, res) => {
    console.log(process.env.API_KEY)
    res.sendFile(__dirname+"/index.html");
})

// ! mongodb connection

client.connect((err) => {
    const collection = client.db('first').collection('fm');

    console.log("Database Connected");

    // ? add data to the mongodb collection
    app.post('/addproduct', (req, res) => {
        const product = req.body;
        collection.insertOne(product)
            .then((result) => {
                console.log("Data will be inserted successfully")
                res.redirect('/');
            })
            .catch(err => console.log('there was an error'));

    });


    // ? show data to the mongodb Database
    app.get('/products', (req, res) => {
        collection.find({}).toArray((err, product) => {
            res.send(product)
        })

    });

    // ? get the single data to the mongodb Database
    app.get('/product/:id', (req, res) => {
        collection.find({ _id: ObjectId(req.params.id) }).toArray((err, product) => {
            res.send(product[0])
        })

    });


    // ? mongodb databse data update
    app.patch('/product/:id', (req, res) => {
        const product = req.body;

        collection.updateOne({ _id: ObjectId(req.params.id) }, {
            $set:{name:product.name,email:product.email,age:product.age,password:product.password}
        })
        .then((result) => {
            console.log(result);
            res.send(result.modifiedCount > 0);
        })
        .catch(err => console.log("There was an error"))

    });

    // TODO this is for the delete
    app.delete('/product/:id', (req, res) => {
        collection.deleteOne({ _id: ObjectId(req.params.id )})
        .then((result) => {
            console.log("Data Deleted");
            res.send(result.deletedCount > 0);
        })
    });


})




app.listen(3001,()=> console.log('Server Running'))