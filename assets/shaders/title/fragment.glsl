varying vec2 v_uv;
uniform float u_time;
uniform sampler2D u_tex;
main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	float pos=((u_uv.x*0.25)+u_uv.y)*10)
	tex.x+=0.5*sin((pos*3.0)+(u_time*0.4));
	tex.y+=sin((pos*5.0)+(u_time*0.6));
	tex.z+=sin((pos*2.0)+(u_time*1.0));
	tex.w=min(tex.w,(u_time*2)+(pos/5.0)-12);
	gl_FragColor=tex;
}