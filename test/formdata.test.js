var toolbox = require('../')
var utils = require('./_utils')

utils.injectHTML(`<form id="form-1"><input name="check-test-1" type="hidden" value="false"><input type="checkbox" name="check-test-1" value="true"></form>`)
utils.injectHTML(`<form id="form-2"><input name="check-test-2" type="hidden" value="false"><input type="checkbox" name="check-test-2" value="true" checked="checked"></form>`)
utils.injectHTML(`<form id="form-3"><fieldset disabled><input name="test-1" value="true"></fieldset><input name="test-2" value="true"><input name="test-3" value="true" disabled></form>`)

var form1 = document.querySelector('#form-1')
var form2 = document.querySelector('#form-2')
var form3 = document.querySelector('#form-3')

test('formData collects one value per input name', function(){
  expect(toolbox.formData(form1).get('check-test-1')).toBe('false')
  
  // Count to be sure there is only one entry
  var count = 0;
  for (var inputs of toolbox.formData(form1).entries()) { count ++; }
  expect(count).toBe(1)
})

test('formData collects only checked value', function(){
  expect(toolbox.formData(form2).get('check-test-2')).toBe('true')
})

test('formData does not collect disabled inputs', function(){
  var data = toolbox.formData(form3)
  expect(data.get('test-1')).toBe(null)
  expect(data.get('test-2')).toBe('true')
  expect(data.get('test-3')).toBe(null)
})
