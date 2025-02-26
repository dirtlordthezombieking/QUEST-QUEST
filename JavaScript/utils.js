const utils=
{
	untilCondition(condition)
	{
		const check = resolve => {
			if(condition())
			{
				resolve();
			}
			else
			{
				setTimeout(_ => check(resolve),100);
			}
		};
		return new Promise(check);
	},
	properMod(n,b)
	{
		let ret=n%b;
		if(ret<0)
		{
			ret+=b;
		}
		return ret;
	},
	clamp(x,min,max)
	{
		return Math.min(Math.max(x,min),max);
	}
};