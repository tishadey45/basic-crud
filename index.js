require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
// mongodb te connect korar jonno ******
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

    app.post("/product", async (req, res) => {
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

    
    app.get("/product/:id",async(req,res)=>{
       const id = req.params.id
       console.log(id);
       const query = {_id : new ObjectId(id)}
       const result = await productsCollection.findOne(query)
       res.send(result)
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


// API Endpoints

// 1. GET :  / -----------> for Server Test
// 2. POST : /product ---------------> for create a product
// 3. GET :  /products ----------------------> for get all products
// 4. GET Single Product :  /product/:id --------------> for get a single product
// 5. PUT :  /product/:id ----------------> for update a product
// 6. PATCH :  /product/:id ----------------> for update a product
// 6. DELETE :  /product/:id ------------> for delete a product

// ----------------------------------------------------

//  7. GET : /products/:email     ---------------> for get all products created by a specific user
//  8. POST : /order ---------------> for create a order
//  9. GET :  /my-order/:email   ----------------------> for get all orders of a specific user
// 10. GET : /order-requests/:email ---------------> for get all order requests of a specific user
// 11. PATCH : /order/:id ----------------> for update a order status



// -----------------------------------------------
//  Pagination,Sort,Filter,Search



// ========================================================================


// JWT token Generate from Terminal
// ----->  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

// ==========================================================================



