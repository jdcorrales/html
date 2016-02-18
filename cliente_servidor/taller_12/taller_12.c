/*
	12) Crear un programa que tome los datos de una cola de trabajo y 
	cree tres hilos que realicen las siguientes operaciones con los datos
	de la cola.


	----------
	--      --
	--  4   --
	--      --
	----------
		|
		|
	----------
	--      --
	--  5   --
	--      --
	----------
	 	|
	 	|
	----------
	--      --
	--  6   --
	--      --
	----------
		|
		|
	   NULL
	*HILO1 : Raiz cuadrada
	*HILO2 : Logaritmo
	*HILO3 : e^x x:dato
*/

#include <malloc.h>
#include <pthread.h>
#include <math.h>

struct job {	
	struct job* next;
	int dato;
};

struct job* job_queue;

pthread_mutex_t job_queue_mutex = PTHREAD_MUTEX_INITIALIZER;

void* raiz_cuadrada (void* arg){
	
	while (1){
		struct job* next_job;		
		pthread_mutex_lock (&job_queue_mutex);
		if (job_queue == NULL){
			next_job = NULL;
		}
		else {		
			next_job = job_queue;			
			job_queue = job_queue->next;
		}
		pthread_mutex_unlock (&job_queue_mutex);
		if (next_job == NULL){
			break;
		}		
		printf("Raiz %d = %f\n",next_job->dato,sqrt(next_job->dato));		
		free (next_job);
	}
	return NULL;
}

void* logaritmo (void* arg){
	
	while (1){
		struct job* next_job;		
		pthread_mutex_lock (&job_queue_mutex);
		if (job_queue == NULL){
			next_job = NULL;
		}
		else {		
			next_job = job_queue;			
			job_queue = job_queue->next;
		}
		pthread_mutex_unlock (&job_queue_mutex);
		if (next_job == NULL){
			break;
		}		
		printf("Logaritmo %d = %f\n",next_job->dato,log(next_job->dato));		
		free (next_job);
	}
	return NULL;
}

void* exponencia (void* arg){
	
	while (1){
		struct job* next_job;		
		pthread_mutex_lock (&job_queue_mutex);
		if (job_queue == NULL){
			next_job = NULL;
		}
		else {		
			next_job = job_queue;			
			job_queue = job_queue->next;
		}
		pthread_mutex_unlock (&job_queue_mutex);
		if (next_job == NULL){
			break;
		}		
		printf("Exponencial %d = %f\n",next_job->dato,exp(next_job->dato));		
		free (next_job);
	}
	return NULL;
}

void enqueue_job (int dato){
	struct job* new_job;
	new_job = (struct job*) malloc (sizeof (struct job));
	pthread_mutex_lock (&job_queue_mutex);
	new_job->next = job_queue;
	job_queue = new_job;
	job_queue->dato = dato;	
	pthread_mutex_unlock (&job_queue_mutex);
}


int main(int argc, char const *argv[]){
	
	int i;
	pthread_t hilo1, hilo2, hilo3;

	for (i = 1; i < 101; i++){
		enqueue_job(i);
	}

	pthread_create (&hilo1, NULL, &raiz_cuadrada,NULL);
	pthread_create (&hilo2, NULL, &logaritmo,NULL);
	pthread_create (&hilo3, NULL, &exponencia,NULL);
	pthread_join (hilo1,NULL);	
	pthread_join (hilo2,NULL);	
	pthread_join (hilo3,NULL);	
	return 0;
}