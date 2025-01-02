const credits=
{
	shown:false,
	click()
	{
		if(credits.shown)
		{
			document.getElementById("credits").style.display="none"
			credits.shown=false;
		}
		else
		{
			document.getElementById("credits").style.display="block"
			credits.shown=true;
		}
	}
};