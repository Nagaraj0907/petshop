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
        { name: 'Golden Retriever', price: 300, img: '/images/golden.jpg' },
        { name: 'Labrador', price: 350, img: '/images/labrador.jpg' },
        { name: 'Poodle', price: 400, img: '/images/poodle.jpg' },
        // Add more breeds...
    ],
    cats: [
        { name: 'Persian', price: 200, img: '/images/persian.jpg' },
        { name: 'Maine Coon', price: 250, img: '/images/mainecoon.jpg' },
        { name: 'Bengal', price: 300, img: '/images/bengal.jpg' },
        // Add more breeds...
    ],
    others: [
        { name: 'Parrot', price: 150, img: '/images/parrot.jpg' },
        { name: 'Rabbit', price: 100, img: '/images/rabbit.jpg' },
        { name: 'Hamster', price: 80, img: '/images/hamster.jpg' },
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
