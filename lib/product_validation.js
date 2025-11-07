import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from '../structs/productStructs.js';

export function productCreateValidation(req, res, next) {
  try {
    assert(req.body, CreateProduct);
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Request body',
      details: err.message,
    });
  }
}

export function productUpdateValidation(req, res, next) {
  try {
    assert(req.body, PatchProduct);
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Request body',
      details: err.message,
    });
  }
}
