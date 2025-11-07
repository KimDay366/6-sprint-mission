import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../structs/articleStructs.js';

export function articleCreateValidation(req, res, next) {
  try {
    assert(req.body, CreateArticle);
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Request body',
      details: err.message,
    });
  }
}

export function articleUpdateValidation(req, res, next) {
  try {
    assert(req.body, PatchArticle);
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Request body',
      details: err.message,
    });
  }
}
