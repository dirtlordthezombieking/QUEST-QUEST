const loaders=
{
	items:{},
	queue:0,
	async load(src)
	{
		//----
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
		queue
		let image=new Image();
		image.src=src;
		image.onload=function()
		{
			try
			{
				if(!(src in items))
				{
					items[src]={type:"image",count:0,value:image};
				}
				items[src].count++;
			}
			catch(e)
			{
				game.log.error("error loading "+src+": "e.message);
			}
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
	async unload(src)
	{
		items[src].count--;
	}
};