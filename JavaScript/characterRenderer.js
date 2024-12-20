const characterRenderer=
{
	methods=[],
	load()
	{
		loader.loadMulti
		(
		)
	},
	retrieve()
	{
	},
	draw(data,dir,frame)
	{
		methods[data.race].draw(data,dir,frame);
	}
};