'use strict';
const config = require('../config');
const uuid = require('node-uuid');
const requestPromise = require('request-promise');
const _ = require('lodash');
const unzipResponse = require('unzip-response');

const ioKey = config.importIoKey;

function getHttpOptions(method, uri) {
  const options = {
    method: method,
    uri: uri,
    headers: { Accept: 'application/json', 'Accept-Encoding': 'gzip' },
    json: true,
    gzip: true,
    simple: false,
    resolveWithFullResponse: true
  };
  // options.headers['x-correlation-id'] = uuid.v4();
  return options;
}

function getExtractorInfo(response) {
  const info = response.body;
  if (info.hits && Array.isArray(info.hits.hits)) {
    const data = _.map(info.hits.hits, hit => {
      return ({ id: hit._id, description: hit.fields.name });
    });
    return data;
  }
}

function refreshExtractor(id){
  const endpoint = `https://run.import.io/extractor/${id}/start?_apikey=${ioKey}`;
  const options = getHttpOptions('POST', endpoint);
  return requestPromise(options)
    .then((response) => {
      return getExtractorInfo(response);
    })
    .catch(err =>{
      console.log(err);
    });
}

module.exports.getExtractors = function getExtractors(currentPage, refresh) {
  const page = currentPage || 1;
  const endpoint = `https://store.import.io/store/extractor/_search?_sort=_meta.creationTimestamp&_mine=true&q=_missing_:archived%20OR%20archived:false&_page=${page}&_apikey=${ioKey}`;
  const options = getHttpOptions('GET', endpoint)
  return requestPromise(options)
    .then((response) => {
      const extractors = getExtractorInfo(response)
      if (refresh) {
        const setters = _.map(extractors, extractor => {
          return refreshExtractor(extractor.id);
        });
        Promise.all(setters)
          .then(() => {
            return extractors;
          });
      }
      return extractors;
    })
    .catch(err =>{
      console.log(err);
    });
};

module.exports.getExtractor = function getExtractor(id) {
  const endpoint = `https://data.import.io/extractor/${id}/json/latest?_apikey=${ioKey}`;
  const options = getHttpOptions('GET', endpoint);
  return requestPromise(options)
    .then(response => {
      return response.body;
    });
};
