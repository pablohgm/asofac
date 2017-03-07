module.exports = function(Contribuyente) {

    var app = require('../../server/server');
    var Handlebars = require('handlebars');
    var fs = require('fs');

    Contribuyente.report = function(argData, cb){
        var configModel = app.models.Configuration;

        var source = fs.readFileSync('./client/views/reciboTemplate.html',  'utf8');
        var template = Handlebars.compile(source);
        configModel.find({limit: 1}, function(err, models){
            if(models){
                var tmpConfig = models[0];
                argData.serie = tmpConfig.serie;
                argData.mensaje = tmpConfig.mensaje;
            }
            var result = template(argData);
            cb(null, result, 'application/octet-stream');
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
