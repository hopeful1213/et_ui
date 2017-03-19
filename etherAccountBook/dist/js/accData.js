

 // var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
 //var getAccountDataUrl = "http://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&sort=asc&apikey=VARZVFXFYBAKM1C5TYKSXRZ18GD6W7B6M9&address=?";
 //var Inputdata = "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a";
 //$.ajax({ url: getAccountDataUrl , type : "GET", dataType : 'json', data: InputData, success: function(data) {
 //	console.log("flag : " + data.flag);
 //	console.log( "JSON Data: " + data.data);
 //}});




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
		
		console.log(i + " :: rrr :: " + time);
		console.log(i + " :: rrr :: " + item.from);
		console.log(i + " :: rrr :: " + item.to);
		console.log(i + " :: rrr :: " + item.value);
		console.log(i + " :: rrr :: " + item.gas);
		console.log(i + " :: rrr :: " + item.gasPrice);
		console.log("---------------------");
		
		$('#limtest01').append('<tr><td>'+ time + '</td>' + '<td>입금</td><td>' + item.from + '</td><td>' + 
				item.to + '</td><td>' + item.value + '</td></tr>');
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
