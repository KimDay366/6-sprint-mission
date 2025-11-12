import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../structs/commentStructs.js';

export function commentCreateValidation(req, res, next) {
  try {
    assert(req.body, CreateComment);
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Request body',
      details: err.message,
    });
  }
}

export function commentUpdateValidation(req, res, next) {
  try {
    assert(req.body, PatchComment);
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid Request body',
      details: err.message,
    });
  }
}
