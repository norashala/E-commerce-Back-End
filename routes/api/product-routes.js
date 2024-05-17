const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
    // find all products
    // be sure to include its associated Category and Tag data
    Product.findAll({
        include: [{ model: Category }, { model: Tag, through: ProductTag }],
    })
        .then((products) => res.json(products))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// get one product
router.get("/:id", (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    Product.findByPk(req.params.id, {
        include: [{ model: Category }, { model: Tag, through: ProductTag }],
    })
        .then((product) => {
            if (!product) {
                res.status(404).json({
                    message: "No product found with this id",
                });
                return;
            }
            res.json(product);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// create new product
router.post("/", (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        tagIds: req.body.tagIds,
    })
        .then((product) => {
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

// update product
router.put("/:id", (req, res) => {
    // update product data
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            if (req.body.tagIds) {
                return ProductTag.findAll({
                    where: { product_id: req.params.id },
                });
            }
            res.status(200).json(product);
        })
        .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });

            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then(() => res.status(200).json({ message: "Product updated!" }))
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

// delete one product by its `id` value
router.delete("/:id", (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((numDeleted) => {
            if (numDeleted == 0) {
                res.status(404).json({
                    message: "No product found with this id",
                });
                return;
            }
            res.status(200).json({ message: "Product deleted" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;
