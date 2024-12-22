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
			inputTimer.keys[k][0];
		}
		inputTimer.keys[k]={true,inputTimer.time}
	}
	keyUp(k)
	{
		inputTimer.keys[k][0]=false;
		return (inputTimer.time-inputTimer.keys[k][0])<1000;
	}
}