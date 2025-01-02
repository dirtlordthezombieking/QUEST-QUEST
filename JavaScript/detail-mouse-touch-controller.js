//const detailScreen={};
//const utils={};
const detailMouseTouchController=
{
	chars=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
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
			const detailScreen.keyDown("Backspace");
			const detailScreen.keyUp("Backspace");
		}
		else if(x<0)
		{
			const detailScreen.keyDown("ArrowLeft");
			const detailScreen.keyUp("ArrowLeft");
		}
	},
};