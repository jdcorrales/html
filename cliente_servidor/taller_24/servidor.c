//Para compilar gcc -o servidor servidor.c -lzmq

#include <zmq.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <assert.h>
#include <stdlib.h>

int main (void)
{   
    char *query_string, *datos_jugador, buffer[256];


    query_string  = NULL;
    query_string  = (char *) malloc(10 * sizeof(char));
    datos_jugador = NULL;
    datos_jugador = (char *) malloc(10 * sizeof(char));

    //  Socket to talk to clients
    void *context = zmq_ctx_new ();
    void *responder = zmq_socket (context, ZMQ_REP);
    //int rc = zmq_bind (responder, "tcp://*:5589");
    int rc = zmq_bind (responder, "tcp://*:5529");
    
    assert (rc == 0);

    while (1) {

        //int size = zmq_recv (responder, buffer, 255, 0);

        //int size2 = zmq_send (responder, "hola mundo", strlen ("hola mundo"), 0);

        //Esperar para la siguiente peticion del cliente
        zmq_msg_t request;
        zmq_msg_init(&request);
        zmq_msg_recv(&request,responder,0);        
        query_string = (char *)zmq_msg_data(&request);
        zmq_msg_close(&request);
        
        printf("%s\n", query_string);

        if(strcmp(query_string,"%") == 0){
            datos_jugador = "1|1,2,3,4,5,6,7,8,9|0";
        }else{
            datos_jugador = query_string;
        }
        printf("%s\n", datos_jugador);
        sleep (1);          //  Do some 'work'

        //Envio de respuesta al cliente
        zmq_msg_t reply;
        zmq_msg_init_size(&reply, 23);
        memcpy(zmq_msg_data(&reply), datos_jugador, 23);
        zmq_msg_send(&reply,responder,0);        
        zmq_msg_close(&reply);
    }
    zmq_close(responder);
    zmq_ctx_destroy(context);
    return 0;
}
