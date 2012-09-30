var board_a =new Array(
	"sh000001",
	"sz399001",
	////////////
	"sh600348",
	"sz000157",
	"sz002378",
	"sz002648",
	"sh600259",
	"sh601555",
	"sh600109",
	"sz002287",
	"sz002114",
	"sz000630",
	"sz000559",
	"sh600086",
	"sh600809",
	"sh600362",
	"sh600030",
	"sh600636",
	"sz002171",
	"sz000758",
	"sh600980",
	"sh600570",
	"sh600354",
	"sh600599",
	"sh601001",
	"sh600028",
	////////////
	"sh600029",
	"sh600547",
	"sh600581",
	/////////////////
	"sz000002"
);
var board_b =new Array(
);
var board_large_capital =new Array(
	"sh510050",
	"sh000300",
	"sz399001",
	"sh600028",
	"sh601857",
	"sh601088",
	"sh601668",
	"sh601618",
	"sh600029",
	"sh601111",
	"sh601888",
	"sz000002",
	"sh600005",
	"sh600019",
	"sh600050",
	"sh600030",
	"sh601398",
	"sh600036",
	"sh600000",
	"sh601006",
	"sh600583",
	"sz002024",
	"sz000878",
	"sh600497",
	"sz000612",
	"sh601318",
	"sh600031",
	"sh600519",
	"sh601919",
	"sh600150"
);
var board_startup =new Array(
	"sz300001",
	"sz300002",
	"sz300003",
	"sz300004",
	"sz300005",
	"sz300006",
	"sz300007",
	"sz300008",
	"sz300009",
	"sz300010",
	"sz300011",
	"sz300012",
	"sz300013",
	"sz300014",
	"sz300015",
	"sz300016",
	"sz300017",
	"sz300018",
	"sz300019",
	"sz300020",
	"sz300021",
	"sz300022",
	"sz300023",
	"sz300024",
	"sz300025",
	"sz300026",
	"sz300027",
	"sz300028",
	"sz300029",
	"sz300030",
	"sz300031",
	"sz300032",
	"sz300033",
	"sz300034",
	"sz300035",
	"sz300036"
);

var g_current_board = board_a;
var AppConf = {
    Interval_1s:1*1000,
    Interval_2s:2*1000,
    Interval_AginReq:500,
    url:'http://hq.sinajs.cn/format=js&func=update_stock_list_table();&list='
};

function doc_element(id){return document.getElementById(id);};
function create_element(nodeName){return document.createElement(nodeName);};
var timer;
var append=function(t,c){t.appendChild(c)};
var g_sort = 0;
var g_sort_changed = false;

function toggle_sort_r(){
	g_sort++; if (g_sort == 3) g_sort = 0;
	g_sort_changed = true;
	my_cookie.set("sort", g_sort, 1);
}
function change_board_r(board_short_name){
	var  board;
  console.log('Change board to ' + board_short_name);
	eval("board = board_"+board_short_name );

	g_table.del_rows_r();
	g_table.add_rows_r(board.length);
	g_table.add_link_r(board, function(list, i){return list[i];});
	g_current_board = board;
	my_cookie.set("board", board_short_name, 1);
}
var csv = {
	string_to_array: function (str){
		str.replace("\r","");str.replace("\n","");
		return str.split(",");;
	}, 
	array_to_string: function(array){
		return array.toString();
	}
};
var my_cookie = {
	get: function (c_name)	{
		if (document.cookie.length<0)  {
			return "";
		}
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start==-1){ 
			return "";
		}
		c_start=c_start + c_name.length+1 
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
	},
	set: function (c_name, value, expiredays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}

};
function popup(id){
	this.popup_layer = doc_element(id);
	this.id = id;
	this.show_r=function(e, data_array){
		if ( !data_array || data_array[1]==0){
			return;
		}
		var l = e.pageX + 2;
		var t = e.pageY + 2;
		this.popup_layer.style.top = t+"px";
		this.popup_layer.style.left = l+"px";
		this.popup_layer.style.visibility = "Visible";
		
		trade_detail = this.popup_layer.getElementsByClassName('trade_detail')[0];
		// bid
		trade_detail.rows[0].cells[0].innerHTML="B5: "+data_array[29];
		trade_detail.rows[0].cells[1].innerHTML=Math.round(data_array[28]/100);
		trade_detail.rows[1].cells[0].innerHTML="B4: "+data_array[27];
		trade_detail.rows[1].cells[1].innerHTML=Math.round(data_array[26]/100);
		trade_detail.rows[2].cells[0].innerHTML="B3: "+data_array[25];
		trade_detail.rows[2].cells[1].innerHTML=Math.round(data_array[24]/100);
		trade_detail.rows[3].cells[0].innerHTML="B2: "+data_array[23];
		trade_detail.rows[3].cells[1].innerHTML=Math.round(data_array[22]/100);
		trade_detail.rows[4].cells[0].innerHTML="B1: "+data_array[21];
		trade_detail.rows[4].cells[1].innerHTML=Math.round(data_array[20]/100);

		// ask
		trade_detail.rows[5].cells[0].innerHTML="A1: "+data_array[11];
		trade_detail.rows[5].cells[1].innerHTML=Math.round(data_array[10]/100);
		trade_detail.rows[6].cells[0].innerHTML="A2: "+data_array[13];
		trade_detail.rows[6].cells[1].innerHTML=Math.round(data_array[12]/100);
		trade_detail.rows[7].cells[0].innerHTML="A3: "+data_array[15];
		trade_detail.rows[7].cells[1].innerHTML=Math.round(data_array[14]/100);
		trade_detail.rows[8].cells[0].innerHTML="A4: "+data_array[17];
		trade_detail.rows[8].cells[1].innerHTML=Math.round(data_array[16]/100);
		trade_detail.rows[9].cells[0].innerHTML="A5: "+data_array[19];
		trade_detail.rows[9].cells[1].innerHTML=Math.round(data_array[18]/100);

		price_info = this.popup_layer.getElementsByClassName('price_info')[0];
		// close
		price_info.rows[0].cells[0].innerHTML=data_array[2];
		// open
		price_info.rows[1].cells[0].innerHTML=data_array[1];
		price_info.rows[0].cells[1].innerHTML=data_array[4];
		price_info.rows[1].cells[1].innerHTML=data_array[3];
		price_info.rows[2].cells[1].innerHTML=data_array[5];

		//$("update_date").innerHTML=data_array[30];
		//$("update_time").innerHTML=data_array[31];
	};
	this.hide_r=function(){
		this.popup_layer.style.visibility = "Hidden";	
	}
};
function calc_change_in_percent(arr_info){
	return Math.round(100*(arr_info[3]*1000-arr_info[2]*1000)/(10*arr_info[2]))/100;
}
function stock_table(id){
	this.id = id;
	this.table = doc_element(id);
	this.add_rows_r = function(num_rows){
		for (var i = 0; i< num_rows; i++){
			var row=this.table.insertRow(-1);
			var s_name_cell = row.insertCell(0);
			var last_trade_cell = row.insertCell(-1);
			var change_cell = row.insertCell(-1);
		}
	};
	this.del_rows_r 	= function(){
		while (this.table.rows.length){
			this.table.deleteRow(0);
		}
	};
	this.add_link_r 	= function (list, func){
		var current_row =0;
		for (i in list){
			var new_a = create_element("a");
			new_a.id = func(list, i);
			new_a.innerHTML = func(list, i);
			new_a.target = "_blank";
			new_a.href = "http://finance.sina.com.cn/realstock/company/"+ func(list, i)+"/nc.shtml";
			new_a.addEventListener("mouseover", function(event){g_popup.show_r(event, this.data);}, false);
			new_a.addEventListener("mouseout", function(event){g_popup.hide_r();}, false);
			append(this.table.rows[current_row].cells[0],new_a);
			current_row++;
		}
	};
	this.del_link_r = function (){
		for (var i =0; i< this.table.rows.length; ++i){
			this.table.rows[i].cells[0].innerHTML="";
		}
	};
	this.update_contents_r = function	(arr_arr_info, sort, rebuild_a){
		if (sort == 1){
			arr_arr_info.sort( function(info_a, info_b){ return info_b[2] - info_a[2];} );
			rebuild_a = true;
		}else if (sort == 2){
			arr_arr_info.sort( function(info_a, info_b){ return info_a[2] - info_b[2];} );
			rebuild_a = true;
		}
		if ( rebuild_a){
			this.del_link_r();
			this.add_link_r(arr_arr_info, function(arr_arr, i){return arr_arr[i][0];});
		}
		
		for(var x in arr_arr_info){
			var code = arr_arr_info[x][0];
			var data_array = arr_arr_info[x][1];
			var anchor=doc_element(code);
			var row = anchor.parentNode.parentNode;
			anchor.innerHTML=data_array[0][2]+data_array[0][0];
			anchor.data=data_array;
			this.update_row_r(row, data_array);
		}
	};
	this.update_row_r = function(row, arr_info){
		var change = arr_info[33];
		if(change <= 0)row.className="decline";
		else row.className="";
		if (arr_info[1]==0){
			row.cells[1].innerHTML="===";
			row.cells[2].innerHTML="===";
		}else{
			row.cells[1].innerHTML=arr_info[3];
			row.cells[2].innerHTML=change;
		}
	};
}
var script_updater = {
	stop_refresh: function()
	{
		clearInterval(timer);
	},
	should_stop_update:function()
	{
		var h = new Date().getHours();
		var m = new Date().getMinutes();
		//return ( h < 9 || h>15 || (h == 15&& m>10));
		return false;
	},
	load_data_r:function(url,idname)
	{
		if( this.should_stop_update() ) {
			this.stop_refresh();
		}
		//var old_script=doc_element(idname);
		//if(old_script){old_script.parentNode.removeChild(old_script);};
		//var new_script=create_element("script");
		//new_script.type="text/javascript";
		//new_script.src=url;
		//new_script.id=idname;
		//append(document.body, new_script);
		xmlhttp = new XMLHttpRequest();

		xmlhttp.onload = function(e){
			var js = e.target.responseText;
      js = js + 'function update_stock_list_table(){' + 
        '	var idname="stock_list_table";' +
        '	var table=doc_element(idname);' +
        '	var stock_info_array = new Array();' +
        '	for (var x in g_current_board){' +
        '		var stock_info = new Array(g_current_board[x] );' +
        '		var str_info;' +
        '		var arr_info;' +
        '		eval("str_info = hq_str_"+g_current_board[x] );' +
        '		arr_info = csv.string_to_array(str_info);' +
        '		var change = calc_change_in_percent(arr_info);' +
        '		arr_info.push(change);' +
        '		stock_info.push( arr_info);' +
        '		stock_info.push( change);' +
        '		stock_info_array.push(stock_info);' +
        '	}' +
        '	g_table.update_contents_r(stock_info_array, g_sort, g_sort_changed);' +
        '	g_sort_changed = false;' +
        '	return true;' +
        '}';
			eval(js);
		}
		xmlhttp.open("GET",url,true);
		xmlhttp.send(null);
	}
}

var g_table;
var g_popup;

function load_state(){
	var sort = my_cookie.get("sort");
	if ( sort != null && sort != ""){
		g_sort = sort;
		g_sort_changed = true;;
	}
	var board_short_name = my_cookie.get("board");
	if ( board_short_name != null && board_short_name != ""){
		eval("g_current_board = board_"+board_short_name );
	}
}
function init(){
	g_table = new stock_table("stock_list_table");
	g_popup = new popup("hoverpopup");

	clearInterval(timer);
	load_state();
	g_table.add_rows_r(g_current_board.length);
	g_table.add_link_r(g_current_board, function(list, i){return list[i];});

	timer = setInterval("script_updater.load_data_r(AppConf.url+csv.array_to_string(g_current_board),'vsdata');", AppConf.Interval_2s);
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  
	doc_element('change_board_a').addEventListener('click', function(){ change_board_r('a'); });
	doc_element('change_board_b').addEventListener('click', function(){ change_board_r('b'); });
	doc_element('change_board_c').addEventListener('click', function(){ change_board_r('large_capital'); });
	doc_element('change_board_d').addEventListener('click', function(){ change_board_r('startup'); });
	doc_element('sort_toggler').addEventListener('click', function(){ toggle_sort_r(); });
});

//location.reload(true)
