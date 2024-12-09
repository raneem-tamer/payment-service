const express = require('express');
const app = express();
const port = 3003;

// Middleware to parse JSON bodies
app.use(express.json());

const payments = [
    { orderId: 1, status: 'Paid' },
    { orderId: 2, status: 'Pending' }
];

// Get payment status by order ID
app.get('/payments/:orderId', (req, res) => {
    const payment = payments.find(p => p.orderId === parseInt(req.params.orderId));
    if (!payment) {
        return res.status(404).send('Payment not found');
    }
    res.json(payment);
});

// Create a payment
app.post('/payments', (req, res) => {
    const payment = req.body;
    
    // Validate that orderId and status are present
    if (!payment.orderId || !payment.status) {
        return res.status(400).send('Order ID and status are required');
    }

    // Check if payment already exists
    const existingPayment = payments.find(p => p.orderId === payment.orderId);
    if (existingPayment) {
        return res.status(400).send('Payment for this order ID already exists');
    }

    payments.push(payment);
    res.status(201).json(payment);
});

// Handle other routes or root
app.get('/', (req, res) => {
    res.send('Welcome to the Payment Service');
});

app.listen(port, () => {
    console.log(`Payment service running on http://localhost:${port}`);
});
