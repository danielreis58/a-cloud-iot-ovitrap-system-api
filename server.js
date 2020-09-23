const express = require('express');
const cors = require('cors');
const app = express();

let larvaRoute = require('./app/routers/larvaRoute');
let mosquitoRoute = require('./app/routers/mosquitoRoute');

const s3 = require('./app/config/s3.config.js');
const env = require('./app/config/s3.env.js');

app.use(cors());

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
})

app.use('/larvas', larvaRoute);
app.use('/mosquitos', mosquitoRoute);

app.get('/', (req, res) => {
  const params = {
    Bucket: env.Bucket,
    Prefix: 'Mosquitos/',
    StartAfter: 'Mosquitos/'
  }

  var keys = [];
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send("error -> " + err);
    } else {
      var contents = data.Contents;
      contents.forEach(function (content) {
        keys.push(content.Key.replace('Mosquitos/', ''));
      });
      let stringLinks = ''

      keys.forEach(element => {

        stringLinks += `<p>${element}</p><img src="http://18.228.232.220:8001/mosquitos/files/${element}" alt="" width="400" height="320">`

      });
      page = `<html>
      <body>
      
      <h1>Dengue Imagens - Total: ${keys.length}</h1>
      
      ${stringLinks}
      
      </body>
      </html>
      `

      res.send(page);
    }
  });
});

const server = app.listen(8001, function () {
  console.log("App listening at http://%s:%s", server.address().address.toString(), server.address().port);
})