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
      var dummy = pseudopseudo().replace(selector)
      var beforeSpecify = specificity.calculate(selector)
      var dummySpecify = specificity.calculate(dummy)
      assert.deepEqual(
        dummySpecify[0].specificity,
        beforeSpecify[0].specificity
      )
    })
    it('restore', function(){
      var pseudo = pseudopseudo()
      var replaced = pseudo.replace(selector)
      var restore = pseudo.restore(replaced)
      assert.equal(restore, selector)
    })

  })
})
