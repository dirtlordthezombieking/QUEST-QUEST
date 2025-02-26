//-----------------------------------------------FOR DEBUG PURPOSES
//function Float32Array(){}
//function Uint16Array(){}
//function Uint8Array(){}
//-------------------------------------------------------BASIC VARS
let zoom=5.0;
let tool=0;
let posX=0.0;
let posY=0.0;
let currentLayer=0;
let replaceColour=true;
let currentTool=0;
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
//getUniformLocation|getAttribLocation
let vertBuff=gl.createBuffer();
let indexArray=gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexArray);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(
[
	0,2,1,
	2,3,1
]),gl.STATIC_DRAW);
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
//--------MAIN--------
//Vertex
let vertShader=gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader,
`#version 300 es
in vec4 a_data;
out vec2 v_uv;
uniform vec2 u_pos;
uniform float u_scale;
uniform vec2 u_size;
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(((a_data.xy+u_pos)*u_scale)/u_size,0.0,1.0);
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
let canSize=gl.getUniformLocation(shader,"u_size");
let texLoc=gl.getUniformLocation(shader,"u_tex");
let vertLoc=gl.getAttribLocation(shader,"a_data");
let posLoc=gl.getUniformLocation(shader,"u_pos");
let zoomLoc=gl.getUniformLocation(shader,"u_scale");
//--------SAVE--------
//vertex
let saveVertShader=saveGL.createShader(saveGL.VERTEX_SHADER);
saveGL.shaderSource(saveVertShader,
`#version 300 es
in vec4 a_data;
out vec2 v_uv;
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(a_data.xy,0.0,1.0);
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
//---------------------------------------------------------TEXTURES
function createTexture(tw,th,data,x,y,w,h)
{
	let ret={};
	ret.tex=gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,ret.tex);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,tw,th,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(data));
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
	ret.vertBuff=
	gl.bindBuffer(gl.ARRAY_BUFFER,vertBuff);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(
	[
		0,0,0,1,
		0,h,0,0,
		w,0,1,1,
		w,h,1,0
	]),gl.STATIC_DRAW);
	return ret;
}
const blendTex=createTexture(4,4,
[
	  0,  0,  0,  0,   0,255,  0,255,   0,255, 0,255,   0,255,  0,255,
	255,  0,  0,255, 255,255,  0,255, 255,255, 0,255,   0,255,  0,255,
	255,  0,  0,255, 255,255,  0,255, 255,255, 0,255,   0,255,  0,255,
	255,  0,  0,255, 255,  0,  0,255, 255,  0, 0,255,   0,  0,  0,  0
],0,0,64,64);
const dontBlendTex=createTexture(4,4,
[
	  0,  0,  0,  0,   0,255,  0,255,   0,255, 0,255,   0,255,  0,255,
	255,  0,  0,255,   0,255,  0,255,   0,255, 0,255,   0,255,  0,255,
	255,  0,  0,255,   0,255,  0,255,   0,255, 0,255,   0,255,  0,255,
	255,  0,  0,255, 255,  0,  0,255, 255,  0, 0,255,   0,  0,  0,  0
],0,0,64,64);
//-------------------------------------------------------MATH UTILS
function correct(i)
{
	return Math.min(Math.max(Math.round(i),0),255);
}
function isInCanvas(x,y)
{
	//let canRect=[posX-(width/2),posY-(height/2),width,height]
	let cx=(x-(canvas.width/2));///zoom;
	let cy=(y-(canvas.height/2));///zoom;
	let ret=[];
	ret[0]=Math.floor(((cx/(zoom/2))-posX)+(width/2));//canRect[0];
	ret[1]=Math.floor(((cy/(zoom/2))+posY)+(height/2));//canRect[1];
	ret[2]=((ret[0]>=0)&&(ret[0]<width)&&(ret[1]>=0)&&(ret[1]<height));
	return ret;
}
//--------------------------------------------------IMAGE FUNCTIONS
function updateLayer(layerID)
{
	if(layers[layerID].texture===undefined)
	{
		layers[layerID].texture=gl.createTexture();
	}
	if(layers[layerID].SaveTexture===undefined)
	{
		layers[layerID].SaveTexture=saveGL.createTexture();
	}
	
//----
	gl.bindTexture(gl.TEXTURE_2D,layers[layerID].texture);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(layers[layerID].arr));
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
//----
	saveGL.bindTexture(saveGL.TEXTURE_2D,layers[layerID].texture);
	saveGL.texImage2D(saveGL.TEXTURE_2D,0,saveGL.RGBA,width,height,0,saveGL.RGBA,saveGL.UNSIGNED_BYTE,new Uint8Array(layers[layerID].arr));
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_WRAP_S,saveGL.CLAMP_TO_EDGE);
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_WRAP_T,saveGL.CLAMP_TO_EDGE);
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_MIN_FILTER,saveGL.NEAREST);
	saveGL.texParameteri(saveGL.TEXTURE_2D,saveGL.TEXTURE_MAG_FILTER,saveGL.NEAREST);
}
function addLayer()
{
	if(layersCount>=layers.length)
	{
		layers.push({});
	}
	layers[layersCount].arr=Array(width*height*4).fill(255);
	updateLayer(layersCount);
	layersCount++;
}
function createImage(w,h)
{
	gl.bindBuffer(gl.ARRAY_BUFFER,vertBuff);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(
	[
		0,0,0,1,
		0,h,0,0,
		w,0,1,1,
		w,h,1,0
	]),gl.STATIC_DRAW);
	width=w;
	height=h;
	layersCount=0;
	addLayer();
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
		let a2=(1-a1)*(layers[layerID].arr[pos+3]/255.0);
		r+=layers[layerID].arr[pos  ]*a2;
		g+=layers[layerID].arr[pos+1]*a2;
		b+=layers[layerID].arr[pos+2]*a2;
		al+=layers[layerID].arr[pos+3];
		r=correct(r);
		g=correct(g);
		b=correct(b);
		al=correct(al);
		colour=[r,g,b,al];
	}
	layers[layerID].arr[pos  ]=colour[0];
	layers[layerID].arr[pos+1]=colour[1];
	layers[layerID].arr[pos+2]=colour[2];
	layers[layerID].arr[pos+3]=colour[3];
	updateLayer(layerID);
}
//--------------------------------------------------BASIC FUNCTIONS
function resizeCanvas()
{
	canvas.width=canvas.clientWidth;
	canvas.height=canvas.clientHeight;
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.uniform2f(canSize,canvas.width,canvas.height);
}
new ResizeObserver(resizeCanvas).observe(canvas);
function draw(t)
{
	try
	{
	//main canvas
	gl.clearColor(0.5,0.5,0.5,1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(shader);
	gl.uniform1i(texLoc,0);
	gl.activeTexture(gl.TEXTURE0);
	//gl.bindTexture(game.gl.TEXTURE_2D,tex);
	gl.bindBuffer(gl.ARRAY_BUFFER,vertBuff);
	gl.enableVertexAttribArray(vertLoc);
	gl.vertexAttribPointer(vertLoc,4,gl.FLOAT,false,0,0);
	gl.uniform2f(posLoc,posX-(width/2),posY-(height/2));
	gl.uniform1f(zoomLoc,zoom);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexArray);
	for(let i=0;i<currentLayer;i++)
	{
		gl.bindTexture(gl.TEXTURE_2D,layers[i].texture);
		gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);
	}
	for(let i=currentLayer;i<layersCount;i++)
	{
		gl.bindTexture(gl.TEXTURE_2D,layers[i].texture);
		gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);
	}
	//draw UI
	
	//save canvas
	saveGL.clearColor(0,0,0,0);
	saveGL.clear(gl.COLOR_BUFFER_BIT);
	requestAnimationFrame(function(ts){draw(ts);});
	}
	catch(e)
	{
		document.getElementById("log").innerHTML=e.message;
	}
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
			setPixel(x,y,currentLayer);
		},
		touchMove(x,y,id,oldX,oldY,trueMove)
		{
			setPixel(x,y,currentLayer);
		},
		touchUp(x,y,id,life)
		{
			//----
		}
	}
];
//---------------------------------------------------INPUT RESPONSE
function touchStart(e)
{
	try
	{
	//document.getElementById("log").innerHTML="start";
	if(document.fullscreenElement!=canvas)
	{
		//canvas.requestFullscreen();
		return;
	}
	//document.getElementById("log").innerHTML="full screen";
	let t=e.changedTouches[0];
	pointers[t.identifier]=
	{
		cx:t.clientX,
		cy:t.clientY,
		sx:t.clientX,
		sy:t.clientY,
		px:t.clientX,
		py:t.clientY,
		down:true,
		enabled:true,
		moved:false
	};
	//down
	let inCan=isInCanvas(t.clientX,t.clientY);
	//document.getElementById("log").innerHTML=""+inCan[0]+","+inCan[1];
	if(inCan[2])
	{
		//document.getElementById("log").innerHTML="in canvas";
		tools[currentTool].touchDown(inCan[0],inCan[1],t.identifier);
	}
	}
	catch(er)
	{
		document.getElementById("log").innerHTML=er.message;
	}
}
function touchMove(e)
{
	//document.getElementById("log").innerHTML="move";
	if(document.fullscreenElement!=canvas)
	{
		//canvas.requestFullscreen();
		return;
	}
	let t=e.changedTouches[0];
	if(!pointers[t.identifier])
	{
		pointers[t.identifier]=
		{
			cx:t.clientX,
			cy:t.clientY,
			sx:t.clientX,
			sy:t.clientY,
			px:t.clientX,
			py:t.clientY,
			down:false,
			enabled:false,
			moved:false
		};
	}
	pointers[t.identifier].enabled=pointers[t.identifier].down;
	if(!pointers[t.identifier].enabled)
	{
		return;
	}
	pointers[t.identifier].px=pointers[t.identifier].cx;
	pointers[t.identifier].py=pointers[t.identifier].cy;
	pointers[t.identifier].cx=t.clientX;
	pointers[t.identifier].cy=t.clientY;
	let firstMove=false;
	if(!pointers[t.identifier].moved)
	{
		pointers[t.identifier].moved=(Math.max(Math.abs(pointers[t.identifier].cx-pointers[t.identifier].sx),Math.abs(pointers[t.identifier].cy-pointers[t.identifier].sy))>=5);
		if(pointers[t.identifier].moved)
		{
			firstMove=true;
		}
	}
	let inCan=isInCanvas(t.clientX,t.clientY);
	let inCan2=isInCanvas(pointers[t.identifier].px,pointers[t.identifier].py);
	if(inCan[2])
	{
		tools[currentTool].touchMove(inCan[0],inCan[1],t.identifier,inCan2[0],inCan2[1],pointers[t.identifier].moved);
	}
	//move
}
function touchEnd(e)
{
	//document.getElementById("log").innerHTML="end";
	if(document.fullscreenElement!=canvas)
	{
		canvas.requestFullscreen();
		return;
	}
	let t=e.changedTouches[0];
	if(!pointers[t.identifier])
	{
		pointers[t.identifier]=
		{
			cx:t.clientX,
			cy:t.clientY,
			sx:t.clientX,
			sy:t.clientY,
			px:t.clientX,
			py:t.clientY,
			down:false,
			enabled:false,
			moved:false
		};
	}
	pointers[t.identifier].enabled=pointers[t.identifier].down;
	if(!pointers[t.identifier].enabled)
	{
		return;
	}
	pointers[t.identifier].down=false;
	//up
	let inCan=isInCanvas(t.clientX,t.clientY);
	if(inCan[2])
	{
		tools[currentTool].touchUp(inCan[0],inCan[1],t.identifier);
	}
}
//-----------------------------------------------------------FINISH
createImage(64,64);
requestAnimationFrame(function(ts){draw(ts);});