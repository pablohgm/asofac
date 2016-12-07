module.exports = function(Contribuyente) {

    var jsreport = require('jsreport');
    var fs = require('fs');

    Contribuyente.report = function(argData, cb){
        console.log(argData);
        jsreport.render({
            template: {
                content: fs.readFileSync('./client/views/reciboTemplate.html',  'utf8'),
                engine: 'jsrender',
                recipe: 'phantom-pdf',
                phantom: {
                    width: "18.5cm",
                    height: "7.2cm",
                    margin: "0cm",
                    phantomjsVersion: "2.1.1"
                }
            },
            data: argData
        }).then(function(out) {
            cb(null, out.stream, 'application/octet-stream');
        }).catch(function(e) {
            cb(e.message);
        });
    };

    Contribuyente.remoteMethod('report', {
        accepts: { arg: 'argData', type: 'object', http: { source: 'body' } },
        returns: [
            { arg: 'body', type: 'file', root: true },
            { arg: 'Content-Type', type: 'string', http: { target: 'header' } },
        ]
    });

};
