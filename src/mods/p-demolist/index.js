require('highlight.js/styles/xcode.css');
require('./p-demolist.less');

var $ = require('../../vendor/jquery-1.12.4');

function htmlEncode(str){
	if(typeof str !== 'string'){
		throw 'encodeHTML need a string as parameter';
	}
	return str.replace(/\&/g,'&amp;').
		replace(/"/g,'&quot;').
		replace(/</g,'&lt;').
		replace(/\>/g,'&gt;').
		replace(/\'/g,'&#39;').
		replace(/\u00A0/g,'&nbsp;').
		replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g,'&#32;');
}

var trim = String.prototype.trim ?
	function(str) {
		return (str == null) ?
			'' :
			String.prototype.trim.call(str);
	} :
	function(str) {
		return (str == null) ?
			'' :
			str.toString().replace(/^\s+/, '').replace(/\s+$/, '');
	};

setTimeout(function(){

	$('.demo').each(function(){
		var demo = $(this);
		var blocks = demo.find('textarea.block');

		var introNode = demo.find('.intro');
		var codeNode = demo.find('pre code');
		var viewNode = demo.find('.view');

		var viewCodes = [];
		var runCodes = [];

		blocks.each(function(){
			var block = $(this);
			var blockCodes = trim(block.val());
			viewCodes.push(blockCodes);
			if(block.attr('autorun') !== 'false'){
				runCodes.push(blockCodes);
			}
		});	

		viewCodes = htmlEncode(viewCodes.join(''));
		codeNode.html(viewCodes);
		viewNode.html(runCodes.join(''));

		var trimIntro = trim(introNode.html());
		var trimCode = trim(codeNode.html());
		var trimView = trim(viewNode.html());

		if(!trimIntro){
			introNode.hide();
		}

		if(!trimCode){
			codeNode.parent().hide();
		}

		if(!trimView){
			viewNode.hide();
		}

		if((trimIntro + trimCode + trimView) === ''){
			demo.hide();
		}
	});

	if(document.addEventListener){
		require.ensure([], function(require){
			var $hljs = require('highlight.js/lib');
			$('pre code').each(function(i, block) {
				$hljs.highlightBlock(block);
			});
		});
	}
});



