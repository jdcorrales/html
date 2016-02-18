#include <bits/stdc++.h>
#include <czmq.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

using namespace std;

int triqui(int *jugador, char *datos_juego, int *casillas_jugadas);
void reverse(char s[]);
void itoa(int n, char s[]);

int handle(zmsg_t *msg, zmsg_t *response){
  char *msn_servidor, *tablero, *datos, **datos_juego;
  int *jugador, *casillas_jugadas, retorno;

  msn_servidor = NULL;  
  tablero      = NULL;  
  datos        = NULL;
  datos_juego  = NULL;
  jugador      = NULL;
  casillas_jugadas = NULL;  
  msn_servidor = (char *) malloc(10 * sizeof(char));  
  tablero      = (char *) malloc(10 * sizeof(char));  
  datos        = (char *) malloc(10 * sizeof(char));
  datos_juego  = (char **) malloc(10 * sizeof(char*));
  jugador      = (int *) malloc(sizeof(int));
  casillas_jugadas = (int *) malloc(sizeof(int));  
  
  msn_servidor = zmsg_popstr(msg); 
  tablero = zmsg_popstr(msg);   

  if(strcmp(msn_servidor,"jugar") == 0){   

    datos_juego[0] = strtok(tablero,"|");
    datos_juego[1] = strtok (NULL,"|");            
    datos_juego[2] = strtok (NULL,"|"); 
    
    *jugador = atoi(datos_juego[0]);
    *casillas_jugadas = atoi(datos_juego[2]);
    retorno = triqui(jugador, datos_juego[1], casillas_jugadas);
    itoa(*casillas_jugadas, datos_juego[2]);    

    if(retorno == 3){
      zmsg_addstr(response,"empate"); 
    }else if(retorno == 2){
      zmsg_addstr(response,"gano");      
    }else{
      zmsg_addstr(response,"mover");   
    }

    strcpy(datos,datos_juego[1]);

    if(*jugador == 1){
        strcpy(tablero,"2|");
    }else{
        strcpy(tablero,"1|");        
    }

    strcat(tablero,datos);
    strcpy(datos,datos_juego[2]);                                
    strcat(tablero,"|");
    strcat(tablero,datos);
    
    zmsg_addstr(response,tablero); 
    return 1;
  }else{
    return 0;
  }  
}

int main(){
  zctx_t *ctx = zctx_new();
  void *server = zsocket_new(ctx,ZMQ_DEALER);
  zsocket_connect(server,"tcp://localhost:3403");

  zmsg_t *msg = zmsg_new();
  zmsg_addstr(msg,"inscripcion");  
  zmsg_send(&msg,server);

  zmq_pollitem_t items[] = {{server, 0, ZMQ_POLLIN,0}};

  while(1){
    zmq_poll(items,1,10*ZMQ_POLL_MSEC);
    if(items[0].revents & ZMQ_POLLIN){
      
      zmsg_t *msg = zmsg_recv(server);
      zmsg_t *response = zmsg_new();
      int out = handle(msg,response);
      
      if(out == 1){
        zmsg_send(&response,server);  
      }
    }    
  }


  zctx_destroy(&ctx);
  return 0;
}

int triqui(int *jugador, char *datos_juego, int *casillas_jugadas){
    char **array_tablero, *str_posicion;
    int *posicion, retorno;    
 
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
        strcpy(array_tablero[(*posicion-1)],"O");        
        (*casillas_jugadas)++;
    }else{
        strcpy(array_tablero[(*posicion-1)],"X");
        (*casillas_jugadas)++;
    }
    
    if(*casillas_jugadas > 7){
      retorno = 3;
    }else if(strcmp(array_tablero[0], array_tablero[5]) == 0 && strcmp(array_tablero[0], array_tablero[8]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }else if(strcmp(array_tablero[2], array_tablero[4]) == 0 && strcmp(array_tablero[2], array_tablero[6]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }else if(strcmp(array_tablero[0], array_tablero[1]) == 0 && strcmp(array_tablero[0], array_tablero[2]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }else if(strcmp(array_tablero[3], array_tablero[4]) == 0 && strcmp(array_tablero[3], array_tablero[5]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }else if(strcmp(array_tablero[6], array_tablero[7]) == 0 && strcmp(array_tablero[6], array_tablero[8]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }else if(strcmp(array_tablero[0], array_tablero[3]) == 0 && strcmp(array_tablero[0], array_tablero[6]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }else if(strcmp(array_tablero[1], array_tablero[4]) == 0 && strcmp(array_tablero[1], array_tablero[7]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }else if(strcmp(array_tablero[2], array_tablero[5]) == 0 && strcmp(array_tablero[2], array_tablero[8]) == 0){
        printf("Gana el jugador No %d\n", *jugador);
        retorno = 2;
    }


    printf("\n\n");    
    printf(" %s | %s | %s \n", array_tablero[0], array_tablero[1], array_tablero[2]);    
    printf("--- --- ---\n");
    printf(" %s | %s | %s \n", array_tablero[3], array_tablero[4], array_tablero[5]);
    printf("--- --- ---\n");
    printf(" %s | %s | %s \n\n", array_tablero[6], array_tablero[7], array_tablero[8]);    
    printf("Espere su turno\n");

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

    return(retorno);
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