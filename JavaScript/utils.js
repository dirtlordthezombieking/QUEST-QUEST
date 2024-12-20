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
			ret=b-ret;
		}
		return ret;
	}
};