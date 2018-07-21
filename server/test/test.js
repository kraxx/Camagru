const krx = require('./wrappers.js')
require('../server.js');

/************
    TESTS
************/

let tempID = '97566c9b-2193-490b-a624-d7ba1f743245';
let tempPostID = 'fb7bf335-b8fa-4d01-917b-bb72c4bfe076';
let tempCommentID = '2fac5920-a991-4782-9da7-3e61d704c7d9';
let tempPLID = '7acd9ca1-4211-41cd-ab49-6311ce236334';

// krx.addUser("FirstGuy", "FirstPass", "FirstEmail@fakest.fake");
// krx.addUser("Marc", "EZPass", "coolkid@coolestmail.com");
// krx.addUser("Clark", "HARDOPass", "livesontheedge@razorsharp.com");
// krx.addUser("Buffy", "slayinallday", "blood@razorsharp.com");

krx.getAllUsers();
krx.login('test', 'password');