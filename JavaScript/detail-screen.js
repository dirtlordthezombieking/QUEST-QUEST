//________'(s|re) going to eat ________ food.
//oh ________, ________ got it ________self so it's ________.
//0123456701234567012345670123456701234567012345670123456701234567
const detailScreen=
{
	choice:0,
	load()
	{
		loader.loadMulti(
		[
			["misc/select_8.png","texture"]
		]);
		textRenderer.load();
	},
	draw(d,t)
	{
		textRenderer.draw([255,255,255]);
		inputTimer.tick(t);
	},
	retrieve()
	{
		textRenderer.retrieve();
		textRenderer.setBlock(textRenderer.createBlock(0,0,"test",2));
	},
	keyDown(k)
	{
		inputTimer.keyDown(k);
	},
	keyUp(k)
	{
		if(inputTimer.keyUp(k))
		{
			
		}
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
	],
	set()
	{
		switch(detailScreen.choice)
		{
			case 0:
				textRenderer.setBlock(textRenderer.createBlock(-256,0,
				list[0][1]+add[list[0][1].length]+tail[list[0][2]]+
				" going to eat "+
				list[1][0]+
				" food.\noh, "+
				list[2][1]+
				", "+
				list[3][0]+
				" got it "+
				list[4][0]+
				"self so it's "+
				list[5][0]+
				"."+,
				2));
				break;
			case 1:
				textRenderer.setBlock(textRenderer.createBlock(-256,0,
				list[0][1]+tail[list[0][2]]+
				" going to eat "+
				list[1][0]+add[list[][0].length]+
				" food.\noh, "+
				list[2][1]+
				", "+
				list[3][0]+
				" got it "+
				list[4][0]+
				"self so it's "+
				list[5][0]+
				"."+,
				2));
				break;
			case 2:
				textRenderer.setBlock(textRenderer.createBlock(-256,0,
				list[0][1]+tail[list[0][2]]+
				" going to eat "+
				list[1][0]+
				" food.\noh, "+
				list[2][1]+add[list[2][1].length]+
				", "+
				list[3][0]+
				" got it "+
				list[4][0]+
				"self so it's "+
				list[5][0]+
				"."+,
				2));
				break;
			case 3:
				textRenderer.setBlock(textRenderer.createBlock(-256,0,
				list[0][1]+tail[list[0][2]]+
				" going to eat "+
				list[1][0]+
				" food.\noh, "+
				list[2][1]+
				", "+
				list[3][0]+add[list[3][0].length]+
				" got it "+
				list[4][0]+
				"self so it's "+
				list[5][0]+
				"."+,
				2));
				break;
			case 4:
				textRenderer.setBlock(textRenderer.createBlock(-256,0,
				list[0][1]+tail[list[0][2]]+
				" going to eat "+
				list[1][0]+
				" food.\noh, "+
				list[2][1]+
				", "+
				list[3][0]+
				" got it "+
				list[4][0]+add[list[4][0].length]+
				"self so it's "+
				list[5][0]+
				"."+,
				2));
				break;
			case 5:
				textRenderer.setBlock(textRenderer.createBlock(-256,0,
				list[0][1]+tail[list[0][2]]+
				" going to eat "+
				list[1][0]+
				" food.\noh, "+
				list[2][1]+
				", "+
				list[3][0]+
				" got it "+
				list[4][0]+
				"self so it's "+
				list[5][0]+add[list[5][0].length]+
				"."+,
				2));
				break;
		}
	},
	keys:
	[
		"KeyA":["A","a"],
		"KeyB":["B","b"],
		"KeyC":["C","c"],
		"KeyD":["D","d"],
		"KeyE":["E","e"],
		"KeyF":["F","f"],
		"KeyG":["G","g"],
		"KeyH":["H","h"],
		"KeyI":["I","i"],
		"KeyJ":["J","j"],
		"KeyK":["K","k"],
		"KeyL":["L","l"],
		"KeyM":["M","m"],
		"KeyN":["N","n"],
		"KeyO":["O","o"],
		"KeyP":["P","p"],
		"KeyQ":["Q","q"],
		"KeyR":["R","r"],
		"KeyS":["S","s"],
		"KeyT":["T","t"],
		"KeyU":["U","u"],
		"KeyV":["V","v"],
		"KeyW":["W","w"],
		"KeyX":["X","x"],
		"KeyY":["Y","y"],
		"KeyZ":["Z","z"],
	],
	tail:
	[
		"'s"
		"'re"
	],
	list:
	[
		["________","________",0],
		["________","________"],
		["________","________"],
		["________","________"],
		["________","________"],
		["________","________"]
	]
};