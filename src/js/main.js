var neededFiles;
var downloadedFiles = 0;

/*
	Called at the start, when the loading screen finishes loading all assets.
	
	serverName - Server's name.
		Convar: hostname
		For exmaple: "Garry's Mod Server"
	serverURL - URL for the loading screen. 
		Convar: sv_loadingurl
		For example: "http://mywebsite.com/myloadingscreen.html"
	mapName - The name of the map the server is playing. 
		For example: "cs_office"
	maxPlayers - Maximum number of players for the server.
		Convar: maxplayers
	steamID - 64-bit, numeric Steam community ID of the client joining. 
		For example: 76561198012345678
	gamemode - The gamemode the server is currently playing. 
		Convar: gamemode
		For example: "deathrun"
	volume - The value of the player's in-game 'volume' console variable, from 0 to 1
	language - The value of the player's in-game 'gmod_language' console variable, a two letter representation of the player's main menu language
*/
function GameDetails( servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language ) {
	$("audio").prop('volume', Math.max(parseFloat(volume), 0.5))
}

/*
	Called when the client starts downloading a file.

	fileName- The full path and name of the file the client is downloading.
		This path represents the resource's location rather than the actual file's location on the server.
		For example, the file "garrysmod/addons/myAddon/materials/models/bobsModels/car.mdl" will be:
			"materials/models/bobsModels/car.mdl"
*/
function DownloadingFile( fileName ) {
	downloadedFiles++;
	refreshProgress();
}

/*
	Called when the client's joining status changes.

	status- Current joining status.
		For example: "Starting Lua..."

	Under normal conditions this would not be fired until game client starts interacting with server files/workshop. This
	means you probably can't use "Retrieving server info" and everything that goes before downloads.
*/
function SetStatusChanged( status ) {
    if (status.indexOf("Downloading the addon named : #") != -1) {
		downloadedFiles++;
		refreshProgress();
	}else if (status == "Sending Client Info") {
		setProgress(100);
	}
}

/*
	Called when the number of files remaining for the client to download changes.

	needed- Number of files left for the client to download.
*/
function SetFilesNeeded( needed ) {
    neededFiles = needed + 1;
}

/*
	Это деду надо блин
*/
function refreshProgress() {
	progress = Math.floor(((downloadedFiles / neededFiles)*100));

	$("#loading-progress").css("width", progress + "%");
}