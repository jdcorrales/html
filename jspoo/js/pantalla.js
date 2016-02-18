function Pantalla(){
	this._nombre = '';
}

Pantalla.prototype.setNombre = function(nombre){
	this._nombre = nombre;
}

Pantalla.prototype.getNombre = function(){
	return this._nombre;
}

Pantalla.prototype.mostrar = function(){
	//Codigo para mostrar la pantalla
}

Pantalla.prototype.ocultar = function(){
	//Codigo para ocultar la pantalla
}

Pantalla.prototype.destruir = function(){
	//codigo para eliminar la pantalla
}

