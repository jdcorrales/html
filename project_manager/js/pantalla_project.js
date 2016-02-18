var PantallaProject = Object.create(Pantalla, {

	layout : {
		get : function(){
			return this.value;
		},
		set : function(newValue){
			this.value = newValue;
		}
	},

	init : {
		value : function(nombre, layout){
			Pantalla.init.call(this, nombre, layout);
			this.layout = layout;

			return this;
		}
	},

	screenRequirements : {
		value : function(){
			var row, colleft, colright, panel, panel_heading, panel_title, panel_body;
			var lpanel, lpanel_heading, lpanel_title, lpanel_body;
			var card_panel, cpanel_heading, cpanel_title, cpanel_body;
			

			row = this.componentes('div', 'row-fluid', 'rrow-fluid');
			colleft = this.componentes('div', 'col-md-2', 'rcol-md-2');
			colright = this.componentes('div', 'col-md-10', 'rcol-md-10');
			panel = this.componentes('div', 'panel panel-success', 'rpanel');
			panel_heading = this.componentes('div', 'panel-heading', 'rpanel-heading');
			panel_title = this.componentes('div', 'panel-title', 'rpanel-title');
			panel_body = this.componentes('div', 'panel-body', 'rpanel-body');

			this.appendComponentes('.content', row);			   
			this.appendComponentes('.row-fluid', colright);		
			this.appendComponentes('.row-fluid', colleft);		
			this.appendComponentes('#rcol-md-10', panel);
			this.appendComponentes('#rpanel', panel_heading);			
			this.appendComponentes('#rpanel-heading', panel_title);
			this.appendComponentes('#rpanel', panel_body);
			this.appendComponentes('#rpanel-title', '<h4>' + this.nombre + '</h4>');

			lpanel = this.componentes('div', 'panel panel-primary', 'lpanel');
			lpanel = this.styleComponentes(lpanel, 'padding: 0px;');
			lpanel_heading = this.componentes('div', 'panel-heading', 'lpanel-heading');
			lpanel_title = this.componentes('div', 'panel-title', 'lpanel-title');
			lpanel_title = this.styleComponentes(lpanel_title, 'font-size: 12px;');
			lpanel_body = this.componentes('div', 'panel-body', 'lpanel-body');
			lpanel_body = this.styleComponentes(lpanel_body, 'padding: 20%;');

			this.appendComponentes('.col-md-2', lpanel);
			this.appendComponentes('#lpanel', lpanel_heading);
			this.appendComponentes('#lpanel-heading', lpanel_title);
			this.appendComponentes('#lpanel', lpanel_body);
			this.appendComponentes('#lpanel-title', 'Ordenador');


			card_panel = this.componentes('div', 'panel panel-default', 'card_panel');
			card_panel = this.styleComponentes(card_panel, 'padding: 0px;');
			cpanel_heading = this.componentes('div', 'panel-heading', 'cpanel-heading');
			cpanel_title = this.componentes('div', 'panel-title', 'cpanel-title');
			this.appendComponentes('#cpanel-title', 'ID');
			cpanel_title = this.styleComponentes(cpanel_title, 'font-size: 12px;');
			cpanel_body = this.componentes('div', 'panel-body', 'cpanel-body');

			this.appendComponentes('.col-md-2', card_panel);
			this.appendComponentes('#card_panel', cpanel_heading);
		    this.appendComponentes('#cpanel-heading', cpanel_title);
		    this.appendComponentes('#card_panel', cpanel_body);
		    this.appendComponentes('#cpanel-title', 'ID');
		    this.appendComponentes('#cpanel-body', '------------<br />------------<br />------------<br />');			
		}
	},
});