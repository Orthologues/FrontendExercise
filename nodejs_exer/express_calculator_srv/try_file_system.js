// jshint esversion:6
// use the following shell mmands to update and run node:
// node --version; which node;
// sudo npm install n -g
// sudo n stable
// node --version; which node;
// node index.js

const fs = require("fs");
// if test2.txt already exists, it would be overwritten
// fs.copyFileSync("test_files/test1.txt", "test_files/test2.txt");

const { COPYFILE_EXCL } = fs.constants; // this const name is exclusive 
// By using COPYFILE_EXCL, the operation will fail if "test_files/test2.txt" exists.
fs.copyFileSync("test_files/test1.txt", "test_files/test2.txt", COPYFILE_EXCL);
