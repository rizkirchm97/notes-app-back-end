const ClientError = require('../../exceptions/ClientError');

class CollaborationsHandler {
  constructor(collaborationsService, notesService, validator) {
    this._collaborationsService = collaborationsService;
    this._notesService = notesService;
    this._validator = validator;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(req, h) {
    try {
      this._validator.validateCollaborationPayload(req.payload);
      const { id: credentialId } = req.auth.credentials;
      const { noteId, userId } = req.payload;

      await this._notesService.verifyNoteOwner(noteId, credentialId);
      const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);

      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId,
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }

      // Server Error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(err);
      return response;
    }
  }

  async deleteCollaborationHandler(req, h) {
    try {
      this._validator.validateCollaborationPayload(req.payload);
      const { id: credentialId } = req.auth.credentials;
      const { noteId, userId } = req.payload;

      await this._notesService.verifyNoteOwner(noteId, credentialId);
      await this._collaborationsService.deleteCollaboration(noteId, userId);

      return {
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      };
    } catch (err) {
      if (err instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: err.message,
        });
        response.code(err.statusCode);
        return response;
      }

      // Server Error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(err);
      return response;
    }
  }
}

module.exports = CollaborationsHandler;
