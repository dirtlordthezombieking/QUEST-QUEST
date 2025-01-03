#version 300 es
precision mediump float;
out vec4 fragColor;
in vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
void main()
{
	float time=mod(u_time/5000.0,1.0);
	float r=texture2D(u_tex,mod(v_uv+vec2(time,time),1.0)).x*0.2;
	float g=texture2D(u_tex,mod(v_uv,1.0)).y*0.2;
	float b=texture2D(u_tex,mod(v_uv+vec2(time,-time),1.0)).z*0.2;
	fragColor=vec4(r,g,b,1.0);
}