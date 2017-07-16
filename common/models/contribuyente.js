module.exports = function(Contribuyente) {
	var PDFDocument = require ('pdfkit');
	var doc = new PDFDocument();
	var fs = require('fs');
	var app = require('../../server/server');
	var exec = require('child_process');

    Contribuyente.report = function(argData, cb){
		var configModel = app.models.Configuration;

		configModel.find({limit: 1}, function(err, models){
			if(models){
					var tmpConfig = models[0];
					argData.mensaje = tmpConfig.mensaje;
			}
			var tmpData = formatDataTemplate(argData);
			var writeStream = fs.createWriteStream('./report.pdf');
			doc.pipe( writeStream );

			for(var indexPage = 0; indexPage < tmpData.length; indexPage++) {
				var tmpPage = tmpData[indexPage];
				for(var i=0; i < tmpPage.contribuyentes.length; i++){
					var tmpContribuyente = tmpPage.contribuyentes[i];
					if(tmpContribuyente.first) {
						doc.fontSize(11).text('Here is some vector graphics...', 100, 100);
						doc.fontSize(11).text('Here is some vector graphics...', 100, 100);
					}
					if(tmpContribuyente.middle) {
						doc.fontSize(25).text('Here is some vector graphics...', 100, 300);
					}
					if(tmpContribuyente.last) {
						doc.fontSize(25).text('Here is some vector graphics...', 100, 600);
					}
				}
				doc.addPage();
			}

			doc.end();

			writeStream.on('finish', function () {
				openReport();
				cb(null, 'La aplicacion ha creado el reporte, abriendo ...');
			});
		});
    };

	function openReport() {
		console.log('open report ...');
		setTimeout(function (){
			exec.exec('start "" /max "./report.pdf"', puts);
		}, 3000);
	};

	function puts(error, stdout, stderr) {
		console.log(stdout);
		console.log(error);
		console.log(stderr);
	};

	function formatDataTemplate (argData) {
		var tmpPages = [],
				tmpCont = 0;

		for(var i = 0; i <= argData.contribuyentes.length; i++){
			tmpPages.push({
					contribuyentes: []
			});
			tmpCont = 0;
			while (tmpCont < 3 && argData.contribuyentes.length){
				var tmpContribuyente = argData.contribuyentes.pop();
				tmpPages[i].contribuyentes.push({
					year: argData.year,
					month: argData.month,
					day: argData.day,
					name: tmpContribuyente.nombre,
					lastname: tmpContribuyente.Apellido1,
					lastname2: tmpContribuyente.Apellido2,
					sector: (tmpContribuyente.sector === undefined) ? '' : tmpContribuyente.sector.informacion,
					address: tmpContribuyente.direccion,
					value: tmpContribuyente.monto,
					message: argData.mensaje,
					first: (tmpCont === 0) ? true : false,
					middle: (tmpCont === 1) ? true : false,
					last: (tmpCont === 2) ? true : false
				});
				tmpCont++;
			}
		}
		return tmpPages;
	};

	Contribuyente.remoteMethod('report', {
		accepts: { arg: 'argData', type: 'object', http: { source: 'body' } },
		returns: [
			{ arg: 'msg', type: 'string'},
			{ arg: 'Content-Type', type: 'string', http: { target: 'header' } },
		]
	});

};
