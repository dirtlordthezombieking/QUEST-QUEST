const titleScreen=
{
	devQuest:[1,4,1,5,2,2,2,2,1,7,2,2,1,1,5,2,1,9,2,2,0],
	spaceTime:0,
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
			
		}
	}
};