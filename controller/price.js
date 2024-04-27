const expressAysncHandler = require("express-async-handler");
const Price = require("../models/price");
const ApiError = require("../utils/ApiError");
const httpStatus = require('http-status');

const createPriceCtrl = expressAysncHandler(async (req, res , next) => {
  try {
    const price = new Price(req.body);
    await price.save();
    res.status(httpStatus.CREATED).json(price);
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
});

const getAllPricesCtrl = expressAysncHandler(async (req, res ,next) => {
  try {
    // Extract page, limit, and sort parameters from the request query or set default values
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || "_id"; // Default sorting by document ID
    const sortOrder = req.query.sortOrder || "asc"; // Default sorting order is ascending

    // Calculate the number of documents to skip based on the page number and limit
    const skip = (page - 1) * limit;

    // Fetch prices with pagination and sorting using indexes
    const prices = await Price.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() to retrieve plain JavaScript objects instead of Mongoose documents

    res.json(prices);
  } catch (error) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

const getPriceByIdCtrl = expressAysncHandler(async (req, res, next) => {
  try {
    const price = await Price.findById(req.params.id);
    if (!price) {
      return next(new ApiError(httpStatus.NOT_FOUND, "Price not found"));
    }
    res.json(price);
  } catch (error) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

const updatePriceByIdCtrl = expressAysncHandler(async (req, res, next) => {
  try {
    const price = await Price.findByIdAndUpdate(req.params.id, req.body);
    if (!price) {
      return next(new ApiError(httpStatus.NOT_FOUND, "Price not found"));
    }
    res.json(price);
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
});

const deletePriceByIDCtrl = expressAysncHandler(async (req, res , next) => {
  try {
    const price = await Price.findByIdAndDelete(req.params.id);
    if (!price) {
      return next(new ApiError(httpStatus.NOT_FOUND, "Price not found"));
    }
    res.json({ message: "Price deleted successfully" });
  } catch (error) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});
module.exports = {
  createPriceCtrl,
  getAllPricesCtrl,
  getPriceByIdCtrl,
  updatePriceByIdCtrl, 
  deletePriceByIDCtrl,
};
