const methods = {
  successResponse(data) {
    return { ok: true, response: data };
  },

  errorResponse(error) {
    console.log("ERROR ===> \n", error, "\n <=== ERROR");

    const code = this.validateHttpStatusCode(error.code) ? error.code : 500;
    const message = error.message || "Internal server error";

    return { code, data: { ok: false, message } };
  },

  validateHttpStatusCode(code) {
    const isValid = code && Number.isInteger(code) && code >= 100 && code < 600;

    return isValid;
  },
};

module.exports = methods;
