const userSchemaGet = require("./schema/user/get");
const userSchemaShow = require("./schema/user/show");
const userSchemaPost = require("./schema/user/post");
const userSchemaPut = require("./schema/user/put");
const userSchemaDel = require("./schema/user/delete");

const utils = require("../../utils");

const inputValidate = (req, res, next) => {
  const input = { ...req.body, ...req.params, ...req.query };
  const options = {
    abortEarly: false,
  };

  let schema = null;
  switch (req.method.toLowerCase()) {
    case "get":
      schema = req.params.id ? userSchemaShow : userSchemaGet;
      break;

    case "post":
      schema = userSchemaPost;
      break;

    case "put":
      schema = userSchemaPut;
      break;

    default:
      schema = userSchemaDel;
      break;
  }

  const { error } = schema.validate(input, options);

  if (error) {
    const message = error.details.map((detail) =>
      detail.message.replace(/(")|(")/g, "")
    );

    const { code, data } = utils.errorResponse({ message, code: 400 });
    return res.status(code).send(data);
  }

  next();
};

module.exports = inputValidate;
