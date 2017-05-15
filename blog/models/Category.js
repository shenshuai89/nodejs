/**
 * Created by sam on 2017/5/15.
 */

var mongoose = require('mongoose')

var categoriesSchema = require('../schemas/categories')

module.exports = mongoose.model('Category', categoriesSchema)
