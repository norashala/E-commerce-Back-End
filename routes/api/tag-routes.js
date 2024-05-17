const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all tags and their associated products
router.get("/", (req, res) => {
    Tag.findAll({
        include: [
            {
                model: Product,
                through: ProductTag,
                as: "products",
            },
        ],
    })
        .then((tags) => res.json(tags))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// GET a single tag by its `id` and its associated products
router.get("/:id", (req, res) => {
    Tag.findByPk(req.params.id, {
        include: [
            {
                model: Product,
                through: ProductTag,
                as: "products",
            },
        ],
    })
        .then((tag) => {
            if (!tag) {
                res.status(404).json({ message: "No tag found with this id" });
                return;
            }
            res.json(tag);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST a new tag
router.post("/", (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name,
    })
        .then((tag) => res.status(201).json(tag))
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

// PUT to update a tag's name by its `id` value
router.put("/:id", (req, res) => {
    Tag.update(
        {
            tag_name: req.body.tag_name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((result) => {
            if (result[0] === 0) {
                res.status(404).json({ message: "No tag found with this id" });
                return;
            }
            res.json({ message: "Tag updated" });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

// DELETE a tag by its `id` value
router.delete("/:id", (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((numDeleted) => {
            if (numDeleted === 0) {
                res.status(404).json({ message: "No tag found with this id" });
                return;
            }
            res.status(200).json({ message: "Tag deleted" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;
