/*
	11) Hacer un programa que cree un hilo, reciba el nombre de un archivo,
		cuente cuántas consonantes tiene y devuelva ese valor al hilo principal.		
*/

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>		
#include <math.h>
#include <time.h>	
#include <ctype.h>	

void* contar_consonantes (void* nombre_archivo){

	FILE *mensaje;
  	int consonantes, i, j; 
  	char *palabra; 
  	char *file = (char *) nombre_archivo;
  	char vocales[10] = {'a','e','i','o','u'};

  	palabra = NULL;
  	palabra = (char *) malloc(1000 * sizeof(char));

	if(file){
		
		mensaje = fopen(file,"r");

		if (mensaje==NULL){
		    printf( "No se puede abrir el archivo.\n" );    
		    exit(1);
		}       
		
		consonantes = 0;
		while (feof(mensaje)==0){	    
			fscanf(mensaje,"%s", palabra);        			
			for (i = 0; i < strlen(palabra); i++){				
				if(strcmp(&palabra[i],&vocales[0]) > 0 || strcmp(&palabra[i],&vocales[1]) > 0 || strcmp(&palabra[i],&vocales[2]) > 0 || strcmp(&palabra[i],&vocales[3]) > 0 || strcmp(&palabra[i],&vocales[4]) > 0){
					consonantes ++;	
				}							
			}			
		}
		fclose(mensaje);
	}		
	return (int *) consonantes;
}

int main (){	
	pthread_t thread;
	char *archivo;	
	int consonantes;

	archivo = NULL;
	archivo = (char *) malloc(10000 * sizeof(char));    

	printf("Ingrese el nombre del archivo\n");
	scanf("%s",archivo);

	pthread_create (&thread, NULL, &contar_consonantes, archivo);
	pthread_join (thread, (void*) &consonantes);	
	printf("%d\n",consonantes);

	return 0;
}		