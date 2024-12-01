const utils=
{
	untilCondition(condition)
	{
		const check = resolve => {
			if(condition())
			{
				game.log.inform("resolve");
				resolve();
			}
			else
			{
				game.log.inform("don't resolve");
				setTimeout(_ => check(resolve),100);
			}
		};
		return new Promise(check);
	}
};