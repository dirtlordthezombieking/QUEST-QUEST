const game=
{
	started:false,
	loaded:false,
	start()
	{
		game.startTime=performance.now();
		try
		{
			if(game.started)
			{
				return;
			}
			document.getElementById("start").style.display="none";
			game.started=true;
			game.canvas=document.querySelector("#canvas");
			game.gl=game.canvas.getContext("webgl",{premultipliedAlpha:false});
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
			requestAnimationFrame(function(ts){tis.draw(ts);});
			document.onkeydown=game.keyDown;
			document.onkeyup=game.keyUp;
			game.canvas.requestFullscreen();
		}
		catch(e)
		{
			game.log.error(e.message);
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
			game.gl.clearColor(0,0,0,1);
			game.gl.clear(game.gl.COLOR_BUFFER_BIT);
			if(game.loaded)
			{
				if(document.fullscreenElement==game.canvas)
				{
					game.screen.draw(d,t);
				}
				else
				{
					game.pressF.draw();
				}
			}
			else if(loader.loaded())
			{
				game.screen.retrieve();
				game.loaded=true;
				game.startTime=performance.now();
				if(!game.load)
				{
					game.load=
					{
						
					}
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