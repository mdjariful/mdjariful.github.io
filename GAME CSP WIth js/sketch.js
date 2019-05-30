

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDhtEHqwX2cQfy77zSYnMcJS-cirUx4si0",
    authDomain: "jsgame-22b2.firebaseapp.com",
    databaseURL: "https://jsgame-22b2.firebaseio.com",
    projectId: "jsgame-22b2",
    storageBucket: "jsgame-22b2.appspot.com",
    messagingSenderId: "301062952740",
    appId: "1:301062952740:web:018d48caa5eaa133"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()
let userinput = document.getElementById("userinput");



let x = 200;
let y = 60;
let x2 = 15;
let y2 = 59;
let x88 = 89;
let y88 = 300;
let x3 ;
let y3 ;
let direction_h;
let direction_v;
let direction_6;
let direction_7;
let direction;
let direction_1;
let score;
let enemy;
let level;
let size;
let time;
let scoreboard = {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  direction_h= 1;
  direction_v= 1;
  direction_6= 2;
  direction_7= 2;
  direction= [3,2.5,1,2];
  direction_1= [1.5,1.5,1,2];
  score= 0;
  x3 = [180,10,100,200];
  y3 = [230,100,100,300];
  enemy = 4;
  level = 1;
  size = 65;
  time = 20;
}

function draw() {
  background(40,90,30);
  if (time > 0) {
  fill(188);
  circle(x,y,50);
  fill(09);
  circle(x2,y2,45);
  x2 = x2 + 4* direction_h;
  y2 = y2 + 4* direction_v;
  if ( y2 > height || y2 < 0) {
  direction_v = direction_v * -1
  }
  if ( x2 > width || x2 < 0) {
  direction_h = direction_h * -1
  }
  
  fill(88);
  circle(x88,y88,45);
  x88 = x88 + 4* direction_6;
  y88 = y88 + 4* direction_7;
  if ( y88 > height || y88 < 0) {
  direction_7 = direction_7 * -1
  }
  if ( x88 > width || x88 < 0) {
  direction_6 = direction_6 * -1
  }
  
  
  for (i=0; i<enemy; i=i+1) {
    fill(159,78,78);
    square(x3[i], y3[i], size, 65);
    x3[i] = x3[i] + 3* direction[i];
    y3[i] = y3[i] + 3* direction_1[i];
    if ( y3[i] > height || y3[i] < 0) {
    direction_1[i] = direction_1[i] * -1
    }
    if ( x3[i] > width || x3[i] < 0) {
    direction[i] = direction[i] * -1
    }
    if (dist( x3[i], y3[i],x, y) < 50 + 45) {
	score = score - 1
    }
  }
  if (score > 100 && level == 1) {
    enemy = enemy + 1
    level = 2
  }
  
  x3.push.apply(x3, [340]);
  y3.push.apply(y3, [58]);
  direction.push.apply(direction, [2]);
  direction_1.push.apply(direction_1, [2]);
  
  if (score > 150 && level == 2) {
    enemy = enemy + 1
    level = 3
  }
  
  x3.push.apply(x3, [137])
  y3.push.apply(y3, [500])
  direction.push.apply(direction, [1])
  direction_1.push.apply(direction_1, [1])
  
  if (score > 200 && level == 3) {
    size = size + 30
    level = 4
  }
  if (score > 250 && level == 4) {
    enemy = enemy + 1
    level = 5
  }
  
  x3.push.apply(x3, [66]);
  y3.push.apply(y3, [300]);
  direction.push.apply(direction, [2]);
  direction_1.push.apply(direction_1, [2]);
  
  if (score > 300 && level == 5) {
    enemy = enemy + 1
    level = 6
  }
  
  x3.push.apply(x3, [58])
  y3.push.apply(y3, [210])
  direction.push.apply(direction, [1])
  direction_1.push.apply(direction_1, [1])
  
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 7
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 7
  }
  if (keyIsDown(UP_ARROW)) {
    y = y - 7
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 7
  }
  fill(0,0,0)
  textSize(30);
  text("Score: " + score, 10, 30);
  textSize(30);
  text("Level:" + level, 10,55);
  textSize(30);
  text("Time:" + time.toFixed(2), 10,80);
  
  if (dist( x2, y2,x, y) < 50 + 45) {
	score = score + 1
  }
  if (dist( x88, y88,x, y) < 50 + 45) {
	score = score + 2
  }
  time = time-.05
  }
  else{
    userinput.innerHTML = "Name? <input id='prompt'><button onclick='restart()'>Restart</button><button onclick=generate_alltime_leaderboard()>Leaderboard</button>"
    noLoop()

  }
}

function restart() { 
        let prompt = document.getElementById("prompt")
		name = prompt.value
        database.ref(name).set(score)
		if (name != ""){ 
			scoreboard[name] = score
		}
alert("Scoreboard:" + JSON.stringify(scoreboard,null,1)) 
		time = 20
		score = 0
		loop()
		userinput.innerHTML = ""
        generate_leaderboard()
}


function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i< 3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
