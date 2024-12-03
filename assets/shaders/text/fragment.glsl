precision mediump float;
varying vec2 v_uv;
uniform vec3 u_colour;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	vec4 col=vec4(u_colour.x*tex.x,u_colour.y*tex.x,u_colour.z*tex.x,tex.y);
	gl_FragColor=col;
}