const data={}
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
			if(!hold[path[i])
			{
				if((typeof path[i])=="string")
				{
					hold[path[i]]={};
				}
				else if((typeof path[i])=="number")
				{
					hold[path[i]]=[];
				}
			}
			hold=hold[path.[i]];
		}
		hold[path.length-1]=value;
		window.localStorage.setItem(obj,JSON.stringify(data[obj]));
	}
	load()
	{
		data.devOptions=window.localStorage.setItem("devOptions","devOptions");
	}
}