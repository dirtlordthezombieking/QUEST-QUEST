const characterScreen=
{
	load()
	{
		loader.loadMulti(
		[
			["slide","shader"],
			["UI/background.png","texture"]
		]);
	},
	draw(d,t)
	{
		//BACKGROUND
		game.gl.useProgram(characterScreen.backShade);
		game.setTexture(characterScreen.backTexLoc,characterScreen.backTex,0);
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterScreen.backVertBuff);
		game.gl.enableVertexAttribArray(characterScreen.backPosLoc);
		game.gl.vertexAttribPointer(characterScreen.backPosLoc,2,game.gl.FLOAT,false,0,0);
		game.gl.uniform1f(characterScreen.backTimeLoc,t%5000);
		game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,characterScreen.indBuff);
		game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
	},
	retrieve()
	{
		//BACKGROUND
		characterScreen.backShade=loader.items.slide.shader.value;
		characterScreen.backPosLoc=game.gl.getAttribLocation(characterScreen.backShade,"a_pos");
		characterScreen.backTexLoc=game.gl.getUniformLocation(characterScreen.backShade,"u_tex");
		characterScreen.backTimeLoc=game.gl.getUniformLocation(characterScreen.backShade,"u_time");
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
		characterScreen.backTex=loader.items["UI/background.png"].texture.value;
	},
	keyDown(k)
	{
		//----
	},
	keyUp(k)
	{
		//----
	},
	createElement(x,y,w,h)
	{
		ret={}
		ret.shader=loader.items.basic.shader.value;
		ret.dataLoc=game.gl.getAttribLocation(ret.shader,"a_data");
		ret.texLoc=game.gl.getUniformLocation(ret.shader,"u_tex");
		ret.offLoc=game.gl.getUniformLocation(ret.shader,"u_pos");
		ret.vertBuff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,ret.vertBuff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
				[
					x  ,y  ,
					x  ,y+h,
					x+w,y  ,
					x+w,y+h
				]
		),game.gl.STATIC_DRAW);
		
	},
};