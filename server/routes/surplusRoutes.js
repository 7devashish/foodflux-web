const express = require('express');
const router = express.Router();
const { createPost, getAvailableFood } = require('../controllers/surplusController');
const { protect } = require('../middleware/authMiddleware');

// 🚨 IMPORT YOUR MODEL HERE! Make sure the path matches your folder structure.
const SurplusPost = require('../models/SurplusPost'); 

// Route: POST /api/surplus (Requires login)
router.post('/', protect, createPost);

// Route: GET /api/surplus (Public - NGOs can view available food)
router.get('/', getAvailableFood);

// DELETE API: Claim (remove) a food item
// Added 'protect' so only logged-in users can delete
router.delete('/:id', protect, async (req, res) => {
    try {
        const foodId = req.params.id;
        
        // Swapped to 'SurplusPost' to match your imported model!
        const deletedFood = await SurplusPost.findByIdAndDelete(foodId);
        
        if (!deletedFood) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        
        res.status(200).json({ message: 'Food claimed successfully!' });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: 'Server error while claiming food' });
    }
});

module.exports = router;