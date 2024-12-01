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
		else
		{
			loader.queue--;
		}
	},
	async loadString(src)
	{
		//----
	},
	async loadShader(src)
	{
		//----
	},
	async loadImage(src)
	{
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
		image.onload=function()
		{
			try
			{
				loader.items[src].image={value:image,count:1};
			}
			catch(e)
			{
				game.log.error("error loading "+src+": "+e.message);
			}
			loader.queue--;
		};
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