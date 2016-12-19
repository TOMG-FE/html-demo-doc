var $hljs = require('highlight.js/lib/highlight');

$hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
$hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
$hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
$hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));

module.exports = $hljs;