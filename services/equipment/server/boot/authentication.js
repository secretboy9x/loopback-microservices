module.exports = (server) => {
  // enable authentication
  server.enableAuth({datasource: 'postgres'});
};
