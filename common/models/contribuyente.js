module.exports = function(Contribuyente) {

    var jsreport = require('jsreport');
    var fs = require('fs');

    Contribuyente.report = function(cb){
        jsreport.render({ template: { content: '<h1>Hello world 2</h1>', engine: 'jsrender', recipe: 'phantom-pdf' } }).then(function(out) {
            out.stream.pipe(fs.createWriteStream('./client/tmpReport/report.pdf'));
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
