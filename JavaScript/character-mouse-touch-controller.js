//const characterScreen={};
//const utils={};
const characterMouseTouchController=
{
	lastClick:0,
	sliderID:-1,
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
		}
		characterMouseTouchController.lastClick=characterScreen.time;
		if(x<-256)
		{
			if(y<256)
			{
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
					let add=1;
					if(y<-36)
					{
						add=-1;
					}
					if(x>=-312)
					{
						if(x<-304)
						{
							characterScreen.char.detailColour[0]=utils.clamp(characterScreen.char.hairColour[0]+(16*add),0,255);
						}
						else if(x<-296)
						{
							characterScreen.char.detailColour[0]=utils.clamp(characterScreen.char.hairColour[0]+add,0,255);
						}
						else if(x<-288)
						{
							characterScreen.char.detailColour[1]=utils.clamp(characterScreen.char.hairColour[1]+(16*add),0,255);
						}
						else if(x<-280)
						{
							characterScreen.char.detailColour[1]=utils.clamp(characterScreen.char.hairColour[1]+add,0,255);
						}
						else if(x<-272)
						{
							characterScreen.char.detailColour[2]=utils.clamp(characterScreen.char.hairColour[2]+(16*add),0,255);
						}
						else if(x<-264)
						{
							characterScreen.char.detailColour[2]=utils.clamp(characterScreen.char.hairColour[2]+add,0,255);
						}
					}
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
					let add=1;
					if(y<72)
					{
						add=-1;
					}
					if(x>=328)
					{
						if(x<336)
						{
							characterScreen.char.shirtColour[0]=utils.clamp(characterScreen.char.hairColour[0]+(16*add),0,255);
						}
						else if(x<344)
						{
							characterScreen.char.shirtColour[0]=utils.clamp(characterScreen.char.hairColour[0]+add,0,255);
						}
						else if(x<352)
						{
							characterScreen.char.shirtColour[1]=utils.clamp(characterScreen.char.hairColour[1]+(16*add),0,255);
						}
						else if(x<360)
						{
							characterScreen.char.shirtColour[1]=utils.clamp(characterScreen.char.hairColour[1]+add,0,255);
						}
						else if(x<368)
						{
							characterScreen.char.shirtColour[2]=utils.clamp(characterScreen.char.hairColour[2]+(16*add),0,255);
						}
						else if(x<376)
						{
							characterScreen.char.shirtColour[2]=utils.clamp(characterScreen.char.hairColour[2]+add,0,255);
						}
					}
				}
				else if(y>=52){}
				else if(y>=20)
				{
					//pants hex
					let add=1;
					if(y<36)
					{
						add=-1;
					}
					if(x>=328)
					{
						if(x<336)
						{
							characterScreen.char.pantsColour[0]=utils.clamp(characterScreen.char.hairColour[0]+(16*add),0,255);
						}
						else if(x<344)
						{
							characterScreen.char.pantsColour[0]=utils.clamp(characterScreen.char.hairColour[0]+add,0,255);
						}
						else if(x<352)
						{
							characterScreen.char.pantsColour[1]=utils.clamp(characterScreen.char.hairColour[1]+(16*add),0,255);
						}
						else if(x<360)
						{
							characterScreen.char.pantsColour[1]=utils.clamp(characterScreen.char.hairColour[1]+add,0,255);
						}
						else if(x<368)
						{
							characterScreen.char.pantsColour[2]=utils.clamp(characterScreen.char.hairColour[2]+(16*add),0,255);
						}
						else if(x<376)
						{
							characterScreen.char.pantsColour[2]=utils.clamp(characterScreen.char.hairColour[2]+add,0,255);
						}
					}
				}
				else if(y>=-84){}
				else if(y>=-116)
				{
					//shoe hex
					let add=1;
					if(y<-100)
					{
						add=-1;
					}
					if(x>=328)
					{
						if(x<336)
						{
							characterScreen.char.shoeColour[0]=utils.clamp(characterScreen.char.hairColour[0]+(16*add),0,255);
						}
						else if(x<344)
						{
							characterScreen.char.shoeColour[0]=utils.clamp(characterScreen.char.hairColour[0]+add,0,255);
						}
						else if(x<352)
						{
							characterScreen.char.shirtColour[1]=utils.clamp(characterScreen.char.hairColour[1]+(16*add),0,255);
						}
						else if(x<360)
						{
							characterScreen.char.shoeColour[1]=utils.clamp(characterScreen.char.hairColour[1]+add,0,255);
						}
						else if(x<368)
						{
							characterScreen.char.shoeColour[2]=utils.clamp(characterScreen.char.hairColour[2]+(16*add),0,255);
						}
						else if(x<376)
						{
							characterScreen.char.shoeColour[2]=utils.clamp(characterScreen.char.hairColour[2]+add,0,255);
						}
					}
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
		else if(y>=-224&&y<-192)
		{
			let add=1;
			if(y<208)
			{
				add=-1;
			}
			if(x>=-192)
			{
				if(x<-184)
				{
					characterScreen.char.eyeColour[0]=utils.clamp(characterScreen.char.hairColour[0]+(16*add),0,255);
				}
				else if(x<-176)
				{
					characterScreen.char.eyeColour[0]=utils.clamp(characterScreen.char.hairColour[0]+add,0,255);
				}
				else if(x<-168)
				{
					characterScreen.char.eyeColour[1]=utils.clamp(characterScreen.char.hairColour[1]+(16*add),0,255);
				}
				else if(x<-160)
				{
					characterScreen.char.eyeColour[1]=utils.clamp(characterScreen.char.hairColour[1]+add,0,255);
				}
				else if(x<-152)
				{
					characterScreen.char.eyeColour[2]=utils.clamp(characterScreen.char.hairColour[2]+(16*add),0,-144);
				}
				else if(x<-136)
				{
					characterScreen.char.eyeColour[2]=utils.clamp(characterScreen.char.hairColour[2]+add,0,255);
				}
			}
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
					characterMouseTouchController.sliderID=4;
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
					characterMouseTouchController.sliderID=12;
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
		else if(y<-224&&y>=-256&&x>=-192)
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
			else if(x<192)
			{
				//eye blue
					characterMouseTouchController.sliderID=18;
			}
		}
	},
	slider(x)
	{
		switch(characterMouseTouchController.sliderID)
		{
			case 0:
				characterScreen.skinTone=utils.clamp((x+368)*(130/96),0,130);
				break;
			case 1:
				characterScreen.char.hairColour[0]=utils.clamp((x+368)*2.65625,0,255);
				break;
			case 2:
				characterScreen.char.hairColour[1]=utils.clamp((x+368)*2.65625,0,255);
				break;
			case 3:
				characterScreen.char.hairColour[2]=utils.clamp((x+368)*2.65625,0,255);
				break;
			case 4:
				characterScreen.char.detailColour[0]=utils.clamp((x+368)*2.65625,0,255);
				break;
			case 5:
				characterScreen.char.detailColour[1]=utils.clamp((x+368)*2.65625,0,255);
				break;
			case 6:
				characterScreen.char.detailColour[2]=utils.clamp((x+368)*2.65625,0,255);
				break;
			case 7:
				characterScreen.char.shirtColour[0]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 8:
				characterScreen.char.shirtColour[1]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 9:
				characterScreen.char.shirtColour[2]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 10:
				characterScreen.char.pantsColour[0]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 11:
				characterScreen.char.pantsColour[1]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 12:
				characterScreen.char.pantsColour[2]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 13:
				characterScreen.char.shoeColour[0]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 14:
				characterScreen.char.shoeColour[1]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 15:
				characterScreen.char.shoeColour[2]=utils.clamp((x-272)*2.65625,0,255);
				break;
			case 16:
				characterScreen.char.eyeColour[0]=utils.clamp((x+176)*2.65625,0,255);
				break;
			case 17:
				characterScreen.char.eyeColour[1]=utils.clamp((x+48)*2.65625,0,255);
				break;
			case 18:
				characterScreen.char.eyeColour[2]=utils.clamp((x-80)*2.65625,0,255);
				break;
		}
	}
};