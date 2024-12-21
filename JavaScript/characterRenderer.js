//const loader={};
//const game={};
//function Float32Array(){}
const characterRenderer=
{
	methods:[],
	frames:[0,0.25,0,0.5,0.75],
	load()
	{
		loader.loadMulti(
		[
			["character","shader"],

			["sprite/detail/beastfolk/fur/001.png" ,"texture"],
			["sprite/detail/beastfolk/skin/001.png","texture"],
			["sprite/detail/demon/horns/001.png"   ,"texture"],
			["sprite/detail/fishfolk/back/00.png"  ,"texture"],
			["sprite/detail/fishfolk/back/01.png"  ,"texture"],
			["sprite/detail/fishfolk/back/10.png"  ,"texture"],
			["sprite/detail/fishfolk/back/11.png"  ,"texture"],
			["sprite/detail/nephilim/halo/001.png" ,"texture"],
			["sprite/detail/vampire/fangs/001.png" ,"texture"],
			["sprite/detail/vampire/fangs/002.png" ,"texture"],

			["sprite/ears/default.png"             ,"texture"],
			["sprite/ears/none.png"                ,"texture"],
			["sprite/ears/pointy.png"              ,"texture"],

			["sprite/eyebrows/normal.png"          ,"texture"],
			["sprite/eyebrows/thick.png"           ,"texture"],

			["sprite/eyes/base/001.png"            ,"texture"],
			["sprite/eyes/iris/001.png"            ,"texture"],

			["sprite/hair/001.png"                 ,"texture"],
			["sprite/hair/002.png"                 ,"texture"],
			["sprite/hair/front/001.png"           ,"texture"],
			["sprite/hair/front/002.png"           ,"texture"],

			["sprite/pants/basic.png"              ,"texture"],

			["sprite/shirt/001/00.png"             ,"texture"],
			["sprite/shirt/001/01.png"             ,"texture"],
			["sprite/shirt/001/10.png"             ,"texture"],
			["sprite/shirt/001/11.png"             ,"texture"],

			["sprite/shoes/basic.png"              ,"texture"],

			["sprite/00.png"                       ,"texture"],
			["sprite/01.png"                       ,"texture"],
			["sprite/10.png"                       ,"texture"],
			["sprite/11.png"                       ,"texture"]
		]);
	},
	retrieve()
	{
		characterRenderer.shader=loader.items.character.shader.value;
                characterRenderer.dataLoc=game.gl.getAttribLocation(characterRenderer.shader,"a_data");
                characterRenderer.texLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_tex");
                characterRenderer.posLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_pos");
                characterRenderer.colLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_col");
                characterRenderer.offLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_texOff");
		characterRenderer.buff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
		[
			 0, 0,0.00,0.25,
			 0,64,0.00,0.00,
			64, 0,0.25,0.25,
			64,64,0.25,0.00
		]),game.gl.STATIC_DRAW);
		characterRenderer.graphics=
		{
			detail:
			{
				beastfolk:
				{
					fur:
					[
						loader.items["sprite/detail/beastfolk/fur/001.png"].texture.value
					],
					skin:
					[
						loader.items["sprite/detail/beastfolk/skin/001.png"].texture.value
					]
				},
				demon:
				{
					horns:
					[
						loader.items["sprite/detail/demon/horns/001.png"].texture.value
					]
				},
				fishfolk:
				{
					back:
					[
						loader.items["sprite/detail/fishfolk/back/00.png"].texture.value,
						loader.items["sprite/detail/fishfolk/back/01.png"].texture.value,
						loader.items["sprite/detail/fishfolk/back/10.png"].texture.value,
						loader.items["sprite/detail/fishfolk/back/11.png"].texture.value
					]
				},
				nephilim:
				{
					halo:
					[
						loader.items["sprite/detail/nephilim/halo/001.png"].texture.value
					]
				},
				vampire:
				{
					fangs:
					[
						loader.items["sprite/detail/vampire/fangs/001.png"].texture.value,
						loader.items["sprite/detail/vampire/fangs/002.png"].texture.value
					]
				}
			},
			ears:
			[
				loader.items["sprite/ears/default.png"].texture.value,
				loader.items["sprite/ears/none.png"].texture.value,
				loader.items["sprite/ears/pointy.png"].texture.value
			],
			eyebrows:
			[
				loader.items["sprite/eyebrows/normal.png"].texture.value,
				loader.items["sprite/eyebrows/thick.png"].texture.value
			],
			eyes:
			{
				base:
				[
					loader.items["sprite/eyes/base/001.png"].texture.value
				],
				iris:
				[
					loader.items["sprite/eyes/iris/001.png"].texture.value
				]
			},
			hair:
			{
				back:
				[
					loader.items["sprite/hair/001.png"].texture.value,
					loader.items["sprite/hair/002.png"].texture.value
				],
				front:
				[
					loader.items["sprite/hair/front/001.png"].texture.value,
					loader.items["sprite/hair/front/002.png"].texture.value
				]
			},
			pants:
			[
				loader.items["sprite/pants/basic.png"].texture.value
			],
			shirt:
			[
				[
					loader.items["sprite/shirt/001/00.png"].texture.value,
					loader.items["sprite/shirt/001/01.png"].texture.value,
					loader.items["sprite/shirt/001/10.png"].texture.value,
					loader.items["sprite/shirt/001/11.png"].texture.value
				]
			],
			shoes:
			[
				loader.items["sprite/shoes/basic.png"].texture.value
			],
			body:
			[
				loader.items["sprite/00.png"].texture.value,
				loader.items["sprite/01.png"].texture.value,
				loader.items["sprite/10.png"].texture.value,
				loader.items["sprite/11.png"].texture.value
			]
		};
//beastfolk
		characterRenderer.methods[0]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[1],data.skin);
//detail
			characterRenderer.drawPart(characterRenderer.graphics.detail.beastfolk.fur[data.detailStyle%1],data.detailColour);
			characterRenderer.drawPart(characterRenderer.graphics.detail.beastfolk.skin[data.detailStyle%1],[data.skin[0],data.skin[1]*0.9,data.skin[2]*0.9]);
		};
//demon
		characterRenderer.methods[1]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[2],data.skin);
//detail
			characterRenderer.drawPart(characterRenderer.graphics.detail.demon.horns[data.detailStyle%1],data.detailColour);
		};
//dwarf
		characterRenderer.methods[2]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[1],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[0],data.skin);
		};
//elf
		characterRenderer.methods[3]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[2],data.skin);
		};
//fisfolk
		characterRenderer.methods[4]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
			characterRenderer.drawPart(characterRenderer.graphics.detail.fishfolk.back[data.bodyType],data.skin2);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[0],data.skin);
		};
//goblin
		characterRenderer.methods[5]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],[data.skin[0]*0.5,data.skin[1],data.skin[2]*0.5]);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[2],data.skin);
		};
//human
		characterRenderer.methods[6]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[0],data.skin);
		};
//nephilim
		characterRenderer.methods[7]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//details
			characterRenderer.drawPart(characterRenderer.graphics.detail.nephilim.halo[0],data.detailColour);
			characterRenderer.drawPart(characterRenderer.graphics.detail.nephilim.halo[0],data.detailColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[0],data.skin);
		};
//vampire
		characterRenderer.methods[8]=function(data,x,y,dir,frame)
		{
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
			game.gl.enableVertexAttribArray(characterRenderer.dataLoc);
			game.gl.vertexAttribPointer(characterRenderer.dataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterRenderer.posLoc,x,y);
			game.gl.uniform2f(characterRenderer.offLoc,dir,frame);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
//body
			characterRenderer.drawPart(characterRenderer.graphics.body[data.bodyType],data.skin);
//hair_under
			characterRenderer.drawPart(characterRenderer.graphics.hair.back[data.hairStyle],data.hairColour);
//shoes
			characterRenderer.drawPart(characterRenderer.graphics.shoes[0],data.shoeColour);
//pants
			characterRenderer.drawPart(characterRenderer.graphics.pants[0],data.pantsColour);
//shirt
			characterRenderer.drawPart(characterRenderer.graphics.shirt[0][data.bodyType],data.shirtColour);
//eye
			characterRenderer.drawPart(characterRenderer.graphics.eyes.base[0],[255,255,255]);
//iris
			characterRenderer.drawPart(characterRenderer.graphics.eyes.iris[0],data.eyeColour);
//eyebrows
			characterRenderer.drawPart(characterRenderer.graphics.eyebrows[0],data.hairColour);
//hair over
			characterRenderer.drawPart(characterRenderer.graphics.hair.front[data.hairStyle],data.hairColour);
//ears
			characterRenderer.drawPart(characterRenderer.graphics.ears[2],data.skin);
//details
			characterRenderer.drawPart(characterRenderer.graphics.detail.vampire.fangs[data.detailStyle%2],[255,255,255]);
		};
	},
	draw(data,x,y,dir,frame)
	{
		characterRenderer.methods[data.race](data,x,y,characterRenderer.frames[frame],dir/4);
	},
	drawPart(texture,colour)
	{
			game.setTexture(characterRenderer.texLoc,texture,0);
			game.gl.uniform3f(characterRenderer.colLoc,colour[0],colour[1],colour[2]);
			game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
	}
};
//beastfolk✓
//demon✓
//dwarf✓
//elf✓
//fishfolk✓
//goblin✓
//human✓
//nephilim✓
//vampire✓


//skin
//hairColour
//detailColour
//shirtColour
//pantsColour
//shoeColour
//eyeColour

//hairStyle
//detailStyle
//bodyType



//shirt type
//pants type
//shoe type

//Todo big dwarf ears