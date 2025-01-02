//const detailScreen={};
//const utils={};
const detailMouseTouchController=
{
	letter:0,	chars:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
	touchMouseStart(x,y)
	{
	},
	touchMouseMove(x,y)
	{
	},
	touchMouseEnd(x,y)
	{
		if(x<-256)
		{
			detailScreen.keyDown("Backspace");
			detailScreen.keyUp("Backspace");
		}
		else if(x<0)
		{
			detailScreen.keyDown("ArrowLeft");
			detailScreen.keyUp("ArrowLeft");
		}
		else if(x<256)
		{
			detailScreen.keyDown("ArrowRight");
			detailScreen.keyUp("ArrowRight");
		}
		else
		{
			if(y>=128)
			{
				detailMouseTouchController.letter=utils.properMod(detailMouseTouchController.letter-1,26);
				detailScreen.keyDown("Backspace");
				detailScreen.keyUp("Backspace");
			}
			else if(y<-128)
			{
				detailMouseTouchController.letter=utils.properMod(detailMouseTouchController.letter+1,26);
				detailScreen.keyDown("Backspace");
				detailScreen.keyUp("Backspace");
			}
			detailScreen.keyDown("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
			detailScreen.keyUp("Key"+detailMouseTouchController.chars[detailMouseTouchController.letter]);
		}
	}
};