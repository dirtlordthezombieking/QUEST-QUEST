canvas=document.querySelector("#canvas");
gl=canvas.getContext("webgl2",{premultipliedAlpha:false});
gl.enable(gl.CULL_FACE);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
function resizeCanvas()
{
	canvas.width=canvas.clientWidth;
	canvas.height=canvas.clientHeight;
}
new ResizeObserver(resizeCanvas).observe(canvas);
touchStart(e)
{
	//----
}
touchMove(e)
{
	//----
}
touchEnd(e)
{
	if(document.fullscreenElement!=canvas)
	{
		canvas.requestFullscreen();
		return;
	}
}
function draw(t)
{
	game.gl.clearColor(0,0,0,1);
	game.gl.clear(game.gl.COLOR_BUFFER_BIT);
	requestAnimationFrame(function(t){draw(t);});
}
requestAnimationFrame(function(t){draw(t);});