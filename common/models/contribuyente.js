module.exports = function(Contribuyente) {

		var jsreport = require('jsreport');
		var fs = require('fs');
		var app = require('../../server/server');

    Contribuyente.report = function(argData, cb){
				var configModel = app.models.Configuration;

				configModel.find({limit: 1}, function(err, models){
						if(models){
								var tmpConfig = models[0];
								argData.mensaje = tmpConfig.mensaje;
						}
						jsreport.render({
							template: {
								content: fs.readFileSync('./client/views/reciboTemplate.html',  'utf8'),
								engine: 'jsrender',
								recipe: 'phantom-pdf',
								phantom: {
									phantomjsVersion: "2.1.1",
									margin: { top: 0, right: 0, bottom: 0, left: 0 }
								}
							},
							data: formatDataTemplate(argData)
						}).then(function(out) {
							out.stream.pipe(fs.createWriteStream('./report.pdf'));
							cb(null, 'La aplicacion ha creado el reporte, abriendo ...');
						}).catch(function(e) {
							cb(e.message);
						});
				});
    };

		function formatDataTemplate (argData) {
				var tmpTriplets = {},
						tmpCont = 0;
				tmpTriplets.pages = [];

				for(var i = 0; i < argData.contribuyentes.length; i++){
						tmpTriplets.pages.push({
								contribuyentes: []
						});
						tmpCont = 0;
						while (tmpCont < 3 && argData.contribuyentes.length){
								var tmpContribuyente = argData.contribuyentes.pop();
								tmpTriplets.pages[i].contribuyentes.push({
											year: argData.year,
											month: argData.month,
											day: argData.day,
											name: tmpContribuyente.nombre,
											lastname: tmpContribuyente.Apellido1,
											lastname2: tmpContribuyente.Apellido2,
											sector: (tmpContribuyente.Sector === undefined) ? '' : tmpContribuyente.Sector.informacion,
											address: tmpContribuyente.direccion,
											value: tmpContribuyente.monto,
											message: argData.mensaje
								});
								tmpCont++;
						}
				}
				return tmpTriplets;
		};

		Contribuyente.remoteMethod('report', {
			accepts: { arg: 'argData', type: 'object', http: { source: 'body' } },
			returns: [
				{ arg: 'msg', type: 'string'},
				{ arg: 'Content-Type', type: 'string', http: { target: 'header' } },
			]
		});

};
