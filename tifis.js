var tablero, direccion;

var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var fondo = {
	imagenURL: "fondo.png",
	imagenOK: false
};

var tifis = {
	x: 100,
	y: 100,
	frenteURL: "diana-frente.png",
	frenteOK: false,
	izquierdaURL: "diana-izq.png",
	izquierdaOK: false,
	derechaURL: "diana-der.png",
	derechaOK: false,
	atrasURL: "diana-atras.png",
	atrasOK: false,
	velocidad: 20
};

var liz = {
	x: 400,
	y: 200,
	lizURL: "liz.png",
	lizOK: false
};

function inicio()
{
	var canvas = document.getElementById("campo");
	tablero = canvas.getContext("2d");
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	tifis.frente = new Image();
	tifis.frente.src = tifis.frenteURL;
	tifis.frente.onload = confirmarFrente;

	tifis.izquierda = new Image();
	tifis.izquierda.src = tifis.izquierdaURL;
	tifis.izquierda.onload = confirmarIzquierda;

	tifis.derecha = new Image();
	tifis.derecha.src = tifis.derechaURL;
	tifis.derecha.onload = confirmarDerecha;

	tifis.atras = new Image();
	tifis.atras.src = tifis.atrasURL;
	tifis.atras.onload = confirmarAtras;

	liz.imagen = new Image();
	liz.imagen.src = liz.lizURL;
	liz.imagen.onload = confirmarLiz;



	document.addEventListener("keydown", teclado);
}

function teclado(datosEvento)
{
	var codigo = datosEvento.keyCode;

	if(codigo == teclas.UP)
	{
		tifis.y -= tifis.velocidad;
	}

	if(codigo == teclas.DOWN)
	{
		tifis.y += tifis.velocidad;
	}

	if(codigo == teclas.LEFT)
	{
		tifis.x -= tifis.velocidad;
	}

	if(codigo == teclas.RIGHT)
	{
		tifis.x += tifis.velocidad;
	}

	direccion = codigo;
	dibujar();
}

function confirmarLiz()
{
	liz.lizOK = true;
	dibujar();
}

function confirmarFondo()
{
	fondo.imagenOK = true;
	dibujar();
}

function confirmarFrente()
{
	tifis.frenteOK = true;
	dibujar();
}

function confirmarIzquierda()
{
	tifis.izquierdaOK = true;
	dibujar();
}

function confirmarDerecha()
{
	tifis.derechaOK = true;
	dibujar();
}

function confirmarAtras()
{
	tifis.atrasOK = true;
	dibujar();
}

function dibujar()
{
	// Capa 1: fondo
	if(fondo.imagenOK)
	{
		tablero.drawImage(fondo.imagen, 0,0);
	}

	// Capa 2: liz
	if(liz.lizOK)
	{
		tablero.drawImage(liz.imagen,liz.x, liz.y);
	}

	// Capa 3: Tifis
	var tifiDibujo = tifis.frente;
	if(tifis.frenteOK && tifis.atrasOK && tifis.izquierdaOK && tifis.derechaOK)
	{
		if(direccion == teclas.UP)
		{
			tifiDibujo = tifis.atras;
		}

		if(direccion == teclas.DOWN)
		{
			tifiDibujo = tifis.frente;
		}

		if(direccion == teclas.LEFT)
		{
			tifiDibujo = tifis.izquierda;
		}

		if(direccion == teclas.RIGHT)
		{
			tifiDibujo = tifis.derecha;
		}
		tablero.drawImage(tifiDibujo, tifis.x, tifis.y);
	}
}