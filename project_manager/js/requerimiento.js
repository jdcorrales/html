var Requerimiento = Object.create(Pantalla, {

	init : {
		value : function(nombre){
			Pantalla.init.call(this, nombre);			

			return this;
		}
	},

	screenRequerimiento : {
		value : function(){
			var card_panel, cpanel_heading, cpanel_title, cpanel_body;

			card_panel = this.componentes('div', 'panel panel-default card_panel', 'card_panel');
			card_panel = this.styleComponentes(card_panel, 'padding: 0px;');
			cpanel_heading = this.componentes('div', 'panel-heading', 'cpanel-heading');
			cpanel_title = this.componentes('div', 'panel-title', 'cpanel-title');
			this.appendComponentes('#cpanel-title', 'ID');
			//cpanel_title = this.styleComponentes(cpanel_title, 'font-size: 12px;');
			cpanel_body = this.componentes('div', 'panel-body', 'cpanel-body');

			this.appendComponentes('.col-md-2', card_panel);
			this.appendComponentes('#card_panel', cpanel_heading);
		    this.appendComponentes('#cpanel-heading', cpanel_title);
		    this.appendComponentes('#card_panel', cpanel_body);
		    this.appendComponentes('#cpanel-title', 'ID');
		    this.appendComponentes('#cpanel-body', '------------<br />------------<br />------------<br />');
		}
	},

	dagrableRequerimiento :{
		value :function(){
			/*$('.col-md-2 .card_panel').draggable({
			    cursor: 'move',			    
			    helper: 'clone',
			    opacity: 0.5,			    
			    connectWith: '.lpanel-body',
		        tolerance: 'fit'        
			});*/

			/*$('.ordenador').droppable({		
				accept: '.col-md-2 #card_panel',	    
			    drop: function(event, ui) {
			    	console.log('entro');
			        /*var clone = $(ui.draggable).clone();		        
	                clone.css("position", "absolute");
	                clone.addClass("ui-widget-content");
	                clone.css("width", "387px");
	                clone.css("height", "193px");	          			                
	          		clone.draggable({ containment: 'parent' ,cursor: 'crosshair', tolerance: 'fit', containment: '.dropzone'});
	          		$(this).append(clone);
		        }
			});*/
		}
	}
});