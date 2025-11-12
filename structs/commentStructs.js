import * as s from 'superstruct';

export const CreateComment = s.object({
  content: s.size(s.string(), 1, 500),
});

export const PatchComment = s.partial(CreateComment);
