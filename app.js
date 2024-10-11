const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // To serve static files
app.set('view engine', 'ejs');

let cart = []; // Cart to store selected products

// Product Data (10 breeds each for Dogs, Cats, and Other Pets)
const products = {
    dogs: [
        { name: 'Golden Retriever', price: 300, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKDq2mDB0J0ZuYh07KSScwHBIM7VV01BHmoA&s' },
        { name: 'Labrador', price: 350, img: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2020/09/08092713/Labrador-Retriever-puppies-laying-in-a-bed-of-straw.jpg' },
        { name: 'Poodle', price: 400, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnrb9AqOvswNKbJtyPlKQgTo2xax83yi1yEw&s' },
        // Add more breeds...
    ],
    cats: [
        { name: 'Persian', price: 200, img: 'https://hankpets.com/wp-content/uploads/2024/06/Everything-You-Need-to-Know-About-Persian-Cats.jpg' },
        { name: 'Maine Coon', price: 250, img: 'https://i.redd.it/ujrudh86n8sb1.jpg' },
        { name: 'Bengal', price: 300, img: 'https://scx2.b-cdn.net/gfx/news/hires/2024/how-wild-is-the-bengal.jpg' },
        // Add more breeds...
    ],
    others: [
        { name: 'Parrot', price: 150, img: 'https://images.news18.com/ibnlive/uploads/2024/03/image-2024-03-08t173905.064-2024-03-9ed27601c0395e917b145535340d7c5b.jpg' },
        { name: 'Rabbit', price: 100, img: 'https://static.vecteezy.com/system/resources/thumbnails/023/595/164/small_2x/rabbit-in-the-forest-at-sunset-animal-in-nature-easter-bunny-wildlife-scene-generative-ai-photo.jpg' },
        { name: 'Hamster', price: 80, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEQTMHbvi1QPnTg48BksLFzq2vTj0RoXeFA&s' },
        // Add more...
    ]
};

// Route for Homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Route for Products Page
app.get('/products', (req, res) => {
    res.render('products', { products });
});

// Route to add to cart
app.post('/add-to-cart', (req, res) => {
    const { category, index } = req.body;
    const product = products[category][index];
    cart.push(product);
    res.redirect('/cart');
});

// Route for Cart
app.get('/cart', (req, res) => {
    res.render('cart', { cart });
});

// Remove item from cart
app.post('/remove-from-cart', (req, res) => {
    const index = req.body.index;
    cart.splice(index, 1);  // Remove the item from cart
    res.redirect('/cart');
});

// Route for Checkout
app.get('/checkout', (req, res) => {
    res.render('checkout', { cart });
});

// Confirm Order (reset cart and go to homepage)
app.post('/confirm-order', (req, res) => {
    cart = []; // Clear the cart
    res.redirect('/');
});

// Start the Server
app.listen(3001, () => {
    console.log('Pet Shop running on port 3001');
});
