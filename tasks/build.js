var fs = require('fs');
var path = require('path');
var _merge = require('lodash/object/merge');
var ase = require('ase-utils');
var chroma = require('chroma-js');
var mkdirp = require("mkdirp");

var walkPath = './lib';
var outPath = './dist';
var json = {};
function walk (dir, done) {
  fs.readdir(dir, function (error, list) {
    if (error) {
      return done(error);
    }

    var i = 0;

    (function next () {
      var file = list[i++];

      if (!file) {
        return done(null);
      }

      file = dir + '/' + file;

      fs.stat(file, function (error, stat) {

        if (stat && stat.isDirectory()) {
          walk(file, function (error) {
            next();
          });
        } else {
          var output = ase.decode(fs.readFileSync(file));
          var basename = path.basename(file, '.ase');
          var localJson = {};
          output.colors.forEach(function(pan){
            pan.color[0] = pan.color[0]*100;
            localJson[encodeName(pan.name)] = {
              "name": pan.name,
              "lab": {
                "l": Math.round(pan.color[0]),
                "a": Math.round(pan.color[1]),
                "b": Math.round(pan.color[2])
              },
              "rgb": {
                "r": Math.round(chroma.lab(pan.color).rgb()[0]),
                "g": Math.round(chroma.lab(pan.color).rgb()[1]),
                "b": Math.round(chroma.lab(pan.color).rgb()[2])
              },
              "hsl": {
                "h": Math.round(chroma.lab(pan.color).hsl()[0]),
                "s": Math.round(chroma.lab(pan.color).hsl()[1]),
                "l": Math.round(chroma.lab(pan.color).hsl()[2])
              },
              "cmyk": {
                "c": Math.round(chroma.lab(pan.color).cmyk()[0]),
                "m": Math.round(chroma.lab(pan.color).cmyk()[1]),
                "y": Math.round(chroma.lab(pan.color).cmyk()[2]),
                "k": Math.round(chroma.lab(pan.color).cmyk()[3])
              },
              "hex": chroma.lab(pan.color).hex()
            };
          });
          writeFile(outPath + '/' + basename + '.json', JSON.stringify(localJson));
          json = _merge(json, localJson);

          next();
        }
      });
    })();
  });
}

function encodeName (str){
  return str.replace(/pantone\s/i,'').replace(/\s/g,'-').toLowerCase();
}

function writeFile (filePath, contents, cb) {
  mkdirp(path.dirname(filePath), function (err) {
    if (err) {
      return cb(err);
    }
    fs.writeFile(filePath, contents, cb);
  });
}

walk(walkPath, function(error) {
  if (error) {
    throw error;
  } else {
    writeFile(outPath + '/pantone.json', JSON.stringify(json));
  }
});
