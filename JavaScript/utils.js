const utils=
{
	untilCondition(condition)
	{
		game.log.inform("wait");
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
	}
};