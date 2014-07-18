Plain object to nested object
=================================
Converts object on the form of {'a.b.c.d':'foo'} to {'a':{'b':{'c':{'d':'foo'}}}}
``` 
var plainObjectToNestedObject=require('plainObjectToNestedObject');
var data=plainObjectToNestedObject({'a.b.c.d':'foo'});
console.log(data);
//{'a':{'b':{'c':{'d':'foo'}}}}

``` 