module.exports = function(Contribuyente) {

    var Handlebars = require('handlebars');
    var fs = require('fs');

    Contribuyente.report = function(argData, cb){
        var source = fs.readFileSync('./client/views/reciboTemplate.html',  'utf8');
        var template = Handlebars.compile(source);
        var result = template(argData);
        cb(null, result, 'application/octet-stream');
    };

    Contribuyente.remoteMethod('report', {
        accepts: { arg: 'argData', type: 'object', http: { source: 'body' } },
        returns: [
            { arg: 'body', type: 'file', root: true },
            { arg: 'Content-Type', type: 'string', http: { target: 'header' } },
        ]
    });

};
