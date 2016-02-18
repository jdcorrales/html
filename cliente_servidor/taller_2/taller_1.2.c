/*
  2) Hecer un programa en ANSI C que lea dos palabras y que cuente cuantas letras tienen en común solo se puede utilizar punteros.
*/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void main (){
  
  char *cadena1, *cadena2;
  int *i, *j, *contador;

  cadena1=NULL;
  cadena2=NULL;
  i=NULL;
  j=NULL;
  contador=NULL;

  cadena1 = (char *) malloc(128 * sizeof(char));
  cadena2 = (char *) malloc(128 * sizeof(char));
  i = (int *) malloc(sizeof(int));
  j = (int *) malloc(sizeof(int));
  contador = (int *) malloc(sizeof(int));

  printf( "Escriba la primera palabra:");
  scanf("%s", cadena1);   
  printf( "Escriba la segunda palabra:");
  scanf("%s", cadena2);   

  *i = 0;  
  while (cadena1[*i] != '\0'){    
    while (cadena2[*j] != '\0'){      
      if(cadena1[*i] == cadena2[*j]){
        *contador = *contador+1;
      }
      (*j)++;
    }
    *j = 0;
    (*i)++;
  }
  printf("Tienen en común %d letras\n",*contador);  
}