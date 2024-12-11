function generate()
{
	const canvas=document.createElement("canvas");
	canvas.width=200;
	canvas.height=200;
	const url=canvas.toDataURL();
	const a=document.createElement('a');
	a.download='gradient.png';
	a.href=url;
	a.textContent='Download PNG';
}