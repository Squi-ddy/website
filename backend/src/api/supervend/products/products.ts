import express from "express"
import { getPool, handleQueryError } from "../../../db/postgres"
import Time from "../types/time"
import { authenticate } from "../auth"
import Review from "../types/review"

const productRouter = express.Router()
const pool = getPool("supervend")

productRouter.get("/", async (req, res): Promise<void> => {
    const category = req.query.category
    try {
        const result = await pool.query(
            `
            SELECT
            product_id,
                name,
                category,
                preview,
                price,
                rating,
                rating_ct
            FROM products
            WHERE category = COALESCE($1, category)
            `,
            [category])
        res.json(result.rows)
    } catch (err) {
        handleQueryError(err, res)
    }
})

productRouter.get("/:id", async (req, res): Promise<void> => {
    const productId = req.params.id
    try {
        const result = await pool.query(
            `
            SELECT
                product_id,
                category,
                name,
                description,
                company,
                price,
                temp,
                size,
                country,
                expiry,
                stock,
                preview,
                images,
                rating,
                rating_ct
            FROM products
            WHERE product_id = $1
            `,
            [productId])
        if (result.rows.length < 1) {
            res.status(404).send("Product not found")
            return
        }
        res.json(result.rows[0])
    } catch (err) {
        handleQueryError(err, res)
    }
})

productRouter.get("/:id/ratings", async (req, res): Promise<void> => {
    const productId = req.params.id
    const results = {
        reviews: <Array<Review>>[],
        summary: {
            total: 0,
            count: 0
        }
    }
    try {
        let result = await pool.query(
            "SELECT rating, rating_ct FROM products WHERE product_id = $1",
            [productId]
        )
        if (result.rows.length < 1) {
            res.status(404).send("Product not found")
            return
        }
        let record = result.rows[0]
        results.summary.count = record.rating_ct
        results.summary.total = record.rating

        result = await pool.query(
            `
            SELECT
                product_id,
                name,
                rating,
                content,
                time
            FROM ratings
            WHERE product_id = $1
            `,
            [productId]
        )
        for (record of result.rows) {
            results.reviews.push(
                new Review(
                    record.product_id,
                    record.name,
                    record.rating,
                    record.content,
                    new Time(record.time)
                )
            )
        }
        res.json(results)
    } catch (err) {
        handleQueryError(err, res)
    }
})

productRouter.post("/:id/ratings",
    authenticate,
    async (res, req): Promise<void> => {
        // TODO: Port API
    }
)

export { productRouter }