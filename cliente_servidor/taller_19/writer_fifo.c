/*  22 sep

    19) Cajero que permita realizar una compra.
        *Cuando el cliente realice una la transacción, el cajero debe solicitar a la bodega que descuente
        del inventario. La bodega devuelve el estado (ok, no ok).

        *La comunicación entre cajero y bodega debe ser con fifo's.
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
#include <fcntl.h>
#include <unistd.h>

/*
 * Variables para manejo de FIFO's
 **/
 int fd1, fd2;

void caja_registradora();
void reverse(char s[]);
void itoa(int n, char s[]);

int main(){
    pid_t proceso_hijo; 
    

    proceso_hijo = fork();

    if (proceso_hijo == 0){
        while (1){
            caja_registradora();            
        }        
    }else{              
        wait(NULL);
    }

    return 1;
}

void caja_registradora(){   
    /*
     * Variables para el manejo de los productos
     **/
    int *codigo, *cantidad;
    char *str_codigo, *str_cantidad, *datos;   

    int fd;
    void* file_memory;      

    codigo   = NULL;
    cantidad = NULL;
    datos    = NULL;    
    codigo   = (int *) malloc(sizeof(int));
    cantidad = (int *) malloc(sizeof(int));

    str_codigo   = NULL;
    str_cantidad = NULL;    
    datos        = (char *) malloc(100 * sizeof(char));    
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

    mkfifo("/tmp/fifo1",0666);  
    fd1=open("/tmp/fifo1",O_WRONLY);    
    write(fd1,str_codigo,(sizeof(char *) * 5));        
    close(fd1);   
    sleep(5);       

    fd2=open("/tmp/fifo2",O_RDONLY);    
    if (fd2 == -1){
        printf("Error al abrir fifo");
    }   
    
    while(read(fd2,datos,sizeof(char *) * 5)!=0){ 
        printf("%s\n",datos);
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