/**
 * Created by sam on 2017/5/11.
 */

var mongoose = require('mongoose')
var usersSchema = require('../schemas/users')

module.exports = mongoose.model('User', usersSchema)