var defaults = require("defaults")
var GLYPH_REPLACEMENT_PLEFIX = "glyglyglygly"
var GLYPH_ELEMENT_REPLACEMENTS = {
  "@" : "namespace",
  "(" : "lc",
  ")" : "r",
}
var GLYPH_CLASS_REPLACEMENTS = {
  ":" : "pseudo",
}

function replaceNot(selector){
  return selector.replace(/:not\((.+)\)/g, "__NOT__$1")
}
function restoreNot(selector){
  return selector.replace(/__NOT__(\S+)+/g, ":not($1)")
}


function replaceAsElement(glyph){
  return  GLYPH_REPLACEMENT_PLEFIX + "__" + GLYPH_ELEMENT_REPLACEMENTS[glyph] + "___"
}
function replaceAsClass(glyph){
  return ".__" + GLYPH_REPLACEMENT_PLEFIX + "__" + GLYPH_CLASS_REPLACEMENTS[glyph] + "___";
}


function replaceGlyphFunc(str){
  str = replaceNot(str)
  for(var glyph in GLYPH_ELEMENT_REPLACEMENTS){
    var replaced = replaceAsElement(glyph)
    str = str.split(glyph).join(replaced)
  }
  for(var glyph in GLYPH_CLASS_REPLACEMENTS){
    var replaced = replaceAsClass(glyph)
    str = str.split(glyph).join(replaced)
  }
  return str
}

function restoreGlyphFunc(str){
  str = restoreNot(str)

  for(var glyph in GLYPH_ELEMENT_REPLACEMENTS){
    var replaced = replaceAsElement(glyph)
    str = str.split(replaced).join(glyph)
  }
  for(var glyph in GLYPH_CLASS_REPLACEMENTS){
    var replaced = replaceAsClass(glyph)
    str = str.split(replaced).join(glyph)
  }
  return str
}

var PseudoPseudo = function(opts){
  var options = defaults(opts, {
    prefix : "pseudo_",
  })
  this.prefix = options.prefix
}
PseudoPseudo.prototype.replace = function(selector){
  return replaceGlyphFunc(selector)
}
PseudoPseudo.prototype.restore = function(selector){
  return restoreGlyphFunc(selector)
}

module.exports = function(opts){
  return new PseudoPseudo(opts)
}
