precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	gl_FragColor=tex;
}
