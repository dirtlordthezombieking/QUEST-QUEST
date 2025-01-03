#version 300 es
precision mediump float;
out vec4 fragColor;
in vec2 v_uv;
uniform sampler2D u_tex;
uniform vec3 u_col;
void main()
{
	vec4 tex=texture(u_tex,v_uv);
	fragColor=vec4(tex.x*u_col.x/255.0,tex.y*u_col.y/255.0,tex.z*u_col.z/255.0,tex.w);
}