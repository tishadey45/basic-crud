require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
// mongodb te connect korar jonno ******
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d2ts7wd.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB 🚀",
    );
    const db = client.db("basicCrudDB");
    const productsCollection = db.collection("products");

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      // res.send("product paici😎")
      const result = await productsCollection.insertOne(newProduct)
      res.send(result)
    });

    app.get("/products",async(req,res)=>{
     const cursor =await productsCollection.find().toArray()
     res.send(cursor) 
    })
  } finally {
  }
}
run().catch(console.dir);
// mongodb connect kora ses ********

app.get("/", (req, res) => {
  res.send("Basic CRUD server is running");
});

app.listen(port, () => {
  console.log(`Basic CRUD app listening on port ${port}`);
});
