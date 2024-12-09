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
			game.canvas.width=game.canvas.clientWidth;
			game.canvas.height=game.canvas.clientHeight;
			game.gl.enable(this.gl.CULL_FACE);
			game.gl.enable(this.gl.BLEND);
			game.gl.blendFunc(game.gl.SRC_ALPHA,game.gl.ONE_MINUS_SRC_ALPHA);
			game.gl.viewport(0,0,game.gl.canvas.width,game.gl.canvas.height);
			game.gl.clearColor(0,0,0,1);
			game.gl.clear(game.gl.COLOR_BUFFER_BIT);
			//loader.load("misc/title.json","sprite");
			//loader.load("misc/press f.json","sprite");
			//loader.load("misc/PRESS SPAC.json","sprite");
			//loader.load("misc/E TO START.json","sprite");
			loader.loadMulti(
			[
				["misc/title.json","sprite"],
				["misc/press f.json","sprite"],
				["misc/PRESS SPAC.json","sprite"],
				["misc/E TO START.json","sprite"]
			]);
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
	keyDown(e)
	{
		if(document.fullscreenElement!=game.canvas)
		{
			return;
		}
		switch(e.code)
		{
			//----
		}
	},
	keyUp(e)
	{
		if(document.fullscreenElement!=game.canvas)
		{
			if(e.code=="KeyF")
			{
				game.canvas.requestFullscreen();
			}
			return;
		}
		switch(e.code)
		{
			//----
		}
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
					game.title.draw();
					game.pressSpac.draw();
					game.eToStart.draw();
				}
				else
				{
					game.pressF.draw();
				}
			}
			else
			{
				if(loader.loaded())
				{
					game.title=loader.items["misc/title.json"].sprite.value;
					game.pressF=loader.items["misc/press f.json"].sprite.value;
					game.pressSpac=loader.items["misc/PRESS SPAC.json"].sprite.value;
					game.eToStart=loader.items["misc/E TO START.json"].sprite.value;
					game.loaded=true;
				}
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
			document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"<p style=\"color:#FF0000\">--E--"+msg+"</p>";
		},
		warn(msg)
		{
			document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"<p style=\"color:#FFFF00\">--W--"+msg+"</p>";
		},
		inform(msg)
		{
			document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"<p style=\"color:#00FF00\">--I--"+msg+"</p>";
		}
	}
};
//game.log.inform("inform");
//game.log.warn("warn");
//game.log.error("error");