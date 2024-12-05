const loop1=Math.PI*5000;
const loader=
{
	items:{},
	queue:0,
	loaded()
	{
		return loader.queue<=0;
	},
	async loadMulti(toLoad)
	{
		for(item of toLoad)
		{
			await loader.subLoad(item[0],item[1]);
		}
	},
	load(src,type)
	{
		if(src in loader.items)
		{
			if(type in (loader.items[src]))
			{
				return;
			}
		}
		else
		{
			loader.items[src]={};
		}
		loader.items[src][type]={};
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
	async subLoad(src,type)
	{
		try
		{
			if(src in loader.items)
			{
				if(type in (loader.items[src]))
				{
					await utils.untilCondition(_ => ("value" in loader.items[src][type]));
					return;
				}
			}
			else
			{
				loader.items[src]={};
			}
			loader.items[src][type]={};
			loader.queue++;
			if(type=="image")
			{
				await loader.loadImage(src);
			}
			else if(type=="string")
			{
				await loader.loadString(src);
			}
			else if(type=="shader")
			{
				await loader.loadShader(src);
			}
				else if(type=="sprite")
			{
					await loader.loadSprite(src);
			}
			else
			{
				loader.queue--;
			}
		}
		catch (e)
		{
			game.log.error("Error initializing load of "+type+" \""+src+"\": "+e.message);
		}
	},
	async loadSprite(src)
	{
		try
		{
			game.log.inform(src+"|1");
			await loader.subLoad("assets/data/visual/"+src,"string");
			const data=JSON.parse(loader.items["assets/data/visual/"+src].string.value);
			const out={};
			game.log.inform(src+"|2");
			await loader.subLoad(data.shader,"shader");
			out.shader=loader.items[data.shader].shader.value;
			game.log.inform(src+"|3");
			await loader.subLoad(data.image,"image");
			out.image=loader.items[data.image].image.value;
			game.log.inform(src+"|4");
			const n=data.box;
			out.loc=game.gl.getAttribLocation(out.shader,"a_data");
			out.vert=
			[
				n[0][0][0],n[0][1][0],n[0][0][1],1-n[0][1][1],
				n[0][0][0],n[1][1][0],n[0][0][1],1-n[1][1][1],
				n[1][0][0],n[0][1][0],n[1][0][1],1-n[0][1][1],
				n[1][0][0],n[1][1][0],n[1][0][1],1-n[1][1][1]
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
				if(uniform.type=="TIME")
				{
					un.size=-1;
					un.get=function()
					{
						let r=performance.now()-game.startTime;
						if(r<loop1)
						{
							return r;
						}
						return loop1+(r%loop1);
					};//1250&2500&500
				}
				else if(uniform.type=="3 fixed")
				{
					un.size=3;
					un.value=uniform.value;
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
					if(un.size==-1)
					{
						game.gl.uniform1f(un.loc,un.get());
					}
					else if(un.size==3)
					{
						game.gl.uniform3f(un.loc,un.value[0],un.value[1],un.value[2]);
					}
				}
				game.gl.bindBuffer(game.gl.ELEMENT_ARRAY_BUFFER,out.indBuff);
				game.gl.drawElements(game.gl.TRIANGLES,6,game.gl.UNSIGNED_SHORT,0);
			};
			loader.items[src].sprite.value=out;
		}
		catch (e)
		{
			game.log.error("Error loading sprite \""+src+"\": "+e.message);
		}
		loader.queue--;
	},
	async loadString(src)
	{
		const url="https://dirtlordthezombieking.github.io/QUEST-QUEST/"+src;
		try
		{
			const response=await fetch(url);
			if(!response.ok)
			{
				throw new Error("Error: "+response.status);
			}
			const text=await response.text();
			loader.items[src].string.value=text;
		}
		catch (e)
		{
			game.log.error("Error loading string \""+src+"\": "+e.message);
		}
		loader.queue--;
	},
	async loadShader(src)
	{
		try
		{
			await loader.subLoad("assets/shaders/"+src+"/vertex.glsl","string");
			const vertex=loader.items["assets/shaders/"+src+"/vertex.glsl"].string.value;
			await loader.subLoad("assets/shaders/"+src+"/fragment.glsl","string");
			const fragment=loader.items["assets/shaders/"+src+"/fragment.glsl"].string.value;
			let prog=glItems.createShaderProgram(vertex,fragment,src);
			loader.items[src].shader.value=prog;
		}
		catch (e)
		{
			game.log.error("Error loading shader \""+src+"\": "+e.message);
		}
		loader.queue--;
	},
	async loadImage(src)
	{
		try
		{
			let image=new Image();
			image.src="assets/graphics/"+src;
			let loaded=false;
			image.onload=function()
			{
				try
				{
					loader.items[src].image.value=image;
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
		loader.queue--;
	},
	async loadSound(src)
	{
		//----
	},
	async loadMusic(src)
	{
		//----
	}
};