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
		//BACKGROUND
		game.gl.useProgram(characterScreen.backShade);
		game.gl.uniform1i(characterScreen.backTexLoc,0);
		game.gl.activeTexture(game.gl.TEXTURE0);
		game.gl.bindTexture(game.gl.TEXTURE_2D,characterScreen.backTex);
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterScreen.backVertBuff);
		game.gl.enableVertexAttribArray(characterScreen.backPosLoc);
		game.gl.vertexAttribPointer(out.loc,4,game.gl.FLOAT,false,0,0);

			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,characterScreen.indBuff);
game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
	},
	retrieve()
	{
		//BACKGROUND
		characterScreen.backShade=loader.items.slide.shader.value;
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
		characterScreen.backTex=game.gl.createTexture();
		game.gl.bindTexture(game.gl.TEXTURE_2D,characterScreen.backTex);
		game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_WRAP_S,game.gl.CLAMP_TO_EDGE);
		game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_WRAP_T,game.gl.CLAMP_TO_EDGE);
		game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_MIN_FILTER,game.gl.NEAREST);
		game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_MAG_FILTER,game.gl.NEAREST);
		game.gl.texImage2D(game.gl.TEXTURE_2D,0,game.gl.RGBA,game.gl.RGBA,game.gl.UNSIGNED_BYTE,loader.items["UI/background.png"].image.value);
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