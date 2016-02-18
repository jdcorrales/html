from random import choice
from numpy import array, dot, random
from pylab import plot, ylim, show
#import numpy

unit_step = lambda x: 0 if x < 0 else 1
training_data = [
					(array([0,0,1]),0),
					(array([0,1,1]),1),
					(array([1,0,1]),1),
					(array([1,1,1]),1)
				]			


w = random.random(3)

errors = []
eta = 0.2
n = 100

for i in range(n):
	x,expected = choice(training_data)
	print x, expected, w
	result = dot(w,x)
	error      = expected-unit_step(result)	
	errors.append(error)
	w += eta*error*x

for x, _ in training_data:
	result = dot(x,w)
	print "{} : {} => {}".format(x[:2],result,unit_step(result))


