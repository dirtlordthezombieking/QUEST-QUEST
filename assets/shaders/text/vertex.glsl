attribute vec4 a_data;
varying vec2 v_uv;
uniform vec2 u_pos;
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4((a_data.xy+u_pos)/vec2(384.0,256.0),0.0,1.0);
}