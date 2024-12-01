const game=
{
	started:false,
	start()
	{
		try
		{
			if(loader.items["assets/graphics/misc/quest quest.png"].image.value)
			{
				document.getElementById("log").append(loader.items["assets/graphics/misc/quest quest.png"].image.value);
			}
		if(this.started)
		{
			return;
		}
			this.started=true;
			this.canvas=document.querySelector("#canvas");
			this.gl=this.canvas.getContext("webgl",{premultipliedAlpha:false});
			this.canvas.width=this.canvas.clientWidth;
			this.canvas.height=this.canvas.clientHeight;
			this.gl.enable(this.gl.CULL_FACE);
			this.gl.enable(this.gl.BLEND);
			this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);
			this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
			this.gl.clearColor(0,0,0,1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			loader.load("assets/graphics/misc/quest quest.png","image");
		}
		catch(e)
		{
			game.log.error(e.message);
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