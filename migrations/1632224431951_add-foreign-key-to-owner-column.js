/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // Membuat User Baru
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes')");

  // Mengubah nilai owner pada note yang owner-nya bernilai null
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner = null");

  // Menghapus user baru
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
