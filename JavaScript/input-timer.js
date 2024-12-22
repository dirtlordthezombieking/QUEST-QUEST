const inputTimer=
{
	time:0,
	keys:{},
	reset()
	{
		inputTimer.keys={};
	},
	tick(t)
	{
		inputTimer.time=t;
	},
	keyDown(k)
	{
		if(inputTimer.keys[k])
		{
			if(inputTimer.keys[k][0])
			{
				return;
			}
		}
		inputTimer.keys[k]=[true,inputTimer.time];
	},
	keyUp(k)
	{
		if(!inputTimer.keys[k])
		{
			inputTimer.keys[k]=[false,0];
			return false;
		}
		inputTimer.keys[k][0]=false;
		return (inputTimer.time-inputTimer.keys[k][1])<1000;
	},
	get(k)
	{
		if(!inputTimer.keys[k])
		{
			inputTimer.keys[k]=[false,0];
			return false;
		}
		return inputTimer.keys[k][0];
	}
};