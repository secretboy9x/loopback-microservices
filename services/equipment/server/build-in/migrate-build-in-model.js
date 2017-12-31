import app from '../server';

let lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'CustomUser'];
let ds = app.dataSources.postgres;
ds.isActual(lbTables, function(err, actual) {
  if (!actual) {
    ds.autoupdate(lbTables, function(er) {
      if (er) {
        throw er;
      }
      console.log(`Loopback tables [${lbTables}] created in `, ds.adapter.name);
      ds.disconnect();
    });
  }
});

