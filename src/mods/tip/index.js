require('./tip.less');
var $ = require('jquery');
var $growl = require('bootstrap-growl');

module.exports = function(msg){
	$.notify(msg);
};

