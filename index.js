require('bootstrap/dist/css/bootstrap.css');
require('alertifyjs/build/css/alertify.css');
require('alertifyjs/build/css/themes/bootstrap.css');

var $ = require('./src/vendor/jquery-1.12.4');
require('./src/mods/p-header');
require('./src/mods/p-demolist');

if(!window.jQuery){
	window.jQuery = $;
}

if(!window.$){
	window.$ = $;
}

var tip = null;
if(!window.$tip){
	window.$tip = function(){
		if(typeof tip === 'function'){
			tip.apply(null, arguments);
		}
	};
}

if(document.addEventListener){
	require.ensure([], function(require){
		tip = require('./src/mods/tip');
	});
}

$('.container').css('display', '');


