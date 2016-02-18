#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
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

int main(int argc, const char *argv[]){
	u_long addr;
	struct hostent *hp;
	struct sockaddr_in antelope;
	char **p;
	struct in_addr **addr_list;
	int i;

	
	hp = gethostbyname(argv[1]);

	if(hp){

		while(*hp->h_aliases){
			printf("%s\n", *hp->h_aliases++);
		}
		
	    while(*hp->h_addr_list){
	    	struct in_addr in;
			memcpy(&in.s_addr, *hp->h_addr_list++, sizeof(in.s_addr));
	    	printf("%s\n", inet_ntoa(in));
	    }
	}
}