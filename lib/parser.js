var Parsimmon = require("parsimmon")
var regex = Parsimmon.regex
var lazy = Parsimmon.lazy
var any = Parsimmon.any
var string = Parsimmon.string
var optWhitespace = Parsimmon.optWhitespace
var seq = Parsimmon.seq
var alt = Parsimmon.alt
function lexeme(p) { return p.skip(optWhitespace); }
var lparen = lexeme(string('('))
var rparen = lexeme(string(')'));

module.exports = function(str){
  str = "ab > a"
  var combinator = regex(/([>~+\s])/)
  var combinators = combinator.many()
  var exp = lazy(function(){
    return alt(selector)
  })
  var tag = Parsimmon.letters.or(succeed(""))
  var selector = seq(tag, combinators)

  //var data = lparen.then(selector.many()).skip(rparen)

  return exp.parse(str)
}
