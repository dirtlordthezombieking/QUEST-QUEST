precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
void main()
{
	float time=mod(u_time/5000,1);
	float r=texture2D(u_tex,mod(v_uv+vec2(time,time),1.0)).x;
	float g=texture2D(u_tex,mod(v_uv,1.0)).y;
	float b=texture2D(u_tex,mod(v_uv+vec2(time,-time),1.0)).z;
	gl_FragColor=vec4(r,g,b,1.0);
}