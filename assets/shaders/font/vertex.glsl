attribute vec4 a_data;
varying vec2 v_uv;
uniform vec4 u_data;
void main()
{
	v_uv=a_data.zw+u_data.zw;
	gl_Position=vec4((a_data.xy+u_data.xy)/vec2(384.0,256.0),0.0,1.0);
}