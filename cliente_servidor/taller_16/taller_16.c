/*  22 sep

	16) Cajero que permita realizar una compra.
		*Cuando el cliente realice una transacción, el cajero debe solicitar a la bodega que descuente
		del inventario. La bodega devuelve el estado (ok, no ok).

		*La comunicación entre cajero y bodega debe ser con memoria compartida.
*/

#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <time.h>
#include <sys/shm.h>
#include <sys/stat.h>	
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <semaphore.h>	
#include <pthread.h>	
#include <sys/mman.h>
#include <stdint.h>		

/*
 * Dirección de memoria para menejo de la memoria compartida
 **/
const int shared_segment_size = 0x6400;

/*
 * Variables para el manejo de semaforos
 **/
sem_t job_queue_count1;
sem_t job_queue_count2;

/*
 * Variables para el manejo de memoria compartida
 **/
int segment_id;
char* shared_memory;
struct shmid_ds shmbuffer;
int segment_size;

void caja_registradora(sem_t *job_queue_count1,sem_t *job_queue_count2);
void inventario(sem_t *job_queue_count1,sem_t *job_queue_count2);
int registrar_ventas_stock(int *stock, int *cantidad);
void reverse(char s[]);
void itoa(int n, char s[]);

int main(){	
	pid_t proceso_hijo;  	
	int status;

	segment_id = shmget (IPC_PRIVATE, shared_segment_size,IPC_CREAT | IPC_EXCL | S_IRUSR | S_IWUSR);	

	sem_t *job_queue_count1 = mmap(NULL, sizeof(sem_t), PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
	sem_t *job_queue_count2 = mmap(NULL, sizeof(sem_t), PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
	
	sem_init (job_queue_count1, 1, 0);
	sem_init (job_queue_count2, 1, 0);		

	void initialize_job_queue();
	
	
	proceso_hijo = fork();

	if (proceso_hijo == 0){
		caja_registradora(job_queue_count1,job_queue_count2);    	
	}else{		
		inventario(job_queue_count1,job_queue_count2);
	}
}

void inventario(sem_t *job_queue_count1,sem_t *job_queue_count2){	
	sem_wait(job_queue_count1);	
	/*
     * Variable para el manejo del inventario
	 **/
	FILE *inventario;
	char *codigo, *cantidad, **datos, *ok;  	
	char *nombre, *valor, *stocks, *venta, *producto;  
  	int  *posicion, *st, *ct;
	
	codigo    = NULL;		
	cantidad  = NULL;		
	nombre    = NULL;
	valor     = NULL; 
	stocks    = NULL;
	venta     = NULL;  
	producto  = NULL;  
	posicion  = NULL;
	st        = NULL;  
	ct        = NULL;  
	ok        = NULL;
	codigo    = (char *) malloc(100 * sizeof(char));
	cantidad  = (char *) malloc(100 * sizeof(char));
	datos     = (char **) malloc(100 * sizeof(char*));
	ok        = (char *) malloc(100 * sizeof(char));
	nombre    = (char *) malloc(10000 * sizeof(char));    
	valor     = (char *) malloc(10000 * sizeof(char));    
	stocks    = (char *) malloc(10000 * sizeof(char));    
	venta     = (char *) malloc(10000 * sizeof(char));      
	producto  = (char *) malloc(10000 * sizeof(char));          
	posicion  = (int *) malloc(sizeof(int));
	st        = (int *) malloc(sizeof(int));
	ct        = (int *) malloc(sizeof(int));

	
	shared_memory = (char*) shmat (segment_id, (void*) 0x5000000, 0);	
	
    *datos    = strtok(shared_memory,",");   
    codigo    = *datos;           
    *datos    = strtok (NULL,",");       
    cantidad  = *datos;   

    inventario=fopen("archivos/inventario.txt","r+");

  	if (inventario==NULL){
    	printf( "No se puede abrir el archivo de inventario.\n" );    
    	exit(1);
  	}       
  	
  	fscanf(inventario,"%s", producto);  

  	while (feof(inventario)==0){        
    	*posicion = strlen(producto);
    	*datos = strtok(producto,",");      	
    	
    	if(strcmp(*datos,codigo) == 0){
      		*datos = strtok (NULL,",");       
      		nombre     = *datos;
      		*datos = strtok (NULL,",");       
      		stocks     = *datos;
      		*datos = strtok (NULL,",");       
      		valor      = *datos; 
      		*posicion  = ftell(inventario) - *posicion;
      		break;
    	}
    	fscanf(inventario,"%s", producto);        
  	}	

  	*st     = atoi(stocks);
    *ct     = atoi(cantidad);
    *st = registrar_ventas_stock(st, ct);    

    if(*st != -1){
    	itoa(*st,stocks);      		
		strcat(codigo,",");    
		strcat(codigo,nombre);    
		strcat(codigo,",");    
		strcat(codigo,stocks); 
		strcat(codigo,",");    
		strcat(codigo,valor);                 		
		fseek(inventario,*posicion, SEEK_SET);        
		fprintf(inventario, "%s", codigo);  
		fclose(inventario);    		
		ok = (char *) "ok";
    }else{		
		ok = (char *)"No ok";		
    }  

    shared_memory = (char*) shmat (segment_id, 0, 0);	
	shmctl (segment_id, IPC_STAT, &shmbuffer);
	segment_size = shmbuffer.shm_segsz;	
	sprintf (shared_memory, ok);
	shmdt (shared_memory);	
	sem_post(job_queue_count2);
}

void caja_registradora(sem_t *job_queue_count1, sem_t *job_queue_count2){ 	
	/*
	 * Variables para el manejo de los productos
	 **/
 	int *codigo, *cantidad;
 	char *str_codigo, *str_cantidad; 	

	codigo   = NULL;
	cantidad = NULL;	
	codigo   = (int *) malloc(sizeof(int));
	cantidad = (int *) malloc(sizeof(int));

	str_codigo   = NULL;
	str_cantidad = NULL;	
	str_codigo   = (char *) malloc(100 * sizeof(char));    
	str_cantidad = (char *) malloc(100 * sizeof(char));

  	printf("Ingrese el codigo del producto\n");
	scanf("%d",codigo);	
	
	printf("Ingrese la cantidad\n");
	scanf("%d",cantidad);

	itoa(*codigo,str_codigo);      
	itoa(*cantidad,str_cantidad);      
	strcat(str_codigo,",");    
    strcat(str_codigo,str_cantidad); 	
	
	shared_memory = (char*) shmat (segment_id, 0, 0);	
	shmctl (segment_id, IPC_STAT, &shmbuffer);
	segment_size = shmbuffer.shm_segsz;	
	sprintf (shared_memory, str_codigo);
	shmdt (shared_memory);

	sem_post(job_queue_count1);	
	sem_wait(job_queue_count2);
	shared_memory = (char*) shmat (segment_id, (void*) 0x5000000, 0);	
	printf("%s\n", shared_memory);
}

int registrar_ventas_stock(int *stock, int *cantidad){
  int *resta, *total;

  resta = NULL;
  total = NULL;

  resta = (int *) malloc(sizeof(int));
  total = (int *) malloc(sizeof(int));

  *resta = *stock - *cantidad;

  if(*resta < 0){
    return(-1);
  }else{
    return(*resta);
  }
}

void reverse(char s[]){
  int i, j;
  char c;
 
  for (i = 0, j = strlen(s)-1; i<j; i++, j--) {
    c = s[i];
    s[i] = s[j];
    s[j] = c;
  }
}

void itoa(int n, char s[]){
  int i, sign;
 
  if ((sign = n) < 0)  /* record sign */
    n = -n;          /* make n positive */
    i = 0;
    do{       /* generate digits in reverse order */
      s[i++] = n % 10 + '0';   /* get next digit */
    }while((n /= 10) > 0);     /* delete it */
    
    if (sign < 0)
      s[i++] = '-';
    s[i] = '\0';
    reverse(s);
 } 