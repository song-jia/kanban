var redux = require('redux');

function a (obj) {
  obj['a'] = 'A function';
  console.log(obj.b, obj.c);
  return obj;
}

function b (obj) {
  obj['b'] = 'B function';
  return obj;
}
function c (obj) {
  obj['c'] = 'C function';
  return obj;
}

var obj = {};
redux.compose(a, b, c)(obj);
console.log(obj)
