const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, json) => {
    if (err) {
      console.log(err);
    } else {
        res.render('index', { json });
    }
  });
});


app.post('/add', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.log("err");
    } else {
      let nodes = JSON.parse(data);
      nodes.push(req.body.data)
      fs.writeFile('./db.json', JSON.stringify(nodes), {flag:'w'}, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(nodes);
        }
      });
    }
  });
});

app.post('/', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.log("err");
    } else {
      let nodes = JSON.parse(data);
      let index = nodes.findIndex((n) => n.id === req.body.oldData.id);
      nodes[index] = req.body.newData;
      fs.writeFile('./db.json', JSON.stringify(nodes), {flag:'w'}, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(nodes);
        }
      });
    }
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));