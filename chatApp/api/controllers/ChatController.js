/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addConv : function (req,res) {	

		console.log(req.params.all());

		var chatData = {
            user : req.param('user'),
            message : req.param('message')
        };



		if( req.isSocket && req.method === 'POST' ){
			// This is the message from connected client
			// So add new conversation
			Chat.create(chatData).exec(function (error,chat) {
				
				console.log(chat);

				Chat.publishCreate({
					id: chat.id,
					message : chat.message , 
					user: chat.user
				});
			}); 
		}
		else if(req.isSocket){
			// subscribe client to model changes 
			Chat.watch(req.socket);
			console.log( 'User subscribed to ' + req.socket.id );
		}
	}	
};

