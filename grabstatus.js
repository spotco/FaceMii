//
//grabstatus.js
//

var user_id;			//keeps track of logged user
var lastGrabMS;			//time of first feed query
var statusArray;		//holds the statuses
var WEB_SERVICE_URL = "http://thoughtcomet.com/grabstatus.php";
//var statusArraySize;	//counts how many statuses are in the array

		
		
		function makeData(json) {
			loadingScreen.innerHTML = "";
			loadingScreen.appendChild(loadingGif) 
			loadingScreen.innerHTML += "Preparing Data...";
			statusArray = new Array();
			for (var i = 0; i < json.data.length; i++) {
				if(json.data[i].type == "status" && json.data[i].message) {
					var statusObject = new Object();
					statusObject.nameOfPoster = json.data[i].from.name;								//person name
					statusObject.message = json.data[i].message;									//status
					statusObject.postTime = json.data[i].created_time;								//when
					statusObject.gender = true;														//generic gender (male)
					//getting id's
					var id = json.data[i].id;
					var pieces = id.split("_");
					statusObject.posterID = pieces[0];												//person id
					statusObject.picture = "http://graph.facebook.com/" + pieces[0]+ "/picture";												
					statusObject.postID = pieces[1];												//status id
					statusObject.link = "http://facebook.com/" + pieces[0];							//profile link
					statusArray.push(statusObject);
				}
			}
		}
		
		function makeGender(json){
			loadingScreen.innerHTML = "";
			loadingScreen.appendChild(loadingGif);
			loadingScreen.innerHTML += "Setting Char Type...";
			for(var i = 0; i < statusArray.length; i++) {
				if(statusArray[i].posterID == json.id) {
					if(json.gender == "female") {
						statusArray[i].gender = false;
					}
					break;
					alert(
					"Name: " + statusArray[i].nameOfPoster +
					"Picture: " + statusArray[i].picture +
					"Link: " + statusArray[i].link +
					"Gender: " + statusArray[i].gender
					);
				}
			}
		}
		
		
		function render() {
			loadingScreen.innerHTML = "";
			loadingScreen.appendChild(loadingGif) 
			loadingScreen.innerHTML += "Rendering...";
			var oldLoader = document.getElementById("facemiiloading");
			document.body.removeChild(oldLoader);
			document.body.removeChild(cover);
			startAnimations(statusArray); //calls shiny's code
			//Wait 10 sec 1s = 1000ms
			/*
			setTimeout(function(){
				var url = "http://spotcos.com/friendmii/grabstatus.php?callback1=makeData&callback2=makePicAndGender";   	
				var s = document.createElement('script'); 	
				s.setAttribute('src', url);
				document.body.appendChild(s);  
				void(0);
			},100000)
			*/
		}
		
		//Post:	
		function error(url) {
			alert("error loading scripts, try this url: " + url); 
		}
		
		//Post:	
		function login(url) {
			//current page
			var currentPage = window.location.href;
			window.open(url,'_newtab');
			//alert("error logging in, try here: " + url); 
		}
		











