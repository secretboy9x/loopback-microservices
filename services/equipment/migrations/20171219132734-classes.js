let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = (options, seedLink) => {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = (db, cb) => {
  db.createTable('classes', {
    id: {type: 'int', notNull: true, primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    created: 'timestamp with time zone',
    lastupdated: 'timestamp with time zone'
  }, cb);
};

exports.down = (db, cb) => {
  return db.dropTable('classes', cb);
};

exports._meta = {
  version: 1
};
