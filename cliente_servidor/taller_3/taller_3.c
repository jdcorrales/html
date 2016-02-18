/*
  3) Contar cuántas veces se repite una palabra leída del teclado, en un archivo de texto. En un segundo se debe 
  guardar ese número todas las variables deben ser punteros.
*/
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

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

int main(){

  FILE *fichero, *archivo_escritura;
  char *texto, *cadena;
  int *contador;

  texto    = NULL;
  cadena   = NULL;
  contador = NULL;

  texto    = (char *) malloc(10000 * sizeof(char));
  cadena   = (char *) malloc(10000 * sizeof(char));
  contador = (int *) malloc(sizeof(int));

  fichero=fopen("contenido.txt","r");

  if (fichero==NULL){
    printf( "No se puede abrir el fichero.\n" );
    exit( 1 );
  }


  printf( "Escriba la primera palabra:");
  scanf("%s", cadena);     

  fscanf(fichero,"%s", *texto); 

  while (feof(fichero)==0){
    if(*texto == *cadena){      
      (*contador)++;
    }    
    fscanf(fichero,"%s", texto);    
  }
  printf("%d\n",*contador);    

  if(fclose(fichero)!=0){    
    printf( "Problemas al cerrar el fichero\n" );
  }else{     
    archivo_escritura=fopen("resultado.txt","w");
    itoa(*contador,texto);
    strcat(cadena," -> ");    
    strcat(cadena,texto);
    printf("%s\n",cadena);
    fprintf(archivo_escritura, "%s", cadena);    
    fclose(archivo_escritura);
  }
}


