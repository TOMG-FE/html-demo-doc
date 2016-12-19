require('bootstrap/dist/css/bootstrap.css');

var $ = require('jquery');
var $logger = require('./src/mods/logger');
require('./src/mods/p-header');
require('./src/mods/p-demolist');

if(!window.jQuery){
	window.jQuery = $;
}

if(!window.$){
	window.$ = $;
}

if(!window.$logger){
	window.$logger = $logger;
}

var $tip = require('./src/mods/tip');

var tip = null;
if(!window.$tip){
	window.$tip = $tip;
}

$('.container').css('display', '');


