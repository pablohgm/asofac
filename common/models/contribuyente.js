module.exports = function(Contribuyente) {

    var jsreport = require('jsreport');
    //var jsreport = require('jsreport-core')();
    //jsreport.use(require('jsreport-electron-pdf')({ strategy: 'electron-ipc' }));

    var fs = require('fs')//,
    //    convertFactory = require('electron-html-to');
    //
    //var conversion = convertFactory({
    //    converterPath: convertFactory.converters.PDF
    //});

    Contribuyente.report = function(cb){
        //conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
        //    if (err) {
        //        return console.error(err);
        //    }
        //
        //    console.log(result.numberOfPages);
        //    //result.stream.pipe(fs.createWriteStream('./anywhere.pdf'));
        //    cb(null, result.stream, 'application/octet-stream');
        //    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        //});
        jsreport.render({ template: { content: '<h1>Hello world 2</h1>', engine: 'jsrender', recipe: 'phantom-pdf' } }).then(function(out) {
            out.stream.pipe(fs.createWriteStream('./anywhere.pdf'));
            //cb(null, out.stream, 'application/octet-stream');
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
