const _ = require('lodash')

var users = {
    'barney': { 'age': 36, 'active': true },
    'fred': { 'age': 40, 'active': false },
    'pebbles': { 'age': 1, 'active': true, 'v': { 'b': 1 } }
};

var object = _.create({ 'a': _.create({ 'b': 2 }) });

const result = _.findKey(users, 'v');
// => 'barney'

console.log(result)