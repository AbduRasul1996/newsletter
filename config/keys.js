module.exports = {
  server: {
    port: 3000
  },
  database: {
    mLab: {
      dbUser: 'abdurasul',
      dbPassword: 'algorithm01',
      fullpath: 'mongodb://<dbuser>:<dbpassword>@ds115543.mlab.com:15543/mydatabase'
    },
    localhost: {
        fullpath: 'mongodb://localhost/'
    }
  },
  jsonwebtoken: {
    secret: "C++/Node.js Payment system making"
  }
};
