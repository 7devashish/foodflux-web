// 1. Import your exact Mongoose Model
const SurplusPost = require('../models/SurplusPost');

// 2. The POST function (Saves the food)
const createPost = async (req, res) => {
    try {
        const { foodName, quantity, location, pickupDeadline } = req.body;

        const newFood = new SurplusPost({
            foodName,
            quantity,
            location,
            pickupDeadline,
            catererId: req.user.id // Injects the logged-in Caterer's ID
        });

        await newFood.save();
        res.status(201).json({ message: 'Food posted successfully!' });
    } catch (error) {
        console.error("Create Post Error:", error.message);
        res.status(500).json({ message: 'Server error while posting food' });
    }
};

// 3. The GET function (Fetches the food for the NGO Dashboard)
const getAvailableFood = async (req, res) => {
    try {
        console.log("🚨 [BACKEND] Someone asked for food! Checking database...");
        const allFood = await SurplusPost.find().sort({ createdAt: -1 });
        
        console.log(`🚨 [BACKEND] Found ${allFood.length} items in the database!`);
        res.status(200).json(allFood);
    } catch (error) {
        console.error("🚨 [BACKEND ERROR]:", error.message);
        res.status(500).json({ message: 'Server error while fetching food' });
    }
};

// 4. Export the functions so the router can use them
module.exports = {
    createPost,
    getAvailableFood
};