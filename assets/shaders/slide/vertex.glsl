attribute vec2 a_pos;
varying vec2 v_uv;
void main()
{
	v_uv=a_pos*vec2(3.0,2.0);
	gl_Position=vec4(a_pos,0.0,1.0);
}