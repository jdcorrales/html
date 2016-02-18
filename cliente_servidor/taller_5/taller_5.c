/*
	5) Se requiere hacer un programa que permita realizar la siguientes transacciones
	en un cajero de supermercado:
	*Registrar una compra
		*Descontar un producto de inventario (Archivo)
		*Guardar log(Archivo) con hora, producto, cantidad, cédula
	*Agregar nuevos prodcutos
	Todas las variables deben ser punteros
*/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <time.h>

void caja_registradora(FILE *inventario,char *codigo, int *total_vendido, char *registro_venta);
void registrar_ventas_stock(int *stock, int *cantidad, int *valor);
void agregar_nuevo_producto_stock();
void reverse(char s[]);
void itoa(int n, char s[]);

int main(){

	FILE *inventario, *ventas;
  char *codigo, *registro_venta, *fecha;  
  int *total;
  time_t tiempo;  
  struct tm *tmPtr;

	codigo         = NULL;  
  total          = NULL;     
  registro_venta = NULL;
  fecha          = NULL;
	codigo         = (char *) malloc(10000 * sizeof(char));  	  
  registro_venta = (char *) malloc(10000 * sizeof(char));      
  fecha          = (char *) malloc(10000 * sizeof(char));      
  total          = (int *) malloc(sizeof(int));

	printf("Ingrese el codigo del producto\n");
	scanf("%s",codigo);	

  while(strcmp(codigo,"n")){  
    if(strcmp(codigo,"np") == 0){
      agregar_nuevo_producto_stock();
    }else{            
      caja_registradora(inventario,codigo,total, registro_venta);    
    }            
    printf("Ingrese el codigo del producto\n");
    scanf("%s",codigo); 
  } 

  printf("Total vendido: $%d\n\n", *total);

  if(*total > 0){
    ventas=fopen("archivos/registro_compras.txt","a+");
    tiempo = time(NULL);
    tmPtr = localtime(&tiempo);    
    strftime( fecha, 80, "%A %d de %B de %Y %H:%M.%S", tmPtr );
    strcat(fecha,"\n");        
    strcat(fecha, registro_venta);                 
    printf("Ingrese la cedula del comprador\n");
    scanf("%s",registro_venta);               
    strcat(fecha, "cedula: ");             
    strcat(fecha, registro_venta);             
    strcat(fecha,"\n\n");        
    fprintf(ventas, "%s", fecha);    
    fclose(ventas);
  }
}

void caja_registradora(FILE *inventario,char *codigo, int *total_vendido, char *registro_venta){
  char *nombre, *valor, *stocks, *venta, *producto;
  char** productos;
  int *cantidad, *posicion, *i, *total;

  nombre    = NULL;
  valor     = NULL; 
  stocks    = NULL;
  venta     = NULL;  
  producto  = NULL;
  cantidad  = NULL;  
  posicion  = NULL;
  i         = NULL;
  total     = NULL;

  nombre    = (char *) malloc(10000 * sizeof(char));    
  valor     = (char *) malloc(10000 * sizeof(char));    
  stocks    = (char *) malloc(10000 * sizeof(char));    
  venta     = (char *) malloc(10000 * sizeof(char));      
  producto  = (char *) malloc(10000 * sizeof(char));      
  productos = (char**) malloc(10000000 * sizeof(char*));
  cantidad  = (int *) malloc(sizeof(int));  
  posicion  = (int *) malloc(sizeof(int));
  i         = (int *) malloc(sizeof(int));
  total     = (int *) malloc(sizeof(int));

  printf("Ingrese la cantidad\n");
  scanf("%d",cantidad);

  inventario=fopen("archivos/inventario.txt","r+");

  if (inventario==NULL){
    printf( "No se puede abrir el archivo de inventario.\n" );    
    exit(1);
  }       
  fscanf(inventario,"%s", producto);  

  while (feof(inventario)==0){        
    *posicion = strlen(producto);
    *productos = strtok(producto,",");      
    if(strcmp(*productos,codigo) == 0){      
      *productos = strtok (NULL,",");       
      nombre     = *productos;
      *productos = strtok (NULL,",");       
      stocks     = *productos;
      *productos = strtok (NULL,",");       
      valor      = *productos; 
      *posicion  = ftell(inventario) - *posicion;            
      break;
    }   
    fscanf(inventario,"%s", producto);        
  }

  if(!(*nombre)){
    printf("No se encuentra el codigo especificado.\n");
  }else{
    *i     = atoi(stocks);
    *total = atoi(valor);
    registrar_ventas_stock(i, cantidad, total);
    itoa(*i,stocks);      
    strcat(codigo,",");    
    strcat(codigo,nombre);    
    strcat(codigo,",");    
    strcat(codigo,stocks); 
    strcat(codigo,",");    
    strcat(codigo,valor);                 
    fseek(inventario,*posicion, SEEK_SET);        
    fprintf(inventario, "%s", codigo);  
    fclose(inventario);    
    
    strcat(registro_venta, nombre);            
    strcat(registro_venta,",");  
    itoa(*cantidad,stocks);      
    strcat(registro_venta, stocks);  
    strcat(registro_venta,"\n");  
    *total_vendido = *total_vendido + *total;
  }
}

void agregar_nuevo_producto_stock(FILE *inventario){
  char *nombre, *valor, *stocks, *codigo, *producto;  
  char** productos;  
  int *bandera, *continuar;

  nombre    = NULL;
  valor     = NULL; 
  stocks    = NULL;  
  codigo    = NULL;
  producto  = NULL;  
  bandera   = 0;
  continuar = NULL;

  nombre    = (char *) malloc(10000 * sizeof(char));    
  valor     = (char *) malloc(10000 * sizeof(char));    
  stocks    = (char *) malloc(10000 * sizeof(char));    
  codigo    = (char *) malloc(10000 * sizeof(char));        
  producto  = (char *) malloc(10000 * sizeof(char));          
  productos = (char**) malloc(10000000 * sizeof(char*));  
  bandera   = (int *) malloc(sizeof(int));
  continuar = (int *) malloc(sizeof(int));

  *continuar = 1;

  while(*continuar){
    inventario=fopen("archivos/inventario.txt","r+");

    if (inventario==NULL){
      printf( "No se puede abrir el archivo de inventario.\n" );    
      exit(1);
    }

    fscanf(inventario,"%s", producto);

    printf("Ingrese el codigo del nuevo producto\n");
    scanf("%s",codigo); 

    while (feof(inventario)==0){            
      *productos = strtok(producto,",");      
      if(strcmp(*productos,codigo) == 0){      
        *productos = strtok (NULL,",");       
        nombre     = *productos;
        *productos = strtok (NULL,",");       
        stocks     = *productos;
        *productos = strtok (NULL,",");       
        valor      = *productos;       
        *bandera   = 1;
        break;
      }   
      fscanf(inventario,"%s", producto);        
    }

    if((*bandera) == 0){
      printf("Ingrese el nombre del producto\n");
      scanf("%s",nombre); 
      printf("Ingrese el valor del producto\n");
      scanf("%s",valor); 
      printf("Ingrese la cantidad del producto\n");
      scanf("%s",stocks); 
      strcat(codigo,",");    
      strcat(codigo,nombre);    
      strcat(codigo,",");    
      strcat(codigo,stocks); 
      strcat(codigo,",");    
      strcat(codigo,valor);              
      fseek( inventario, 0L, SEEK_END );        
      fprintf(inventario, "%s", codigo);                   
    }else{
      printf("El codigo ya se  encuentra registrago con el producto %s\n", nombre);    
    }
    fclose(inventario);      
    *bandera = 0;
    printf("Desea ingresar un nuevo producto 1:si 0:no\n");
    scanf("%d", continuar);    
  }
}

void registrar_ventas_stock(int *stock, int *cantidad, int *valor){
  int *resta, *total;

  resta = NULL;
  total = NULL;

  resta = (int *) malloc(sizeof(int));
  total = (int *) malloc(sizeof(int));

  *resta = *stock - *cantidad;

  if(*resta < 0){
    printf("La cantidad solicitada supera el inventario existente de %d\n", *stock);
  }else{
    *stock = *resta;
    *valor = *cantidad * *valor;    
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