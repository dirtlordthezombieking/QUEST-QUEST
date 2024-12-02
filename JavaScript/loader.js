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
			out.shader=JSON.parse(loader.items[data shader].shader.value);
			await loader.loadImage(data.shader);
			out.shader=JSON.parse(loader.items[data shader].shader.value);
			
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
			await loader.loadString("assets/data/shaders/"+src+"/vertex.glsl");
			const vertex=loader.items["assets/data/shaders/"+src+"/vertex.glsl"].string.value;
			loader.queue++;
			await loader.loadString("assets/data/shaders/"+src+"/fragment.glsl");
			const fragment=loader.items["assets/data/shaders/"+src+"/fragment.glsl"].string.value;
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