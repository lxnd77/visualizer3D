var song;
var SongFFT;
var spec;
var amp;
var amplitude;
var button;
var historySound = [];

function preload(){
  song = loadSound("come-home.mp3");
}
function setup() {

  //createCanvas(400, 400, WEBGL);
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  background(0,0,0);
  song.play();
  SongFFT = new p5.FFT(0.7,32);
  amp = new p5.Amplitude();
  song.setVolume(1.0);

}

function toggleSong(){
    if(song.isPlaying()){
      song.pause();
      document.getElementById("btn1").innerHTML="Play";
    }
    else{
      song.play();
      document.getElementById("btn1").innerHTML="Pause";
    }
}

function draw() {
  background(0);
  ambientLight(255);
    // translate(width/2, height/2,0);
  var camX = map(mouseX,-windowWidth/2,0,-400,100);
  var camY = map(mouseY,-windowHeight/2,0,-400,100);
  camera(-400, -400, 10, 0, -100, 400, 0, 1, 0);
  
  //camera(-400+mouseX, -400+mouseY, 10+mouseY, 0, -100, 400, 0, 1, 0);
  //camera(mouseX,-mouseY*2,1024, mouseX,mouseY*2,-1024, 0, 1, 0);

  // if(song.isPlaying()){

  var spec = SongFFT.analyze();

  historySound.push(spec);
  if(historySound.length>20){
    historySound.splice(0,1);
  }

  for(i=0;i<spec.length;i++){

    push();
	    noStroke();
	    fill(0,spec[i],spec[i]*2);
	    translate(50*20,map(spec[i]*2,0,32,10,0),50*i);
	    sphere(50,50,16);
    pop();

  }

  console.log(historySound);

  for(c=0;c<historySound.length;c++){

    speci=historySound[c];
    for(j=0;j<speci.length;j++){

      push();
	      noStroke();
	      fill(0,speci[j],speci[j]*2);
	      translate(c*50,map(speci[j]*2,0,32,10,0),j*50);
        sphere(50,50,16);
	      // box(50,50,50);
      pop();

    }
  }
  
}

function keyPressed(){
	if(keyCode === 32)
  toggleSong();
}
