
var logger = {};

var levels = ['info','warn','debug','log', 'error'];

var i = 0;
var level = '';

for(i = 0; i < levels.length; i++){
	(function(level){
		logger[level] = function(){
			if(window && window.console && typeof window.console[level] === 'function'){
				window.console[level].apply(window.console, arguments);
			}
		};
	})(levels[i]);
}

module.exports = logger;

