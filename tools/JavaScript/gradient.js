function generate()
{
	const canvas=document.createElement("canvas");
	canvas.width=64;
	canvas.height=64;
	const ctx=canvas.getContext('2d');
	ctx.clearRect(0,0,64,64);
	const id=ctx.getImageData(0,0,64,64);
	const pixels=id.data;
	for(let x=0;x<64;x++)
	{
		for(let y=0;y<64;y++)
		{
			const off=((y*64)+x)*4;
			const r=(221-(3*y))
			const g=221-(3*x);
			const b=
			pixels[off]=r;
			pixels[off+1]=g;
			pixels[off+2]=b;
			pixels[off+3]=255;
		}
	}
	const url=canvas.toDataURL();
	const a=document.createElement('a');
	a.download='gradient.png';
	a.href=url;
	a.textContent='Download PNG';
}