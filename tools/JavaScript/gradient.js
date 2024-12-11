function value(val)
{
	if(val>31)
	{
		return val-32;
	}
	return val-31;
}
function limit(val)
{
	if(val<0)
	{
		return 0;
	}
	if(val>255)
	{
		return 255;
	}
	return val;
}
function generate()
{
	const canvas=document.createElement("canvas");
	canvas.width=64;
	canvas.height=64;
	const ctx=canvas.getContext("2d");
	ctx.clearRect(0,0,64,64);
	const id=ctx.getImageData(0,0,64,64);
	const pixels=id.data;
	for(let x=0;x<64;x++)
	{
		for(let y=0;y<64;y++)
		{
			const x2=value(x);
			const y2=value(y);
			const off=((y*64)+x)*4;
			const r=limit(128+(3*y2)+(-3*x2));
			const g=limit(128+(3*x2));
			const b=limit(128+(-3*y2)+(-3*x2));
			pixels[off]=r;
			pixels[off+1]=g;
			pixels[off+2]=b;
			pixels[off+3]=255;
			ctx.putImageData(id,0,0);
		}
	}
	const url=canvas.toDataURL();
	const a=document.createElement("a");
	a.download="gradient.png";
	a.href=url;
	a.textContent="Download PNG";
}