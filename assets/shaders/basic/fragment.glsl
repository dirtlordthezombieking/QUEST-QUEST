#version 300 es
out vec4 fragColor;
precision mediump float;
in vec2 v_uv;
uniform sampler2D u_tex;
void main()
{
	vec4 tex=texture2D(u_tex,v_uv);
	fragColor=tex;
}
