const express = require('express');
const app = express();
const cors = require('cors');
const { config } = require('dotenv');
require('dotenv').config();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ej6qyrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const bikeCollection = client.db('bike-hub').collection('bikes');

    // Endpoint to get bikes with search, filter, and sort options
    app.get('/bikes', async (req, res) => {
        const { searchTerm, brand, category, priceRange, sortOrder, page = 1, limit = 6 } = req.query;
    
        const query = {};
    
        // Searching
        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' };
        }
    
        // Filtering by brand
        if (brand) {
            query.brand = brand;
        }
    
        // Filtering by category
        if (category) {
            query.category = category;
        }
    
        // Filtering by price range
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                query.price = { $gte: minPrice, $lte: maxPrice };
            }
        }
    
        const options = {};
    
        // Sorting
        if (sortOrder) {
            if (sortOrder === "low-to-high") {
                options.sort = { price: 1 };
            } else if (sortOrder === "high-to-low") {
                options.sort = { price: -1 };
            } else if (sortOrder === "newest-first") {
                options.sort = { product_creation_date: -1 };
            }
        }
    
        // Pagination
        
    });
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Bike Shop is Running');
});

app.listen(port, () => {
    console.log(`Bike Shop is Running at ${port}`);
});
