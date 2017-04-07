


var AccountValue = function(accountDate, balance){
	this.accountDate = accountDate;
	this.balance = balance;
	this.pushMyAccount = function(myAccount){
		this.myAccount += "|" + myAccount;
	}
	this.isInput = function(acc){
		if((this.myAccount).indexOf(acc) != -1){
			return true
		}
		return false;
	}
	this.caculateBalance= function(acc, value){
		if(this.isInput(acc)){
			this.balance += value;
		}
		else{
			this.balance -= value;
		}
	}
	this.getBalance = function(){
		return this.balance;
	}
	
} 

var MakeSmallTable = function(idvalue, groupTime){
	this.idvalue = idvalue;
	this.groupTime = groupTime;
	this.header = '<div id ="'  + this.idvalue + '888" data-toggle="collapse" class="box-body">'
	+'<table class="table table-bordered table-hover"><tbody>';
	this.footer = '</tbody></table></div>';
	this.pushTr = function (time, isInput, evalue, egas, egasprice){
		this.bodyValue += '<tr><td>'+ time + '</td>' + '<td>'
				+isInput+'</td><td>' + evalue + '</td><td>' +egas + '</td><td>' + egasprice + '</td></tr>';
	}
	this.getSmallTable = function(){
		return this.header + this.bodyValue + this.footer; 
	}
}

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
	var aaa = new AccountValue('20170116',1000);
	aaa.pushMyAccount('121212');
	aaa.caculateBalance('12121222', 2000);
	alert(aaa.getBalance());

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
	var getSmall;
	$.each(msg.result, function(i, item){

		//console.log(i + " :: rrr :: " + item.blockNumber);
		
		var timestamp2 = item.timeStamp * 1000;
		var a = new Date(timestamp2);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear(); 
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();0
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

		console.log('time is ' + time);
		if(groupTime != date  + month +  year){						
			if(getSmall != null){
				//alert(getSmall.getSmallTable());
				$('#'+ groupTime).append(getSmall.getSmallTable());
			}			
			groupTime = date  + month  +year;
			getSmall = new MakeSmallTable(groupTime,groupTime);
            $('#example21').append(
              '<tbody id="' + groupTime+'" data-toggle="collapse" data-target="#' + groupTime + '888">	'
              + '<tr><td>'+ groupTime + '</td><td><b>'+((totalEther<0) ? '<font color = "blue">적자</font>' : '<font color = "red">이익</font>')
              +'</b></td><td>' + totalEther + '</td><td>'  
			  + totalGas + '</td><td>' + egasprice + '</td></tr></tbody>');    		
    		totalEther 	= 0;
    		totalGas 	= 0;
		     
		}

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
		
		//$('#'+'a' + groupTime +'').append('<tr id ="'  + groupTime + '888" data-toggle="collapse"><td>'+ time + '</td>' + '<td>'
		//		+isInput+'</td><td>' + evalue + '</td><td>' +egas + '</td><td>' + egasprice + '</td></tr>');		
//		$('#'+'a' + groupTime +'').append('<tr><td>'+ time + '</td>' + '<td>'
//				+isInput+'</td><td>' + evalue + '</td><td>' +egas + '</td><td>' + egasprice + '</td></tr>');
		getSmall.pushTr(time, isInput, evalue, egas, egasprice);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               