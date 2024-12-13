const characterScreen=
{
	item:0,
	time:0,
	choice:0,
	settings:
	[
		{
			change(a)
			{
				characterScreen.race=Math.floor((characterScreen.race+a)%9);
			}
		},
		{
			change(a)
			{
				characterScreen.skinTone=(characterScreen.skinTone+a)%130;
			}
		}
	],
	settingVars:[0,1],
	settingsOpts:
	[
		{
			settings:[0,1],
			texts:[0,1,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,1,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,1,3,4,5,6,7,8,9],
			elements:[0]
		},
		{
			settings:[0,1],
			texts:[0,2,3,4,5,6,7,8,9],
			elements:[0]
		}
	],
	keys:
	{
		NumpadAdd:[false,0],
		NumpadSubtract:[false,0],
		ArrowUp:[false,0],
		ArrowLeft:[false,0],
		ArrowRight:[false,0],
		ArrowDown:[false,0],
		Enter:[false,0]
	},
	load()
	{
		loader.loadMulti(
		[
			["slide","shader"],
			["UI/arrows_big.png","texture"],
			["UI/arrows_small.png","texture"],
			["UI/background.png","texture"],
			["UI/hex.png","texture"],
			["UI/hex_input.png","texture"],
			["UI/select_slider.png","texture"],
			["UI/sellect_slider_bar.png","texture"],
			["UI/sellect_text.png","texture"],
			["UI/sellect_text_big_v2.png","texture"],
			["UI/slider.png","texture"],
			["UI/slider_bar.png","texture"],
			["UI/text_highlight.png","texture"],
			["UI/text_highlight_big.png","texture"],
			["UI/text_highlight_hex.png","texture"],

			["UI/text/character creation/body_type.png","texture"],
			["UI/text/character creation/detail_colour.png","texture"],
			["UI/text/character creation/detail_style.png","texture"],
			["UI/text/character creation/eye_colour.png","texture"],
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
		characterScreen.time=t;
		if(characterScreen.keys.ArrowLeft[0]&&(t-characterScreen.keys.ArrowLeft[1])>1000)
		{
			characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].change(d/-50);
		}
		if(characterScreen.keys.ArrowRight[0]&&(t-characterScreen.keys.ArrowRight[1])>1000)
		{
			characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].change(d/50);
		}
		//BACKGROUND
		game.gl.useProgram(characterScreen.backShade);
		game.setTexture(characterScreen.backTexLoc,characterScreen.backTex,0);
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterScreen.backVertBuff);
		game.gl.enableVertexAttribArray(characterScreen.backPosLoc);
		game.gl.vertexAttribPointer(characterScreen.backPosLoc,2,game.gl.FLOAT,false,0,0);
		game.gl.uniform1f(characterScreen.backTimeLoc,t%5000);
		game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
		game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
		//LABELS
		game.gl.useProgram(characterScreen.basicShade);
		//for(const l of characterScreen.labels)
		//{
			//characterScreen.highlight.draw(l[1],l[2]);
		//}
		for(const n of characterScreen.settingsOpts[characterScreen.race].texts)
		{
			let l=characterScreen.labels[n];
			characterScreen.highlight.draw(l[1],l[2]);
		}
		characterScreen.highlightBig.draw(0,0);
		characterScreen.selectors[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].draw();
		//----
		for(const n of characterScreen.settingsOpts[characterScreen.race].elements)
		{
			characterScreen.elementDraws[n]();
		}
		game.gl.useProgram(characterScreen.textShade);
		game.gl.uniform3f(characterScreen.textColLoc,255,255,255);
		//for(const l of characterScreen.labels)
		//{
			//l[0].draw();
		//}
		for(const n of characterScreen.settingsOpts[characterScreen.race].texts)
		{
			let l=characterScreen.labels[n];
			l[0].draw();
		}
		characterScreen.races[characterScreen.race].draw();
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
		const texts=
		[
			["UI/text/character creation/body_type.png"    , 288,-268],
			["UI/text/character creation/detail_colour.png",-384, -68],
			["UI/text/character creation/detail_style.png" ,-352,-244],
			["UI/text/character creation/eye_colour.png"   ,-256,-256],
			["UI/text/character creation/hair_colour.png"  ,-384,  68],
			["UI/text/character creation/hair_style.png"   ,-352,-204],
			["UI/text/character creation/pants_colour.png" , 256,   4],
			["UI/text/character creation/shirt_colour.png" , 256, 140],
			["UI/text/character creation/shoe_colour.png"  , 256,-132],
			["UI/text/character creation/skin_tone.png"    ,-352, 140]
		];
		characterScreen.labels=[];
		for(const t of texts)
		{
			characterScreen.labels.push([characterScreen.createTextElement(t[1],t[2],64,64,loader.items[t[0]].texture.value),t[1],t[2]]);
		}
		characterScreen.highlight=characterScreen.createElement(0,0,64,64,loader.items["UI/text_highlight.png"].texture.value);
		const races=
		[
			"UI/text/character creation/race/beastfolk.png",
			"UI/text/character creation/race/demon.png",
			"UI/text/character creation/race/dwarf.png",
			"UI/text/character creation/race/elf.png",
			"UI/text/character creation/race/fishfolk.png",
			"UI/text/character creation/race/goblin.png",
			"UI/text/character creation/race/human.png",
			"UI/text/character creation/race/nephilim.png",
			"UI/text/character creation/race/vampire.png"
		];
		characterScreen.race=Math.floor(Math.random()*9);
		//game.log.inform(""+characterScreen.race)
		characterScreen.races=[];
		for(const r of races)
		{
			//game.log.inform(r);
			characterScreen.races.push(characterScreen.createTextElement(-256,192,512,64,loader.items[r].texture.value));
		}
		//game.log.inform(races[characterScreen.race])
		characterScreen.highlightBig=characterScreen.createElement(-256,160,512,128,loader.items["UI/text_highlight_big.png"].texture.value);
		characterScreen.selectors=[];
		characterScreen.selectors[0]={};
		characterScreen.selectors[0].item=characterScreen.createElement(-256,160,512,128,loader.items["UI/sellect_text_big_v2.png"].texture.value);
		characterScreen.selectors[0].draw=function()
		{
			characterScreen.selectors[0].item.draw(0,0);
		};
		characterScreen.selectors[1]={};
		characterScreen.selectors[1].draw=function()
		{
			characterScreen.slider.drawSel(-384,120,characterScreen.skinTone/130);
		};
		characterScreen.slider={};
		characterScreen.slider.bar=characterScreen.createElement(0,0,128,32,loader.items["UI/slider_bar.png"].texture.value);
		characterScreen.slider.handle=characterScreen.createElement(0,0,32,32,loader.items["UI/slider.png"].texture.value);
		characterScreen.slider.draw=function(x,y,p)
		{
			characterScreen.slider.bar.draw(x,y);
			characterScreen.slider.handle.draw(x+(p*96),y);
		};
		characterScreen.slider.barSel=characterScreen.createElement(0,0,128,32,loader.items["UI/sellect_slider_bar.png"].texture.value);
		characterScreen.slider.handleSel=characterScreen.createElement(0,0,32,32,loader.items["UI/select_slider.png"].texture.value);
		characterScreen.slider.drawSel=function(x,y,p)
		{
			characterScreen.slider.barSel.draw(x,y);
			characterScreen.slider.handleSel.draw(x+(p*96),y);
		};
		//elements
		characterScreen.skinTone=Math.random()*130;
		characterScreen.elementDraws=
		[
			function()
			{
				characterScreen.slider.draw(-384,120,characterScreen.skinTone/130);
			}
		];
	},
	keyDown(k)
	{
		game.log.inform(k);
		if(characterScreen.keys[k])
		{
			if(characterScreen.keys[k][0])
			{
				return;
			}
		}
		characterScreen.keys[k]=[true,characterScreen.time];
	},
	keyUp(k)
	{
		characterScreen.keys[k][0]=false;
		//game.log.inform(""+(characterScreen.time-characterScreen.keys[k][1])+"|"+characterScreen.time+"|"+characterScreen.keys[k][1]);
		if((characterScreen.time-characterScreen.keys[k][1])<=1000)
		{
			switch(k)
			{
				case "ArrowLeft":
					characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].change(-1);
					break;
				case "ArrowRight":
					characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].change(1);
					break;
				case "ArrowUp":
					characterScreen.choice=(characterScreen.choice-1)%(characterScreen.settingsOpts[characterScreen.race].settings.length);
					break;
				case "ArrowDown":
					characterScreen.choice=(characterScreen.choice+1)%(characterScreen.settingsOpts[characterScreen.race].settings.length);
					break;
			}
		}
	},
	createElement(x,y,w,h,tex)
	{
		const ret={};
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
		};
		return ret;
	},
	createRegionElement(x,y,w,h,uvx,uvy,uvw,uvh,tex)
	{
		const ret={};
		ret.shader=loader.items.basic.shader.value;
		ret.tex=tex;
		ret.vertBuff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,ret.vertBuff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
				[
					x  ,y  ,uvx    ,uvy+uvh,
					x  ,y+h,uvx    ,uvy    ,
					x+w,y  ,uvx+uvw,uvy+uvh,
					x+w,y+h,uvx+uvw,uvy
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
		};
		return ret;
	},
	createTextElement(x,y,w,h,tex)
	{
		const ret={};
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
		ret.draw=function()
		{
			game.setTexture(characterScreen.textTexLoc,this.tex,0);
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,this.vertBuff);
			game.gl.enableVertexAttribArray(characterScreen.textDataLoc);
			game.gl.vertexAttribPointer(characterScreen.textDataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
			game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
		};
		return ret;
	}
};