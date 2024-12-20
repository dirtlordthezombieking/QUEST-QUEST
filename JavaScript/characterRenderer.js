const characterRenderer=
{
	methods=[],
	dirs=[0,0.25,0,0.5,0.75],
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
		characterRenderer.shader=loader.items["character"].shader.vale;
                characterRenderer.dataLoc=game.gl.getAttribLocation(characterRenderer.shader,"a_data");
                characterRenderer.texLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_tex");
                characterRenderer.posLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_pos");
                characterRenderer.colLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_col");
                characterRenderer.offLoc=game.gl.getUniformLocation(characterRenderer.shader,"u_texOff");
		characterRenderer.buff=game.gl.createBuffer();
		game.gl.bindBuffer(game.gl.ARRAY_BUFFER,characterRenderer.buff);
		game.gl.bufferData(game.gl.ARRAY_BUFFER,new Float32Array(
		[
			 0, 0,0.00,0.25,
			 0,64,0.00,0.00,
			64, 0,0.25,0.25,
			64,64,0.25,0.00
		]
		characterRenderer.graphics=
		{
			detail:
			{
				beastfolk:
				{
					fur:
					[
						loader.items["sprite/detail/beastfolk/fur/001.png"].texture.value
					],
					skin:
					[
						loader.items["sprite/detail/beastfolk/skin/001.png"].texture.value
					]
				},
				demon:
				{
					horns:
					[
						loader.items["sprite/detail/demons/horns/001.png"].texture.value
					]
				},
				fishfolk:
				{
					back:
					[
						loader.items["sprite/detail/fishfolk/back/00.png"].texture.value,
						loader.items["sprite/detail/fishfolk/back/01.png"].texture.value,
						loader.items["sprite/detail/fishfolk/back/10.png"].texture.value,
						loader.items["sprite/detail/fishfolk/back/11.png"].texture.value
					]
				},
				nephilim:
				{
					halo:
					[
						loader.items.["sprite/detail/nephilim/halo/001.png" ].texture.value
					]
				},
				vampire:
				{
					fangs:
					[
						loader.items["sprite/detail/vampire/fangs/001.png"].texture.value,
						loader.items["sprite/detail/vampire/fangs/002.png"].texture.value
					]
				}
			},
			ears:
			[
				loader.items["sprite/ears/default.png"].texture.value,
				loader.items["sprite/ears/none.png"].texture.value,
				loader.items["sprite/ears/pointy.png"].texture.value
			],
			eyebrows:
			[
				loader.items["sprite/eyebrows/normal.png"].texture.value,
				loader.items["sprite/eyebrows/thick.png"].texture.value
			],
			eyes:
			{
				base:
				[
					loader.items["sprite/eyes/base/001.png"].texture.value;
				],
				iris:
				[
					loader.items["sprite/eyes/iris/001.png"].texture.value;
				]
			},
			hair:
			{
				back:
				[
					loader.items["sprite/hair/001.png"].texture.value;
					loader.items["sprite/hair/002.png"].texture.value;
				],
				front:
				[
					loader.items["sprite/hair/front/001.png"].texture.value;
					loader.items["sprite/hair/front/002.png"].texture.value;
				]
			},
			pants:
			[
				loader.items["sprite/pants/basic.png"].texture.value;
			],
			shirt:
			[
				loader.items["sprite/shirt/001/00.png"].texture.value;
				loader.items["sprite/shirt/001/01.png"].texture.value;
				loader.items["sprite/shirt/001/10.png"].texture.value;
				loader.items["sprite/shirt/001/11.png"].texture.value;
			],
			shoes:
			[
				loader.items["sprite/shoes/basic"].texture.value;
			],
			body:
			[
				loader.items["sprite/00.png"].texture.value;
				loader.items["sprite/01.png"].texture.value;
				loader.items["sprite/10.png"].texture.value;
				loader.items["sprite/11.png"].texture.value;
			]
		}
		characterRenderer.methods[0]=function(data,x,y,dir,frame)
		{
			
		}
	},
	draw(data,x,y,dir,frame)
	{
		methods[data.race].draw(data,x,y,dir/4,dirs[frame]);
	}
};