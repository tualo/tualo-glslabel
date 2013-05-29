var dots=208;

var mm2dots=function(mm){
	var inch = (mm/10) / 2.54;
	return Math.round(inch*dots);
}
var label=function(options){

	var labeldata=[];
	labeldata.push(''); //leading empty line
	labeldata.push('A'); //version
	labeldata.push( (options.sap_custnumber)?options.sap_custnumber:'2760000001' ); //SAP Customer No.
	labeldata.push( (options.contact_id)?options.contact_id:'2761234567' ); //Contact ID.
	labeldata.push( (options.product_code)?options.product_code:'AA' ); //Product Code.
	labeldata.push( (options.country_code)?options.country_code:'DE' ); //Country Code.
	labeldata.push( (options.postal_code)?options.postal_code:'12345' ); //ZIP Code.
	labeldata.push( (options.total_units)?options.total_units:'001' ); //total units.
	labeldata.push( (options.unit_sequence)?options.unit_sequence:'AA' ); //unit sequence.
	labeldata.push( (options.reference_code)?options.reference_code:'987654321' ); //reference number.
	
	labeldata.push( (options.name_1)?options.name_1:'Max Mustermann' ); //name 1.
	labeldata.push( (options.name_2)?options.name_2:'c/o. Müller' ); //name 2.
	labeldata.push( (options.name_3)?options.name_3:'' ); //name 3.
	labeldata.push( (options.street)?options.street:'An der Aue' ); //street.
	labeldata.push( (options.housenumber)?options.housenumber:'3' ); //housenumber.
	labeldata.push( (options.city)?options.city:'Musterhausen' ); //city.
	labeldata.push( (options.phonenumber)?options.phonenumber:'+49 123 5678935' ); //phone number.
	
	labeldata.push( (options.customer_reference)?options.customer_reference:'e123456789' );
	labeldata.push( (options.gepard_number)?options.gepard_number:'4711' );

	labeldata.push( (options.weight)?options.weight:'198' ); // weight in deci gramms
	labeldata.push( (options.service)?options.service:'' ); // 
	
	var commands = [];
	var X=0;
	var Y=0;
	var Xe=0;
	var Ye=0;
	var BW=5;
	var lineHeight = 4;
	var N=0;
	
	
	
	commands.push('N'); // start the job
	
	
	// Printing the datamatrix
	var BCDATA="http://tualo.de";
	X = mm2dots(30);
	Y = mm2dots(15);
	commands.push('b'+[X,Y,'D',BW,'"'+BCDATA+'"'].join(','));

	// Line1
	X = mm2dots(1);
	Y = mm2dots(58);
	Xe = mm2dots(99);
	Ye = mm2dots(58);
	commands.push('L0'+[X,Y,Xe-X,Ye-Y].join(','));

	// Line2
	X = mm2dots(1);
	Y = mm2dots(58);
	Xe = mm2dots(1);
	Ye = mm2dots(133);
	commands.push('L0'+[X,Y,Xe-X,Ye-Y].join(','));

	// Line3
	X = mm2dots(1);
	Y = mm2dots(87);
	Xe = mm2dots(83);
	Ye = mm2dots(87);
	commands.push('L0'+[X,Y,Xe-X,Ye-Y].join(','));

	// Line4
	X = mm2dots(83);
	Y = mm2dots(58);
	Xe = mm2dots(83);
	Ye = mm2dots(133);
	commands.push('L0'+[X,Y,Xe-X,Ye-Y].join(','));
	
	// Line5
	X = mm2dots(1);
	Y = mm2dots(116);
	Xe = mm2dots(83);
	Ye = mm2dots(116);
	commands.push('L0'+[X,Y,Xe-X,Ye-Y].join(','));
	
	// Line6
	X = mm2dots(1);
	Y = mm2dots(133);
	Xe = mm2dots(99);
	Ye = mm2dots(133);
	commands.push('L0'+[X,Y,Xe-X,Ye-Y].join(','));
	
	// Line7
	X = mm2dots(99);
	Y = mm2dots(58);
	Xe = mm2dots(99);
	Ye = mm2dots(133);
	commands.push('L0'+[X,Y,Xe-X,Ye-Y].join(','));

	// Version Text
	X = mm2dots(83);
	Y = mm2dots(50);
	commands.push('A'+[X,Y,0,1,1,1,'N','"'+'U2.00.0'+'"'].join(','));

	// Address Text
	X = mm2dots(2);
	Y = mm2dots(88+N*(lineHeight/2));
	commands.push('A'+[X,Y,0,lineHeight,1,1,'N','"'+options.name_1+'"'].join(','));
	N++;
	lineHeight=3
	X = mm2dots(2);
	Y = mm2dots(88+N*(lineHeight/2));
	commands.push('A'+[X,Y,0,lineHeight,1,1,'N','"'+options.name_2+'"'].join(','));
	N++;
	lineHeight=3
	X = mm2dots(2);
	Y = mm2dots(88+N*(lineHeight/2));
	commands.push('A'+[X,Y,0,lineHeight,1,1,'N','"'+options.name_3+'"'].join(','));
	N++;
	lineHeight=3
	X = mm2dots(2);
	Y = mm2dots(88+N*(lineHeight/2));
	commands.push('A'+[X,Y,0,lineHeight,1,1,'N','"'+options.street+' '+options.housenumber+'"'].join(','));
	
	commands.push('P'); // stop the job
	return commands.join("\n\r");
}

exports.Label=label;