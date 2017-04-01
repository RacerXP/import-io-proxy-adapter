'use strict';
const importer = require('../library/importer');
const path = require('path');
const fs = require('fs');
const appRouter = function (app) {
  app.get('/api', function (req, res) {
    importer.getExtractors(req.query.nextPage, req.query.refresh)
      .then(response => {
        res.send(response);
      });
  });

  app.get('/api/:id', function (req, res) {
    importer.getExtractor(req.params.id)
    .then(response => {
      res.send(response);
    });
  });

  app.get('/reports', function (req, res) {
    const dir = process.cwd();
    const joined = path.join(dir, '/html/index.html');
    fs.readFile(joined, function (err, html) {
      if (err) {
        res.statusCode = 500;
        res.send(JSON.stringify(err));
        return;
      }
      res.append('Content-Type', 'text/html');
      res.statusCode = 200;
      res.send(html);
    });
  });
};
module.exports = appRouter;
