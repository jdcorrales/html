var Pantalla = {
	id : 0,
	nombre : '',

	init : function(nombre){
		this.id ++;
		this.nombre = nombre;

		return this;
	},

	crear : function(html){
		console.log('id : ' + this.id + ' html: ' + html);
	},

	componentes : function(elemento, NameClass, NameId){
		var elemento =  document.createElement(elemento);
			elemento.className = NameClass;
			elemento.setAttribute('id',NameId);

		return elemento;
	},

	appendComponentes : function(father, child){
		$(father).append(child);
	},

	styleComponentes : function(componente, style){		
		componente.style.cssText = style;
		return componente;
	},


}