
/*The MIT License (MIT)

Copyright (c) 2014 Fabio Oliveira Costa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var chai=require('chai');
chai.config.includeStack =true;
var expect=chai.expect;
var should = chai.should;
var plainObjectToNestedObject=require(__dirname+'/../src/plainObjectToNestedObject');
describe('plainObjectToNestedObject',function(){
	it('Should convert a plain key to the same value',function(){
		var data=plainObjectToNestedObject({'a':'b'});
		expect(data.a).to.equal('b');
	});
	it('Should convert a nested key to a nested object',function(){
		var data=plainObjectToNestedObject({'a[b]':'c'});
		expect(data.a.b).to.equal('c');
	});
	it('Should convert a key three or more levels deep to the correct nesting',function(){
		var data=plainObjectToNestedObject({'a[b][c][d]':'e'});
		expect(data.a.b.c.d).to.equal('e');
	});
});
