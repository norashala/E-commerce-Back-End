const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET all categories with their associated Products
router.get("/", (req, res) => {
    Category.findAll({
        include: [Product],
    })
        .then((categories) => res.json(categories))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// GET one category by its `id` with its associated Products
router.get("/:id", (req, res) => {
    Category.findByPk(req.params.id, {
        include: [Product],
    })
        .then((category) => {
            if (!category) {
                res.status(404).json({
                    message: "No category found with this id",
                });
                return;
            }
            res.json(category);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST a new category
router.post("/", (req, res) => {
    Category.create({
        category_name: req.body.category_name,
    })
        .then((category) => res.status(201).json(category))
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

// PUT to update a category by its `id`
router.put("/:id", (req, res) => {
    Category.update(
        {
            category_name: req.body.category_name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((result) => {
            if (result[0] === 0) {
                res.status(404).json({
                    message: "No category found with this id",
                });
                return;
            }
            res.json({ message: "Category updated" });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

// DELETE a category by its `id`
router.delete("/:id", (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((numDeleted) => {
            if (numDeleted === 0) {
                res.status(404).json({
                    message: "No category found with this id",
                });
                return;
            }
            res.status(200).json({ message: "Category deleted" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;
