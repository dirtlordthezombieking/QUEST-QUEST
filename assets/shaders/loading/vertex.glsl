attribute vec2 a_pos;
uniform float u_per;
void main()
{
	gl_Position=vec4((a_pos.x*u_per*2.0)-1.0,a_pos.y,0.0,1.0);
}