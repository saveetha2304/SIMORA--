const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("products")
            .select("*");

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            products: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get similar products by category (excluding current product)
router.get("/category/:categoryId/:excludeId", async (req, res) => {
    try {
        const { categoryId, excludeId } = req.params;

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("category_id", categoryId)
            .neq("id", excludeId);

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            products: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.json({
            success: true,
            product: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;