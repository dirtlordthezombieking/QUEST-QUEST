precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
void main()
{
	float r=texture2D(u_tex,v_uv+vec2(u_time,u_time)).x;
	float g=texture2D(u_tex,v_uv).y;
	float b=texture2D(u_tex,v_uv+vec2(u_time,-u_time)).z;
	gl_FragColor=vec2(r,g,b,1.0);
}