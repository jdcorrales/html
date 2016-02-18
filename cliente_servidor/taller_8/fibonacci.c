#include <stdio.h>
#include <stdlib.h>

int fibonacci(int *f)
{
	int *a, *b, *c;
	if(*f == 0 || *f == -1)
    	return 1;
	else
   		a = NULL;
		b = NULL;
  		c = NULL;
		a = (int *) malloc(sizeof(int));
		b = (int *) malloc(sizeof(int));
		c = (int *) malloc(sizeof(int));

		*a = *f - 1;
		*b = *f - 2;
		*c = fibonacci(a) + fibonacci(b);
		free(a);
		free(b);
		return *c;
}

int main()
{
  int *i;
  i = NULL;
  i = (int *) malloc (sizeof(int));

  for(*i = 0; *i <= 10; (*i)++){
    printf("Fib %d: %d \n",*i, fibonacci(i));
  }

  free(i);
}





