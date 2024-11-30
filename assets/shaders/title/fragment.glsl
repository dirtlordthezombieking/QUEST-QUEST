varying vec2 v_uv;
uniform float time;
uniform sampler2D u_tex;
main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	gl_FragColor=
}