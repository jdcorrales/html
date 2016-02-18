var Ordenador = Object.create(Pantalla, {	

	init : {
		value : function(nombre){
			Pantalla.init.call(this, nombre);			
			return this;
		}
	},

	screenOrdenador : {
		value : function(){
			var lpanel, lpanel_heading, lpanel_title, lpanel_body;

			lpanel = this.componentes('div', 'panel panel-primary drag-drop', 'lpanel');
			lpanel = this.styleComponentes(lpanel, 'padding: 0px;');
			lpanel_heading = this.componentes('div', 'panel-heading', 'lpanel-heading');
			lpanel_title = this.componentes('div', 'panel-title', 'lpanel-title');
			//lpanel_title = this.styleComponentes(lpanel_title, 'font-size: 12px;');
			lpanel_body = this.componentes('div', 'panel-body lpanel-body', 'lpanel-body');
			lpanel_body = this.styleComponentes(lpanel_body, 'height: 200px;');

			this.appendComponentes('.col-md-2', lpanel);
			this.appendComponentes('#lpanel', lpanel_heading);
			this.appendComponentes('#lpanel-heading', lpanel_title);
			this.appendComponentes('#lpanel', lpanel_body);
			this.appendComponentes('#lpanel-title', 'Ordenador');			
		}
	},
	dagrableOrdenador :{
		value :function(){
			$('.col-md-2 .drag-drop').draggable({
			    cursor: 'move',
			    connectWith: '.dropzone',
			    helper: 'clone',
			    opacity: 0.5,			    
			    tolerance: 'fit'
			});			

			$('.dropzone').droppable({
		        accept: '.col-md-2 .drag-drop',		        
		        tolerance: "fit",		        
		        drop: function(event, ui) {

		            $(".col-md-2 .card_panel").draggable({                
		                drag: function (event, ui) {           
		                    $(".dropzone .lpanel-body").droppable('enable');
		                },                
		                helper: 'clone'                
		            });           		                       
					                              
		            var posX = ui.offset.left - $(this).offset().left;
		            var posY = ui.offset.top - $(this).offset().top;                    
		            var clone = $(ui.draggable).clone();

		            clone.css("top", posY);
		            clone.css("left", posX);
		            clone.css("width", "500px");
	                clone.css("height", "500px");
	                clone.css("position", "absolute");
	                $(clone).find('.lpanel-body').css('height','100%');
	                
		            $(this).append(clone);

		            clone.draggable({ 
		                containment: 'parent' ,
		                cursor: 'crosshair', 
		                tolerance: 'fit'		                
		            });

		            $(clone).find(".lpanel-body").droppable({
		                tolerance: "fit",		                
		                drop: function (event, ui) {	                			                    
		                    var posX2 = ui.offset.left - $(this).offset().left;
		                    var posY2 = ui.offset.top - $(this).offset().top;                    
		                    
		                    ui.draggable.draggable('option','revert',false);
		                    this.id++;		                    

		                    console.log(this.id);

		                    $(this).append('<div class="panel panel-default card_panel" id="'+ this.id +'" style="width: 387px; height: 193px; padding: 0px; z-index: 1 !important;"><div class="panel-heading" id="cpanel-heading"><div class="panel-title" id="cpanel-title">ID</div></div><div class="panel-body" id="cpanel-body">------------<br>------------<br>------------<br></div></div>');

		                    $("#" + this.id).draggable({
		                        connectWith : '.dropzone .lpanel-body',
		                        cursor: 'move',                       
		                        revert: 'invalid',
		                        stop: function (event, ui) {		                        	
		                            if($(this).draggable('option','revert') !== 'invalid'){
		                                $(this).remove();
		                            }
		                        }
		                    });
		                }
		           });        
		        }
		    });		

		    $('.col-md-2 .card_panel').draggable({
			    cursor: 'move',			    
			    helper: 'clone',
			    opacity: 0.5,			    
			    connectWith: '.dropzone .lpanel-body',
		        tolerance: 'fit'       
			});		

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