//const loader={};
//const game={};
//const utils={};
//const characterRenderer={};
//function Float32Array(){}
const characterScreen=
{
	item:0,
	time:0,
	choice:0,
	hexPart:0,
	settings:
	[
		{
			change(a)
			{
				characterScreen.race=Math.floor(utils.properMod((characterScreen.race+a),9));
			},
			plus(){},
			minus(){}
		},
		{
			change(a)
			{
				characterScreen.skinTone=utils.clamp((characterScreen.skinTone+a),0,130);
			},
			plus(){},
			minus(){}
		},
		{
			change(a)
			{
				characterScreen.hexPart=Math.floor(utils.properMod((characterScreen.hexPart+a),6));
			},
			plus()
			{
				switch(characterScreen.hexPart)
				{
					case 0:
						characterScreen.char.hairColour[0]=utils.clamp(Math.floor(characterScreen.char.hairColour[0]+16),0,255);
						break;
					case 1:
						characterScreen.char.hairColour[0]=utils.clamp(Math.floor(characterScreen.char.hairColour[0]+1),0,255);
						break;
					case 2:
						characterScreen.char.hairColour[1]=utils.clamp(Math.floor(characterScreen.char.hairColour[1]+16),0,255);
						break;
					case 3:
						characterScreen.char.hairColour[1]=utils.clamp(Math.floor(characterScreen.char.hairColour[1]+1),0,255);
						break;
					case 4:
						characterScreen.char.hairColour[2]=utils.clamp(Math.floor(characterScreen.char.hairColour[2]+16),0,255);
						break;
					case 5:
						characterScreen.char.hairColour[2]=utils.clamp(Math.floor(characterScreen.char.hairColour[2]+1),0,255);
						break;
				}
			},
			minus()
			{
				switch(characterScreen.hexPart)
				{
					case 0:
						characterScreen.char.hairColour[0]=utils.clamp(Math.floor(characterScreen.char.hairColour[0]-16),0,255);
						break;
					case 1:
						characterScreen.char.hairColour[0]=utils.clamp(Math.floor(characterScreen.char.hairColour[0]-1),0,255);
						break;
					case 2:
						characterScreen.char.hairColour[1]=utils.clamp(Math.floor(characterScreen.char.hairColour[1]-16),0,255);
						break;
					case 3:
						characterScreen.char.hairColour[1]=utils.clamp(Math.floor(characterScreen.char.hairColour[1]-1),0,255);
						break;
					case 4:
						characterScreen.char.hairColour[2]=utils.clamp(Math.floor(characterScreen.char.hairColour[2]-16),0,255);
						break;
					case 5:
						characterScreen.char.hairColour[2]=utils.clamp(Math.floor(characterScreen.char.hairColour[2]-1),0,255);
						break;
				}
			}
		}
	],
	settingVars:[0,1,2],
	settingsOpts:
	[
		{
			settings:[0,1,2],
			texts:[0,1,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,1,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,1,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
		},
		{
			settings:[0,1,2],
			texts:[0,2,3,4,5,6,7,8,9],
			elements:[0,1],
			hex:[0]
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
		ShiftLeft:[false,0],
		ShiftRight:[false,0],
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
			["UI/hex_digit.png","texture"],
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
		characterRenderer.load();
	},
	draw(d,t)
	{
		characterScreen.char.race=characterScreen.race;
		let s=characterScreen.skinTone-30;
		let st=characterScreen.skinTone;
		if(characterScreen.race==4)
		{
			st2=st*0.5
			s2=st2-30;
			if(s2<10.0)
			{
				characterScreen.char.skin2=
				[
					st2*3.2,
					st2*2.125,
					st2*0.9
				];
			}
			else if(s2<90.0)
			{
				let s22=s2*s2;
				let s32=s22*s2;
				let s42=s32*s2;
				characterScreen.char.skin2=
				[
					(
						(-0.00000963541666666*s42)+
						(0.00233333*s32)+
						(-0.211615*s22)+
						(9.36667*s2)+
						53.2578
					),
					(
						(0.00000625*s42)+
						(-0.00110417*s32)+
						(0.049375*s22)+
						(1.66042*s2)+
						64.5
					),
					(
						(0.0000192708*s42)+
						(-0.00366667*s32)+
						(0.229479*s22)+
						(-3.68333*s2)+
						53.3594
					)
				];
			}
			else
			{
				characterScreen.char.skin2=
				[
					255,
					(s2*3.6)-105,
					(s2*8.3)-575
				];
			}
			st=st2+65;
			s=st-30
		}
		if(s<10.0)
		{
			characterScreen.char.skin=
			[
				st*3.2,
				st*2.125,
				st*0.9
			];
		}
		else if(s<90.0)
		{
			let s2=s*s;
			let s3=s2*s;
			let s4=s3*s;
			characterScreen.char.skin=
			[
				(
					(-0.00000963541666666*s4)+
					(0.00233333*s3)+
					(-0.211615*s2)+
					(9.36667*s)+
					53.2578
				),
				(
					(0.00000625*s4)+
					(-0.00110417*s3)+
					(0.049375*s2)+
					(1.66042*s)+
					64.5
				),
				(
					(0.0000192708*s4)+
					(-0.00366667*s3)+
					(0.229479*s2)+
					(-3.68333*s)+
					53.3594
				)
			];
		}
		else
		{
			characterScreen.char.skin=
			[
				255,
				(s*3.6)-105,
				(s*8.3)-575
			];
		}
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
		characterScreen.arrows.draw();
		for(const n of characterScreen.settingsOpts[characterScreen.race].elements)
		{
			characterScreen.elementDraws[n]();
		}
		characterScreen.selectors[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].draw();
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
		for(const n of characterScreen.settingsOpts[characterScreen.race].hex)
		{
			characterScreen.drawHex[n]();
		}
		characterScreen.races[characterScreen.race].draw();
		game.gl.useProgram(characterRenderer.shader);
		characterRenderer.draw(characterScreen.char,-70,  8,0,Math.floor((t%1000)/250));
		characterRenderer.draw(characterScreen.char,  8,  8,1,Math.floor((t%1000)/250));
		characterRenderer.draw(characterScreen.char,-70,-70,2,Math.floor((t%1000)/250));
		characterRenderer.draw(characterScreen.char,  8,-70,3,Math.floor((t%1000)/250));
	},
	retrieve()
	{
		//BACKGROUND
		characterRenderer.retrieve();
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
		characterScreen.textOffLoc=game.gl.getUniformLocation(characterScreen.textShade,"u_pos");
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
		characterScreen.hexInput={};
		characterScreen.hexInput.chars=[];
		for(let i=0;i<16;i++)
		{
			let x=(i%4)*0.25;
			let y=(Math.floor(i/4))*0.25;
			characterScreen.hexInput.chars.push(characterScreen.createRegionTextElement(0,0,8,16,x,y,0.25,0.25,loader.items["UI/hex.png"].texture.value));
		}
		characterScreen.hexInput.sel=characterScreen.createElement(0,0,64,64,loader.items["UI/sellect_text.png"].texture.value);
		characterScreen.hexInput.highlight=characterScreen.createElement(0,0,64,32,loader.items["UI/text_highlight_hex.png"].texture.value);
		characterScreen.hexInput.visual=characterScreen.createElement(0,0,64,32,loader.items["UI/hex_input.png"].texture.value);
		characterScreen.hexInput.digit=characterScreen.createElement(0,0,8,16,loader.items["UI/hex_digit.png"].texture.value);
		characterScreen.hexInput.draw=function(x,y)
		{
			characterScreen.hexInput.highlight.draw(x,y);
			characterScreen.hexInput.visual.draw(x,y);
		};
		characterScreen.hexInput.drawSel=function(x,y)
		{
			characterScreen.hexInput.sel.draw(x,y);
			characterScreen.hexInput.digit.draw(x+72+(characterScreen.hexPart*8),y+24);
		};
		characterScreen.hexInput.drawHex=function(x,y,v)
		{
			characterScreen.hexInput.chars[Math.floor(v[0]/16)].draw(x+8,y);
			characterScreen.hexInput.chars[Math.floor(v[0]%16)].draw(x+16,y);
			characterScreen.hexInput.chars[Math.floor(v[1]/16)].draw(x+24,y);
			characterScreen.hexInput.chars[Math.floor(v[1]%16)].draw(x+32,y);
			characterScreen.hexInput.chars[Math.floor(v[2]/16)].draw(x+40,y);
			characterScreen.hexInput.chars[Math.floor(v[2]%16)].draw(x+48,y);
		};
		characterScreen.char={};
		characterScreen.char.hairColour=[Math.random()*255,Math.random()*255,Math.random()*255];
		characterScreen.char.detailColour=[Math.random()*255,Math.random()*255,Math.random()*255];
		characterScreen.char.shirtColour=[Math.random()*255,Math.random()*255,Math.random()*255];
		characterScreen.char.pantsColour=[Math.random()*255,Math.random()*255,Math.random()*255];
		characterScreen.char.shoeColour=[Math.random()*255,Math.random()*255,Math.random()*255];
		characterScreen.char.eyeColour=[Math.random()*255,Math.random()*255,Math.random()*255];
		characterScreen.char.hairStyle=Math.floor(Math.random()*2);
		characterScreen.char.detailStyle=Math.floor(Math.random()*2);
		characterScreen.char.bodyType=Math.floor(Math.random()*4);
		characterScreen.selectors[2]={};
		characterScreen.selectors[2].draw=function()
		{
			characterScreen.hexInput.drawSel(-384,68);
		};
		characterScreen.drawHex=[];
		characterScreen.drawHex[0]=function()
		{
			characterScreen.hexInput.drawHex(-320,92,characterScreen.char.hairColour);
		};
		characterScreen.elementDraws[1]=function()
		{
			characterScreen.hexInput.draw(-320,84);
		};
		characterScreen.arrows=
		{
			back:characterScreen.createRegionElement(-320,192,64,64,0,0,0.5,1,loader.items["UI/arrows_big.png"].texture.value),
			forward:characterScreen.createRegionElement(288,192,64,64,0.5,0,1,1,loader.items["UI/arrows_big.png"].texture.value),
			draw()
			{
				characterScreen.arrows.back.draw(0,0);
				characterScreen.arrows.forward.draw(0,0);
			}
		};
	},
	keyDown(k)
	{
		//game.log.inform(k);
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
		let shift=characterScreen.keys.ShiftRight[0]||characterScreen.keys.ShiftLeft[0];
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
					if(shift)
					{
						characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].plus();
					}
					else
					{
						characterScreen.choice=utils.clamp((characterScreen.choice-1),0,(characterScreen.settingsOpts[characterScreen.race].settings.length-1));
					}
					break;
				case "ArrowDown":
					if(shift)
					{
						characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].minus();
					}
					else
					{
						characterScreen.choice=utils.clamp((characterScreen.choice+1),0,(characterScreen.settingsOpts[characterScreen.race].settings.length-1));
					}
					break;
				case "NumpadAdd":
						characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].plus();
					break;
				case "NumpadSubtract":
						characterScreen.settings[characterScreen.settingVars[characterScreen.settingsOpts[characterScreen.race].settings[characterScreen.choice]]].minus();
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
	createRegionTextElement(x,y,w,h,uvx,uvy,uvw,uvh,tex)
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
			game.setTexture(characterScreen.textTexLoc,this.tex,0);
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,this.vertBuff);
			game.gl.enableVertexAttribArray(characterScreen.textDataLoc);
			game.gl.vertexAttribPointer(characterScreen.textDataLoc,4,game.gl.FLOAT,false,0,0);
			game.gl.uniform2f(characterScreen.textOffLoc,xPos,yPos);
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
			game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
			game.gl.uniform2f(characterScreen.textOffLoc,0,0);
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