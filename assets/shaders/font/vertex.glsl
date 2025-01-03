#version 300 es
in vec4 a_data;
out vec2 v_uv;
in vec4 a_char;
void main()
{
	v_uv=a_data.zw+a_char.zw;
	gl_Position=vec4((a_data.xy+a_char.xy)/vec2(384.0,256.0),0.0,1.0);
}