precision mediump float;
varying vec2 v_uv;
uniform vec4 u_colour;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	vec4 col=vec4((u_colour.x*tex.x/255.0)+1.0,u_colour.y*tex.x/255.0,u_colour.z*tex.x/255.0,(tex.y*u_colour.w/255.0)+1.0);
	gl_FragColor=col;
}