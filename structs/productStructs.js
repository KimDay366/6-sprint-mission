import * as s from 'superstruct';

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.size(s.string(), 1, 500),
  price: s.min(s.number(), 0),
  tags: s.array(s.string()),
});

export const PatchProduct = s.partial(CreateProduct);
