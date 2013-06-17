function showCommonLocations(){
	alert("Common locations for Bouvardia data files are js/data.js, js/game.js, data.js, game.js");
}
function loader(){

	$("#hidden").focus();
	version = "0.1";
	series = "dev";
	rooms = [];
	items = [];
	inventory = [];
	Bouvardia = false;
	$("#console").html("");
	$("#textbox").html("_");
	message("Bouvardia VM");
	message("Copyright (c)2013 TDLive.org, Incorporated.");
	try {
		alreadyIncluded();
	}
	catch(e) {
		message("<b>NOTE</b>: No file(s) loaded. Type load file-location to load a file.");
	}
	
}

function message(msg){

	consol = $("#console").html();
	consol = consol + "<br>" + msg;
	$("#console").html(consol);
	return true;

}

function addItem(itemdata){

	items.push(itemdata);

}

function updateCommand(key2add){
	if( $("#textbox").html() == "_"){
			$("#textbox").html("");
	}
	consol = $("#textbox").html();
	consol = consol + key2add;
	$("#textbox").html(consol);
	return true;

}

function addInventoryItem(id){

	itemInRoom = false;
	message("You got a " + items[id]["name"] + "!");
	inventory.push(id);

}

// name, description, connectsWest, connectsEast, connectsNorth, connectsSouth
function addRoom(roomdata){

	rooms.push(roomdata);

}

function room(id){

	currentRoom = id;
	
	message("");
	message(rooms[id]["name"]);
	message("");
	message(rooms[id]["description"]);
	
	var to_send = "You can go: "
	
	if( ! isNaN(rooms[id]["connectsNorth"])){
		var to_send = to_send + "north "
	}
	if( ! isNaN(rooms[id]["connectsEast"])){
		var to_send = to_send + "east "
	}
	if( ! isNaN(rooms[id]["connectsSouth"])){
		var to_send = to_send + "south "
	}
	if( ! isNaN(rooms[id]["connectsWest"])){
		var to_send = to_send + "west"
	}
	
	
	if( ! isNaN(rooms[id]["item"])){
		hasItem = false;
		inventory.forEach(function(element, index, array){ if(element == rooms[id]["item"]){ hasItem = true; } else{ hasItem = false; }})
		if(! hasItem){
			itemInRoom = true;
			itempu = rooms[id]["item"];
			var to_send = to_send + "<br><br>There is a " + items[rooms[id]["item"]]["name"] + " in here!";
		}
		else{
			itemInRoom = false;
		}
	}
	else{
		itemInRoom = false;
	}
	
	message("");
	message(to_send);

}

function go(direction){
	if( ! Bouvardia){
		message("No data files have been loaded yet. Please load the game first by typing 'play'.");
	}
	
	if( isNaN(rooms[currentRoom]["connects" + direction])){
		message("You try to go " + direction + ", but run into a wall.");
	}
	if(! isNaN(rooms[rooms[currentRoom]["connects" + direction]]["requiredItem"])){
		hasItem = false;
		inventory.forEach(function(element, index, array){ if(element == rooms[currentRoom]["item"]){ hasItem = true; } else{ hasItem = false; }})
		if(! hasItem){
			message("Sorry, but you need a " + items[rooms[rooms[currentRoom]["connects" + direction]]["requiredItem"]]["name"] + " to enter this room.");
		}
		else{
			room(rooms[currentRoom]["connects" + direction]);
		}
	}
	else{
		room(rooms[currentRoom]["connects" + direction]);
	}
}

function processCommand(){
	cmd = $("#textbox").html();
	cmd = cmd.split(" ");
	if(cmd[0] == "a"){
		message("A. Just the letter A.");
	}
	else if(cmd[0] == "version"){
		message("");
		message("This is Bouvardia-" + version + ".");
		var v2=version.split(".");
		message("major " + v2[0] + ", minor " + v2[1] + ", " + series + " series");
		message("");
		message("Copyright (c)2013 TDLive.org Incorporated. All rights reserved.");
		message("");
	}
	else if(cmd[0] == "north" || cmd == "n" || cmd == "up") go("North");
	else if(cmd[0] == "south" || cmd == "s" || cmd == "down") go("South");
	else if(cmd[0] == "east" || cmd == "e" || cmd == "right") go("East");
	else if(cmd[0] == "west" || cmd == "w" || cmd == "left") go("West");
	else if(cmd[0] == "load"){
		if(cmd[1] == "gh"){
			var imported = document.createElement('script');
			imported.src = "https://raw.github.com/TDLive-Inc/Bouvardia-Games/master/" + cmd[2] + ".js";
			document.head.appendChild(imported);
			message("Loaded! Type 'play' to play.");
		}
		else if(cmd[1] == "cb"){
			if(clipsupport){
				message("Please accept this clipboard request in order for us to get the text from your clipboard. Don't worry, it's only used this one time :)");
				try {
					site = window.clipboardData.getData('Text');
					var imported = document.createElement('script');
					imported.src = site;
					document.head.appendChild(imported);
					message("Loaded! Type 'play' to play.");
				}
				catch(e) {
					message("Sorry, we couldn't get the text from your clipboard. :(");
				}
			}
			else{
				message("Only Internet Explorer has clipboard support. Sorry :(");
			}
		}
		else{
			var imported = document.createElement('script');
			imported.src = cmd[1];
			document.head.appendChild(imported);
			message("Loaded! Type 'play' to play.");
		}
	}
	else if(cmd[0] == "pickup"){
		if(itemInRoom){
			addInventoryItem(itempu);
		}
		else{
			message("There's nothing here to pick up.");
		}
	}
	else if(cmd[0] == "play"){
		if( ! Bouvardia){
			try{
				bootstrap(version);
				Bouvardia = true;
				message("");
				if(game_information["fancy_introduction"]){
					message("<b>" + game_information["publisher"] + " presents</b>");
					message("<b><u>" + game_information["name"] + "</b></u> <i>" + game_information["version"] + "</i>");
					message(game_information["copyright"]);
					message("");
				}
				message(game_information["introduction"]);
				room(0);
			}
			catch(e){
				message("Error loading file!")
				message(e)
				message("Check that the file exists. It may be a problem with the file.")
			}
		}
		else{
			message("Bouvardia: Game files already loaded.");
		}
	}
	else{
		message("Ehh, wot?");
	}
	$("#textbox").html("_");
}
$(document).keypress(function(event) {

	if(event.which == 32){
		updateCommand(" ");
	}
	if(event.which == 33){
		updateCommand("!");
	}
	if(event.which == 35){
		updateCommand("#");
	}
	if(event.which == 45){
		updateCommand("-");
	}
	if(event.which == 46){
		updateCommand(".");
	}
	if(event.which == 47){
		updateCommand("/");
	}
	if(event.which == 48){
		updateCommand("0");
	}
	if(event.which == 49){
		updateCommand("1");
	}
	if(event.which == 50){
		updateCommand("2");
	}
	if(event.which == 51){
		updateCommand("3");
	}
	if(event.which == 52){
		updateCommand("4");
	}
	if(event.which == 53){
		updateCommand("5");
	}
	if(event.which == 54){
		updateCommand("6");
	}
	if(event.which == 55){
		updateCommand("7");
	}
	if(event.which == 56){
		updateCommand("8");
	}
	if(event.which == 57){
		updateCommand("9");
	}
	if(event.which == 58){
		updateCommand(":");
	}
	if(event.which == 63){
		updateCommand("?");
	}
	if(event.which == 64){
		updateCommand("@");
	}
	if(event.which == 97){
		updateCommand("a");
	}
	if(event.which == 98){
		updateCommand("b");
	}
	if(event.which == 99){
		updateCommand("c");
	}
	if(event.which == 100){
		updateCommand("d");
	}
	if(event.which == 101){
		updateCommand("e");
	}
	if(event.which == 102){
		updateCommand("f");
	}
	if(event.which == 103){
		updateCommand("g");
	}
	if(event.which == 104){
		updateCommand("h");
	}
	if(event.which == 105){
		updateCommand("i");
	}
	if(event.which == 106){
		updateCommand("j");
	}
	if(event.which == 107){
		updateCommand("k");
	}
	if(event.which == 108){
		updateCommand("l");
	}
	if(event.which == 109){
		updateCommand("m");
	}
	if(event.which == 110){
		updateCommand("n");
	}
	if(event.which == 111){
		updateCommand("o");
	}
	if(event.which == 112){
		updateCommand("p");
	}
	if(event.which == 113){
		updateCommand("q");
	}
	if(event.which == 114){
		updateCommand("r");
	}
	if(event.which == 115){
		updateCommand("s");
	}
	if(event.which == 116){
		updateCommand("t");
	}
	if(event.which == 117){
		updateCommand("u");
	}
	if(event.which == 118){
		updateCommand("v");
	}
	if(event.which == 119){
		updateCommand("w");
	}
	if(event.which == 120){
		updateCommand("x");
	}
	if(event.which == 121){
		updateCommand("y");
	}
	if(event.which == 122){
		updateCommand("z");
	}
	if(event.which == 8){
		$("#textbox").html("_");
	}
	if(event.which == 13 ) {
		processCommand();
	}
});
