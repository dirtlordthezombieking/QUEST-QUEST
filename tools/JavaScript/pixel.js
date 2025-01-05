//INPUT RESPONSE---------------------------------------------------
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
//IMAGE FUNCTIONS--------------------------------------------------
function addLayer()
{
	let size=width*height;
	for
}
//BASIC FUNCTIONS--------------------------------------------------
function resizeCanvas()
{
	canvas.width=canvas.clientWidth;
	canvas.height=canvas.clientHeight;
}
function draw(t)
{
	//main canvas
	gl.clearColor(0.5,0.5,0.5,1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	//save canvas
	saveGL.clearColor(0,0,0,0);
	saveGL.clear(gl.COLOR_BUFFER_BIT);
	requestAnimationFrame(function(ts){draw(ts);});
}
function save(name)
{
	url=saveCanvas.toDataURL();
	a.download=name+".png";
	a.href=url;
	a click();
	//a.textContent="Download PNG";
	//document.body.append(a);
}
//TOOLS------------------------------------------------------------
const tools=
[
	{
		name:"PixelPen"
		touchDown(x,y,id)
		{
			//----
		},
		touchMove(x,y,id,oldX,oldY)
		{
			//----
		},
		touchUp(x,y,id,life)
		{
			//----
		}
	}
]
//BASIC VARS-------------------------------------------------------
let zoom=1.0;
let tool=0;
let posX=0.0;
let posY=0.0;
let currentLayer=0;
let replace colour=false;
let width=64;
let heght=64;
let pointers=[];
let layers=[]:
//PRIMARY CANVAS SETUP---------------------------------------------
const canvas=document.querySelector("#canvas");
const gl=canvas.getContext("webgl2",{premultipliedAlpha:false});
gl.enable(gl.CULL_FACE);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
new ResizeObserver(resizeCanvas).observe(canvas);
//IMAGE------------------------------------------------------------
//OTHER ITEMS------------------------------------------------------ 
const a=document.createElement("a");
const saveCanvas=new canvas;
const saveGL=saveCanvas.getContext("webgl2",{premultipliedAlpha:false,preserveDrawingBuffer:true});
saveGL.enable(gl.CULL_FACE);
saveGL.enable(gl.BLEND);
saveGL.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
saveGL.viewport(0,0,gl.canvas.width,gl.canvas.height);
saveGL.clearColor(0,0,0,1);
saveGL.clear(gl.COLOR_BUFFER_BIT);
//FINISH-----------------------------------------------------------
requestAnimationFrame(function(ts){draw(ts);});