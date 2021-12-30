#!/usr/bin/env node
const pkg = require("./package.json");
// https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
require("please-upgrade-node")(pkg, {
  message: function (requiredVersion) {
    return (
      "PBTA-Gen requires Node " +
      requiredVersion +
      ". You will need to upgrade Node to use PBTA-Gen!"
    );
  },
});
const debug = require("debug")("PBTA-Gen:cmd");

