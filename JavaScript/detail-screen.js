//________'(s|re) going to eat ________ food.
//oh ________, ________ got it ________self so it's ________.
//0123456701234567012345670123456701234567012345670123456701234567
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
		textRenderer.setBlock(textRenderer.createBlock(0,0,"test",2));
	},
	keyDown(k)
	{
	},
	keyUp(k)
	{
	},
	add:
	[
		"________",
		"_______",
		"______",
		"_____",
		"____",
		"___",
		"__",
		"_",
		""
	]
};