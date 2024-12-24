const data={}
{
	update(obj,path,value)
	{
		let hold=data[obj];
		for(let i=0;i<path.length-1;i++)
		{
			if(!hold[path[i])
			{
				
			}
		}
		hold[path.length-1]=value:
		window.localStorage.setItem(obj)
	}
	load()
	{
		data.devOptions=window.localStorage.setItem("devOptions","devOptions");
	}
}