# another-queue
Function queue implementation for Node.js
## Installation
```bash
$ npm install another-queue
```
## Usage
```javascript
var Queue = require('another-queue'),
    q = new Queue(options);

q.push(function (a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}, [1, 2, 3]);

q.start();
```

## 'options' object
* **max** - maximum queue length (default - `null`)
* **delay** - interval in milliseconds (default - `200`)
* **stopOnEmpty** - stop the timer (default - `false`)


## Methods
### 1.`push`

Add new element to the queue
```javascript
var id = q.push(function[, arguments[, context]]);
```
__Arguments__:

**function** - function to execute

**arguments** - arguments array

**context** -  '`this`' argument for this function

so, it's like [`Function.apply()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

__Returns__:

`id` - string identifier of this queue element

### 2.`start`

Start the queue
```javascript
q.start()
```
### 3.`stop`

Stop the queue
```javascript
q.stop()
```
## Events
* **start** - on queue start
* **stop** - on stop
* **execute** - on element's function call
* **overflow** - on queue overflow (only if `max` option was set)

```javascript
q.on('start', function () {
    console.log('queue started');
});
q.on('stop', function () {
    console.log('queue stopped');
});
q.on('execute', function (id) {
    console.log('function with id=' + id + ' executed');
});
q.on('overflow', function () {
    console.log('WARNING: queue overflow');
});
```