let canvas=document.querySelector("#canvas");
let gl=canvas.getContext("webgl2",{premultipliedAlpha:false,preserveDrawingBuffer:true});
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
function touchStart(e)
{
	//----
}
function touchMove(e)
{
	//----
}
function touchEnd(e)
{
	if(document.fullscreenElement!=canvas)
	{
		canvas.requestFullscreen();
		//return;
	}
}
function draw(t)
{
	gl.clearColor(0,0.5,0,1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	requestAnimationFrame(function(ts){draw(ts);});
}
requestAnimationFrame(function(ts){draw(ts);});