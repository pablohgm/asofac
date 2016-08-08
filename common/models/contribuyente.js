module.exports = function(Contribuyente) {

    var jsreport = require('jsreport');
    var fs = require('fs');

    Contribuyente.report = function(cb){
        jsreport.render({
            template: {
                content: fs.readFileSync('./client/views/reciboTemplate.html',  'utf8'),
                engine: 'jsrender',
                recipe: 'phantom-pdf',
                phantom: {
                    width: "18.5cm",
                    height: "7.2cm",
                    margin: "0cm"
                }
            }
        }).then(function(out) {
            var tmpSteam = out.stream.pipe(fs.createWriteStream('./client/tmpReport/report.pdf'));
            tmpSteam.on('finish', function () {  cb(null, 'SUCCESS'); });
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
