varying vec2 v_uv;
uniform float u_time;
uniform sampler2D u_tex;
main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	float pos=((u_uv.x*0.25)+u_uv.y)*10)+(u_time-0.5)
	gl_FragColor=
}