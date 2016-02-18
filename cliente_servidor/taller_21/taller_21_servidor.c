#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>

#define STDOUT 1
#define SERV_ADDR (IPPORT_RESERVED+8)

int main(){
	int rval;
	unsigned int tam_dir;
	int sock,length,msgsock;
	struct sockaddr_in server, dir_cliente;
	char buf[1024];
	struct hostent *hp;

	sock=socket(AF_INET, SOCK_STREAM,0);

	if(sock<0){
		perror("No hay socket de escucha");
		exit(1);
	}

	server.sin_family=AF_INET;
	server.sin_addr.s_addr=htonl(INADDR_ANY);
	server.sin_port = htons(SERV_ADDR);
	
	if(bind(sock,(struct sockaddr *)&server, sizeof(server))<0){
		perror("Direccion no asignada");
		exit(1);
	}
	
	listen(sock,1);
	
	while(1){
		/*Estará bloqueado esperando petición de conexión*/
		tam_dir=sizeof(dir_cliente);
		msgsock = accept(sock, (struct sockaddr *) &dir_cliente, &tam_dir);		
		hp=gethostbyaddr( (char *)&dir_cliente.sin_addr, sizeof(dir_cliente.sin_addr),AF_INET);
		printf("No. Puerto: %d\n", ntohs(dir_cliente.sin_port));
		printf("Direccion IP: %s\n",  inet_ntoa(dir_cliente.sin_addr));
		printf("Nombre del equipo: %s\n", hp->h_name);



		if (msgsock==-1){
			perror("Conexion no aceptada");
		}else{
			do{
				/*Me dispongo a leer datos de la conexión*/
				memset(buf,0,sizeof(buf));
				rval=read(msgsock,buf,1024);

				if (rval<0){
					perror("Mensaje no leido");
				}else{
					write(STDOUT,buf,rval);
				}
			}while (rval>0);
		}
		printf("\nConexion cerrada\n");
		close(msgsock);
	}
	exit(0);
}