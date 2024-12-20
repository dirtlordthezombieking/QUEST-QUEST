const characterRenderer=
{
	methods=[],
	dirs=[0,0.25,0,0.5,0.75]
	load()
	{
		loader.loadMulti(
		[
			["character","shader"],

			["sprite/detail/beastfolk/fur/001.png" ,"texture"],
			["sprite/detail/beastfolk/skin/001.png","texture"],
			["sprite/detail/demons/horns/001.png"  ,"texture"],
			["sprite/detail/fishfolk/back/00.png"  ,"texture"],
			["sprite/detail/fishfolk/back/01.png"  ,"texture"],
			["sprite/detail/fishfolk/back/10.png"  ,"texture"],
			["sprite/detail/fishfolk/back/11.png"  ,"texture"],
			["sprite/detail/nephilim/halo/001.png" ,"texture"],
			["sprite/detail/vampire/fangs/001.png" ,"texture"],
			["sprite/detail/vampire/fangs/002.png" ,"texture"],

			["sprite/ears/default.png"             ,"texture"],
			["sprite/ears/none.png"                ,"texture"],
			["sprite/ears/pointy.png"              ,"texture"],

			["sprite/eyebrows/normal.png"          ,"texture"],
			["sprite/eyebrows/thick.png"           ,"texture"],

			["sprite/eyes/base/001.png"            ,"texture"],
			["sprite/eyes/base/001.png"            ,"texture"],

			["sprite/hair/001.png"                 ,"texture"],
			["sprite/hair/002.png"                 ,"texture"],
			["sprite/hair/front/001.png"           ,"texture"],
			["sprite/hair/front/002.png"           ,"texture"],

			["sprite/pants/basic.png"              ,"texture"],

			["sprite/shirt/001/00.png"             ,"texture"],
			["sprite/shirt/001/01.png"             ,"texture"],
			["sprite/shirt/001/10.png"             ,"texture"],
			["sprite/shirt/001/11.png"             ,"texture"],

			["sprite/shoes/basic"                  ,"texture"],

			["sprite/00.png"                       ,"texture"],
			["sprite/01.png"                       ,"texture"],
			["sprite/10.png"                       ,"texture"],
			["sprite/11.png"                       ,"texture"]
		]);
	},
	retrieve()
	{
	},
	draw(data,x,y,dir,frame)
	{
		methods[data.race].draw(data,x,y,dir/4,dirs[frame]);
	}
};