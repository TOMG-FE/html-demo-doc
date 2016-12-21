require('highlight.js/styles/xcode.css');
require('./p-demolist.less');

var $ = require('jquery');
var $hljs = require('../highlight/index');

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
		var htmlCodeNode = demo.find('pre .html');
		var scriptCodeNode = demo.find('pre .script');
		var viewNode = demo.find('.view');

		var htmlCodes = [];
		var scriptCodes = [];
		var viewCodes = [];
		var scriptHtml = [];

		blocks.each(function(){
			var block = $(this);
			var blockCodes = trim(block.get(0).value);
			viewCodes.push(blockCodes);

			var strHtml = blockCodes.replace(/<script[^>]*>[\r\n\w\W]*<\/script>/ig, function(str){
				var strScript = str.replace(/<script[^>]*>|<\/script>/ig, '');
				if(strScript){
					scriptCodes.push(strScript);
				}else{
					scriptHtml.push(str);
				}
				return '';
			});

			if(scriptCodes.length > 0){
				scriptCodes.unshift('(function(){');
				scriptCodes.unshift('<script>');
				scriptCodes.push('})();');
				scriptCodes.push('</script>');
			}

			htmlCodes.push(strHtml);
			if(block.attr('autorun') === 'false'){
				scriptCodes.length = 0;
			}
		});

		htmlCodeNode.html(
			htmlEncode(viewCodes.join(''))
		);
		viewNode.html(htmlCodes.join(''));
		viewNode.parent()
			.append(scriptCodes.join('\n'))
			.append(scriptHtml.join('\n'));

		var trimIntro = trim(introNode.html());
		var trimHtmlCode = trim(htmlCodeNode.html());
		var trimScriptCode = trim(scriptCodeNode.html());
		var trimView = trim(viewNode.html());

		if(!trimIntro){
			introNode.hide();
		}

		if(!trimHtmlCode){
			htmlCodeNode.parent().hide();
		}

		if(!trimScriptCode){
			scriptCodeNode.parent().hide();
		}

		if(!trimView){
			viewNode.hide();
		}

		if((trimIntro + trimHtmlCode + trimScriptCode + trimView) === ''){
			demo.hide();
		}
	});

	
	if(document.addEventListener){
		$('pre code').each(function(i, block) {
			$hljs.highlightBlock(block);
		});
	}
});



