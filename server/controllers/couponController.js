const Coupon = require('../models/Coupon');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount, expiryDate } = req.body;

  if (discount < 0 || discount > 100) {
    res.status(400);
    throw new Error('Discount must be between 0 and 100');
  }

  const couponExists = await Coupon.findOne({ code }).lean();
  if (couponExists) {
    res.status(400);
    throw new Error('Coupon code already exists');
  }

  const coupon = await Coupon.create({
    code,
    discount,
    expiryDate,
  });

  res.status(201).json(coupon);
});

const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().lean();
  res.status(200).json(coupons);
});

const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id).lean();

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found');
  }

  res.status(200).json(coupon);
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { code, discount, expiryDate } = req.body;

  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found');
  }

  if (discount !== undefined && (discount < 0 || discount > 100)) {
    res.status(400);
    throw new Error('Discount must be between 0 and 100');
  }

  if (code) coupon.code = code;
  if (discount !== undefined) coupon.discount = discount;
  if (expiryDate) coupon.expiryDate = expiryDate;

  const updatedCoupon = await coupon.save();
  res.status(200).json(updatedCoupon);
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found');
  }

  await coupon.remove();
  res.status(200).json({ message: 'Coupon removed' });
});

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
