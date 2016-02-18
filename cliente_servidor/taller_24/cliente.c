//para compilar gcc -o cliente cliente.c -lzmq
#include <zmq.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <czmq.h>


void triqui(int *jugador, char *datos_juego);
void reverse(char s[]);
void itoa(int n, char s[]);

int main (void)
{
    zmq_msg_t request, reply;
    char *query_string, *datos_jugador, **datos_juego, *datos;
    int *jugador;

    query_string  = NULL;
    datos_jugador = NULL;
    datos_juego   = NULL;
    jugador       = NULL;
    datos         = NULL;
    query_string  = (char *) malloc(10 * sizeof(char));
    datos_jugador = (char *) malloc(10 * sizeof(char));
    datos_juego   = (char **) malloc(10 * sizeof(char*));
    datos         = (char *) malloc(10 * sizeof(char));
    jugador       = (int *) malloc(sizeof(int));

    printf ("Estableciendo conexion con el servidor...\n");
    void *context = zmq_ctx_new ();
    void *requester = zmq_socket (context, ZMQ_REQ);
    zmq_connect (requester, "tcp://localhost:5529");

    int request_nbr;
    
    while(1){       
        if(!strlen(query_string)){
            datos_jugador = "%";
        }else{            
            if(strlen(query_string)){                
                datos_juego[0] = strtok(query_string,"|");
                datos_juego[1] = strtok (NULL,"|");            
                datos_juego[2] = strtok (NULL,"|"); 

                *jugador     = atoi(datos_juego[0]);

                strcpy(datos,"");
                triqui(jugador, datos_juego[1]);                
                
                strcpy(query_string,datos_juego[0]);
                strcpy(datos,datos_juego[1]);                
                strcat(query_string,"|");
                strcat(query_string,datos);
                strcpy(datos,datos_juego[2]);                                
                strcat(query_string,"|");
                strcat(query_string,datos);                
                datos_jugador = query_string;                
            }            
        }

        //Datos enviados del cliente al servidor        
        zmq_msg_init_size(&request, 23);
        memcpy(zmq_msg_data(&request),datos_jugador, 23);        
        zmq_msg_send(&request,requester,0);
        zmq_msg_close(&request);        

        //Datos recividos por el cliente provenientes del servidor
        zmq_msg_init(&reply);
        zmq_msg_recv(&reply,requester,0);        
        query_string = (char *)zmq_msg_data(&reply);                
        zmq_msg_close(&reply);
    }

    sleep(2);
    zmq_close (requester);
    zmq_ctx_destroy (context);
    return 0;
}

void triqui(int *jugador, char *datos_juego){
    char **array_tablero, *str_posicion;
    int *posicion;    
 
    posicion      = NULL;
    str_posicion  = NULL;
    array_tablero = NULL;
    posicion      = (int *) malloc(sizeof(int));
    str_posicion  = (char *) malloc(10 * sizeof(char));
    array_tablero = (char **) malloc(100 * sizeof(char *));

    array_tablero[0] = strtok(datos_juego,",");
    array_tablero[1] = strtok (NULL,","); 
    array_tablero[2] = strtok (NULL,","); 
    array_tablero[3] = strtok (NULL,","); 
    array_tablero[4] = strtok (NULL,","); 
    array_tablero[5] = strtok (NULL,","); 
    array_tablero[6] = strtok (NULL,","); 
    array_tablero[7] = strtok (NULL,","); 
    array_tablero[8] = strtok (NULL,",");    

    printf("\n\n");    
    printf(" %s | %s | %s \n", array_tablero[0], array_tablero[1], array_tablero[2]);    
    printf("--- --- ---\n");
    printf(" %s | %s | %s \n", array_tablero[3], array_tablero[4], array_tablero[5]);
    printf("--- --- ---\n");
    printf(" %s | %s | %s \n\n", array_tablero[6], array_tablero[7], array_tablero[8]);

    if(strcmp(array_tablero[0], array_tablero[5]) == 0 && strcmp(array_tablero[0], array_tablero[8]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }else if(strcmp(array_tablero[2], array_tablero[4]) == 0 && strcmp(array_tablero[2], array_tablero[6]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }else if(strcmp(array_tablero[0], array_tablero[1]) == 0 && strcmp(array_tablero[0], array_tablero[2]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }else if(strcmp(array_tablero[3], array_tablero[4]) == 0 && strcmp(array_tablero[3], array_tablero[5]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }else if(strcmp(array_tablero[6], array_tablero[7]) == 0 && strcmp(array_tablero[6], array_tablero[8]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }else if(strcmp(array_tablero[0], array_tablero[3]) == 0 && strcmp(array_tablero[0], array_tablero[6]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }else if(strcmp(array_tablero[1], array_tablero[4]) == 0 && strcmp(array_tablero[1], array_tablero[7]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }else if(strcmp(array_tablero[2], array_tablero[5]) == 0 && strcmp(array_tablero[2], array_tablero[8]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        exit(0);
    }

    printf("Ingrese la posicion\n");
    scanf("%d", posicion);  
    itoa(*posicion,str_posicion);

    while((*posicion > 9) || (*posicion < 1)){
        printf("Solo se permiten valores del 1 al 9\n");
        printf("Ingrese la posicion\n");
        scanf("%d", posicion);
        itoa(*posicion,str_posicion);
    }

    while(strcmp(array_tablero[(*posicion-1)], str_posicion) != 0){
        printf("La posicion seleccionada ya se encuentra en juego con el valor de %s\n", array_tablero[(*posicion-1)]);
        printf("Ingrese una nueva posicion\n");
        scanf("%d", posicion);

        while((*posicion > 9) || (*posicion < 1)){
            printf("Solo se permiten valores del 1 al 9\n");
            printf("Ingrese la posicion\n");
            scanf("%d", posicion);        
        }
        itoa(*posicion,str_posicion);        
    }

    if(*jugador == 1){
        array_tablero[(*posicion-1)] = "O";        
    }else{
        array_tablero[(*posicion-1)] = "X";
    }
    
    strcpy(datos_juego,array_tablero[0]);
    strcpy(str_posicion,array_tablero[1]);
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);
    strcpy(str_posicion,array_tablero[2]);
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);
    strcpy(str_posicion,array_tablero[3]);
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);
    strcpy(str_posicion,array_tablero[4]);
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);
    strcpy(str_posicion,array_tablero[5]);
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);
    strcpy(str_posicion,array_tablero[6]);
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);
    strcpy(str_posicion,array_tablero[7]);
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);
    strcpy(str_posicion,array_tablero[8]);         
    strcat(datos_juego,",");
    strcat(datos_juego, str_posicion);    
}

void reverse(char s[]){
  int i, j;
  char c;
 
  for (i = 0, j = strlen(s)-1; i<j; i++, j--) {
    c = s[i];
    s[i] = s[j];
    s[j] = c;
  }
}

void itoa(int n, char s[]){
  int i, sign;
 
  if ((sign = n) < 0)  /* record sign */
    n = -n;          /* make n positive */
    i = 0;
    do{       /* generate digits in reverse order */
      s[i++] = n % 10 + '0';   /* get next digit */
    }while((n /= 10) > 0);     /* delete it */
    
    if (sign < 0)
      s[i++] = '-';
    s[i] = '\0';
    reverse(s);
 } 
 //ALEJI2891@GMAIL
 //CARALBVARGAS@UTP