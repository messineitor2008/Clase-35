var hypnoticBall, database;
var position;


function setup(){
  //inicializar y guarda en la variable la base de datos
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

//verificar que tiene la base de datos
  var hypnoticBallPosition = database.ref('ball/position');
  
  //es el ollente y escucha los cambios y los vuelve a leer
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

//escribir nuevas posiciones para x y y en la base de datos
function writePosition(x,y){
  database.ref('ball/position').set({

 'x': hypnoticBall.x+ x,
 'y': hypnoticBall.y+ y
  })
}

//lee las posiciones desde la base de datos
function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

//avisa si hay un error
function showError(){
  console.log("Error al escribir en la base de datos");
}
