/*
	10) Crear un programa que cree 3 hilos que hagan cada uno lo siguiente
		*Hilo 1: Tabla hasta el 1000
		*Hilo 2: Fibonacci
		*Hilo 3: Imprimir el n-ésino numero primo
*/

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

struct char_print_parms{
  char character;  
  int count;
};

struct struct_multi{  
  int count;
};

void* function_multi (void* parameters){
  	struct struct_multi* p = (struct struct_multi*) parameters;
  	int i, j;
	for (i = 1; i < p->count; i++){
  		for (j = 1; j < 11; j++){			
			printf("%d x %d = %d\n",i,j, (i * j));
		}
		printf("\n\n");
	}
  return NULL;
}

void* function_fibonacci (void* parameters){
  	struct struct_multi* y = (struct struct_multi*) parameters;
  	int ap,p,a,c;
	ap=0; 
	p=1;
	
	for(c=2; c <= y->count; c++){	 
		a=ap + p;
		ap = p;
		p= a;	 
		printf("%d \n",a);	 
	}
  	return NULL;
}

void* function_primos (void* parameters){
  int candidate = 2;
  int n = *((int*) parameters);
  while (1) {
    int factor;
    int is_prime = 1;    
    for (factor = 2; factor < candidate; ++factor)
      if (candidate % factor == 0) {
        is_prime = 0;
        break;
      }
      
      if (is_prime) {  
        if (--n == 0){          
        	//return (void*) candidate;
        	printf("El numero primo es: %d\n",candidate);
        	exit(0);
        }
      }
      ++candidate;
    }
    return NULL;
}

int main (){

  pthread_t thread_tablas;
  pthread_t thread_fibonacci;  
  pthread_t thread_primos;  
  struct struct_multi thread_tablas_args;
  struct struct_multi thread_fibonacci_args;
  struct struct_multi thread_primos_args;   

  thread_tablas_args.count = 50;
  thread_fibonacci_args.count = 46;
  thread_primos_args.count = 500;

  pthread_create (&thread_tablas, NULL, &function_multi, &thread_tablas_args);  
  pthread_create (&thread_fibonacci, NULL, &function_fibonacci, &thread_fibonacci_args);  
  pthread_create (&thread_primos, NULL, &function_primos, &thread_primos_args);  

  pthread_join (thread_tablas, NULL);  
  pthread_join (thread_fibonacci, NULL);
  pthread_join (thread_primos,NULL);

  return 0;
}