#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

/*void temperatura_inicial(int *Ti);



void temperatura_inicial(int *Ti){
  	
}*/

int main (void){

	float Ti = 1.0; // Temperatura inicial
	float Tf = 0.00001; //Temparatura final
	float Rd = 0.9; // Tasa de disminucion de la temperatura	
	

	while( Ti > Tf){
		
		int i = 1; // Variable de contro para las iteraciones

		while(i <= 100){
			//funcion_vencindad();
		}

		Ti = Ti*Rd;
	}

	return 0;
}


