/*
	8)Hacer un programa que cree dos hijos. Cada uno de los cuales debe hacer lo sguiente
		* Hijo 1:
			*Imprimir las tabla de multiplicar del 1 al 1000
		*Hijo 2: 
			Imprimir los fibonacci 1 al 41
	El proceso padre debe imprimir en pantalla el codigo de salida de cada hijo cuando termine
	su ejecución.

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
	/* Clean up the child process. */
	int status;
	wait (&status);
	/* Store its exit status in a global variable. */
	child_exit_status = status;

	printf("Codigo de salida: %d\n", child_exit_status);
}

int spawn (char* program, char** arg_list){

	execvp (program, arg_list);	
	fprintf (stderr, "an error occurred in execvp\n");
	abort ();
}

int main (){

	
	struct sigaction sigchld_action;
	memset (&sigchld_action, 0, sizeof(sigchld_action));
	sigchld_action.sa_handler = &clean_up_child_process;
	sigaction (SIGCHLD, &sigchld_action, NULL);
	
	pid_t child_pid1;
	pid_t child_pid2;	

	child_pid1 = fork();
		
	if (child_pid1 != 0){
		child_pid2 = fork();
		sleep(20);
		if(child_pid2 != 0){
			sleep(20);
		}else{
			char* arg_list[] = {
				"./fibonacci", /* argv[0], the name of the program. */		
				NULL /* The argument list must end with a NULL. */
			};
			spawn("./fibonacci", arg_list);
		}
	}else{
		int *i;
		int *j;
		int *resultato;

		i         = NULL;
		j         = NULL;
		resultato = NULL;
		i         = (int *) malloc(sizeof(int));
		j         = (int *) malloc(sizeof(int));
		resultato = (int *) malloc(sizeof(int));


		for (*i = 1; *i < 1000; (*i)++){
			for (*j = 1; *j < 11; (*j)++){
				*resultato = *i * *j;
				printf("%d x %d = %d\n",*i,*j,*resultato);
			}
			printf("\n\n");
		}
	}
	return 0;
}