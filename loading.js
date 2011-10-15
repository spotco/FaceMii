	//background
	var cover = document.createElement("div");
	cover.style.opacity = ".25"; //test
	cover.style.zIndex = "1000";
	cover.style.position = "absolute";
	cover.style.top = "0px";
	cover.style.left = "0px";
	cover.style.width = "1500px";
	cover.style.height = "800px";
	cover.style.backgroundColor = "black";
	//make loading box
	var loadingScreen = document.createElement("div"); 
	loadingScreen.setAttribute("id","facemiiloading");
	loadingScreen.style.height = "50px"; 
	loadingScreen.style.width = "400px";
	loadingScreen.style.position = "absolute";
	loadingScreen.style.fontSize = "28pt";
	loadingScreen.style.paddingBottom = "5px";
	loadingScreen.style.opacity = ".5"; //test
	loadingScreen.style.color = "white";
	loadingScreen.style.MozBorderRadius = "0px 6px 6px 0px";
	loadingScreen.style.borderRadius = "0px 6px 6px 0px";
	loadingScreen.style.border = "2px solid white";
	loadingScreen.style.top = "350px";
	loadingScreen.style.left = "0px";
	loadingScreen.style.zIndex = "1001";
	 
	loadingScreen.style.backgroundColor = "#3B5998";
	
	
	//make image Loader
	var loadingGif = document.createElement("img"); 
	loadingGif.style.verticalAlign = "text-top";
	loadingGif.setAttribute("id","facemiigifloader");
	loadingGif.setAttribute("src","http://www.simonfarrell.com/Content/Images/loader.gif");

	//append elements
	loadingScreen.innerHTML = "";
	loadingScreen.appendChild(loadingGif) 
	loadingScreen.innerHTML += "Sending Request...";
	document.body.appendChild(cover);
	document.body.appendChild(loadingScreen);