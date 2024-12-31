//const data={};
//const titleScreen={};
//const loader={};
//function Float32Array(){}
//function Uint16Array(){}
const game=
{
	started:false,
	loaded:false,
	logSet:true,
	start()
	{
		game.startTime=performance.now();
		try
		{
			if(game.started)
			{
				return;
			}
			data.load();
			document.getElementById("start").style.display="none";
			game.logVis=document.getElementById("log").style.display;
			game.started=true;
			game.canvas=document.querySelector("#canvas");
			game.gl=game.canvas.getContext("webgl",{premultipliedAlpha:false});
			game.ext=game.gl.getExtension("ANGLE_instanced_arrays");
			game.indS=game.gl.createBuffer();
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
			game.gl.bufferData(game.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(
				[
					0,2,1,
					2,3,1
				]
			),game.gl.STATIC_DRAW);
			game.canvas.width=game.canvas.clientWidth;
			game.canvas.height=game.canvas.clientHeight;
			game.gl.enable(this.gl.CULL_FACE);
			game.gl.enable(this.gl.BLEND);
			game.gl.blendFunc(game.gl.SRC_ALPHA,game.gl.ONE_MINUS_SRC_ALPHA);
			game.gl.viewport(0,0,game.gl.canvas.width,game.gl.canvas.height);
			game.gl.clearColor(0,0,0,1);
			game.gl.clear(game.gl.COLOR_BUFFER_BIT);
			game.setScreen(titleScreen);
			game.frameTime=performance.now();
			let tis=game;
			if(data.get("devOptions",["devmode"]))
			{
				game.testbool=true;
				game.testfloat=0;
			}
			requestAnimationFrame(function(ts){tis.draw(ts);});
			document.onkeydown=game.keyDown;
			document.onkeyup=game.keyUp;
			new ResizeObserver(game.resizeCanvas).observe(game.canvas);
			game.canvas.requestFullscreen();
		}
		catch(e)
		{
			game.log.error(e.message);
		}
	},
	resizeCanvas()
	{
		if(data.get("devOptions",["devmode"]))
		{
			game.sizeSet=false;
			//game.log.inform("resize: "+canvas.clientWidth+","+canvas.clientHeight+","+window.devicePixelRatio);
		}
	},
	touchStart(ev)
	{
		if(document.fullscreenElement!=game.canvas)
		{
			//game.canvas.requestFullscreen();
			//return;
		}
		try
		{
			let t=ev.touches[0];
			if(game.down)
			{
				game.log.inform("t: "+t.identifier);
			}
			game.log.inform("c: "+ev.changedTouches[0].identifier);
			if(ev.changedTouches[0].identifier==0)
			{
				//----
			}
			//game.log.inform(""+t.screenX+","+t.screenY+"|"+t.clientX+","+t.clientY+"|"+t.pageX+","+t.pageY);
		}
		catch(e)
		{
			game.log.error("error:\n"+e.message);
		}
	},
	setScreen(s)
	{
		game.loaded=false;
		game.screen=s;
		game.screen.load();
	
},
	keyDown(ev)
	{
		if(document.fullscreenElement!=game.canvas)
		{
			return;
		}
		try
		{
			game.screen.keyDown(ev.code);
		}
		catch(e)
		{
			game.log.error("error:\n"+e.message);
		}
	},
	keyUp(ev)
	{
		if(ev.code=="KeyL")
		{
			document.getElementById("log").style.display=game.logVis;
			game.logSet=true;
		}
		if(document.fullscreenElement!=game.canvas)
		{
			if(ev.code=="KeyF")
			{
				game.canvas.requestFullscreen();
			}
			return;
		}
		try
		{
			game.screen.keyUp(ev.code);
		}
		catch(e)
		{
			game.log.error("error:\n"+e.message);
		}
	},
	setTexture(loc,tex,pos)
	{
		game.gl.uniform1i(loc,pos);
		game.gl.activeTexture(game.gl.TEXTURE0+pos);
		game.gl.bindTexture(game.gl.TEXTURE_2D,tex);
	},
	draw(t)
	{
		let d=t-game.frameTime;
		game.frameTime=performance.now();
		try
		{
			if((document.fullscreenElement!=game.canvas)&&(!game.logSet))
			{
				document.getElementById("log").style.display=game.logVis;
				game.logSet=true;
			}
			game.gl.clearColor(0,0,0,1);
			game.gl.clear(game.gl.COLOR_BUFFER_BIT);
			if(game.loaded)
			{
				if(document.fullscreenElement==game.canvas)
				{
					game.screen.draw(d,t);
					if(game.logSet)
					{
						document.getElementById("log").style.display="none";
						game.logSet=false;
					}
				}
				else
				{
					game.pressF.draw();
					if(!game.logSet)
					{
						document.getElementById("log").style.display=game.logVis;
						game.logSet=true;
					}
				}
			}
			else if(loader.loaded())
			{
				game.screen.retrieve();
				game.loaded=true;
				game.startTime=performance.now();
				if(!game.load)
				{
					game.load={};
					game.load.shader=loader.items.basic.shader.value;
					game.load.barShader=loader.items.loading.shader.value;
					game.load.loc=game.gl.getAttribLocation(game.load.shader,"a_data");
					game.load.barLoc=game.gl.getAttribLocation(game.load.barShader,"a_pos");
					game.load.texLoc=game.gl.getUniformLocation(game.load.shader,"u_tex");
					game.load.offLoc=game.gl.getUniformLocation(game.load.shader,"u_pos");
					game.load.perLoc=game.gl.getUniformLocation(game.load.barShader,"u_per");
					game.load.tex=loader.items["misc/load.png"].texture.value;
					game.load.vertBuff=game.gl.createBuffer();
					game.gl.bindBuffer(game.gl.ARRAY_BUFFER,game.load.vertBuff);
					game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
						[
							-64,-64,0,1,
							-64, 64,0,0,
							 64,-64,1,1,
							 64, 64,1,0
						]
					),game.gl.STATIC_DRAW);
					game.load.barBuff=game.gl.createBuffer();
					game.gl.bindBuffer(game.gl.ARRAY_BUFFER,game.load.barBuff);
					game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
						[
							0,  -1,
							0,-0.9,
							1,  -1,
							1,-0.9
						]
					),game.gl.STATIC_DRAW);
					game.load.draw=function()
					{
						game.gl.useProgram(game.load.shader);
						game.setTexture(game.load.texLoc,game.load.tex,0);
						game.gl.bindBuffer(game.gl.ARRAY_BUFFER,this.vertBuff);
						game.gl.uniform2f(game.load.offLoc,0,0);
						game.gl.enableVertexAttribArray(game.load.loc);
						game.gl.vertexAttribPointer(game.load.loc,4,game.gl.FLOAT,false,0,0);
						game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
						game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
						game.gl.useProgram(game.load.barShader);
						game.gl.bindBuffer(game.gl.ARRAY_BUFFER,this.barBuff);
						game.gl.uniform1f(game.load.perLoc,loader.getPercentage());
						game.gl.enableVertexAttribArray(game.load.barLoc);
						game.gl.vertexAttribPointer(game.load.barLoc,2,game.gl.FLOAT,false,0,0);
						game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,game.indS);
						game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
					};
				}
			}
			else if(game.load)
			{
				game.load.draw();
			}
			game.errframes=0;
		}
		catch(e)
		{
			game.errframes++;
			game.log.error("error:\n"+e.message);
		}
		try
		{
			if(game.errframes>30)
			{
				game.log.error("Too many consecutive draw errors, stopping render loop.");
			}
			else
			{
				let tis=game;
				requestAnimationFrame(function(ts){tis.draw(ts);});
			}
		}
		catch(e)
		{
			game.errframes++;
			game.log.error("error:\n"+e.message);
		}
	},
	log:
	{
		error(msg)
		{
			document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"<p style=\"color:#FF0000\">--🚫-- "+msg+"</p>";
		},
		warn(msg)
		{
			document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"<p style=\"color:#FFFF00\">--⚠️-- "+msg+"</p>";
		},
		inform(msg)
		{
			document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"<p style=\"color:#FFFFFF\">--❕-- "+msg+"</p>";
		}
	}
};