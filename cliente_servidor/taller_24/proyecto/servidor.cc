#include <czmq.h>

using namespace std;

zframe_t *cliente1 = zframe_new_empty();
zframe_t *cliente2 = zframe_new_empty();
int numero_clientes;

int handle(zmsg_t *msg, zmsg_t *response){
  char *mensaje, *tablero;
  zframe_t *destino; 

  mensaje = NULL;  
  tablero = NULL;
  mensaje = (char *) malloc(100 * sizeof(char));  
  tablero = (char *) malloc(100 * sizeof(char)); 

  zframe_t *identificador = zmsg_pop(msg);  
  mensaje = zmsg_popstr(msg);    
  tablero = zmsg_popstr(msg);

  printf("%s\n", mensaje);
  
  if(strcmp(mensaje,"inscripcion") == 0){      
    
    if(!zframe_size(cliente1)){
      cliente1 = zframe_dup(identificador);
      destino  = zframe_dup(identificador);
      zmsg_prepend(response,&destino);
      zmsg_addstr(response, "esperando");
      zmsg_addstr(response, "");
    }else if(!zframe_size(cliente2)){      
      cliente2 = zframe_dup(identificador);
      destino  = zframe_dup(cliente1);
      zmsg_prepend(response,&destino);
      zmsg_addstr(response, "jugar");
      zmsg_addstr(response, "1|1,2,3,4,5,6,7,8,9|0");      
    }else if(zframe_size(cliente1) && zframe_size(cliente2)){      
      destino = zframe_dup(identificador);
      zmsg_prepend(response,&destino);
      zmsg_addstr(response, "salir");
      zmsg_addstr(response, "");
    }   
  }  
  
  if(strcmp(mensaje,"mover") == 0){
      printf("%s\n", tablero);
      if(zframe_eq(identificador, cliente1)){
          destino  = zframe_dup(cliente2);
          zmsg_prepend(response,&destino);
          zmsg_addstr(response, "jugar");
          zmsg_addstr(response, tablero);
      }

      if(zframe_eq(identificador, cliente2)){      
          destino  = zframe_dup(cliente1);
          zmsg_prepend(response,&destino);
          zmsg_addstr(response, "jugar");
          zmsg_addstr(response, tablero);
      }
  }else if(strcmp(mensaje,"empate") == 0){

  }else if(strcmp(mensaje,"gano") == 0){

  }
  return 1;
}

int main(){
  zctx_t *ctx = zctx_new();
  void *clients = zsocket_new(ctx,ZMQ_ROUTER);
  zsocket_bind(clients,"tcp://*:3403");

  zmq_pollitem_t items[] = {{clients, 0, ZMQ_POLLIN,0}};

  while(1){    
    zmq_poll(items,1,10*ZMQ_POLL_MSEC);
    if(items[0].revents & ZMQ_POLLIN){
      zmsg_t *msg = zmsg_recv(clients);
      zmsg_t *response = zmsg_new();
      int out = handle(msg,response);
      zmsg_print(msg);      
      zmsg_send(&response,clients);      
    }    
  }  
  zctx_destroy(&ctx);
  return 0;
}