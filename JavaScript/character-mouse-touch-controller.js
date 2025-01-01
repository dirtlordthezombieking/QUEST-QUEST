//const characterScreen={};
//const utils={};
const characterMouseTouchController=
{
	lastClick:0,
	touchMouseStart(x,y)
	{
		if(!characterScreen.doneLoad)
		{
			return;
		}
		characterMouseTouchController.slider(x,y);
	},
	touchMouseMove(x,y)
	{
		if(!characterScreen.doneLoad)
		{
			return;
		}
		characterMouseTouchController.slider(x,y);
	},
	touchMouseEnd(x,y)
	{
		if(!characterScreen.doneLoad)
		{
			return;
		}
		if((characterScreen.time-characterMouseTouchController.lastClick)<=500)
		{
			//characterScreen.keyDown("Enter");
			//characterScreen.keyUp("Enter");
			//game.log.inform(""+characterScreen.time+"|"+characterMouseTouchController.lastClick+"|"+(characterScreen.time-characterMouseTouchController.lastClick));
		}
		game.log.inform(""+characterScreen.time+"|"+characterMouseTouchController.lastClick+"|"+(characterScreen.time-characterMouseTouchController.lastClick));
		//game.log.inform(""+x+","+y)
		characterMouseTouchController.lastClick=characterScreen.time;
		if(x<-256)
		{
			if(y<256)
			{
				if(y>192)
				{
					if(x<-288&&x>=-352)
					{
						characterScreen.race=utils.properMod(characterScreen.race-1,9);
					}
				}
				else if(y>=116){}
				else if(y>=84)
				{
					//hair hex
				}
				else if(y>=-20){}
				else if(y>=-52)
				{
					//detail hex
				}
				else if(y>=-156){}
				else if(y>=-188)
				{
					if(x<-352&&x>384)
					{
						characterScreen.char.hairStyle=utils.properMod(characterScreen.char.hairStyle-1,2);
					}
					else if(x<-288)
					{
						characterScreen.char.hairStyle=utils.properMod(characterScreen.char.hairStyle+1,2);
					}
				}
				else if(y>=-196){}
				else if(y>=-228)
				{
					if(x<-352&&x>384)
					{
						characterScreen.char.detailStyle=utils.properMod(characterScreen.char.detailStyle-1,2);
					}
					else if(x<-288)
					{
						characterScreen.char.detailStyle=utils.properMod(characterScreen.char.detailStyle+1,2);
					}
				}
			}
		}
		else if(x>=256)
		{
			if(y<256)
			{
				if(y>192)
				{
					if(x>=288&&x<352)
					{
						characterScreen.race=utils.properMod(characterScreen.race+1,9);
					}
				}
				else if(y>=188){}
				else if(y>=156)
				{
					//shirt hex
				}
				else if(y>=52){}
				else if(y>=20)
				{
					//pants hex
				}
				else if(y>=-84){}
				else if(y>=-116)
				{
					//shoe hex
				}
				else if(y>=-220){}
				else if(y>=-252)
				{
					//body type
					if(x<-352&&x>384)
					{
						characterScreen.char.bodyType=utils.properMod(characterScreen.char.bodyType-1,4);
					}
					else if(x<-288)
					{
						characterScreen.char.bodyType=utils.properMod(characterScreen.char.bodyType+1,4);
					}
				}
			}
		}
		else
		{
			//eye hex
		}
	},
	slider(x,y)
	{
		if(x<-256)
		{
			if(y<152)
			{
				if(y>=120)
				{
					//skin slider
				}
				else if(y>=80){}
				else if(y>=48)
				{
					//hair red
				}
				else if(y>=16)
				{
					//hair green
				}
				else if(y>=-16)
				{
					//hair blue
				}
				else if(y>=-56){}
				else if(y>=-88)
				{
					//detail red
				}
				else if(y>=-120)
				{
					//detail green
				}
				else if(y>=-152)
				{
					//detail blue
				}
			}
		}
		else if(x>=256)
		{
			if(y<152)
			{
				if(y>=120)
				{
					//shirt red
				}
				else if(y>=88)
				{
					//shirt green
				}
				else if(y>=56)
				{
					//shirt blue
				}
				else if(y>=16){}
				else if(y>=-16)
				{
					//pants red
				}
				else if(y>=-48)
				{
					//pants green
				}
				else if(y>=-80)
				{
					//pants blue
				}
				else if(y>=-120){}
				else if(y>=-152)
				{
					//shoe red
				}
				else if(y>=-184)
				{
					//shoe green
				}
				else if(y>=-216)
				{
					//shoe blue
				}
			}
		}
		else
		{
			//eye slider
		}
	}
};