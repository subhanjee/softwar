const expressAysncHandler = require("express-async-handler");
const Footer = require("../models/footer");
const ApiError = require("../utils/ApiError");
const httpStatus = require('http-status');

const createFooterCtrl = expressAysncHandler(async (req, res , next) => {
  try {
    const footer = new Footer(req.body);
    await footer.save();
    res.status(httpStatus.CREATED).json(footer);
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
});

const getAllFootersCtrl = expressAysncHandler(async (req, res ,next) => {
  try {
    // Extract page, limit, and sort parameters from the request query or set default values
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || "_id"; // Default sorting by document ID
    const sortOrder = req.query.sortOrder || "asc"; // Default sorting order is ascending

    // Calculate the number of documents to skip based on the page number and limit
    const skip = (page - 1) * limit;

    // Fetch footers with pagination and sorting using indexes
    const footers = await Footer.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() to retrieve plain JavaScript objects instead of Mongoose documents

    res.json(footers);
  } catch (error) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

const getFooterByIdCtrl = expressAysncHandler(async (req, res, next) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) {
      return next(new ApiError(httpStatus.NOT_FOUND, "Footer not found"));
    }
    res.json(footer);
  } catch (error) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});

const updateFooterByIdCtrl = expressAysncHandler(async (req, res, next) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body);
    if (!footer) {
      return next(new ApiError(httpStatus.NOT_FOUND, "Footer not found"));
    }
    res.json(footer);
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
});

const deleteFooterByIDCtrl = expressAysncHandler(async (req, res , next) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) {
      return next(new ApiError(httpStatus.NOT_FOUND, "Footer not found"));
    }
    res.json({ message: "Footer deleted successfully" });
  } catch (error) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
});
module.exports = {
  createFooterCtrl,
  getAllFootersCtrl,
  getFooterByIdCtrl,
  updateFooterByIdCtrl, 
  deleteFooterByIDCtrl,
};
