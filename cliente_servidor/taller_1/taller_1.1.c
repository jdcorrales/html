/*
  1) Construir un programa en c utilizando punteros para todas las variables, que permita leer dos números y realizar las siguientes operaciones.
  suma
  resta 
  multiplicación
  división
  potencia
  raíz cuadrada
  logaritmo
*/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void main (){
  
  int *a, *b, *c;
  a=NULL;
  b=NULL;
  c=NULL;
  
  a= (int *) malloc(sizeof(int));
  b= (int *) malloc(sizeof(int));  
  c= (int *) malloc(sizeof(int));  

  printf( "Escriba el valor de a:");
  scanf("%d", a);
  printf( "Escriba el valor de b:");
  scanf("%d", b);

  printf("Suma %d+%d= %d\n", *a, *b, (*a+*b));
  printf("Resta %d-%d = %d\n", *a, *b, (*a-*b));
  printf("Multiplicación %d*%d = %d\n", *a, *b, (*a * *b));
  printf("Divición %d/%d = %d\n",*a, *b, (*a / *b));   
  *c= (int ) pow(*a,*b);
  printf("Potencia %d^%d = %d\n", *a, *b, *c);
  *c= (int ) sqrt(*a);
  printf("Raiz cuadrada de a sqrt(%d) = %d\n", *a, *c);
  *c= (int ) sqrt(*b);
  printf("Raiz cuadrada de b sqrt(%d) = %d\n", *b, *c);
  *c= log(*a);
  printf("logaritmo de a log(%d) = %d\n", *a, *c);
  *c= log(*b);
  printf("logaritmo de b log(%d) = %d\n", *b, *c);  

  free(a);
  free(b);
  free(c);
}