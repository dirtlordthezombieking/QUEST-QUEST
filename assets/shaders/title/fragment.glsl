precision mediump float;
varying vec2 u_uv;
uniform float u_time;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture2D(u_tex,u_uv);
	float pos=(((u_uv.x*0.25)+u_uv.y)*10.0);
	tex.x+=0.5*sin((pos*3.0)+(u_time*0.4));
	tex.y+=sin((pos*5.0)+(u_time*0.6));
	tex.z+=sin((pos*2.0)+(u_time*1.0));
	tex.w=min(tex.w,(u_time*2.0)+(pos/5.0)-12.0);
	gl_FragColor=tex;
}