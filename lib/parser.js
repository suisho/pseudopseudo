var Parsimmon = require("parsimmon")
var regex = Parsimmon.regex
var lazy = Parsimmon.lazy
var any = Parsimmon.any
var string = Parsimmon.string
var optWhitespace = Parsimmon.optWhitespace
var seq = Parsimmon.seq
var alt = Parsimmon.alt
function lexeme(p) { return p.skip(optWhitespace); }

module.exports = function(str){
  var str = "(asaf)"
  //var combinator = regex(/([>~+\s])/)
  var combinator = string('>').many()
  var tag = regex(/[a-z]*/)

  var selector = lazy(function(){
    return tag.or(combinator)
  })
  var lparen = lexeme(string('('));
  var rparen = lexeme(string(')'));
  var data = lparen.then(selector.many()).skip(rparen)
  exp = selector
  return data.parse(str)
}
