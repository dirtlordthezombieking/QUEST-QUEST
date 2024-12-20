precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
varying vec3 u_col;
void main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	gl_FragColor=vex4(tex.x*u_col.x,tex.y*u_col.y,tex.z*u_col.z,tex.w);
}