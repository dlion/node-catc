#node-catc

A node.js wrapper for the Cloud At Cost API.

Version: `v1`

## Reference
https://github.com/cloudatcost/api

## Installation
`npm install node-catc`

## Example

```js
var CatC = require('CatC');

var api = new CatC('APIKEY', 'LOGINEMAIL');
api.listServers(function(err, res) {
  if(!err) {
    for(var i in res.data) {
      console.log(res.data[i]);
    }
  }
});
```
## License
node-catc is licensed under MIT License. (See LICENSE)

