import schemaPost from './schema/post.js';

import { utils } from '../../../utils/response.js';

const inputValidate = (req, res, next) => {
  const input = { ...req.body, ...req.params, ...req.query };
  const options = {
    abortEarly: false,
  };

  let schema = null;
  switch (req.method.toLowerCase()) {
    case 'post':
      schema = schemaPost;
      break;
    default:
      break;
  }

  const { error } = schema.validate(input, options);

  if (error) {
    const message = error.details.map((detail) => detail.message.replace(/(")|(")/g, ''));

    return utils.errorResponse(res, { message, code: 400 });
  }

  next();
};

export default inputValidate;
