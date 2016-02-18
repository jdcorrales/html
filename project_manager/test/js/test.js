var id=0;//counter variable for unique id

$(function () {  

    var id = 0;

    $("#amounts .description").draggable({        
        cursor: 'move',
        connectWith: '.descrip_drop',
        helper: 'clone',
        opacity: 0.5,               
        tolerance: 'fit'
    });

    $('.descrip_drop').droppable({
        accept: '#amounts .description',
        activeClass: 'highlight',
        tolerance: "fit",
        drop: function(event, ui) {

            $("#amounts .ui-widget-content").draggable({                
                drag: function (event, ui) {           
                    $(".descrip_drop .droppable").droppable('enable');
                },                
                helper: 'clone'                
            });           
                                
            var posX = ui.offset.left - $(this).offset().left;
            var posY = ui.offset.top - $(this).offset().top;                    
            var clone = $(ui.draggable).clone();

            clone.css({top: posY, left: posX});
            $(this).append(clone);

            clone.draggable({ 
                containment: 'parent' ,
                cursor: 'crosshair', 
                tolerance: 'fit',                 
            });

            $(clone).find(".droppable").droppable({                
                tolerance: "fit",
                drop: function (event, ui) {                    
                    
                    var posX2 = ui.offset.left - $(this).offset().left;
                    var posY2 = ui.offset.top - $(this).offset().top;                    
                    
                    ui.draggable.draggable('option','revert',false);
                    id++;

                    $(this).append("<div class='mini' id=" + id + " style='position:initial; top:"+ posY2 +"px; left: "+ posX2 +"px; z-index:1 !important;'></div>");

                    $("#" + id).draggable({
                        connectWith : '.descrip_drop .droppable',
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

    $("#amounts .ui-widget-content").draggable({                
        connectWith : '.descrip_drop .droppable',
        helper: 'clone',
        tolerance: 'fit'        
    });


    /*$(".ui-widget-content").draggable({
        drag: function (event, ui) {           
            $(".droppable").droppable('enable');
        },
        helper: 'clone'
    });*/

    /*$(".droppable").droppable({
        tolerance: "fit",
        drop: function (event, ui) {   
            
            
            id++;
            
            $(this).append("<div class='mini' id=" + id + " style='position:relative;'></div>");

            $("#" + id).draggable({
                stop: function (event, ui) {
                    $(this).remove();
                }                
            });
        }
    });*/
});

