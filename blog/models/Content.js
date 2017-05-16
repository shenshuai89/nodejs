/**
 * Created by sam on 2017/5/15.
 */

var mongoose = require('mongoose')

var contentsSchema = require('../schemas/contents')

module.exports = mongoose.model('Content', contentsSchema)
