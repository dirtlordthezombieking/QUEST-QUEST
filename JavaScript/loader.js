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
				return;
			}
			loader.items[src].count++;
		}
		else
		{
			loader.items[src]={count:1};
		}
		//await
	},
	async loadString(src)
	{
		if(src in loader.items)
		{
			if("string" in (loader.items[src]))
			{
				loader.items[src].string.count++;
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
	},
	async loadShader(src)
	{
		//----
	},
	async loadImage(src)
	{
		game.log.inform("image start");
		if(src in loader.items)
		{
			if("image" in (loader.items[src]))
			{
				loader.items[src].image.count++;
				return;
			}
			loader.items[src].count++;
		}
		else
		{
			loader.items[src]={count:1};
		}
		let image=new Image();
		image.src=src;
		let loaded=false;
		image.onload=function()
		{
			game.log.inform("image onload");
			try
			{
				loader.items[src].image={value:image,count:1};
				game.log.inform("image loaded");
			}
			catch(e)
			{
				game.log.error("error loading image \""+src+"\": "+e.message);
			}
			loader.queue--;
			loaded=true;
		};
		await utils.untiCondition(_ =>loaded==true);
		game.log.inform("image end");
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