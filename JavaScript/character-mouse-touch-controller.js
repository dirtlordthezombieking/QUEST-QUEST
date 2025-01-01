const characterMouseTouchController=
{
	touchMouseStart(x,y)
	{
		characterMouseTouchController.slider(x,y);
	},
	touchMouseMove(x,y)
	{
		characterMouseTouchController.slider(x,y);
	},
	touchMouseEnd(x,y)
	{
		if(x<-256)
		{
			if(y<256)
			{
				if(y>192)
				{
					if(x<-320)
					{
						characterScreen.race=utils.clamp(characterScreen.race-1,0,9)
					}
				}
				else if(y>=116)
				{
					//----
				}
				else if(y>=84)
				{
					//hair hex
				}
				else if(y>=-2)
				{
					//----
				}
				else if(y>=-52)
				{
					//detail hex
				}
				else if(y>=-156)
				{
					//----
				}
				else if(y>=-188)
				{
					//hair style
				}
				else if(y>=-196)
				{
					//----
				}
				else if(y>=-228)
				{
					//detail style
				}
			}
		}
		else if(x>=256)
		{
			if(y<256)
			{
				if(y>192)
				{
					if(x<-320)
					{
						characterScreen.race=utils.clamp(characterScreen.race+1,0,9)
					}
				}
				else if(y>=188)
				{
					//----
				}
				else if(y>=156)
				{
					//shirt hex
				}
				else if(y>=52)
				{
					//----
				}
				else if(y>=20)
				{
					//pants hex
				}
				else if(y>=-84)
				{
					//----
				}
				else if(y>=-116)
				{
					//shoe hex
				}
				else if(y>=-220)
				{
					//----
				}
				else if(y>=-252)
				{
					//body type
				}
			}
		}
		else
		{
			//eye hex
		}
	}
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
				else if(y>=80)
				{
					//----
				}
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
				else if(y>=-56)
				{
					//----
				}
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
				if(y>=152)
				{
					//shirt red
				}
				else if(y>=120)
				{
					//shirt green
				}
				else if(y>=88)
				{
					//shirt blue
				}
				else if(y>=56)
				{
					//----
				}
				else if(y>=16)
				{
					//pants red
				}
				else if(y>=-16)
				{
					//pants green
				}
				else if(y>=48)
				{
					//pants blue
				}
				else if(y>=80)
				{
					//----
				}
				else if(y>=)
				{
					//shoe red
				}
				else if(y>=)
				{
					//shoe green
				}
				else if(y>=)
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
}