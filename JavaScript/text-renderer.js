//const loader={};
const textRenderer=
{
	doDraw:false,
	loaded:false,
	createBlock(x,y,src)
	{
		let ret=[];
		let x2=x;
		let y2=y-16;
		for(let i=0;i<src.length;i++)
		{
			if(textRenderer.offsets[str[i]])
			{
				ret.push(textRenderer.offsets[str[i]][0],textRenderer.offsets[str[i]][1],x2,y2);
				x2+=8;
			}
			else if(str[i]=="\n")
			{
				x2=x;
				y2-=16;
			}
		}
	},
	load()
	{
		loader.loadMulti(
		[
			["font","shader"],
			["misc/font_v2.png","texture"]
		]);
	},
	retrieve()
	{
		if(!textRenderer.loaded)
		{
			textRenderer.loaded=true;
			textRenderer.shader=loader.items.font.shader.value;
			textRenderer.texture=loader.items["misc/font_v2.png"]. texture.value;
			textRenderer.dataLoc=game.gl.getAttribLocation(textRenderer.shader,"a_data");
			textRenderer.charLoc=game.gl.getAttribLocation(textRenderer.shader,"a_char");
			textRenderer.texLoc=game.gl.getUniformLocation(textRenderer.shader,"u_tex");
		}
	},
	draw(colour)
	{
		if(textRenderer.doDraw)
		{
			
		}
	},
	setBlock(b)
	{
		if(b)
		{
			
			textRenderer.doDraw=true;
		}
		else
		{
			textRenderer.doDraw=false;
		}
	},
	offsets:
	{
		"a":[0.0000,0.000],
		"A":[0.0625,0.000],
		"b":[0.1250,0.000],
		"B":[0.1875,0.000],
		"c":[0.2500,0.000],
		"C":[0.3125,0.000],
		"d":[0.3750,0.000],
		"D":[0.4375,0.000],
		"e":[0.5000,0.000],
		"E":[0.5625,0.000],
		"f":[0.6250,0.000],
		"F":[0.6875,0.000],
		"g":[0.7500,0.000],
		"G":[0.8125,0.000],
		"h":[0.8750,0.000],
		"H":[0.9375,0.000],

		"i":[0.0000,0.125],
		"I":[0.0625,0.125],
		"j":[0.1250,0.125],
		"J":[0.1875,0.125],
		"k":[0.2500,0.125],
		"K":[0.3125,0.125],
		"l":[0.3750,0.125],
		"L":[0.4375,0.125],
		"m":[0.5000,0.125],
		"M":[0.5625,0.125],
		"n":[0.6250,0.125],
		"N":[0.6875,0.125],
		"o":[0.7500,0.125],
		"O":[0.8125,0.125],
		"p":[0.8750,0.125],
		"P":[0.9375,0.125],

		"q":[0.0000,0.250],
		"Q":[0.0625,0.240],
		"r":[0.1250,0.250],
		"R":[0.1875,0.250],
		"s":[0.2500,0.250],
		"S":[0.3125,0.250],
		"t":[0.3750,0.250],
		"T":[0.4375,0.250],
		"u":[0.5000,0.250],
		"U":[0.5625,0.250],
		"v":[0.6250,0.250],
		"V":[0.6875,0.250],
		"w":[0.7500,0.250],
		"W":[0.8125,0.250],
		"x":[0.8750,0.250],
		"X":[0.9375,0.250],

		"y":[0.0000,0.375],
		"Y":[0.0625,0.375],
		"z":[0.1250,0.375],
		"Z":[0.1875,0.375],
		"0":[0.2500,0.375],
		"1":[0.3125,0.375],
		"2":[0.3750,0.375],
		"3":[0.4375,0.375],
		"4":[0.5000,0.375],
		"5":[0.5625,0.375],
		"6":[0.6250,0.375],
		"7":[0.6875,0.375],
		"8":[0.7500,0.375],
		"9":[0.8125,0.375],
		" ":[0.8750,0.375],
		"!":[0.9375,0.375],

		"\"":[0.0000,0.500],
		"#":[0.0625,0.500],
		"$":[0.1250,0.500],
		"%":[0.1875,0.500],
		"&":[0.2500,0.500],
		"'":[0.3125,0.500],
		"(":[0.3750,0.500],
		")":[0.4375,0.500],
		"*":[0.5000,0.500],
		"+":[0.5625,0.500],
		",":[0.6250,0.500],
		"-":[0.6875,0.500],
		".":[0.7500,0.500],
		"/":[0.8125,0.500],
		":":[0.8750,0.500],
		";":[0.9375,0.500],

		"<":[0.0000,0.625],
		"=":[0.0625,0.625],
		">":[0.1250,0.625],
		"?":[0.1875,0.625],
		"@":[0.2500,0.625],
		"[":[0.3125,0.625],
		"\\":[0.3750,0.625],
		"]":[0.4375,0.625],
		"^":[0.5000,0.625],
		"_":[0.5625,0.625],
		"`":[0.6250,0.625],
		"{":[0.6875,0.625],
		"|":[0.7500,0.625],
		"}":[0.8125,0.625],
		"~":[0.8750,0.625]
		//"a":[0.9375,0.625],

		//"a":[0.0000,0.750],
		//"a":[0.0625,0.750],
		//"a":[0.1250,0.750],
		//"a":[0.1875,0.750],
		//"a":[0.2500,0.750],
		//"a":[0.3125,0.750],
		//"a":[0.3750,0.750],
		//"a":[0.4375,0.750],
		//"a":[0.5000,0.750],
		//"a":[0.5625,0.750],
		//"a":[0.6250,0.750],
		//"a":[0.6875,0.750],
		//"a":[0.7500,0.750],
		//"a":[0.8125,0.750],
		//"a":[0.8750,0.750],
		//"a":[0.9375,0.750],

		//"a":[0.0000,0.875],
		//"a":[0.0625,0.875],
		//"a":[0.1250,0.875],
		//"a":[0.1875,0.875],
		//"a":[0.2500,0.875],
		//"a":[0.3125,0.875],
		//"a":[0.3750,0.875],
		//"a":[0.4375,0.875],
		//"a":[0.5000,0.875],
		//"a":[0.5625,0.875],
		//"a":[0.6250,0.875],
		//"a":[0.6875,0.875],
		//"a":[0.7500,0.875],
		//"a":[0.8125,0.875],
		//"a":[0.8750,0.875],
		//"a":[0.9375,0.875]
	}
};