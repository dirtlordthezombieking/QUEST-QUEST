precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	float pos=((v_uv.x*4.0)+v_uv.y);
	tex.x+=0.05*sin((pos*3.0)+(u_time*0.0004));
	tex.y+=0.1*sin((pos*5.0)+(u_time*0.0006));
	tex.z+=0.1*sin((pos*2.0)+(u_time*0.001));
	float a=tex.w;
	tex.w=min(tex.w,(u_time*2.0)+(pos/5.0)-12.0);
	tex.w=a;
	gl_FragColor=tex;
}