#version 300 es
in vec4 a_data;
out vec2 v_uv;
uniform vec2 u_pos;
uniform vec2 u_texOff;
void main()
{
	v_uv=a_data.zw+u_texOff;
	gl_Position=vec4((a_data.xy+u_pos)/vec2(384.0,256.0),0.0,1.0);
}