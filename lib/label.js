// 
var Datamatrix = require('tualo-datamatrix').Datamatrix;

var DOMtoString=function(dom){
	var start = '<';
	var tag = dom.tag;
	var attr = '';
	if (typeof dom.attr!=='undefined'){
		for(var i in dom.attr){
			attr+=' ';
			attr+=dom.attr[i].key;
			attr+='="'+dom.attr[i].value+'"';
		}
	}
	var end = '/>';
	if (typeof dom.childs!='undefined'){
		var chld = '';
		for(var i in dom.childs){
			chld+=DOMtoString(dom.childs[i]);
		}
		end = '>'+chld+'</'+tag+'>';
	}else if (typeof dom.text!='undefined'){
		end = '><![CDATA['+dom.text+']]></'+tag+'>';
	}
	return [start,tag,attr,end].join('');
};

var matrix = function(msg){
	var datamatrix = new Datamatrix();
	var dm = datamatrix.getDigit(msg,false);
	var rows=dm.split("\n");
	var xw=0.8;
	var yw=0.8;
	var size=rows.length;
	var dom = [];
	for(var y in rows){
		var cols = rows[y].split('');
		for(var x in cols){
			if (cols[x]==='1'){
				dom.push({
					tag: 'rect',
					attr: [
						{key:'x',value: (x*xw)+'mm'},
						{key:'y',value: (y*yw)+'mm'},
						{key:'width',value: (xw)+'mm'},
						{key:'height',value: (yw)+'mm'},
						{key:'fill',value: 'black'},
						{key:'stroke',value: 'black'},
						{key:'stroke-width',value: '0'}
					]
				});
			}
		}
	}
	return dom;
}

var svg = function(options){
	
	var labeldata=[];
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
	
	var dm_svg= (matrix(labeldata.join('|')));
	var chlds = [
			// OUTER BORDER 
			{
				tag: 'rect',
				attr:[
					{key: 'x',value: '0mm'},
					{key: 'y',value: '0mm'},
					{key: 'width',value: '99mm'},
					{key: 'height',value: '148.5mm'},
					{key: 'fill',value: 'white'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			
			
			// UNI-SHIP HEADLINE
			{
				tag: 'rect',
				attr:[
					{key: 'x',value: '0mm'},
					{key: 'y',value: '0mm'},
					{key: 'width',value: '99mm'},
					{key: 'height',value: '10mm'},
					{key: 'fill',value: 'black'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			
			{
				tag: 'text',
				text: 'UNI-SHIP',
				attr:[
					{key: 'x',value: '49mm'},
					{key: 'y',value: '8mm'},
					{key: 'font-size',value: '8mm'},
					{key: 'font-weight',value: 'bold'},
					{key: 'fill',value: 'white'},
					{key: 'text-anchor',value: 'middle'},
					{key: 'font-family',value: 'Arial'}
				]
			},
			
			{
				tag: 'text',
				text: 'U2.00.0',
				attr:[
					{key: 'x',value: '84mm'},
					{key: 'y',value: '57mm'},
					{key: 'font-size',value: '3mm'},
					{key: 'font-weight',value: 'normal'},
					{key: 'fill',value: 'black'},
					{key: 'font-family',value: 'Arial'}
				]
			},
			
			{
				tag: 'line',
				attr:[
					{key: 'x1',value: '1mm'},
					{key: 'y1',value: '58mm'},
					{key: 'x2',value: '99mm'},
					{key: 'y2',value: '58mm'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			{
				tag: 'line',
				attr:[
					{key: 'x1',value: '1mm'},
					{key: 'y1',value: '58mm'},
					{key: 'x2',value: '1mm'},
					{key: 'y2',value: '133mm'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			{
				tag: 'line',
				attr:[
					{key: 'x1',value: '1mm'},
					{key: 'y1',value: '87mm'},
					{key: 'x2',value: '83mm'},
					{key: 'y2',value: '87mm'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			{
				tag: 'line',
				attr:[
					{key: 'x1',value: '83mm'},
					{key: 'y1',value: '58mm'},
					{key: 'x2',value: '83mm'},
					{key: 'y2',value: '133mm'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			{
				tag: 'line',
				attr:[
					{key: 'x1',value: '1mm'},
					{key: 'y1',value: '116mm'},
					{key: 'x2',value: '83mm'},
					{key: 'y2',value: '116mm'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			{
				tag: 'line',
				attr:[
					{key: 'x1',value: '1mm'},
					{key: 'y1',value: '133mm'},
					{key: 'x2',value: '99mm'},
					{key: 'y2',value: '133mm'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
			{
				tag: 'line',
				attr:[
					{key: 'x1',value: '99mm'},
					{key: 'y1',value: '58mm'},
					{key: 'x2',value: '99mm'},
					{key: 'y2',value: '133mm'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.1mm'}
				]
			},
					
			{
				tag: 'g',
				childs: dm_svg,
				attr:[
					{key: 'transform',value: 'translate(100,50)'}
				]
			}
	];
	
	// ADDRESS
	chlds.push({
		tag: 'text',
		text: (options.name_1)?options.name_1:'Max Mustermann',
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '92mm'},
			{key: 'font-size',value: '4mm'},
			{key: 'font-weight',value: 'bold'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});
	chlds.push({
		tag: 'text',
		text: (options.name_2)?options.name_2:'c/o. Müller',
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '98mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});
	chlds.push({
		tag: 'text',
		text: (options.name_3)?options.name_3:'Hallo',
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '103mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});
	chlds.push({
		tag: 'text',
		text: [
			(options.street)?options.street:'An der Aue',
			(options.housenumber)?options.housenumber:'3'].join(' '),
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '108mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});
	chlds.push({
		tag: 'text',
		text: [
			(options.country_code)?options.country_code:'DE',
			(options.postal_code)?options.postal_code:'12345',
			(options.city)?options.city:'Musterhausen'
		].join(' '),
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '113mm'},
			{key: 'font-size',value: '4mm'},
			{key: 'font-weight',value: 'bold'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	// CONTACT
	chlds.push({
		tag: 'text',
		text: [
			(options.contact_text)?options.contact_text:'Contact:',
			(options.contact_name)?options.contact_name:''
		].join(' '),
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '119mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	chlds.push({
		tag: 'text',
		text: [
			(options.phone_text)?options.phone_text:'Phone:',
			(options.phonenumber)?options.phonenumber:'+49 123 5678935'
		].join(' '),
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '122mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	chlds.push({
		tag: 'text',
		text: [
			(options.note1_text)?options.note1_text:'Note:',
			(options.note1)?options.note1:''
		].join(' '),
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '125mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	chlds.push({
		tag: 'text',
		text: [
			(options.note2_text)?options.note2_text:'Note:',
			(options.note2)?options.note2:''
		].join(' '),
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '128mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	chlds.push({
		tag: 'text',
		text: [
			(options.reference_text)?options.reference_text:'ID-NR:',
			(options.reference_code)?options.reference_code:'987654321'
		].join(' '),
		attr:[
			{key: 'x',value: '3mm'},
			{key: 'y',value: '131mm'},
			{key: 'font-size',value: '3mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});
	
	
	var sender_chlds=[];
	sender_chlds.push({
		tag: 'text',
		text: [
			(options.sender_text)?options.sender_text:'Absender:',
			(options.contact_name)?options.contact_name:''
		].join(' '),
		attr:[
			{key: 'x',value: '1mm'},
			{key: 'y',value: '1mm'},
			{key: 'font-size',value: '2mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	sender_chlds.push({
		tag: 'text',
		text: [
			(options.sender_name1)?options.sender_name1:'Muster GmbH'
		].join(' '),
		attr:[
			{key: 'x',value: '1mm'},
			{key: 'y',value: '3mm'},
			{key: 'font-size',value: '2mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	sender_chlds.push({
		tag: 'text',
		text: [
			(options.sender_name2)?options.sender_name2:'Labelfertigung'
		].join(' '),
		attr:[
			{key: 'x',value: '1mm'},
			{key: 'y',value: '5mm'},
			{key: 'font-size',value: '2mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	sender_chlds.push({
		tag: 'text',
		text: [
			(options.sender_name3)?options.sender_name3:'Hr. Schulze'
		].join(' '),
		attr:[
			{key: 'x',value: '1mm'},
			{key: 'y',value: '7mm'},
			{key: 'font-size',value: '2mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});

	sender_chlds.push({
		tag: 'text',
		text: [
			(options.sender_street)?options.sender_street:'Musterweg',
			(options.sender_housenumber)?options.sender_housenumber:'9'
		].join(' '),
		attr:[
			{key: 'x',value: '1mm'},
			{key: 'y',value: '9mm'},
			{key: 'font-size',value: '2mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});
	
	sender_chlds.push({
		tag: 'text',
		text: [
			(options.sender_country_code)?options.sender_country_code:'DE',
			(options.sender_postal_code)?options.sender_postal_code:'99999',
			(options.sender_city)?options.sender_housenumber:'Musterstadt'
		].join(' '),
		attr:[
			{key: 'x',value: '1mm'},
			{key: 'y',value: '11mm'},
			{key: 'font-size',value: '2mm'},
			{key: 'font-weight',value: 'normal'},
			{key: 'fill',value: 'black'},
			//{key: 'text-anchor',value: 'middle'},
			{key: 'font-family',value: 'Arial'}
		]
	});
	chlds.push({
		tag: 'g',
		childs: [
			{
				tag: 'g',
				childs: sender_chlds,
				attr:[
					{key: 'transform',value: 'rotate(90)'}
				]
			}
		],
		attr:[
			{key: 'transform',value: 'translate(365,220)'}
		]
	});
	
	var dom = {
		tag: 'svg',
		attr:[
			{key: 'width',value: '100mm'},
			{key: 'height',value: '148.5mm'}
		],
		childs:chlds
	};
	return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
		+"\n\r"
		+'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
		+"\n\r"
		+DOMtoString(dom);
};
exports.Label = svg;