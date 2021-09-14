const ClientError = require('../../exceptions/ClientError');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(req, h) {
    try {
      this._validator.validatePostAuthenticationPayload(req.paylaod);

      const { username, password } = req.payload;
      const id = await this._usersService.verifyUserCredential(username, password);

      const accessToken = this._tokenManager.generateAccessToken({ id });
      const refreshToken = this._tokenManager.generateRefreshToken({ id });

      await this._authenticationsService.addRefreshToken(refreshToken);

      const res = h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken,
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

      // server error
      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }

  async putAuthenticationHandler(req, h) {
    try {
      this._validator.validatePutAuthenticationPayload(req.payload);

      const { refreshToken } = req.payload;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

      const accessToken = this._tokenManager.generateAccessToken({ id });
      return {
        status: 'success',
        message: 'Access Token berhasil diperbarui',
        data: {
          accessToken,
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

      // server error
      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }

  async deleteAuthenticationHandler(req, h) {
    try {
      this._validator.validateDeleteAuthenticationPayload(req.payload);

      const { refreshToken } = req.payload;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      return {
        status: 'success',
        message: 'Refresh token berhasil dihapus',
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

      // server error
      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }
}

module.exports = AuthenticationsHandler;
