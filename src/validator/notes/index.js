const { NotePayloadSchema } = require('./schema.js');
const InvariantError = require('../../exceptions/InvariantError');

const NotesValidator = {
  validateNotesPayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
