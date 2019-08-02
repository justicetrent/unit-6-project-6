let jsonData = require("./data/data.json")
const projects = jsonData.projects
const express = require("express")
const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
      res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id
    res.render('project', { project: projects[id]});
});

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    console.log('Check URL- THIS PAGE NOT FOUND')
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
  });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});