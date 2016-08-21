module.exports = function(app, cb) {

  app.post('/login', function(req, res) {
    User.login({
      username: req.body.username,
      password: req.body.password
    }, 'user', function(err, token) {
      if (err) {
        res.render('response', { //render view named 'response.ejs'
          title: 'Login failed',
          content: err,
          redirectTo: '/',
          redirectToLinkText: 'Try again'
        });
        return;
      }

      res.render('home', { //login user and render 'home' view
        email: req.body.email,
        accessToken: token.id
      });
    });
  });

  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
