var specificity = require('specificity')
var pseudopseudo = require('../index.js')
var assert = require('assert')

var tests = [
  '.foo:hoge',
  '@font-face',
  'div:not(.outer) .inner',
  'audio:not([controls])'
]
tests.forEach(function(selector){
  describe(selector, function(){
    it('specificity', function(){
      var dummy = pseudopseudo.replace(selector)
      var beforeSpecify = specificity.calculate(selector)
      var dummySpecify = specificity.calculate(dummy)
      console.log(dummy)
      assert.deepEqual(
        dummySpecify[0].specificity,
        beforeSpecify[0].specificity
      )
    })
    it('restore', function(){
      var replaced = pseudopseudo.replace(selector)
      var restore = pseudopseudo.restore(replaced)
      assert.equal(restore, selector)
    })

  })
})