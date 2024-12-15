const titleScreen=
{
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
		game.title.draw();
		game.pressSpac.draw();
		game.eToStart.draw();
	},
	keyDown(k)
	{
		//----
	},
	keyaup(k)
	{
		//----
	}
};