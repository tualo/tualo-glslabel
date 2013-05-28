// 
var BarcodeDatamatrix = require('./datamatrix').BarcodeDatamatrix;

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
	var datamatrix = new BarcodeDatamatrix();
	var dm = datamatrix.getDigit(msg,false);
	var rows=dm.split("\n");
	var xw=1;
	var yw=1;
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
						{key:'fill',value: 'black'}
					]
				});
			}
		}
	}
	return dom;
}

var svg = function(options){
	var dm_svg= (matrix('http://tualo.de'));
	var chlds = [
			// OUTER BORDER 
			{
				tag: 'rect',
				attr:[
					{key: 'x',value: '3mm'},
					{key: 'y',value: '3mm'},
					{key: 'width',value: '94mm'},
					{key: 'height',value: '142.5mm'},
					{key: 'fill',value: 'white'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.5mm'}
				]
			},
			
			
			// UNI-SHIP HEADLINE
			{
				tag: 'rect',
				attr:[
					{key: 'x',value: '3mm'},
					{key: 'y',value: '3mm'},
					{key: 'width',value: '94mm'},
					{key: 'height',value: '10mm'},
					{key: 'fill',value: 'black'},
					{key: 'stroke',value: 'black'},
					{key: 'stroke-width',value: '0.5mm'}
				]
			},
			
			{
				tag: 'text',
				text: 'UNI-SHIP',
				attr:[
					{key: 'x',value: '49mm'},
					{key: 'y',value: '11mm'},
					{key: 'font-size',value: '8mm'},
					{key: 'font-weight',value: 'bold'},
					{key: 'fill',value: 'white'},
					{key: 'text-anchor',value: 'middle'},
					{key: 'font-family',value: 'Verdana'}
				]
			},
			
			{
				tag: 'g',
				childs: dm_svg,
				attr:[
					{key: 'x',value: '49mm'},
					{key: 'y',value: '11mm'},
					{key: 'font-size',value: '8mm'},
					{key: 'font-weight',value: 'bold'},
					{key: 'fill',value: 'white'},
					{key: 'text-anchor',value: 'middle'},
					{key: 'font-family',value: 'Verdana'}
				]
			}
	];
	
	
	
	var dom = {
		tag: 'svg',
		attr:[
			{
				key: 'width',
				value: '100mm'
			},
			{
				key: 'height',
				value: '148.5mm'
			}
		],
		childs:chlds
	};
	return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
		+"\n\r"
		+'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
		+"\n\r"
		+DOMtoString(dom);
};
exports.svg = svg;