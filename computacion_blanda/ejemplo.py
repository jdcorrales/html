import numpy.random as nprnd
import timeit

t1 = timeit.Timer('[random.randint(0,1000) for r in xrange(10000)]','import random') # v1
### change v2 so that it picks numbers in (0,10000) and thus runs...
t2 = timeit.Timer('random.sample(range(10000), 10000)','import random') # v2
t3 = timeit.Timer('nprnd.randint(1000, size=10000)','import numpy.random as nprnd') # v3

print t1.timeit(1000)/1000
print t2.timeit(1000)/1000
print t3.timeit(1000)/1000