/*
	9)Hacer un programa en ANCI C que cree cuatro hijos que realicen las siguientes operaciones

		* Hijo 1:
			*Escriba en un archivo un mensaje
		*Hijo 2: 
			*Cuente cuantas palabras hay en el archivo
		*Hijo 3:
			*lea el mensaje y lo escriba invirtiendo en un segundo archivo
		*Hijo 4 
			*Modifique el segundo archivo colocando un guión entre cada palabra
*/

#include <signal.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

sig_atomic_t child_exit_status;

void clean_up_child_process (int signal_number){
	
	int status;
	wait (&status);	
	child_exit_status = status;
	printf("Codigo de salida: %d\n", child_exit_status);
}

int spawn (char* program, char** arg_list){

	execvp (program, arg_list);	
	fprintf (stderr, "error al ejecutar el programa.\n");
	abort ();
}

int main (){

	
	struct sigaction sigchld_action;
	memset (&sigchld_action, 0, sizeof(sigchld_action));
	sigchld_action.sa_handler = &clean_up_child_process;
	sigaction (SIGCHLD, &sigchld_action, NULL);
	
	pid_t child_pid1;
	pid_t child_pid2;	
	pid_t child_pid3;	
	pid_t child_pid4;	

	child_pid1 = fork();
		
	if (child_pid1 != 0){

		child_pid2 = fork();		

		if(child_pid2 != 0){

			child_pid3 = fork();

			if(child_pid3 != 0){

				child_pid4 = fork();
				if(child_pid4 != 0){

				}else{
					sleep(45);
					FILE *leer_mensaje2;
					char *palabras2, *mensaje_guion;

					palabras2          = NULL;				
					mensaje_guion     = NULL;
					palabras2          = (char *) malloc(1000 * sizeof(char));    
					mensaje_guion     = (char *) malloc(1000 * sizeof(char));    
					leer_mensaje2=fopen("archivos/mensaje_invertido.txt","r+");

					if (leer_mensaje2==NULL){
						printf( "No se puede abrir el archivo del mensaje invertido.\n" );    
					    exit(1);
					}

					fscanf(leer_mensaje2,"%s", palabras2);
					while (feof(leer_mensaje2)==0){															
						if(mensaje_guion == NULL){
							strcat(mensaje_guion,palabras2);    									
						}else{							
							strcat(mensaje_guion,"-");    					
							strcat(mensaje_guion,palabras2);    											
						}
						fscanf(leer_mensaje2,"%s", palabras2);
					}	
					fseek(leer_mensaje2,(ftell(leer_mensaje2) - strlen(mensaje_guion)), SEEK_SET);        
					fprintf(leer_mensaje2, "%s", mensaje_guion);  
					fclose(leer_mensaje2);
				}
			}else{
				sleep(20);
				FILE *leer_mensaje, *escribir_mensaje;
				char *palabras, *mensaje_invertido;			

				palabras          = NULL;
				mensaje_invertido = NULL;				
				palabras          = (char *) malloc(1000 * sizeof(char));      
				mensaje_invertido = (char *) malloc(1000 * sizeof(char));				

				leer_mensaje = fopen("archivos/mensaje.txt","r");
				if (leer_mensaje==NULL){
					printf( "No se puede abrir el archivo de mensaje.\n" );    
				    exit(1);
				}
				
				fscanf(leer_mensaje,"%s", palabras);
				while (feof(leer_mensaje)==0){										
					strcat(palabras," ");    					
					strcat(palabras,mensaje_invertido);    					
					strcpy(mensaje_invertido, palabras);
					fscanf(leer_mensaje,"%s", palabras);
				}	
	    		fclose(leer_mensaje);	 	    		
	    		strcat(mensaje_invertido,"\n");    					   						
				escribir_mensaje=fopen("archivos/mensaje_invertido.txt","a+");
				if (escribir_mensaje==NULL){
					printf( "No se puede abrir el archivo para escibir el mensaje invertido.\n" );    
				    exit(1);
				}
				fprintf(escribir_mensaje, "%s",mensaje_invertido);    
		    	fclose(escribir_mensaje);
	    		free(palabras);
	    		free(mensaje_invertido);
			}			
		}else{
			sleep(20);
			FILE *obtener_mensaje;
			char *mensaje_texto;
			int *contador;

			mensaje_texto = NULL;
			contador      = NULL;
			mensaje_texto = (char *) malloc(100 * sizeof(char));      
			contador      = (int *) malloc(sizeof(int));
			obtener_mensaje = fopen("archivos/mensaje.txt","r");

			if (obtener_mensaje==NULL){
				printf( "No se puede abrir el archivo de mensaje.\n" );    
			    exit(1);
			}

			fscanf(obtener_mensaje,"%s", mensaje_texto);
			*contador = 0;  
			while (feof(obtener_mensaje)==0){        							
				(*contador)++;
				fscanf(obtener_mensaje,"%s", mensaje_texto);
			}			
    		fclose(obtener_mensaje);
    		printf("El archivo contiene %d palabras\n",*contador);
    		free(mensaje_texto);
    		free(contador);
		}
	}else{
		FILE *mensaje;
		mensaje=fopen("archivos/mensaje.txt","a+");
		if (mensaje==NULL){
			printf( "No se puede abrir el archivo de mensaje.\n" );    
		    exit(1);
		}
		fprintf(mensaje, "%s","El mundo no es de palabras perdidas si no de poemas sin escribir\n");    
    	fclose(mensaje);
    }
	return 0;
}