#version 300 es
in vec4 a_data;
out vec2 v_uv;
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(a_data.xy/vec2(384.0,256.0),0.0,1.0);
}