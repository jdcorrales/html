#include <stdio.h>
#include <stdlib.h>

void main (){
  
  int *i;
  i=NULL;
  i= (int *) malloc(sizeof(int));  

  for (*i = 1; *i <= 44; (*i)++){
    printf("Fib %d: %d",*i, fibonacci(i));
  }
  free(i);
}

int fibonacci (int *numero){

  int *a, *b, *c;

  if ((*numero == 0) || (*numero == -1)) 
    return 1;
  else
    a= NULL;
    b= NULL;
    c= NULL;
    a= (int *) malloc(sizeof(int));
    b= (int *) malloc(sizeof(int));
    c= (int *) malloc(sizeof(int));

    *a = *numero-1;
    *b = *numero-2;
    free(a);
    free(b);
    *c = fibonacci (a) + fibonacci (b);
    return *c;
}