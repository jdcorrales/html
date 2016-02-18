var Requisitos = Object.create(Pantalla, {

	init : {
		value : function(nombre){
			Pantalla.init.call(this, nombre);			

			return this;
		}
	},

	screenRequisitos : {
		value : function(){
			var row, colleft, colright, panel, panel_heading, panel_title, panel_body;
			
			row = this.componentes('div', 'row-fluid', 'rrow-fluid');
			colleft = this.componentes('div', 'col-md-2', 'rcol-md-2');
			colright = this.componentes('div', 'col-md-10', 'rcol-md-10');
			panel = this.componentes('div', 'panel panel-success', 'rpanel');
			panel_heading = this.componentes('div', 'panel-heading', 'rpanel-heading');
			panel_title = this.componentes('div', 'panel-title', 'rpanel-title');
			panel_body = this.componentes('div', 'panel-body dropzone', 'rpanel-body');


			this.appendComponentes('.content', row);			   
			this.appendComponentes('.row-fluid', colright);		
			this.appendComponentes('.row-fluid', colleft);							
			this.appendComponentes('#rcol-md-10', panel);
			this.appendComponentes('#rpanel', panel_heading);			
			this.appendComponentes('#rpanel-heading', panel_title);
			this.appendComponentes('#rpanel', panel_body);
			this.appendComponentes('#rpanel-title', '<h4>' + this.nombre + '</h4>');
		}
	},
});