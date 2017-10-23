#! /usr/local/bin/node
const spawn = require('child_process').spawnSync;
const fork = require('child_process').fork;

//start test server
console.log('-- Starting test server...');
let testServer = fork('./test-server/server.js');
testServer.on('message',(m) => {
  if (m.status !== 1) {
    return;
  }
  //Run Karma
  console.log('-- Starting Karma...');
  let karma = spawn('node_modules/karma/bin/karma',['start'], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  console.log(String(karma.stdout));
  console.log('-- Ending test server...');
  //Once karma is done, kill the test server
  testServer.send({status : 2});
  if (karma.status == 1) {
    process.exit(1);
  }
});//start karma