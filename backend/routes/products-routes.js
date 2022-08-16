import express from "express";
import expressAsyncHandler from "express-async-handler";
import Products from "../model/Products.js";
import { isAuth } from "../utils/utils.js";



const prodRouter = express.Router();

///  ========  All Product View =========

prodRouter.get("/", async (req, res) => {
  const products = await Products.find();
  res.send(products);
});

///  ========  Product View By Id =========

prodRouter.get("/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

///  ========  Add Product View By Id =========

prodRouter.post("/add", expressAsyncHandler(async (req,res,next)=>{
  req.body.Product_Seller = req.body.id;
  const product = await Products.create(req.body);
  res.status(201).json({
    success:true,
    product
  })
}));


///  ========  Product Delete By Id =========


prodRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);


//  =========== Searching And Pagination ==============

const PAGE_SIZE = 8;

prodRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const itemCategory = query.itemCategory || "";
    const itemPrice = query.itemPrice || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.itemName || query.itemCategory || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter =
      itemCategory && itemCategory !== "all" ? { itemCategory } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      itemPrice && itemPrice !== "all"
        ? {
            // 1-50
            itemPrice: {
              $gte: Number(itemPrice.split("-")[0]),
              $lte: Number(itemPrice.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { itemPrice: 1 }
        : order === "highest"
        ? { itemPrice: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Products.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Products.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

prodRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Products.find().distinct("itemCategory");
    res.send(categories);
  })
);



export default prodRouter;
