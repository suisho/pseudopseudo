var Parsimmon = require("parsimmon")
var regex = Parsimmon.regex
var lazy = Parsimmon.lazy
var any = Parsimmon.any
var string = Parsimmon.string
var optWhitespace = Parsimmon.optWhitespace
var seq = Parsimmon.seq
var alt = Parsimmon.alt
module.exports = function(str){
  str = "ac>"
  //var combinator = regex(/([>~+\s])/)
  var combinator = string('>')
  var tag = regex(/[a-z]+/)

  var selector = lazy(function(){
    return alt(combinator, tag)
  })
  exp = selector
  return exp.parse(str)
}
