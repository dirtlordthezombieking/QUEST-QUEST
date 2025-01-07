//-----------------------------------------------FOR DEBUG PURPOSES
//function Float32Array(){}
//function UInt16Array(){}
//function Uint8Array(){}
//-------------------------------------------------------BASIC VARS
let zoom=1.0;
let tool=0;
let posX=0.0;
let posY=0.0;
let currentLayer=0;
let replaceColour=false;
let width=64;
let height=64;
let pointers=[];
let currentColour=[0,0,0,255];
let layers=[];
let layersCount=0;
let layerDraws=[];
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
const saveCanvas=document.createElement("canvas");
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
//Vertex
let vertShader=gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader,
`#version 300 es
in vec4 a_data;
out vec2 v_uv;
uniform vec2 u_pos;
uniform float u_scale:
uniform vec2 u_size
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(((a_data.xy*u_scale)+u_pos)/u_size,0.0,1.0);
}`);
gl.compileShader(vertShader);
//fragment
let fragShader=gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader,
`#version 300 es
precision mediump float;
out vec4 fragColor;
in vec2 v_uv;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture(u_tex,v_uv);
	fragColor=tex;
}`);
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
`#version 300 es
in vec4 a_data;
out vec2 v_uv;
uniform vec2 u_pos;
uniform float u_scale:
uniform vec2 u_size
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(((a_data.xy*u_scale)+u_pos)/u_size,0.0,1.0);
}`);
saveGL.compileShader(saveVertShader);
//fragment
let saveFragShader=saveGL.createShader(saveGL.FRAGMENT_SHADER);
saveGL.shaderSource(saveFragShader,
`#version 300 es
precision mediump float;
out vec4 fragColor;
in vec2 v_uv;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture(u_tex,v_uv);
	fragColor=tex;
}`);
saveGL.compileShader(saveFragShader);
//program
let saveShader=saveGL.createProgram();
saveGL.attachShader(saveShader,saveVertShader);
saveGL.attachShader(saveShader,saveFragShader);
saveGL.linkProgram(saveShader);
//---------------------------------------------------INPUT RESPONSE
function touchStart(e)
{
	pointers[e.changedTouches[0]]=
	{
	};
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
	if(layersCount>=layers.length)
	{
		layers.push({});
	}
	layers[layersCount].arr=Array(width*height*4).fill(0);
	updateLayer(layersCount);
	layersCount++;
}
function updateLayer(layerID)
{
	if(layers[layerID].texture!==undefined)
	{
		layers[layerID].texture=gl.createTexture();
	}
	if(layers[layerID].SaveTexture!==undefined)
	{
		layers[layerID].SaveTexture=saveGL.createTexture();
	}
	
//----
	gl.bindTexture(gl.TEXTURE_2D,layers[layerID].texture);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(layers[layerID].texture));
//----
	saveGL.bindTexture(saveGL.TEXTURE_2D,layers[layerID].texture);
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_WRAP_S,saveGL.CLAMP_TO_EDGE);
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_WRAP_T,saveGL.CLAMP_TO_EDGE);
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_MIN_FILTER,saveGL.NEAREST);
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_MAG_FILTER,saveGL.NEAREST);
	saveGL.texImage2D(saveGL.TEXTURE_2D,0,saveGL.RGBA,width,height,0,saveGL.RGBA,saveGL.UNSIGNED_BYTE,new Uint8Array(layers[layerID].SaveTexture));
}
function setPixel(x,y,layerID)
{
	let colour=currentColour;
	let pos=((y*width)+x)*4;
	if(!replaceColour)
	{
		let a1=currentColour[3]/255.0;
		let r=currentColour[0]*a1;
		let g=currentColour[1]*a1;
		let b=currentColour[2]*a1;
		let al=currentColour[3];
		let a2=(1-a1)*(layers[layerID][pos+3]/255.0);
		r+=layers[layerID][pos  ]*a2;
		g+=layers[layerID][pos+1]*a2;
		b+=layers[layerID][pos+2]*a2;
		al+=layers[layerID][pos+3];
		r=correct(r);
		g=correct(g);
		b=correct(b);
		al=correct(al);
		colour=[r,g,b,al];
	}
	layers[layerID][pos  ]=colour[0];
	layers[layerID][pos+1]=colour[1];
	layers[layerID][pos+2]=colour[2];
	layers[layerID][pos+3]=colour[3];
}
//-------------------------------------------------------MATH UTILS
function correct(i)
{
	return Math.min(Math.max(Math.round(i),0),255);
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
	let url=saveCanvas.toDataURL();
	a.download=name+".png";
	a.href=url;
	a.click();
	//a.textContent="Download PNG";
	//document.body.append(a);
}
//------------------------------------------------------------TOOLS
const tools=
[
	{
		name:"PixelPen",
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
];
//-----------------------------------------------------------FINISH
requestAnimationFrame(function(ts){draw(ts);});