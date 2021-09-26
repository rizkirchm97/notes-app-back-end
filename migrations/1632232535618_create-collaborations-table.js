/* eslint-disable camelcase */

exports.up = (pgm) => {
  // membuat table collaborations
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    note_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom note_id dan user_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint('collaborations', 'unique_note_id_and_user_id', 'UNIQUE(note_id, user_id)');
};

exports.down = (pgm) => {
  // menghapus tabel collaborations
  pgm.dropTable('collaborations');
};
