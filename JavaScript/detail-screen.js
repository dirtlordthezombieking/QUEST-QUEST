//________'(s|re) going to eat ________ food.
//oh ________, ________ got it ________self so it's ________.
//0123456701234567012345670123456701234567012345670123456701234567
const detailScreen=
{
	choice:0,
	selectX:-256,
	selectY:0,
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
		game.gl.useProgram(detailScreen.shader);
		game.setTexture(detailScreen.texLoc,detailScreen.tex,0);
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,detailScreen.buff);
		game.gl.enableVertexAttribArray(detailScreen.dataLoc);
		game.gl.vertexAttribPointer(detailScreen.dataLoc,4,game.gl.FLOAT,false,0,0);
		game.gl.uniform2f(detailScreen.posLoc,detailScreen.selectX,detailScreen.selectY);
		game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
		game.gk.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
		textRenderer.draw([255,255,255,255]);
		inputTimer.tick(t);
	},
	retrieve()
	{
		textRenderer.retrieve();
		//textRenderer.setBlock(textRenderer.createBlock(0,0,"test",2));
//draw
		detailScreen.shader=loader.items.basic.shader.value;
		detailScreen.dataLoc=game.gl.getAttribLocation(detailScreen.shader,"a_data");
		detailScreen.texLoc=game.gl.getUniformLocation(detailScreen.shader,"u_tex");
		detailScreen.posLoc=game.gl.getUniformLocation(detailScreen.shader,"u_pos");
		detailScreen.tex=loader.items["misc/select_8.png"].texture.value;
		detailScreen.buff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,detailScreen.buff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
		[
			 0, 0,0,1,
			 0,16,0,0,
			64, 0,1,1,
			64,16,1,0
		]),game.gl.STATIC_DRAW);
	},
	keyDown(k)
	{
		inputTimer.keyDown(k);
	},
	keyUp(k)
	{
		if(inputTimer.keyUp(k))
		{
			if(k==ArrowRight)
			{
				detailScreen.choice=detailScreen.move[detailScreen.choice][0];
			}
			else if(k==ArrowLeft)
			{
				detailScreen.choice=detailScreen.move[detailScreen.choice][1];
			}
			else if(detailScreen.choice<6)
			{
				if(detailScreen.keys[keyUp(k)])
				{
					if(detailScreen.list[0][0].length<8)
					{
						detailScreen.list[0][0]=detailScreen.list[0][0]+detailScreen[k][1]
						detailScreen.list[0][1]=detailScreen.list[0][1]+detailScreen[k][1]
						if(detailScreen.list[0][0].length==1)
						{
							detailScreen.list[0][1]=detailScreen[k][0]
						}
					}
				}
			}
			else
			{
				detailScreen.list[0][2]=1-detailScreen.list[0][2];
			}
			detailScreen.set();
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
	gap:
	[
		" ",
		"  ",
		"   ",
		"    ",
		"     ",
		"      ",
		"       ",
		"        ",
		"         "
	],
	move:
	[
		[6,0],
		[1,0],
		[2,6],
		[3,1],
		[2,2],
		[5,3],
		[5,4],
	],
	set()
	{
		switch(detailScreen.choice)
		{
			case 0:
				textRenderer.setBlock(textRenderer.createBlock(-256,32,
				detailScreen.list[0][1]+
				detailScreen.add[detailScreen.list[0][1].length]+
				detailScreen.tail[detailScreen.list[0][2]]+
				" going to eat "+
				detailScreen.list[1][0]+
				" food.\noh, "+
				detailScreen.list[2][1]+
				", "+
				detailScreen.list[3][0]+
				" got it "+
				detailScreen.list[4][0]+
				"self so it's "+
				detailScreen.list[5][0]+
				"."+,
				2));
				detailScreen.selectX=0;
				detailScreen.selectY=0;
				break;
			case 1:
				textRenderer.setBlock(textRenderer.createBlock(-256,32,
				detailScreen.list[0][1]+
				detailScreen.tail[detailScreen.list[0][2]]+
				" going to eat "+
				detailScreen.list[1][0]+
				detailScreen.add[detailScreen.list[][0].length]+
				" food.\noh, "+
				detailScreen.list[2][1]+
				", "+
				detailScreen.list[3][0]+
				" got it "+
				detailScreen.list[4][0]+
				"self so it's "+
				detailScreen.list[5][0]+
				"."+,
				2));
				detailScreen.selectX=204+((list[0][1]+tail[list[0][2]]).length*16);
				detailScreen.selectY=0;
				break;
			case 2:
				textRenderer.setBlock(textRenderer.createBlock(-256,32,
				detailScreen.list[0][1]+
				detailScreen.tail[detailScreen.list[0][2]]+
				" going to eat "+
				detailScreen.list[1][0]+
				" food.\noh, "+
				detailScreen.list[2][1]+
				detailScreen.add[detailScreen.list[2][1].length]+
				", "+
				detailScreen.list[3][0]+
				" got it "+
				detailScreen.list[4][0]+
				"self so it's "+
				detailScreen.list[5][0]+
				"."+,
				2));
				detailScreen.selectX=64;
				detailScreen.selectY=-32;
				break;
			case 3:
				textRenderer.setBlock(textRenderer.createBlock(-256,32,
				detailScreen.list[0][1]+
				detailScreen.tail[detailScreen.list[0][2]]+
				" going to eat "+
				detailScreen.list[1][0]+
				" food.\noh, "+
				detailScreen.list[2][1]+
				", "+
				detailScreen.list[3][0]+
				detailScreen.add[detailScreen.list[3][0].length]+
				" got it "+
				detailScreen.list[4][0]+
				"self so it's "+
				detailScreen.list[5][0]+
				"."+,
				2));
				detailScreen.selectX=96+((list[2][1].length)*16);
				detailScreen.selectY=-32;
				break;
			case 4:
				textRenderer.setBlock(textRenderer.createBlock(-256,32,
				detailScreen.list[0][1]+
				detailScreen.tail[detailScreen.list[0][2]]+
				" going to eat "+
				detailScreen.list[1][0]+
				" food.\noh, "+
				detailScreen.list[2][1]+
				", "+
				detailScreen.list[3][0]+
				" got it "+
				detailScreen.list[4][0]+
				detailScreen.add[detailScreen.list[4][0].length]+
				"self so it's "+
				detailScreen.list[5][0]+
				"."+,
				2));
				detailScreen.selectX=224+((list[2][1].length+list[3][0].length)*16);
				detailScreen.selectY=-32;
				break;
			case 5:
				textRenderer.setBlock(textRenderer.createBlock(-256,32,
				detailScreen.list[0][1]+
				detailScreen.tail[detailScreen.list[0][2]]+
				" going to eat "+
				detailScreen.list[1][0]+
				" food.\noh, "+
				detailScreen.list[2][1]+
				", "+
				detailScreen.list[3][0]+
				" got it "+
				detailScreen.list[4][0]+
				"self so it's "+
				detailScreen.list[5][0]+
				detailScreen.add[detailScreen.list[5][0].length]+
				"."+,
				2));
				detailScreen.selectX=432+((list[2][1].length+list[3][0].length+list[4][0].length)*16);
				detailScreen.selectY=-32;
				break;
			case:6
				textRenderer.setBlock(textRenderer.createBlock(-256,64,
				detailScreen.gap[detailScreen.list[0][1].length]+
				detailScreen.tail[1-detailScreen.list[0][2]]+
				"\n"+
				detailScreen.list[0][1]+
				detailScreen.tail[detailScreen.list[0][2]]+
				detailScreen.tailAdd[detailScreen.list[0][2]]+
				" going to eat "+
				detailScreen.list[1][0]+
				" food.\noh, "+
				detailScreen.list[2][1]+
				", "+
				detailScreen.list[3][0]+
				" got it "+
				detailScreen.list[4][0]+
				"self so it's "+
				detailScreen.list[5][0]+
				"."+,
				2));
				detailScreen.selectX=1000;
				detailScreen.selectY=1000;
				break;
		}
	},
	tailAdd:
	[
		" ",
		""
	]
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
		["","",0],
		["",""],
		["",""],
		["",""],
		["",""],
		["",""]
	]
};