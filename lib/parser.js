var Parsimmon = require("parsimmon")
var regex = Parsimmon.regex
var lazy = Parsimmon.lazy
var any = Parsimmon.any
var string = Parsimmon.string
var optWhitespace = Parsimmon.optWhitespace
var seq = Parsimmon.seq
var alt = Parsimmon.alt
module.exports = function(str){
  str = "ab"
  var combinator = regex(/([>~+\s])/)
  var combinator = string('>')
  var tag = Parsimmon.letters //regex(/?/)//.many(data)
  /*var exp = lazy(function(){
    return seq(tag, combinator)
  })*/
  var exp = tag.then(combinator)

  return exp.parse(str)
}
module.exports.sample = function(){
  str = '(add (mul 10 (add 3 4)) (add 7 8))'
  var optWhitespace = Parsimmon.optWhitespace;

  var id = regex(/[a-z_]\w*/i);
  var number = regex(/[0-9]+/).map(parseInt);

  var atom = number.or(id);

  var form = string('(').skip(optWhitespace).then(function() {
    return expr.many().skip(string(')'));
  });

  var expr = form.or(atom).skip(optWhitespace);

  return expr.parse(str)
  return expr.parse()
}
