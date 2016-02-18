#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void)
{
  char str1[] = "Pointers are fun and hard to use";
  char str2[80], *p1, *p2;

  /* make p point to end of str1 */
  p1 = str1 + strlen(str1) - 1;

  p2 = str2;

  while(p1 >= str1){
    *p2++ = *p1--;
  	printf("%s\n",p2);
  }
  return 0;
}