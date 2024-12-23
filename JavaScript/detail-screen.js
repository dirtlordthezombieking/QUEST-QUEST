//________'(s|re) going to eat ________ food. oh ________, ________ got it ________self so it's ________.
//blank
const detailScreen=
{
	load()
	{
		textRenderer.load();
	},
	draw(d,t)
	{
		textRenderer.draw([255,255,255]);
	},
	retrieve()
	{
		textRenderer.retrieve();
		textRenderer.(textRenderer.(0,0,"test"));
	},
	keyDown(k)
	{
	},
	keyUp(k)
	{
	}
};