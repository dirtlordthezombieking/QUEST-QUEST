//const game={};
const data=
{
	update(obj,path,value)
	{
		if(!data[obj])
		{
			data[obj]={};
		}
		let hold=data[obj];
		for(let i=0;i<path.length-1;i++)
		{
			if(!hold[path[i]])
			{
				if((typeof path[i+1])=="string")
				{
					hold[path[i]]={};
				}
				else if((typeof path[i+1])=="number")
				{
					hold[path[i]]=[];
				}
			}
			hold=hold[path[i]];
		}
		hold[path[path.length-1]]=value;
		window.localStorage.setItem(obj,JSON.stringify(data[obj]));
		game.log.inform(JSON.stringify(data[obj]));
	},
	get(obj,path)
	{
		if(!data[obj])
		{
			return undefined;
		}
		let hold=data[obj];
		for(let i=0;i<path.length-1;i++)
		{
			if(!hold[path[i]])
			{
				return undefined;
			}
			hold=hold[path[i]];
		}
		return hold[path[path.length-1]];
	},
	load()
	{
		data.devOptions=JSON.parse(window.localStorage.getItem("devOptions"));
		if(data.get("devOptions",["devmode"]))
		{
			game.log.inform("loaded in Dev mode");
		}
	}
};