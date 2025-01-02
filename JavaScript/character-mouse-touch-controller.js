//const characterScreen={};
//const utils={};
const characterMouseTouchController=
{
	lastClick:0,
	sliderID:-1;
	touchMouseStart(x,y)
	{
		if(!characterScreen.doneLoad)
		{
			return;
		}
		characterMouseTouchController.setSlider(x,y);
		characterMouseTouchController.slider(x);
	},
	touchMouseMove(x,y)
	{
		if(!characterScreen.doneLoad)
		{
			return;
		}
		characterMouseTouchController.slider(x);
	},
	touchMouseEnd(x,y)
	{
		if(characterMouseTouchController.sliderID>-1)
		{
			characterMouseTouchController.sliderID=-1;
			return;
		}
		if(!characterScreen.doneLoad)
		{
			return;
		}
		if((characterScreen.time-characterMouseTouchController.lastClick)<=200)
		{
			characterScreen.keyDown("Enter");
			characterScreen.keyUp("Enter");
			//game.log.inform(""+characterScreen.time+"|"+characterMouseTouchController.lastClick+"|"+(characterScreen.time-characterMouseTouchController.lastClick));
		}
		//game.log.inform(""+characterScreen.time+"|"+characterMouseTouchController.lastClick+"|"+(characterScreen.time-characterMouseTouchController.lastClick));
		game.log.inform(""+x+","+y)
		characterMouseTouchController.lastClick=characterScreen.time;
		if(x<-256)
		{
			//game.log.inform("x<-256");
			if(y<256)
			{
				//game.log.inform("y<256");
				if(y>=192)
				{
					if(x<-288&&x>=-352)
					{
						characterScreen.race=utils.properMod(characterScreen.race-1,9);
					}
				}
				else if(y>=116){}
				else if(y>=84)
				{
					//game.log.inform("y>=84");
					let add=1;
					if(y<100)
					{
						add=-1;
					}
					if(x>=-312)
					{
						if(x<-304)
						{
							characterScreen.char.hairColour[0]=utils.clamp(characterScreen.char.hairColour[0]+(16*add),0,255);
						}
						else if(x<-296)
						{
							characterScreen.char.hairColour[0]=utils.clamp(characterScreen.char.hairColour[0]+add,0,255);
						}
						else if(x<-288)
						{
							characterScreen.char.hairColour[1]=utils.clamp(characterScreen.char.hairColour[1]+(16*add),0,255);
						}
						else if(x<-280)
						{
							characterScreen.char.hairColour[1]=utils.clamp(characterScreen.char.hairColour[1]+add,0,255);
						}
						else if(x<-272)
						{
							characterScreen.char.hairColour[2]=utils.clamp(characterScreen.char.hairColour[2]+(16*add),0,255);
						}
						else if(x<-264)
						{
							characterScreen.char.hairColour[2]=utils.clamp(characterScreen.char.hairColour[2]+add,0,255);
						}
					}
				}
				else if(y>=-20){}
				else if(y>=-52)
				{
					//detail hex
				}
				else if(y>=-156){}
				else if(y>=-188)
				{
					if(x<-352&&x>=-384)
					{
						characterScreen.char.hairStyle=utils.properMod(characterScreen.char.hairStyle-1,2);
					}
					else if(x>-288)
					{
						characterScreen.char.hairStyle=utils.properMod(characterScreen.char.hairStyle+1,2);
					}
				}
				else if(y>=-196){}
				else if(y>=-228)
				{
					if(x<-352&&x>=-384)
					{
						characterScreen.char.detailStyle=utils.properMod(characterScreen.char.detailStyle-1,2);
					}
					else if(x>-288)
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
					if(x>=352&&x<384)
					{
						characterScreen.char.bodyType=utils.properMod(characterScreen.char.bodyType-1,4);
					}
					else if(x<288)
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
	setSlider(x,y)
	{
		if(x<-256)
		{
			if(y<152)
			{
				if(y>=120)
				{
					characterMouseTouchController.sliderID=0;
				}
				else if(y>=80){}
				else if(y>=48)
				{
					//hair red
					characterMouseTouchController.sliderID=1;
				}
				else if(y>=16)
				{
					//hair green
					characterMouseTouchController.sliderID=2;
				}
				else if(y>=-16)
				{
					//hair blue
					characterMouseTouchController.sliderID=3;
				}
				else if(y>=-56){}
				else if(y>=-88)
				{
					//detail red
					characterMouseTouchController.sliderID=4:
				}
				else if(y>=-120)
				{
					//detail green
					characterMouseTouchController.sliderID=5;
				}
				else if(y>=-152)
				{
					//detail blue
					characterMouseTouchController.sliderID=6;
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
					characterMouseTouchController.sliderID=7;
				}
				else if(y>=88)
				{
					//shirt green
					characterMouseTouchController.sliderID=8;
				}
				else if(y>=56)
				{
					//shirt blue
					characterMouseTouchController.sliderID=9;
				}
				else if(y>=16){}
				else if(y>=-16)
				{
					//pants red
					characterMouseTouchController.sliderID=10;
				}
				else if(y>=-48)
				{
					//pants green
					characterMouseTouchController.sliderID=11;
				}
				else if(y>=-80)
				{
					//pants blue
					characterMouseTouchController.sliderID=12
				}
				else if(y>=-120){}
				else if(y>=-152)
				{
					//shoe red
					characterMouseTouchController.sliderID=13;
				}
				else if(y>=-184)
				{
					//shoe green
					characterMouseTouchController.sliderID=14;
				}
				else if(y>=-216)
				{
					//shoe blue
					characterMouseTouchController.sliderID=15;
				}
			}
		}
		else if(y<-192&&x>-224
		{
			if(x<-64)
			{
				//eye red
					characterMouseTouchController.sliderID=16;
			}
			else if(x<64)
			{
				//eye green
					characterMouseTouchController.sliderID=17;
			}
			else if(z<192)
			{
				//eye blue
					characterMouseTouchController.sliderID=18;
			}
		}
	},
	slider(x)
	{
		switch()
		{
			case 0:
				characterScreen.skinTone=utils.clamp((x+368)*(130/
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10:
				break;
			case 11:
				break;
			case 12:
				break;
			case 13:
				break;
			case 14:
				break;
			case 15:
				break;
			case 16:
				break;
			case 17:
				break;
			case 18:
				break;
		}
	}
};