module.exports = function(Contribuyente) {

    var jsreport = require('jsreport');

    Contribuyente.report = function(cb){
        jsreport.render({ template: { content: '<h1>Hello world</h1>', engine: 'jsrender', recipe: 'phantom-pdf' } }).then(function(out) {
            cb(null, out.stream, 'application/octet-stream');
        }).catch(function(e) {
            cb(e.message);
        });
    };

    Contribuyente.remoteMethod('report', {
        isStatic: true,
        returns: [
            { arg: 'body', type: 'file', root: true },
            { arg: 'Content-Type', type: 'string', http: { target: 'header' } },
        ]
    });

};
