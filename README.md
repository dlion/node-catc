#node-catc

A node.js wrapper for the Cloud At Cost API.

API Version: `v1`

## References
https://github.com/cloudatcost/api

## Installation
`npm install node-catc`

## Example

```js
var CatC = require('node-catc');

var api = new CatC('APIKEY', 'LOGINEMAIL');

api.listServers(function(err, res) {
  if(!err) {
    for(var i in res.data) {
      console.log(res.data[i]);
    }
  }
});

api.listTemplates(function(err, res) {
  if(!err) {
    for(var i in res.data) {
      console.log(res.data[i]);
    }
  }
});
```
## License
node-catc is licensed under MIT License. (See LICENSE)

## TODO
* Tests
