const characterScreen=
{
	load()
	{
		loader.loadMulti(
		[
			["slide","shader"],
			["UI/arrows_big.png","texture"],
			["UI/arrows_small.png","texture"],
			["UI/background.png","texture"],
			["UI/hex_input.png","texture"],
			["UI/select_slider.png","texture"],
			["UI/sellect_slider_bar.png","texture"],
			["UI/sellect_text.png","texture"],
			["UI/sellect_text_big.png","texture"],
			["UI/slider_bar.png","texture"],
			["UI/text/character creation/body_type.png","texture"],
			["UI/text/character creation/detail_colour.png","texture"],
			["UI/text/character creation/detail_style.png","texture"],
			["UI/text/character creation/hair_colour.png","texture"],
			["UI/text/character creation/hair_style.png","texture"],
			["UI/text/character creation/pants_colour.png","texture"],
			["UI/text/character creation/shirt_colour.png","texture"],
			["UI/text/character creation/shoe_colour.png","texture"],
			["UI/text/character creation/skin_tone.png","texture"],
			["UI/text/character creation/race/beastfolk.png","texture"],
			["UI/text/character creation/race/demon.png","texture"],
			["UI/text/character creation/race/dwarf.png","texture"],
			["UI/text/character creation/race/elf.png","texture"],
			["UI/text/character creation/race/fishfolk.png","texture"],
			["UI/text/character creation/race/goblin.png","texture"],
			["UI/text/character creation/race/human.png","texture"],
			["UI/text/character creation/race/nephilim.png","texture"],
			["UI/text/character creation/race/vampire.png","texture"]
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
		game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
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
		characterScreen.backTex=loader.items["UI/background.png"].texture.value;
		//UI
		characterScreen.basicShade=loader.items.basic.shader.value;
		characterScreen.basicDataLoc=game.gl.getAttribLocation(characterScreen.basicShade,"a_data");
		characterScreen.basicTexLoc=game.gl.getUniformLocation(characterScreen.basicShade,"u_tex");
		characterScreen.basicOffLoc=game.gl.getUniformLocation(characterScreen.basicShade,"u_pos");
		characterScreen.textShade=loader.items.text.shader.value;
		characterScreen.textDataLoc=game.gl.getAttribLocation(characterScreen.textShade,"a_data");
		characterScreen.textTexLoc=game.gl.getUniformLocation(characterScreen.textShade,"u_tex");
		characterScreen.textColLoc=game.gl.getUniformLocation(characterScreen.textShade,"u_colour");
	},
	keyDown(k)
	{
		//----
	},
	keyUp(k)
	{
		//----
	},
	createElement(x,y,w,h,tex)
	{
		ret={}
		ret.shader=loader.items.basic.shader.value;
		ret.tex=tex;
		ret.vertBuff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,ret.vertBuff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
				[
					x  ,y  ,0,1,
					x  ,y+h,0,0,
					x+w,y  ,1,1,
					x+w,y+h,1,0
				]
		),game.gl.STATIC_DRAW);
		ret.draw=function(xPos,yPos)
		{
			game.setTexture(characterScreen.basicTexLoc,this.tex,0);
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,this.vertBuff);
			game.gl.enableVertexAttribArray(characterScreen.basicDataLoc);
			game.gl.vertexAttribPointer(characterScreen.basicDataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterScreen.basicOffLoc,xPos,yPos);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
			game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
		}
		return ret;
	},
	createTextElement(x,y,w,h,tex)
	{
		ret={}
		ret.shader=loader.items.basic.shader.value;
		ret.tex=tex;
		ret.vertBuff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,ret.vertBuff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
				[
					x  ,y  ,0,1,
					x  ,y+h,0,0,
					x+w,y  ,1,1,
					x+w,y+h,1,0
				]
		),game.gl.STATIC_DRAW);
		ret.draw=function(xPos,yPos)
		{
			game.setTexture(characterScreen.textTexLoc,this.tex,0);
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,this.vertBuff);
			game.gl.enableVertexAttribArray(characterScreen.textDataLoc);
			game.gl.vertexAttribPointer(characterScreen.textDataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform3f(characterScreen.textColLoc,0.25,0.5,1.0);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
			game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
		}
		return ret;
	}
};