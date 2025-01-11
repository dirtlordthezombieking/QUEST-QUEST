#version 300 es
in vec4 a_data;
out vec2 v_uv;
uniform vec2 u_pos;
uniform float u_scale:
uniform vec2 u_size
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(((a_data.xy*u_scale)+u_pos)/u_size,0.0,1.0);
}