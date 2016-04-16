'use strict';

let API = require('./api')

class DZOcto extends API {

  constructor(key, secret) {

    super("https://api.github.com")

    var self = this;

    self.key = key
    self.secret = secret

    self.requestModifier = options => {

      var headers = {
          "Accept" : "application/vnd.github.v3+json",
          "User-Agent": "DZOcto"
      }

      if(self.key && !self.secret) 
        headers = Object.assign(headers, {
          "Authorization": "Token " + self.key
        })

      if(options.headers)
          options.headers = Object.assign(options.headers, headers)
      else
          options.headers = headers

      // options.path = `/v1${options.path}`

      // uncomment this line to enable logging of all requests going out to the API. Do no uncomment in production code unless you're absolutely sure you know what you're doing.
      // console.log(`requesting: ${options.method}:${options.uri}\n`, options);
      return options

    }

  }

  getStatus(params) {

    if(!params)
      return Promise.reject('Invalid or no params provided.')

    return this.get(`/repos/${params.owner}/${params.repo}/commits/${params.ref}/statuses`)

  }

  setStatus(params) {

    if(!params)
      return Promise.reject('Invalid or no params provided.')

    return this.post(`/repos/${params.owner}/${params.repo}/statuses/${params.ref}`, {
      'state' : params.state || 'pending',
      'target_url' : params['target_url'] || '',
      'description' : params.description || '',
      context: params.context || ''
    },undefined, 'json')

  }

}

module.exports = DZOcto