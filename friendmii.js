var personArray = [];
var offScreenArray = [];
var updateTimer;
var dragTimer;
var mouseX = 0;
var mouseY = 0;
var teststring = '<span class="testclick"><img style="float:left; margin-right:5px;width:70px;height:70px;" src="ProfileIcon.png" /><h4 style="margin-top: 0px;">TestGuy</h4>Il vit dans toutes les eaux tempéréesou tropicales, où il flotte à la surface des eaux parmi le pleuston, face ventrale tournée vers la surface. Il se nourrit principalement d’hydrozoaires dont il tire son pouvoir urticant, y compris pour l’Homme, en conservant certains nématocystes. Il est hermaphrodite et des chapelets d’œufs sont pondus à la dérive ou fixés sur les cadavres des proies des adultes.</span>';

var moveTarget;

document.observe("dom:loaded", function() {
	var test = new Array();
	var p1 = new Object();
	p1.nameOfPoster = "Test Girl";
	p1.message = "hai guyz <3<3<#";
	p1.gender = false;
	p1.picture = "http://northparkhigh.com/wp-content/uploads/avatars/3/3f151171aaf79e9dc1e77eedf8de1f17-bpfull.jpg";
	p1.link = "http://lol.com";
	p1.postTime = "2011-10-15T18:50:32+0000";
	test.push(p1);
	
	var p2 = new Object();
	p2.nameOfPoster = "Test Guy";
	p2.message = "sup br0";
	p2.gender = true;
	p2.picture = "http://walyou.com/wp-content/uploads/2009/05/facebook-profile-popup-41.jpg";
	p2.link = "http://lol.com";
	p2.postTime = "2011-10-15T18:50:32+0000";
	test.push(p2);
	startAnimations(test);
});

function facemiibar() {
	$$("body")[0].style.margin = "0px";
	var bar = $(document.createElement("div"));
	bar.style.backgroundColor = "#3B5998";
	bar.style.position = "fixed";
	bar.style.bottom = "0px";
	bar.style.height = "25px";
	bar.style.width = "100%";
	bar.className = "facemii";
	bar.style.zIndex = "100";
	$$("body")[0].appendChild(bar);
	
	var img = $(document.createElement("img"));
	img.src = "http://spotcos.com/friendmii/facemii.png";
	img.style.height = "21px";
	img.style.float = "left";
	bar.appendChild(img);
	
	var close = $(document.createElement("a"));
	close.innerHTML = "X";
	close.href = "#";
	close.style.color = "white";
	close.style.cssFloat = "right";
	close.style.marginTop = "3px";
	
	close.observe("click", function(){
		for(var i = 0; i < $$(".facemii").length; i++) {
			$$(".facemii")[i].style.display = "none";
		}
		clearInterval(updateTimer);
	});
	
	bar.appendChild(close);
	
}
		
function startAnimations(persons) {
	$$("html")[0].observe("mousemove",mousemove);
	for (var i = 0; i < persons.length; i++) {
		//alert(persons[i].gender);
		var newguy = new PersonObject(0,0,persons[i].nameOfPoster,persons[i].message,persons[i].gender,persons[i].picture,persons[i].link,persons[i].postTime);
		newguy.update = guyupdate;
		newguy.updateAnimation =  guyupdateanimate;
		offScreenArray.push(newguy);
		
		/*personArray.push(newguy);
		$$("body")[0].appendChild(newguy.displayContainer);*/
	}
	facemiibar();
	updateTimer = setInterval(update,40);
}


function mousedown(e) {
	if (!moveTarget) {
		moveTarget = findPersonInArray(this);
		moveTarget.stopGravity = true;
		dragTimer = setInterval(dragUpdate,20);
		$$("html")[0].observe("mouseup",dragClear);
	}
}

function dragClear() {
	if (!moveTarget) {
		return;
	}
	$$("html")[0].stopObserving("mousedown",dragClear);
	moveTarget.stopGravity = false;
	clearInterval(dragTimer);
	moveTarget = null;	
}

var vavg1 = [0,0];
var vavg2 = [0,0];
var vavg3 = [0,0];

function dragUpdate() {
	if (moveTarget) {
		
		updatevavg(mouseX -28 - moveTarget.x,mouseY-95 - moveTarget.y);
		//moveTarget.vx = mouseX -28 - moveTarget.x;
		//moveTarget.vy = mouseY-95 - moveTarget.y;
		if (Math.abs(moveTarget.vx) > 8) {
			moveTarget.vx = moveTarget.vx * (8/Math.abs(moveTarget.vx));
		}
		if (Math.abs(moveTarget.vy > 5)) {
			moveTarget.vy = moveTarget.vy * (5/Math.abs(moveTarget.vy));
		}
		moveTarget.x = mouseX -28;
		moveTarget.y = mouseY-90;
	}
}

function updatevavg(vx,vy) {
	vavg3[0] = vavg2[0]; vavg3[1] = vavg2[1];
	vavg2[0] = vavg1[0]; vavg2[1] = vavg1[1];
	vavg1[0] = vx; vavg1[1] = vy;
	
	moveTarget.vx = (vavg3[0] + vavg2[0] + vavg1[0])/3;
	moveTarget.vy = (vavg3[1] + vavg2[1] + vavg1[1])/3;
}

var counter = 0;
function mousemove(e) {
	counter++;
	if (counter > 10) {
		counter = 0;
	} else {
		return;
	}
	mouseX = e.clientX + document.body.scrollLeft;
	mouseY = window.innerHeight - (e.clientY/* - document.body.scrollTop*/);
	dragUpdate();

}

function findPersonInArray(target) {
	for (var i = 0; i < personArray.length; i++) {
		if (target == personArray[i].displayDomObject) {
			return personArray[i];
		}
	}
}

function update() {
	if ((  (personArray.length < 6 && Math.floor(Math.random()*500) > 496) || personArray.length == 0) && offScreenArray.length > 0) {
		var addguy = offScreenArray.shift();
		
		if (Math.random()*2 > 1) {
			addguy.x = 0; addguy.y = 0;
			addguy.vx = 4;
		} else {
			addguy.x = window.innerWidth; addguy.y = 0;
			addguy.vx = -4;
		}
		addguy.initTime = 100;
		personArray.push(addguy)
		$$("body")[0].appendChild(addguy.displayContainer);
	}
	for (var i = 0; i < personArray.length; i++) {
		personArray[i].update();
		if (personArray.length >= 1 && (personArray[i].x < 3 || personArray[i].x > window.innerWidth-100) && personArray[i].initTime < 5) {
			var stoGender = personArray[i].gender;
			var stoDisplayMessageBox = personArray[i].displayMessageBox;
			var stoDisplayDomObject = personArray[i].displayDomObject;
			
			var dc = personArray[i].displayContainer.remove();
			var removedguy = personArray.splice(i,1);
			removedguy.displayContainer = dc;
			offScreenArray.push(removedguy);
			removedguy.update = guyupdate;
			removedguy.updateAnimation =  guyupdateanimate;
			removedguy.displayMessageBox = stoDisplayMessageBox;
			removedguy.setPosition = guysetposition;
			removedguy.displayDomObject = stoDisplayDomObject;
			removedguy.y = 0; removedguy.vy = -2;
			removedguy.gender = stoGender;
			
			/*personArray[i].displayContainer.remove();
			var removedguy = personArray.shift();
			offScreenArray.push(removedguy);
			removedguy.y = 0; removedguy.vy = -2;*/
			
			return;
		}
	}
	
}


//start def PersonObject, 
//fields: x,y -> position of the sprite, x+ is right, y+ is up
//vx,vy
//showMessageBox -> boolean
//displayContainer -> overallContainer
//displayDomObject -> dom object of sprite <img> tag, child of container
//displayMessageBox -> dom object of message box <span> tag, child of container
//gender true male, false female
function PersonObject(x,y,name,message,gender,picture,link,time) {
	this.walkdirection = 0;
	this.initTime = 0;
	this.gender = gender;
	
	this.displayContainer = $(document.createElement("div"));
	this.displayContainer.style.position = "fixed";
	this.displayContainer.style.whiteSpace = "nowrap";
	this.displayContainer.style.width = "78px";
	this.displayContainer.className="facemii";
	this.displayContainer.style.zIndex = "100";
	
	/*
	this.hitBox = $(document.createElement("div"));
	this.hitBox.style.display = "inline-block";
	this.hitBox.style.width = "77px";*/
	
	this.displayDomObject = $(document.createElement("img"));
	if (this.gender) {
		this.displayDomObject.src = "http://www.spotcos.com/friendmii/guystand.gif";
	} else {
		this.displayDomObject.src = "http://www.spotcos.com/friendmii/girlstand.gif";
	}
	this.displayDomObject.observe("mousedown",mousedown);
	

	this.displayDomObject.oncontextmenu = "return false;";
	
	//this.hitBox.appendChild(this.displayDomObject);
	
	
	this.displayMessageBox = $(document.createElement("span"));
	this.displayMessageBox.style.position = "relative";
	this.displayMessageBox.style.top = "-90px";
	this.displayMessageBox.style.left = "-117px";
	this.displayMessageBox.style.visibility = "hidden";
	
	var speechbubble = $(document.createElement("img"));
	speechbubble.src = "http://spotcos.com/friendmii/testmessagebox.png";
	this.displayMessageBox.appendChild(speechbubble);
	
	var speechbubblediv = $(document.createElement("div"));
	speechbubblediv.style.position = "relative";
	speechbubblediv.style.left = "59px";
	
	speechbubblediv.style.top = "-180px";
	speechbubblediv.style.width = "256px";
	speechbubblediv.style.height = "131px";
	
	speechbubblediv.style.overflow = "auto";
	speechbubblediv.style.whiteSpace = "normal";
	var lucidia = "\"lucida grande\"";
	var textspan = '<span style="font-family:tahoma,verdana,arial,sans-serif">';
	var profileimg = '<img style="float:left;vertical-align:top;width:50px;height:50px;margin-right:5px;"src="'+picture+'" />';
	
	var bigdate = time.split("T")[0];
	bigdate = bigdate.replace("-","/");bigdate = bigdate.replace("-","/");
	bigdate = bigdate.split("/")[1] +"/"+bigdate.split("/")[2];
	
	//p1.postTime = "2011-10-15T18:50:32+0000";
	var smalltime = (time.split("+")[0]).split("T")[1];
	var hour = smalltime.split(":")[0];
	var ampm = " am";
	if (hour > 12) {
		hour = hour - 12;
		ampm = " pm";
	}
	var min = smalltime.split(":")[1];
	bigdate = "  at "+hour+":"+min+ampm+" on "+ bigdate;
	
	
	var posttime = '<em style="font-size:9px;vertical-align:4px;">'+bigdate+"</em>"
	speechbubblediv.innerHTML = textspan+'<h3 style="margin-top:0px; margin-bottom:3px;color:#3B5998;">'+profileimg+'<a href="'+link+'" style="color:#3B5998;text-decoration:none;" target="_blank">'+name+"</a>"+posttime+"</h3>"+message+'</span>';
	this.displayMessageBox.appendChild(speechbubblediv);
	
	this.displayContainer.appendChild(this.displayDomObject);
	this.displayContainer.appendChild(this.displayMessageBox);
	
	
	this.showMessageBox = false;
	this.x = x;
	this.y = y;
	
	this.vx = 0;
	this.vy = 0;
	
	this.setPosition();
}

//call this function to update
PersonObject.prototype.setPosition = guysetposition;

function guysetposition(){
	this.displayContainer.style.bottom = this.y + (-131) + 18 + "px";
	this.displayContainer.style.left = this.x + "px";
}

//PersonObject.prototype.update = guyupdate;
	
function guyupdate() {
	if (this.initTime > 0) {
		this.initTime--;
	}
	if (!this.stopGravity) {
		this.y+=this.vy;
		this.x+=this.vx;
		this.vy-=1;
	}
	if (this.y < 0) {
		this.y = 0;
		this.vy = 0;
		if (Math.abs(this.vx) > 3) {
			this.vx = this.vx*(0.8);
		}
	}
	if (this.x < 0) {
		this.x = 1;
		this.vx = -this.vx*0.5;
	} else if (this.x > window.innerWidth-50) {
		this.x = window.innerWidth-52;
		this.vx = -this.vx*0.5;
	} else if (this.y > window.innerHeight-80) {
		this.y = window.innerHeight-82;
		this.vy = -this.vy*0.5;
	}
	
	if (Math.random()*1000 > 990 && this.y < 5 && this.initTime <= 0) {
		this.vx = Math.round(Math.random()*5) - 2;
	}
	
	if (this.vx == 0 && Math.abs(this.vy) < 4) {
		this.showMessageBox = true;
	} else {
		this.showMessageBox = false;
	}
	
	if (this.stopGravity) {
		this.showMessageBox = false;
	}
	
	this.updateAnimation();
	this.setPosition();
}
//1R, 2L, 0S, 3W, 4fall
//PersonObject.prototype.updateAnimation =  guyupdateanimate;

function guyupdateanimate() {
	var newdirection = -1;
	if (this.stopGravity) {
		newdirection = 3;
	} else if (Math.abs(this.vy) > 3) {
		newdirection = 4;
	} else if (this.vx > 0) {
		newdirection = 1;
	} else if (this.vx < 0) {
		newdirection = 2;
	} else {
		newdirection = 0;
	}
	if (newdirection != this.walkdirection) {
		this.walkdirection = newdirection;
		if (newdirection == 3) {
			if (this.gender) {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/guywriggle.gif";
			} else {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/girlwriggle.gif";
			}
		} else if (newdirection == 1) {
			if (this.gender) {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/guywalkright.gif";
			} else {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/girlwalkright.gif";
			}
		} else if (newdirection ==2) {
			if (this.gender) {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/guywalkleft.gif";
			} else {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/girlwalkleft.gif";
			}
		} else if (newdirection ==4) {
			if (this.gender) {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/guyfall.gif";
			} else {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/girlfall.gif";
			}
		} else {
			if (this.gender) {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/guystand.gif";
			} else {
				this.displayDomObject.src = "http://www.spotcos.com/friendmii/girlstand.gif";
			}
		}
	}
	
	if (this.showMessageBox) {
		this.displayMessageBox.style.visibility = "visible";
	} else {
		this.displayMessageBox.style.visibility = "hidden";
	}
}
//end def PersonObject

var Unselectable = {
		enable : function(e) {
			var e = e ? e : window.event;
	 
			if (e.button != 1) {
				if (e.target) {
					var targer = e.target;
				} else if (e.srcElement) {
					var targer = e.srcElement;
				}
	 
				var targetTag = targer.tagName.toLowerCase();
				if ((targetTag != "input") && (targetTag != "textarea")) {
					return false;
				}
			}
		},
	 
		disable : function () {
			return true;
		}
	}
if (typeof(document.onselectstart) != "undefined") {
	document.onselectstart = Unselectable.enable;
} else {
	document.onmousedown = Unselectable.enable;
	document.onmouseup = Unselectable.disable;
}