var request = require('request');

/*
 * Cloud At Cost API wrapper.
 *
 * @param key The API key to access the C@C API with
 * @param login The email to allows to use C@C API
 */
function CatC(key, login) {
  this.version = 'v1';
  this.url = 'https://panel.cloudatcost.com/api/'+this.version+'/';
  if(!key) {
    throw new Error('You have to provide an API key for this to work.');
  }
  this.key = key;

  if(!login) {
    throw new Error('You have to provide a login email address');
  }
  this.login = login;
}

CatC.prototype.execute = function(route, params, cb) {
  if( typeof params === "function") {
    cb = params;
  }

  var url =   request({
    uri: this.url+route+
        '.php?key='+this.key+
        '&login='+this.login+
        ((params.sid) ? '&sid='+params.sid : '')+
        ((params.action) ? '&action='+params.action : ''),
    json: true,
    method: params.method || 'GET'
  }, function(err, res, body) {
    var status = body && body.status;

    if(!err && res.statusCode === 200) {
      cb(null, body);
    } else {
      if (err.code === 'ENETUNREACH') {
        status = 'down';
      }

      cb({ status: status }, null);
    }
  });
};


/*
 * List Servers
 * List all servers on the account
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listServers = function(cb) {
  this.execute('listservers', cb);
};

/*
 * List Templates
 * List all templates available
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listTemplates = function(cb) {
  this.execute('listtemplates', cb);
};

/*
 * List Tasks
 * List all tasks in operation
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listTasks = function(cb) {
  this.execute('listtasks', cb);
};

/*
 * Power Operations
 * Activate server power operations
 *
 * @param sid Server ID
 * @param action Action to execute on the server (= poweron, poweroff, reset)
 * @param cb Callback function to call after the request
 */
CatC.prototype.powerOp = function(sid, action, cb) {
  this.execute('powerop', { method: 'POST', sid: sid, action: action }, cb);
};

/*
 * Console
 * Request URL for console access
 *
 * @param sid Server ID
 * @param cb Callback function to call after the request
 */
CatC.prototype.console = function(sid, cb) {
  this.execute('console', { method: 'POST', sid: sid }, cb);
};

module.exports = CatC;
