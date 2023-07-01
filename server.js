const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3030;


// Set up Handlebars.js engine with custom helpersr
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'The Secretiest of Super Secret Secrets',
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, // session will expire after 1 hour
    httpOnly: true, // The cookie is not available via JavaScript in the browser
    secure: false, //  The cookie is only sent to the server with an encrypted request over the HTTPS protocol
    sameSite: 'strict', // The cookie is not sent with requests from external websites
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
      console.log(`App running at http://localhost:${PORT}`));
  });