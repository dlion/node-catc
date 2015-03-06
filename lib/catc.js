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


/*
 * List Servers
 * List all servers on the account
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listServers = function(cb) {
  request(this.url+"listservers.php?key="+this.key+"&login="+this.login, {
    json: true
  }, function(err, resp, body) {
    if(!err && resp.statusCode === 200) {
      cb(null, body);
    } else {
      cb({ status: body.status, id: body.id }, null);
    }
  });
};

/*
 * List Templates
 * List all templates available
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listTemplates = function(cb) {
  request(this.url+"listtemplates.php?key="+this.key+"&login="+this.login, {
    json: true
  }, function(err, resp, body) {
    if(!err && resp.statusCode === 200) {
      cb(null, body);
    } else {
      cb({ status: body.status, id: body.id }, null);
    }
  });
};

/*
 * List Tasks
 * List all tasks in operation
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listTasks = function(cb) {
  request(this.url+"listtasks.php?key="+this.key+"&login="+this.login, {
    json: true
  }, function(err, resp, body) {
    if(!err && resp.statusCode === 200) {
     cb(null, body);
    } else {
     cb({ status: body.status, id: body.id }, null);
    }
  });
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
  request.post(this.url+"powerop.php?key="+this.key+"&login="+this.login+"&sid="+sid+"&action="+action, {
    json: true
  }, function(err, resp, body) {
    if(!err && resp.statusCode === 200) {
     cb(null, body.result);
    } else {
     cb({ status: body.status, error: body.error, description: body.error_description }, null);
    }
  });
};

/*
 * Console
 * Request URL for console access
 *
 * @param sid Server ID
 * @param cb Callback function to call after the request
 */
CatC.prototype.console = function(sid, cb) {
  request.post(this.url+"console.php?key="+this.key+"&login="+this.login+"&sid="+sid, {
    json: true
  }, function(err, resp, body) {
    if(!err && resp.statusCode === 200) {
     cb(null, { serverId: body.serverid, console: body.console });
    } else {
     cb({ status: body.status, id: body.id }, null);
    }
  });
};

module.exports = CatC;
