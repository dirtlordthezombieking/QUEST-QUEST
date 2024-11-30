attribute vec4 a_data;
varying vec2 v_uv;
void main()
{
	v_uv=a_data.zw;
	gl_Position=vec4(a_data.xy,0.0,1.0);
}