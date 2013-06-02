function alreadyIncluded(){
	return true;
}

function bootstrap(Bouvardiaversion){
	
	game_information = [];
	
	game_information["name"] = "Bouvardia Test Game"
	game_information["publisher"] = "Bouvardia Team"
	game_information["copyright"] = "Copyright TDLive.org Incorporated"
	game_information["version"] = "1.0"
	
	game_information["introduction"] = "This is a test game to show off the features of Bouvardia."
	
	room_zero = [];
	
	room_zero["name"] = "Room Zero";
	room_zero["description"] = "This. Is. Room. Zero.";
	room_zero["connectsWest"] = undefined;
	room_zero["connectsEast"] = 1;
	room_zero["connectsNorth"] = undefined;
	room_zero["connectsSouth"] = undefined;
	room_zero["item"] = 0;
	room_zero["requiredItem"] = undefined;
	
	addRoom(room_zero);
	
	room_1 = []
	
	room_1["name"] = "Room One";
	room_1["description"] = "This. Is. Room. One.";
	room_1["connectsWest"] = 0;
	room_1["connectsEast"] = undefined;
	room_1["connectsNorth"] = undefined;
	room_1["connectsSouth"] = undefined;
	room_1["item"] = undefined;
	room_1["requiredItem"] = 0;
	
	addRoom(room_1);
	
	item_0 = []
	item_0["name"] = "Room One Key";
	
	addItem(item_0);
	return true;
}