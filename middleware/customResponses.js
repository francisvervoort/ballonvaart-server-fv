const customResponses = {
    success(boodschap) {
      return this.status(200).send({
        success: true,
        boodschap: boodschap || "Succes!"
      });
    },
    badRequest(boodschap) {
      return this.status(400).send({     
        success: false,
        error: boodschap || "bad_request"
      });
    },
    unauthorized() {
      return this.status(401).send({
        success: false,
        error: "unauthorized"
      });
    },
    forbidden() {
      return this.status(403).send({
        success: false,
        error: "forbidden"
      });
    },
    notFound() {
      return this.status(404).send({
        success: false,
        error: "not_found"
      });
    },
    serverError() {
      return this.status(500).send({
        success: false,
        error: "server_error"
      });
    }  
  };
  
  module.exports = (req, res, next) => {
    Object.assign(res, customResponses);  
    next();
  };