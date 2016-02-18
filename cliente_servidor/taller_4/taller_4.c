/*
  4) Leer tres archivos de texto y crear un cuart archivo con de se guarden las palabras
     que se repitan en almenos dos de ellos. Todas las variables deben ser punteros.
*/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

int encontrar_palabra(char *palabra, char *array[],int *contador){
  int *j;
  j = NULL;
  j = (int *) malloc(sizeof(int));         
  for(*j=0 ; *j < *contador ; (*j)++){                              
    if(array[*j] != NULL){            
      if(strcmp(palabra,array[*j]) == 0){
        return 1;
      }
    } 
  }
  return 0;
}

int main(){

  FILE *fichero1, *fichero2, *fichero3, *archivo_escritura;
  char *texto1 ,*texto2, *texto3, *cadena;
  char** repetidos;
  int *contador, *i;

  texto1    = NULL;
  texto2    = NULL;
  texto3    = NULL;
  cadena    = NULL;  
  contador  = NULL;
  i         = NULL;

  texto1    = (char *) malloc(10000 * sizeof(char));
  texto2    = (char *) malloc(10000 * sizeof(char));
  texto3    = (char *) malloc(10000 * sizeof(char));
  cadena    = (char *) malloc(10000 * sizeof(char));
  repetidos = (char**) malloc(10000000 * sizeof(char*));
  contador  = (int *) malloc(sizeof(int));
  i         = (int *) malloc(sizeof(int));

  fichero1=fopen("archivos/archivo1.txt","r");
  fichero2=fopen("archivos/archivo2.txt","r");
  fichero3=fopen("archivos/archivo3.txt","r");

  if (fichero1==NULL){
    printf( "No se puede abrir el fichero1.\n" );    
  }  

  if (fichero2==NULL){
    printf( "No se puede abrir el fichero2.\n" );    
  }  

  if (fichero3==NULL){
    printf( "No se puede abrir el fichero3.\n" );    
  }  

  fscanf(fichero1,"%s", texto1);  
  *contador = 0;

  while (feof(fichero1)==0){    
    while (feof(fichero2)==0){      
      if(*texto1 == *texto2){              
        *i = encontrar_palabra(texto1, repetidos, contador);                
        if(*i == 0){
          repetidos[*contador] = strdup(texto1);        
          (*contador)++;                    
        }        
      }
      fscanf(fichero2,"%s", texto2);                      
    }
    fseek( fichero2, 0L, SEEK_SET );      
    fscanf(fichero1,"%s", texto1);                
  }

  fscanf(fichero3,"%s", texto3);                      
  fseek( fichero1, 0L, SEEK_SET);      
  while (feof(fichero1)==0){    
    while (feof(fichero3)==0){      
      if(*texto1 == *texto3){              
        *i = encontrar_palabra(texto1, repetidos, contador);                
        if(*i == 0){
          repetidos[*contador] = strdup(texto1);        
          (*contador)++;                    
        }        
      }
      fscanf(fichero3,"%s", texto3);                      
    }
    fseek( fichero3, 0L, SEEK_SET );      
    fscanf(fichero1,"%s", texto1);                
  }

  fseek( fichero2, 0L, SEEK_SET);      
  fseek( fichero3, 0L, SEEK_SET);      
  fscanf(fichero2,"%s", texto2);                      
  fscanf(fichero3,"%s", texto3);                        
  while (feof(fichero2)==0){    
    while (feof(fichero3)==0){      
      if(*texto2 == *texto3){              
        *i = encontrar_palabra(texto2, repetidos, contador);                
        if(*i == 0){
          repetidos[*contador] = strdup(texto2);        
          (*contador)++;                    
        }        
      }
      fscanf(fichero3,"%s", texto3);                      
    }
    fseek( fichero3, 0L, SEEK_SET );      
    fscanf(fichero2,"%s", texto1);                
  }   

  archivo_escritura = fopen("archivos/archivo_escritura.txt","a+");  
  for(*i=0 ; *i < *contador ; (*i)++){        
    fprintf(archivo_escritura, "%s\n", repetidos[*i]);    
  } 

  if(fclose(fichero1)!=0){    
    printf( "Problemas al cerrar el fichero1\n" );
  }

  if(fclose(fichero2)!=0){    
    printf( "Problemas al cerrar el fichero2\n" );
  }

  if(fclose(fichero3)!=0){    
    printf( "Problemas al cerrar el fichero3\n" );
  }

  if(fclose(archivo_escritura)!=0){    
    printf( "Problemas al cerrar el fichero3\n" );
  }

  free(texto1);
  free(texto2);
  free(texto3);
  free(i);  
}