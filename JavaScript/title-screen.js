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
			["misc/E TO START.json","sprite"],
			["basic","shader"]
		]);
		this.test1="t1 ";
		this.test2="t2 ";
		let test3=titleScreen.test();
		game.log.inform(this.test1+this.test2+test3.test1+test3.test2+test3.ret());
	},
	draw(d,t)
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
		if(k=="Space")
		{
			titleScreen.spaceTime=0;
		}
	},
	keyUp(k)
	{
		if(k=="Space"&&titleScreen.spaceTime<=1000.0)
		{
			game.setScreen(characterScreen);
		}
	},
	test()
	{
		ret={}
		ret.test1="1 ";
		ret.test2="2 ";
		ret.ret=function()
		{
			return this.test1+this.test1+titleScreen.test1+titleScreen.test1;
		}
		return ret();
	}
};