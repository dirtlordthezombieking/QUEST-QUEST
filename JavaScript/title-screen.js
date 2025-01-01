//const loader={};
//const game={};
//const data={};
//const inputTimer={};
//const characterScreen={};
const titleScreen=
{
	devQuest:[1,4,1,5,2,2,2,2,1,7,2,2,1,1,5,2,1,9,2,2,0],
	spaceTime:0,
	spaceTime2:0,
	oneOver2Point6538461538461538:0,
	load()
	{
		loader.loadMulti(
		[
			["misc/title.json","sprite"],
			["misc/press f.json","sprite"],
			["misc/PRESS SPAC.json","sprite"],
			["misc/E TO START.json","sprite"],
			["basic","shader"],
			["loading","shader"],
			["misc/load.png","texture"]
		]);
	},
	draw(d,t)
	{
		titleScreen.spaceTime+=d;
		titleScreen.spaceTime2+=d;
		titleScreen.title.draw();
		titleScreen.pressSpac.draw();
		titleScreen.eToStart.draw();
		inputTimer.tick(t);
	},
	retrieve()
	{
		titleScreen.title=loader.items["misc/title.json"].sprite.value;
		game.pressF=loader.items["misc/press f.json"].sprite.value;
		titleScreen.pressSpac=loader.items["misc/PRESS SPAC.json"].sprite.value;
		titleScreen.eToStart=loader.items["misc/E TO START.json"].sprite.value;
		inputTimer.reset();
	},
	keyDown(k)
	{
		if(k=="Space")
		{
			titleScreen.spaceTime=0;
		}
		inputTimer.keyDown(k);
	},
	keyUp(k)
	{
		if(k=="Space"&&titleScreen.spaceTime<=1000.0)
		{
			game.setScreen(characterScreen);
		}
		if(inputTimer.keyUp(k))
		{
			if(k=="Digit"+titleScreen.devQuest[titleScreen.oneOver2Point6538461538461538])
			{
				titleScreen.oneOver2Point6538461538461538++;
				if(titleScreen.oneOver2Point6538461538461538==titleScreen.devQuest.length)
				{
					titleScreen.oneOver2Point6538461538461538=0;
					game.log.inform("Dev mode... activated!!!");
					data.update("devOptions",["devmode"],true);
					//data.devOptions.devMode=true;
					//data.save("dev options","devOptions");
				}
			}
			else
			{
				titleScreen.oneOver2Point6538461538461538=0;
			}
		}
		else
		{
			titleScreen.oneOver2Point6538461538461538=0;
		}
	},
	touchMouseStart(x,y)
	{
		titleScreen.spaceTime2=0;
	},
	touchMouseMove(x,y)
	{
	},
	touchMouseEnd(x,y)
	{
		if(titleScreen.spaceTime2<=1000.0&&Math.abs(x)<=384&&Math.abs(y)<=256)
		{
			game.setScreen(characterScreen);
		}
	}
};