#version 300 es
precision mediump float;
out vec4 fragColor;
in vec2 v_uv;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture(u_tex,v_uv);
	fragColor=tex;
}