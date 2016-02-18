/*
	18-09-2014
	14)Implementar el taller 12 utilizando variables de condición.
*/

#include <malloc.h>
#include <pthread.h>
#include <math.h>

struct job {	
	struct job* next;
	int dato;
};

struct job* job_queue;
pthread_mutex_t job_queue_mutex;
pthread_cond_t thread_flag_cv;
int thread_flag;

void initialize_flag (){
	pthread_mutex_init (&job_queue_mutex, NULL);
	pthread_cond_init (&thread_flag_cv, NULL);
	thread_flag = 0;
}

void set_thread_flag (int flag_value){	
	pthread_mutex_lock (&job_queue_mutex);	
	thread_flag = flag_value;
	pthread_cond_signal (&thread_flag_cv);
	pthread_mutex_unlock (&job_queue_mutex);
}

void* raiz_cuadrada (void* arg){

	while (1){
		struct job* next_job;				
		pthread_mutex_lock (&job_queue_mutex);

		while (!thread_flag){
			pthread_cond_wait (&thread_flag_cv, &job_queue_mutex);
		}		
		
		if (job_queue == NULL){
			next_job = NULL;
		}else{		
			next_job = job_queue;			
			job_queue = job_queue->next;
		}

		pthread_mutex_unlock (&job_queue_mutex);
		if (next_job == NULL){
			break;
		}		
		set_thread_flag(1);
		printf("Raiz %d = %f\n",next_job->dato,sqrt(next_job->dato));		
		free (next_job);
	}
	return NULL;
}

void* logaritmo (void* arg){
	
	while (1){
		struct job* next_job;			
		pthread_mutex_lock (&job_queue_mutex);

		while (!thread_flag){
			pthread_cond_wait (&thread_flag_cv, &job_queue_mutex);
		}		

		if (job_queue == NULL){
			next_job = NULL;
		}else{		
			next_job = job_queue;			
			job_queue = job_queue->next;
		}

		pthread_mutex_unlock (&job_queue_mutex);
		if (next_job == NULL){
			break;
		}	

		set_thread_flag(1);	
		printf("Logaritmo %d = %f\n",next_job->dato,log(next_job->dato));		
		free (next_job);
	}
	return NULL;
}

void* exponencia (void* arg){
	
	while (1){
		struct job* next_job;				
		pthread_mutex_lock (&job_queue_mutex);

		while (!thread_flag){
			pthread_cond_wait (&thread_flag_cv, &job_queue_mutex);
		}		

		if (job_queue == NULL){
			next_job = NULL;
		}else{		
			next_job = job_queue;			
			job_queue = job_queue->next;
		}

		pthread_mutex_unlock (&job_queue_mutex);

		if (next_job == NULL){
			break;
		}		

		set_thread_flag(1);
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
	job_queue = NULL;
	for (i = 1; i < 101; i++){
		enqueue_job(i);

	}	
	
	set_thread_flag(1);	
	pthread_create (&hilo3, NULL, &exponencia,NULL);
	pthread_create (&hilo2, NULL, &logaritmo,NULL);
	pthread_create (&hilo1, NULL, &raiz_cuadrada,NULL);
	pthread_join (hilo1,NULL);	
	pthread_join (hilo2,NULL);	
	pthread_join (hilo3,NULL);	
	return 0;
}