precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	float pos=(((v_uv.x*0.25)+v_uv.y)*10.0);
	tex.x+=0.5*sin((pos*3.0)+(u_time*0.4));
	tex.y+=sin((pos*5.0)+(u_time*0.6));
	tex.z+=sin((pos*2.0)+(u_time*1.0));
	tex.w=min(tex.w,(u_time*2.0)+(pos/5.0)-12.0);
	tex.w=1.0;
	tex=vec4(1.0,1.0,1.0,1.0);
	gl_FragColor=tex;
}