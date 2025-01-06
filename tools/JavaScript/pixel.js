//-----------------------------------------------FOR DEBUG PURPOSES
//function Float32Array(){}
//function Int16Array(){}
//---------------------------------------------------INPUT RESPONSE
function touchStart(e)
{
	pointers[e.changedTouches[0]]=
	{
	}
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
//--------------------------------------------------IMAGE FUNCTIONS
function addLayer()
{
	layers.push(Array(width*height*4).fill(0));
	updateLayer(layers.length);
	layers++;
}
function updateLayer(layerID)
{
	if(layerID>layers.length)
	{
		layers(layerId=
		{
			texture:
			SaveTexture:
		}
	}
}
function setPixel(x,y,layerID)
{
	let colour=currentColour;
	if(!replaceColour)
	{
		//TODO:blending
	}
	pos=((y*width)+x)*4
	layers[layerID  ][pos]=colour[0];
	layers[layerID+1][pos]=colour[1];
	layers[layerID+2][pos]=colour[2];
	layers[layerID+3][pos]=colour[3];
}
//--------------------------------------------------BASIC FUNCTIONS
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
//------------------------------------------------------------TOOLS
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
//-------------------------------------------------------BASIC VARS
let zoom=1.0;
let tool=0;
let posX=0.0;
let posY=0.0;
let currentLayer=0;
let replaceColour=false;
let width=64;
let heght=64;
let pointers=[];
let layers=[];
let layerDraws=[];
let layers=0;
//---------------------------------------------PRIMARY CANVAS SETUP
const canvas=document.querySelector("#canvas");
const gl=canvas.getContext("webgl2",{premultipliedAlpha:false});
gl.enable(gl.CULL_FACE);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
new ResizeObserver(resizeCanvas).observe(canvas);
//------------------------------------------------SAVE CANVAS SETUP
const saveCanvas=new Canvas();
const saveGL=saveCanvas.getContext("webgl2",{premultipliedAlpha:false,preserveDrawingBuffer:true});
saveGL.enable(gl.CULL_FACE);
saveGL.enable(gl.BLEND);
saveGL.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
saveGL.viewport(0,0,gl.canvas.width,gl.canvas.height);
saveGL.clearColor(0,0,0,1);
saveGL.clear(gl.COLOR_BUFFER_BIT);
//------------------------------------------------------------IMAGE
//------------------------------------------------------OTHER ITEMS 
const a=document.createElement("a");
//----------------------------------------------------------SHADERS
//--MAIN--
//vertex
let vertShader=gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader,
'#version 300 es
in vec4 a_data;
out vec2 v_uv;
uniform vec2 u_pos;
uniform float u_scale:
uniform vec2 u_size
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(((a_data.xy*u_scale)+u_pos)/u_size,0.0,1.0);
}');
gl.compileShader(vertShader);
//fragment
let fragShader=gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader,
'#version 300 es
precision mediump float;
out vec4 fragColor;
in vec2 v_uv;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture(u_tex,v_uv);
	fragColor=tex;
}');
gl.compileShader(fragShader);
//program
let shader=gl.createProgram();
gl.attachShader(shader,vertShader);
gl.attachShader(shader,fragShader);
gl.linkProgram(shader);
//--SAVE--
//vertex
let saveVertShader=saveGL.createShader(saveGL.VERTEX_SHADER);
saveGL.shaderSource(saveVertShader,
'#version 300 es
in vec4 a_data;
out vec2 v_uv;
uniform vec2 u_pos;
uniform float u_scale:
uniform vec2 u_size
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(((a_data.xy*u_scale)+u_pos)/u_size,0.0,1.0);
}');
saveGL.compileShader(saveVertShader);
//fragment
let saveFragShader=saveGL.createShader(saveGL.FRAGMENT_SHADER);
saveGL.shaderSource(saveFragShader,
'#version 300 es
precision mediump float;
out vec4 fragColor;
in vec2 v_uv;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture(u_tex,v_uv);
	fragColor=tex;
}');
saveGL.compileShader(saveFragShader);
//program
let saveShader=saveGL.createProgram();
saveGL.attachShader(saveShader,saveVertShader);
saveGL.attachShader(saveShader,saveFragShader);
saveGL.linkProgram(saveShader);
//-----------------------------------------------------------FINISH
requestAnimationFrame(function(ts){draw(ts);});