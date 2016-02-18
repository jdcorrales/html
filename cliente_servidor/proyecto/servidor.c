//Para compilar gcc -o servidor servidor.c -lzmq

#include <zmq.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <assert.h>
#include <stdlib.h>
#include <pthread.h>
#include "zhelpers.h"

static void * worker_routine (void *context) {
    char *query_string, *datos_jugador;

    query_string  = NULL;
    query_string  = (char *) malloc(10 * sizeof(char));
    datos_jugador = NULL;
    datos_jugador = (char *) malloc(10 * sizeof(char));


    //  Socket to talk to dispatcher
    void *receiver = zmq_socket (context, ZMQ_REP);
    zmq_connect (receiver, "inproc://example");

    while (1) {


        zmq_msg_t request;
        zmq_msg_init(&request);
        zmq_msg_recv(&request,receiver,0);        
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
        zmq_msg_send(&reply,receiver,0);        
        zmq_msg_close(&reply);

        char *string = s_recv (receiver);
        printf ("Received request: [%s]\n", string);
        free (string);
        //  Do some 'work'
        sleep (1);
        //  Send reply back to client
        s_send (receiver, "World");
    }
    zmq_close (receiver);
    return NULL;
}



int main (void){

    void *context = zmq_ctx_new ();

    //  Socket to talk to clients
    void *clients = zmq_socket (context, ZMQ_ROUTER);
    zmq_bind (clients, "tcp://*:5557");

    //  Socket to talk to workers
    void *workers = zmq_socket (context, ZMQ_DEALER);
    zmq_bind (workers, "inproc://example");

    //  Launch pool of worker threads
    int thread_nbr;
    for (thread_nbr = 0; thread_nbr < 5; thread_nbr++) {
        pthread_t worker;
        pthread_create (&worker, NULL, worker_routine, context);
    }
    //  Connect work threads to client threads via a queue proxy
    zmq_proxy (clients, workers, NULL);

    //  We never get here, but clean up anyhow
    zmq_close (clients);
    zmq_close (workers);
    zmq_ctx_destroy (context);
    return 0;
}
