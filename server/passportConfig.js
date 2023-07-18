const connection = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use(
        new localStrategy(
          {
            usernameField: 'TUPCID', // Specify the field name for the username
            passwordField: 'PASSWORD', // Specify the field name for the password
          },
          (username, password, done) => {
            const query = 'SELECT * FROM account.login_register WHERE TUPCID = ?';
            connection.query(query, [username], (err, result) => {
              if (err) {
                throw err;
              }
              if (result.length === 0) {
                return done(null, false);
              }
              const user = result[0];
              bcrypt.compare(password, user.PASSWORD, (err, response) => {
                if (err) {
                  throw err;
                }
                if (response === true) {
                  return done(null, user);
                } else {
                  return done(null, false);
                }
              });
            });
          }
        )
      );
      

      passport.serializeUser((user, done) => {
        const id = user.id; // Extract the id from the user object
        const query = "SELECT * FROM account.login_register WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) {
            throw err;
          }
          const userInfo = {
            id: result[0].id,
            USERNAME: result[0].USERNAME,
          };
          done(null, userInfo);
        });
      })

      passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM account.login_register WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) {
            throw err;
          }
          if (!result || result.length === 0) {
            return done(new Error("Failed to deserialize user"));
          }
          const user = {
            id: result[0].id,
            USERNAME: result[0].USERNAME,
          };
          done(null, user);
        });
      });
      
      
      
      
}