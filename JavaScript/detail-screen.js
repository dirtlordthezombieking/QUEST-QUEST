//________'(s|re) going to eat ________ food. oh ________, ________ got it ________self so it's ________.
//blank
const detailScreen=
{
	load()
	{
		loader.loadMulti(
		[
			["misc/font_v2.png","texture"]
		]);
		textRenderer.load();
	},
	draw(d,t)
	{
		textRenderer.draw();
	},
	retrieve()
	{
		textRenderer.retrieve();
	},
	keyDown(k)
	{
	},
	keyUp(k)
	{
	}
};