

 // var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
 //var getAccountDataUrl = "http://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&sort=asc&apikey=VARZVFXFYBAKM1C5TYKSXRZ18GD6W7B6M9&address=?";
 //var Inputdata = "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a";
 //$.ajax({ url: getAccountDataUrl , type : "GET", dataType : 'json', data: InputData, success: function(data) {
 //	console.log("flag : " + data.flag);
 //	console.log( "JSON Data: " + data.data);
 //}});

$(document).ready(function(){
	
	var a = new Date();
	var year = a.getFullYear();
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var month = months[a.getMonth()];
	console.log("11111111111111111111111111111111111111111" + year + "년" + month);
	$('#monthValue').append( month+ " " + year);

});


$.ajax({   
      type: "POST",   
      url: "http://api.etherscan.io/api?module=account&action=txlist&startblock=0&"+
      "endblock=99999999&sort=asc&apikey=VARZVFXFYBAKM1C5TYKSXRZ18GD6W7B6M9&address="+
      "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",   
      data: { name: "John", location: "Boston" }   
}).done(function( msg ) {

	var jsonObj = JSON.stringify(msg);
	//var msgJson = JSON.parse(msg);
	//console.log("gggg : " + msg.blockNumber[0]);
	console.log("msg.ss : " + msg.status.length);
	console.log("msg.ss2 : " + msg.result.length);
	  //    console.log( "Data Saved: " + jsonObj); 
    
	var groupTime = "";
	var totalEther 	= 0;
	var totalGas 	= 0;
	$.each(msg.result, function(i, item){

		//console.log(i + " :: rrr :: " + item.blockNumber);
		
		var timestamp2 = item.timeStamp * 1000;
		var a = new Date(timestamp2);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		console.log('time is ' + time);
		if(groupTime != date  + month +  year){
			groupTime = date  + month  +year;
            $('#example21').append(
              '<tbody id="'+groupTime+'" data-toggle="collapse" data-target="#' + groupTime + '888">	'
              + '<tr><td>'+ groupTime + '</td><td>'+((totalEther<0) ? '<font color = "blue">적자</font>' : '<font color = "red">이익</font>')
              +'</td><td>' + totalEther + '</td><td>'  
			  + totalGas + '</td><td>' + egasprice + '</td></tr></tbody>');
    		totalEther 	= 0;
    		totalGas 	= 0;
		     
		}
		//groupTime = date + month + year;
		//data-toggle="collapse" data-target="#

//		
//		console.log(i + " :: rrr :: " + time);
//		console.log(i + " :: rrr :: " + item.from);
//		console.log(i + " :: rrr :: " + item.to);
//		console.log(i + " :: rrr :: " + item.value);
//		console.log(i + " :: rrr :: " + item.gas);
//		console.log(i + " :: rrr :: " + item.gasPrice);
//		console.log("---------------------");
		var evalue = 0;
		var egas = 0;
		var egasprice = 0;
		var isInput = '<font color = "red">입금</font>';
		if(item.value != 0){
			evalue = item.value / 1000000000000000000;
		}
		if(item.gas != 0){
			egas = item.gas / 1000000000000000000;
		}
		if(item.gasPrice != 0){
			egasprice = item.gasPrice / 1000000000000000000;
		}
		if('0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a' == item.from){
			isInput = '<font color="blue">출금</font>';
			totalEther -= evalue;
			totalGas -= egas;
		}
		else{
			totalEther += evalue;
			totalGas += egas;
		}
		
		$('"#'+groupTime +'"').append('<tr id ="'  + groupTime + '888"><td>'+ time + '</td>' + '<td>'
				+isInput+'</td><td>' + evalue + '</td><td>' +egas + '</td><td>' + egasprice + '</td></tr>');
	});
 
});  

/*
$.getJSON("http://api.etherscan.io/api?module=account&action=txlist&startblock=0&"+
      "endblock=99999999&sort=asc&apikey=VARZVFXFYBAKM1C5TYKSXRZ18GD6W7B6M9&address="+
      "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",   
    {   
        tags: "mount rainier",   
        tagmode: "any",   
        format: "json"   
      },   
      function(data) {   
        $.each(data.items, function(i,item){   
		console.log("bbbbbb");
        });   
 });  
*/
