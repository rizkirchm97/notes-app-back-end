const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(req, h) {
    try {
      this._validator.validateUserPayload(req.payload);
      const { username, password, fullname } = req.payload;

      const userId = await this._service.addUser({ username, password, fullname });

      const res = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      res.code(201);
      return res;
    } catch (err) {
      if (err instanceof ClientError) {
        const res = h.response({
          status: 'fail',
          message: err.message,
        });
        res.code(err.statusCode);
        return res;
      }

      // Server Error
      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }

  async getUserByIdHandler(req, h) {
    try {
      const { id } = req.params;

      const user = await this._service.getUserById(id);

      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (err) {
      if (err instanceof ClientError) {
        const res = h.response({
          status: 'fail',
          message: err.message,
        });
        res.code(err.statusCode);
        return res;
      }

      // Server Error
      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }
}

module.exports = UsersHandler;
