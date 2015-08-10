var pantone = require('./pantone.json');

var pantonr = function(code){
  var hasSuffix = /-c$|-u$/ig;
  if(!hasSuffix.test(code)){
    code = code.concat('-u');
  }
  return pantone[code];
};

module.exports = pantonr;
