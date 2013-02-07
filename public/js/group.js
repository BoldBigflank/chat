var socket = io.connect(window.location.hostname);
var date = new Date();
var group;

var userId = 0;

// var strangerId = 0;

var playTitleFlag = false;


/* When a line of chat is received */
socket.on('updatechat', function(source_id, data) {
	$('#logbox').append('<div class="logitem"><div class="strangermsg"><span class="msgsource"><strong>Stranger</strong>(#' + source_id + ')</span>' + data + '</div></div>');
});

/* When we change rooms either from entering or being paired */
socket.on('updaterooms', function (current_room) {
	console.log("now in room", current_room)
	// If it's not a waiting room, enable the buttons
	if(current_room != 'group_a' && current_room != 'group_b'){
		console.log("setting up shop")
		document.getElementById("sendbtn").disabled = false;
		document.getElementById("chatmsg").disabled = false;
		document.getElementById("disconnectbtn").disabled = false;
		document.getElementById("prompt-game").style.display = 'block';
		document.getElementById("waiting-game").style.display = 'none';
		document.getElementById("sayHi").style.display = 'block';
		document.getElementById("connecting").style.display = 'none';
		document.getElementById("looking").style.display = 'none';

		$('#logbox').append('<div id="sayHi" class="logitem"><div class="statuslog">You\'re now chatting with a new friend. Why not start by introducing yourself?</div></div>')

	}
});


// Generic function to create xmlHttpRequest for any browser //
/*
function GetXmlHttpObject()

	{

	var xmlHttp = null;



	try

		{

		// Firefox, Opera 8.0+, Safari

		xmlHttp = new XMLHttpRequest();

		}

	catch (e)

		{

		//Internet Explorer

		try

			{

			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");

			}

		catch (e)

			{

			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

			}

		}



	return xmlHttp;

	}
*/




// Ajax part to get number of online chat //

socket.on('onlineusers', function(count, countgroup, whois){
	var chatting = (count-countgroup)

	document.getElementById("onlinecount").innerHTML = "";
	document.getElementById("onlinecount").innerHTML +=""+countgroup+" "+whois+" holding on";
})
/*
function getNumberOfOnlineUsers()

	{

	xmlHttp = GetXmlHttpObject();



	if (xmlHttp == null)

		{

		alert("Browser does not support HTTP Request");

		return;

		}



	var url = "getNumberOfUsers.php";

	xmlHttp.open("POST", url, true);

	xmlHttp.onreadystatechange = stateChanged;

	xmlHttp.send(null);

	}
*/

/*
function stateChanged()

	{

	if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete")

		{

			var arr = xmlHttp.responseText;

			arr = arr.split(",");

		var count = arr[0];

		var countgroup = arr[1];

		var chatting = (count-countgroup);

		var whois = arr[2];

		document.getElementById("onlinecount").innerHTML = "";

		document.getElementById("onlinecount").innerHTML +=""+countgroup+" "+whois+" holding on";

		window.setTimeout("getNumberOfOnlineUsers();", 12000);

		}

	}
*/


// End of get number of online users//



// Ajax part start chat //

function startChat()

	{
		console.log("startChat")
		if(document.getElementById("group_a").checked){
			group = "group_a";
		}else{
			group = "group_b";
		}
		
		document.getElementById("chatbox").style.display = 'none';
		$("#chatbox").fadeIn(300);
		document.getElementById("sendbtn").disabled = true;
		document.getElementById("chatmsg").disabled = true;
		document.getElementById("disconnectbtn").disabled = true;
		document.getElementById("intro").style.display = 'none';
		document.getElementById("bottom").style.display = 'none';
		document.getElementById("base").style.background = '#53739B';
		$("#full-screen-background-image").fadeOut(600);
		document.getElementById("sayHi").style.display = 'none';
		document.getElementById("prompt-game").style.display = 'none';
		document.getElementById("more").style.display = 'none';
		document.getElementById("seen").style.display = 'none';

		if (document.getElementById("chatDisconnected") != undefined)
			document.getElementById("chatDisconnected").style.display = 'none';

		if (document.getElementById("startNew") != undefined)
			document.getElementById("startNew").style.display = 'none';

		socket.emit('adduser', group, function(id){
			userId = id
		});
	}

/*
function stateChanged2()
	{
	if (xmlHttp2.readyState == 4 || xmlHttp2.readyState == "complete")
		{
		userId = trim(xmlHttp2.responseText);
		document.getElementById("chatbox").style.display = 'none';
		$("#chatbox").fadeIn(300);
		document.getElementById("sendbtn").disabled = true;
		document.getElementById("chatmsg").disabled = true;
		document.getElementById("disconnectbtn").disabled = true;
		document.getElementById("intro").style.display = 'none';
		document.getElementById("bottom").style.display = 'none';
		document.getElementById("base").style.background = '#53739B';
		$("#full-screen-background-image").fadeOut(600);
		document.getElementById("sayHi").style.display = 'none';
		document.getElementById("prompt-game").style.display = 'none';
		document.getElementById("more").style.display = 'none';
		document.getElementById("seen").style.display = 'none';

		if (document.getElementById("chatDisconnected") != undefined)
			document.getElementById("chatDisconnected").style.display = 'none';

		if (document.getElementById("startNew") != undefined)
			document.getElementById("startNew").style.display = 'none';

		groupedChat();

		}

	}
*/


// End of start chat//



// Ajax part leave chat //

function leaveChat()

	{

	playTitleFlag = false;

	// xmlHttp3 = GetXmlHttpObject();



	// if (xmlHttp3 == null)

	// 	{

	// 	alert("Browser does not support HTTP Request");

	// 	return;

	// 	}



	// var url = "leaveChat.php?userId=" + userId+"&group=" + group;

	// xmlHttp3.open("POST", url, true);

	// xmlHttp3.onreadystatechange = stateChanged3;

	// xmlHttp3.send(null);

	}


/*
function stateChanged3()

	{

	}
*/


// End of leave chat//



// Ajax part grouped chat //

function groupedChat()

	{

	xmlHttp4 = GetXmlHttpObject();



	if (xmlHttp4 == null)

		{

		alert("Browser does not support HTTP Request");

		return;

		}



	var url = "groupedChat.php?userId=" + userId+"&group=" + group;

	xmlHttp4.open("POST", url, true);

	xmlHttp4.onreadystatechange = stateChanged4;

	xmlHttp4.send(null);

	}


/*
function stateChanged4()

	{

	if (xmlHttp4.readyState == 4 || xmlHttp4.readyState == "complete")

		{

		strangerId = trim(xmlHttp4.responseText);



		if (strangerId != "0")

			{

			document.getElementById("sendbtn").disabled = false;

			document.getElementById("chatmsg").disabled = false;

			document.getElementById("disconnectbtn").disabled = false;

			document.getElementById("prompt-game").style.display = 'block';
			
			document.getElementById("waiting-game").style.display = 'none';

			document.getElementById("sayHi").style.display = 'block';

			document.getElementById("connecting").style.display = 'none';

			document.getElementById("looking").style.display = 'none';



			listenToReceive();

			isTyping();

			}



		else

			{

			window.setTimeout("groupedChat();", 2000);

			}

		}

	}
*/


// Ajax part random chat //

function listenToReceive()

	{

	xmlHttp5 = GetXmlHttpObject();



	if (xmlHttp5 == null)

		{

		alert("Browser does not support HTTP Request");

		return;

		}



	var url = "listenToReceive.php?userId=" + userId+"&group=" + group;

	xmlHttp5.open("POST", url, true);

	xmlHttp5.onreadystatechange = stateChanged5;

	xmlHttp5.send(null);

	}

socket.on('userdisconnected', function(socketId){
	console.log("userdisconnected")
	document.getElementById("sendbtn").disabled = true;

	document.getElementById("chatmsg").disabled = true;

	document.getElementById("disconnectbtn").disabled = true;

	document.getElementById("sayHi").style.display = 'none';

	document.getElementById("chatDisconnected").style.display = 'block';

	document.getElementById("logbox").innerHTML

		+= "<div id='startNew' class='logitem'><div><input value='Start a new conversation' onclick='startNewChat();' type='button'> or <a href='http://share.blahtherapy.com/'>SHARE - Your BLAH Therapy experience</a> And get to know other listeners!</div></div>";

	document.getElementById("logbox").scrollTop = document.getElementById("logbox").scrollHeight;

})
/*
function stateChanged5()

	{

	if (xmlHttp5.readyState == 4 || xmlHttp5.readyState == "complete")

		{

		var msg = xmlHttp5.responseText;



		if (trim(msg) == "||--noResult--||")

			{

			// other party is disconnected//

			document.getElementById("sendbtn").disabled = true;

			document.getElementById("chatmsg").disabled = true;

			document.getElementById("disconnectbtn").disabled = true;

			document.getElementById("sayHi").style.display = 'none';

			document.getElementById("chatDisconnected").style.display = 'block';

			document.getElementById("logbox").innerHTML

				+= "<div id='startNew' class='logitem'><div><input value='Start a new conversation' onclick='startNewChat();' type='button'> or <a href='http://share.blahtherapy.com/'>SHARE - Your BLAH Therapy experience</a> And get to know other listeners!</div></div>";

			document.getElementById("logbox").scrollTop = document.getElementById("logbox").scrollHeight;

			leaveChat();



			return;

			}



		else if (trim(msg) != "" && msg != undefined)

			{

			// Message received //

			document.getElementById("logbox").innerHTML

				+= "<div class='logitem'><div class='strangermsg'><span class='msgsource'><strong>Stranger</strong>(#" + strangerId + ")</span> &nbsp;"

					   + msg + "</div></div>";

			document.getElementById("logbox").scrollTop = document.getElementById("logbox").scrollHeight;

			playTitleFlag = true;

			playTitle();
			
			}



		window.setTimeout("listenToReceive();", 2000);

		}

	}
*/


// End of random chat//



// Ajax part send chat message //

function sendMsg()

	{

	var msg = document.getElementById("chatmsg").value;



	if (trim(msg) != "")

		{
			msg = $('<div/>').text(msg).html()
			socket.emit('sendchat', msg)
			appendMyMessage();
		}

	}


/*
function stateChanged6()

	{

	

	}
*/


// End of send chat message//



//function to append my message to the chat area//

function appendMyMessage()

	{

	var msg = document.getElementById("chatmsg").value;
	msg = $('<div/>').text(msg).html()


	if (trim(msg) != "")

		{

		document.getElementById("logbox").innerHTML

			+= "<div class='logitem'><div class='youmsg'><span class='msgsource'><strong>You</strong>(#" +userId+ ")</span> " + msg

				   + "</div></div>";

		document.getElementById("logbox").scrollTop = document.getElementById("logbox").scrollHeight;

		}

	}



//function to disconnect

function disconnect()

	{
	console.log('function disconnect')
	var flag = confirm("Are you sure you want to be disconnected from this chat?");



	if (flag)

		{

		socket.disconnect()

		document.getElementById("sendbtn").disabled = true;

		document.getElementById("chatmsg").disabled = true;

		document.getElementById("disconnectbtn").disabled = true;



		document.getElementById("sayHi").style.display = 'none';

		document.getElementById("chatDisconnected").style.display = 'block';

		}

	}



//function to send on pressing Enter Key//

function tryToSend(event)

	{

	var key = event.keyCode;



	if (key == "13")

		{

		sendMsg();

		document.getElementById("chatmsg").value = "";

		var evt = event?event:window.event;

		evt.returnValue = false;

		if (evt.preventDefault) {evt.preventDefault( );return;}

		else {return false;}

		return;

		}



	var msg = document.getElementById("chatmsg").value;



	if (trim(msg) != "")

		{

		typing();

		}



	else

		{

		stopTyping();

		}

	}





// Ajax part to indicat user is typing //

function typing()

	{
		socket.emit('typing', true)
	}

// End of indicat user is typing //





// Ajax part to indicat user is not typing //

function stopTyping()

	{
		socket.emit('typing', false)
	}

// End of indicat user is not typing //



// Ajax to see if stranger is typing//
socket.on('isTyping', function(isTyping){
	if(isTyping){
		document.getElementById("typing").style.display = 'block';
	} else {
		document.getElementById("typing").style.display = 'none';
	}
})

//Ajax to see if stranger is typing//



// to start new chat //

function startNewChat()

	{
		location.reload();
	}



// function to trim strings

function trim(sVal)

	{
	var sTrimmed = "";



	for (i = 0; i < sVal.length; i++)

		{

		if (sVal.charAt(i) != " " && sVal.charAt(i) != "\f" && sVal.charAt(i) != "\n" && sVal.charAt(i)

																							 != "\r"

			&& sVal.charAt(i) != "\t")

			{

			sTrimmed = sTrimmed + sVal.charAt(i);

			}

		}



	return sTrimmed;

	}



// function to play title //

function playTitle()

	{

	document.title = "BlahTherapy";

	window.setTimeout('document.title="*New Message* BlahTherapy";', 1000);

	window.setTimeout('document.title="BlahTherapy";', 3000);



	if (playTitleFlag == true)

		{

		window.setTimeout('playTitle();', 4000);

		}

	}



// function to detect if browser has focus

window.onfocus = function()

	{

	playTitleFlag = false;

	}

