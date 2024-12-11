function generate()
{
	const canvas=document.createElement("canvas");
	canvas.width=64;
	canvas.height=64;
	const ctx=canvas.getContext('2d');
	const url=canvas.toDataURL();
	const a=document.createElement('a');
	a.download='gradient.png';
	a.href=url;
	a.textContent='Download PNG';
}