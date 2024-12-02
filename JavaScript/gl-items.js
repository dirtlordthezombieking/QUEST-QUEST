const glItems=
{
	creatShader(type,source)
	{
		let shader=game.gl.createShader(type);
		game.gl.shaderSource(shader,source);
		game.gl.compileShader(shader);
		let success=game.gl.getShaderParameter(shader,game.gl.COMPILE_STATUS);
		if(success)
		{
			return shader;
		}
		game.gl.deleteShader(shader);
		throw new Error("Shader failed:\n"+gl.getShaderInfoLog(shader)+"\nIn:\n"+source);
	},
	createShaderProgram(vertexCode,fragmentCode,src)
	{
		let vertexShader=glItems.createShader(game.gl.VERTEX_SHADER,vertexCode);
		let fragmentShader=glItems.createShader(game.gl.FRAGMENT_SHADER,fragmentCode);
		let program=game.gl.createProgram();
		game.gl.attachShader(program,vertexShader);
		game.gl.attachShader(program,fragmentShader);
		game.gl.linkProgram(program);
		let success=gl.getProgramParameter(program,game.gl.LINK_STATUS);
		if(success)
		{
			return program;
		}
		const s=game.gl.getProgramInfoLog(program);
		game.gl.deleteProgram(program);
		throw new Error("shader \""+src+"\" failed to compile:\n"+s);
	}
}