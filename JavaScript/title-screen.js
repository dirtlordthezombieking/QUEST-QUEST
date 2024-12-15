const titleScreen=
{
	spaceTime:0,
	load()
	{
		loader.loadMulti(
		[
			["misc/title.json","sprite"],
			["misc/press f.json","sprite"],
			["misc/PRESS SPAC.json","sprite"],
			["misc/E TO START.json","sprite"]
		]);
	},
	draw(d)
	{
		titleScreen.spaceTime+=d;
		titleScreen.title.draw();
		titleScreen.pressSpac.draw();
		titleScreen.eToStart.draw();
	},
	retrieve()
	{
		titleScreen.title=loader.items["misc/title.json"].sprite.value;
		game.pressF=loader.items["misc/press f.json"].sprite.value;
		titleScreen.pressSpac=loader.items["misc/PRESS SPAC.json"].sprite.value;
		titleScreen.eToStart=loader.items["misc/E TO START.json"].sprite.value;
	},
	keyDown(k)
	{
		//----
	},
	keyUp(k)
	{
		//----
	}
};