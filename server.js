const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();

app.use(express.json());

const PORT = 8000;
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/get_imgs', (req, res) => {
  let result = [];

  let imgs = fs.readdirSync(__dirname + '/public/img');
  imgs.forEach((e, i) => {
    const stats = fs.statSync(`${__dirname}/public/img/${e}`);

    // print file last modified date
    result.push({
      name: e,
      date: new Date(stats.mtime).getTime()
    })
  })

  result = result.sort((a, b) => a.date - b.date).reverse()
  
  
  res.json(result)
})

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/delete', function(req, res) {
  let name = req.body.name;
  fs.unlinkSync(__dirname + '/public/img/' + name);
  res.json({status: true})
})

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/public/img/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
    // res.send('File uploaded to ' + uploadPath);
  });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});

