class Game 
{
  constructor()
  {

  }

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data)
    {
       gameState = data.val();
    })

  }

  update(state)
  {
    database.ref('/').update(
      {
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

   //add image sfor all the cars
    car1 = createSprite(100,200);
    car1.addImage("car1" , car1_Img);


    car2 = createSprite(300,200);
    car2.addImage("car2" , car2_Img);
    

    car3 = createSprite(500,200);
    car3.addImage("car3" , car3_Img);

    car4 = createSprite(700,200);
    car4.addImage("car4" , car4_Img);

    cars = [car1, car2, car3, car4];
  }

  play()
  {
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined)
    {

      //give color to the background by using hexadecimal number
      background("#c68767");

      //add image to the background
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 185;
      var y;

      for(var plr in allPlayers)
      {
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        console.log(allPlayers[plr].distance);
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index)
        {
          //mark the car
          stroke(10);
          fill("green");
          ellipse(x,y,80,80);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;

        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distance +=10
      player.update();
    }

    //change the game state to 2
    if(player.distance > 4300)
    {
       gameState = 2;
       //textSize(40);
       //fill("black");
       //text("You Win" , displayWidth/2,y - 120);

    }

    drawSprites();
  }

  //create the end function
  end()
  {
  console.log("Game Ended");
   game.update(2);

  }
}
