// Shim matches and closest
require('./shims/_element.matches')
require('./shims/_element.closest')

const obj = require('./object')

// Determine if an element is a child of a parent element.
function childOf(el, parent) {
  for (; el && el !== document; el = el.parentNode) {
    if (el == parent) return true;
  }
  return false
}

function isElement(item) {
  return item.constructor.toString().search(/HTML.+Element/) > -1
}

// Return a formData object with all inputs beneath a given root element
//
// Examples:
//
// 1. Get formdata for all fields in a fieldset:
//   formData(document.querySelector('#some-fieldset'))
//
// 2. Get formdata for a form
//   formData(document.querySelector('#some-form')
//
function formData(rootEl) {
  var formData  = new FormData(),
      fields    = obj.slice(rootEl.querySelectorAll('input[name]:not([disabled]), select[name]:not([disabled]), textarea[name]:not([disabled])')),
      fieldData = {}

  // Remove any field which has a parent which is disabled
  fields = fields.filter(function(f) { return !f.closest('[disabled]') })

  // Loop over fields
  // reverse them because if there are two inputs with the same name
  // the last input overrides the first.
  fields.reverse().forEach(function(field) {
    if (field.matches('[type=radio], [type=checkbox]')) {
      // If this is a checkbox or radio input, overwrite with checked values
      if (field.checked) fieldData[field.name] = field
    } else {
      // Only add one value per field name
      fieldData[field.name] = fieldData[field.name] || field
    }
  })

  for (var name in fieldData) {
    // Append current field’s name/value to new formData object
    formData.append(name, fieldData[name].value);
  }

  // Then return said formData object
  return formData;
}

module.exports = {
  childOf: childOf,
  isElement: isElement,
  formData: formData
}
