'use strict';

let dzocto = new (require('../'))(process.env['GHKEY'])
let assert = require('assert')

const PR = {
  ref: 'f0f81224f67f7e95e16d2e70d7e2a6b92212f27b',
  state: 'success',
  target_url: 'https://github.i.dezinezync.com:8080/',
  description: 'override the  description',
  context: 'continous-integration/jenkins',
  owner: 'dezinezync',
  repo: 'CITest'
}

describe('DZOcto', function() {

  describe('statuses', function() {

    it('updates the status of the PR', function(done) {

      dzocto.setStatus(PR)
      .then((res) => {
        let obj = res.responseObject
        console.log("Get statuses", obj)
        done()
      })
      .catch(done)

    })

    it('fetches the status of the PR', function(done) {

      dzocto.getStatus(PR)
      .then((res) => {
        let obj = res.responseObject
        console.log("Get statuses", obj)
        done()
      })
      .catch(done)

    })

  })

})
