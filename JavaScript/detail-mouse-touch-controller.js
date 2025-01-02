//const detailScreen={};
//const utils={};
const detailMouseTouchController=
{
	letter:0,
	t:0,
	lastAction:-1,
	chars:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
	touchMouseStart(x,y)
	{
	},
	touchMouseMove(x,y)
	{
	},
	touchMouseEnd(x,y)
	{
		if((inputTimer.time-detailMouseTouchController.t)<50)
		{
			switch(detailMouseTouchController.lastAction)
			{
				case 0:
					detailScreen.keyDown("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
					detailScreen.keyUp("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
					break;
				case 3:
					detailMouseTouchController.letter=utils.properMod(detailMouseTouchController.letter+1,26);
				detailScreen.keyDown("Backspace");
				detailScreen.keyUp("Backspace");
			detailScreen.keyDown("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
			detailScreen.keyUp("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
					break;
				case 4:
				detailMouseTouchController.letter=utils.properMod(detailMouseTouchController.letter-1,26);
					detailScreen.keyDown("Backspace");
					detailScreen.keyUp("Backspace");
					detailScreen.keyDown("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
					detailScreen.keyUp("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
					break;
				case 5:
					detailScreen.keyDown("Backspace");
					detailScreen.keyUp("Backspace");
					break;
			}
			detailScreen.keyDown("Enter");
			detailScreen.keyUp("Enter");
			return;
		}
		detailMouseTouchController.t=inputTimer.time;
		if(x<-256)
		{
			detailMouseTouchController.lastAction=0;
			detailScreen.keyDown("Backspace");
			detailScreen.keyUp("Backspace");
		}
		else if(x<0)
		{
			detailMouseTouchController.lastAction=1;
			detailScreen.keyDown("ArrowLeft");
			detailScreen.keyUp("ArrowLeft");
		}
		else if(x<256)
		{
			detailMouseTouchController.lastAction=2;
			detailScreen.keyDown("ArrowRight");
			detailScreen.keyUp("ArrowRight");
		}
		else
		{
			detailMouseTouchController.lastAction=5;
			if(y>=128)
			{
				detailMouseTouchController.lastAction=3;
				detailMouseTouchController.letter=utils.properMod(detailMouseTouchController.letter-1,26);
				detailScreen.keyDown("Backspace");
				detailScreen.keyUp("Backspace");
			}
			else if(y<-128)
			{
				detailMouseTouchController.lastAction=4;
				detailMouseTouchController.letter=utils.properMod(detailMouseTouchController.letter+1,26);
				detailScreen.keyDown("Backspace");
				detailScreen.keyUp("Backspace");
			}
			detailScreen.keyDown("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
			detailScreen.keyUp("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
		}
	}
};