const characterScreen=
{
	load()
	{
		loader.loadMulti(
		[
			["slide","shader"],
			["UI/background.png","image"]
		]);
	},
	draw(d,t)
	{
		//----
	},
	retrieve()
	{
		//BACKGROUND
		characterScreen.backShade=loader.items["UI/background.png"].image.value;
		characterScreen.backPosLoc=game.gl.getAttribLocation(characterScreen.backShade,"a_pos");
		characterScreen.backTexLoc=game.gl.getUniformLocation(characterScreen.backShade,"u_tex");
		characterScreen .backTimeLoc=game.gl.getUniformLocation(characterScreen.backShade,"u_time");
		characterScreen.backVertBuff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterScreen.backVertBuff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
				[
					-1,-1,
					-1, 1,
					 1,-1,
					 1, 1
				]
		),game.gl.STATIC_DRAW);
		characterScreen.indBuff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,characterScreen.indBuff);
		game.gl.bufferData(game.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(
			[
				0,2,1,
				2,3,1
			]
		),game.gl.STATIC_DRAW);
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