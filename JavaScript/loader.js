const loader=
{
	items:{},
	queue:0,
	loaded()
	{
		return loader.queue<=0;
	},
	load(src,type)
	{
		loader.queue++;
		if(type=="image")
		{
			loader.loadImage(src);
		}
		else if(type=="string")
		{
			loader.loadString(src);
		}
		else if(type=="shader")
		{
			loader.loadShader(src);
		}
		else if(type=="sprite")
		{
			loader.loadSprite(src);
		}
		else
		{
			loader.queue--;
		}
	},
	async loadSprite(src)
	{
		if(src in loader.items)
		{
			if("sprite" in (loader.items[src]))
			{
				loader.items[src].sprite.count++;
				loader.queue--;
				return;
			}
			loader.items[src].count++;
		}
		else
		{
			loader.items[src]={count:1};
		}
		try
		{
			loader.queue++;
			await loader.loadString("assets/data/visual/"+src);
			const data=JSON.parse(loader.items["assets/data/visual/"+src].string.value);
			const out={};
			loader.queue++;
			await loader.loadShader(data.shader);
			out.shader=loader.items[data.shader].shader.value;
			loader.queue++;
			await loader.loadImage(data.image);
			out.image=loader.items[data.image].image.value;
			const n=data.box;
			out.loc=game.gl.getAttribLocation(out.shader,"a_data");
			out.vert=
			[
				n[0][0][0],n[0][1][0],n[0][0][1],n[0][1][1],
				n[0][0][0],n[1][1][0],n[0][0][1],n[1][1][1],
				n[1][0][0],n[0][1][0],n[1][0][1],n[0][1][1],
				n[1][0][0],n[1][1][0],n[1][0][1],n[1][1][1]
			];
			out.ind=
			[
				0,2,1,
				2,3,1
			];
			out.vertBuff=game.gl.createBuffer();
			game.gl.bindBuffer(game.gl.ARRAY_BUFFER,out.vertBuff);
			game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(out.vert),game.gl.STATIC_DRAW);
			out.indBuff=game.gl.createBuffer();
			game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,out.indBuff);
			game.gl.bufferData(game.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(out.ind),game.gl.STATIC_DRAW);
			out.texLoc=game.gl.getUniformLocation(out.shader,"u_tex");
			out.tex=game.gl.createTexture();
			game.gl.bindTexture(game.gl.TEXTURE_2D,out.tex);
			game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_WRAP_S,game.gl.CLAMP_TO_EDGE);
			game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_WRAP_T,game.gl.CLAMP_TO_EDGE);
			game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_MIN_FILTER,game.gl.NEAREST);
			game.gl.texParameteri(game.gl.TEXTURE_2D,game.gl.TEXTURE_MAG_FILTER,game.gl.NEAREST);
			game.gl.texImage2D(game.gl.TEXTURE_2D,0,game.gl.RGBA,game.gl.RGBA,game.gl.UNSIGNED_BYTE,out.image);
			out.unforms=[];
			for(const uniform of data.uniforms)
			{
				const un={};
				un.id=uniform.id;
				un.loc=game.gl.getUniformLocation(out.shader,un.id);
				if(uniform.value=="TIME")
				{
					un.size=1;
					un.get=function(){return performance.now()-game.startTime;};
				}
				else
				{
					un.size=0;
				}
				out.unforms.push(un);
			}
			out.draw=function()
			{
				game.gl.useProgram(out.shader);
				game.gl.uniform1i(out.texLoc,0);
				game.gl.activeTexture(game.gl.TEXTURE0);
				game.gl.bindTexture(game.gl.TEXTURE_2D,out.tex);
				game.gl.bindBuffer(game.gl.ARRAY_BUFFER,out.vertBuff);
				game.gl.enableVertexAttribArray(out.loc);
				game.gl.vertexAttribPointer(out.loc,4,game.gl.FLOAT,false,0,0);
				for(un of out.unforms)
				{
					if(un.size==1)
					{
						game.gl.uniform1f(un.loc,un.get());
					}
				}
				game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,out.indBuff);
				game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
			};
			loader.items[src].sprite={value:out,count:1};
		}
		catch (e)
		{
			game.log.error("Error loading sprite \""+src+"\": "+e.message);
		}
		loader.queue--;
	},
	async loadString(src)
	{
		if(src in loader.items)
		{
			if("string" in (loader.items[src]))
			{
				loader.items[src].string.count++;
				loader.queue--;
				return;
			}
			loader.items[src].count++;
		}
		else
		{
			loader.items[src]={count:1};
		}
		const url="https://dirtlordthezombieking.github.io/QUEST-QUEST/"+src;
		try
		{
			const response=await fetch(url);
			if(!response.ok)
			{
				throw new Error("Error: "+response.status);
			}
			const text=await response.text();
			loader.items[src].string={value:text,count:1};
		}
		catch (e)
		{
			game.log.error("Error loading string \""+src+"\": "+e.message);
		}
		loader.queue--;
	},
	async loadShader(src)
	{
		if(src in loader.items)
		{
			if("shader" in (loader.items[src]))
			{
				loader.items[src].shader.count++;
				loader.queue--;
				return;
			}
			loader.items[src].count++;
		}
		else
		{
			loader.items[src]={count:1};
		}
		try
		{
			loader.queue++;
			await loader.loadString("assets/shaders/"+src+"/vertex.glsl");
			const vertex=loader.items["assets/shaders/"+src+"/vertex.glsl"].string.value;
			loader.queue++;
			await loader.loadString("assets/shaders/"+src+"/fragment.glsl");
			const fragment=loader.items["assets/shaders/"+src+"/fragment.glsl"].string.value;
			let prog=glItems.createShaderProgram(vertex,fragment,src);
			loader.items[src].shader={value:prog,count:1};
		}
		catch (e)
		{
			game.log.error("Error loading shader \""+src+"\": "+e.message);
		}
		loader.queue--;
	},
	async loadImage(src)
	{
		game.log.inform("loading image: assets/graphics/"+src);
		if(src in loader.items)
		{
			if("image" in (loader.items[src]))
			{
				loader.items[src].image.count++;
				loader.queue--;
				return;
			}
			loader.items[src].count++;
		}
		else
		{
			loader.items[src]={count:1};
		}
		try
		{
			let image=new Image();
			image.src="assets/graphics/"+src;
			let loaded=false;
			image.onload=function()
			{
				try
				{
					loader.items[src].image={value:image,count:1};
				}
				catch(e)
				{
					game.log.error("error loading image \""+src+"\": "+e.message);
				}
				loaded=true;
			};
			await utils.untilCondition(_ => loaded==true);
		}
		catch (e)
		{
			game.log.error("Error loading image \""+src+"\": "+e.message);
		}
		game.log.inform("loaded image: assets/graphics/"+src);
		loader.queue--;
	},
	async loadSound(src)
	{
		//----
	},
	async loadMusic(src)
	{
		//----
	},
	unload(src,type)
	{
		if(src in loader.items)
		{
			if(type in (loader.items[src]))
			{
				loader.items[src].count--;
				loader.items[src][type].count--;
				if(loader.items[src][type].count<=0)
				{
					delete loader.items[src][type];
					if(loader.items[src].count<=0)
					{
						delete loader.items[src];
					}
				}
			}
		}
	}
};