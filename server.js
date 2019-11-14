/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');

  socket.on('message', (data) => { // If we get a new message from the client we process it;
    console.log(data);
  });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data, socket, questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;

 // socket.emit('changeBG', 'white');
 // socket.emit('changeFont', 'purple');
  /// These are the main statments that make up the conversation.
  if (questionNum == 0) {
    answer = 'Hello ' + input + ' :-)'; // output response
    waitTime = 2000;
    question = 'Knock Knock'; // load next question
  } else if (questionNum == 1) {
    if (input.toLowerCase() === 'who\'s there?') {
      answer = 'Cow Says';
      waitTime =2000;
      question = '?';
    } else {
      question = 'Knock Knock'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  } else if (questionNum == 2) {
    if (input.toLowerCase() === 'cow says who?') {
      answer = 'Cow Says Moo!';
      waitTime = 2000;
      question = 'Knock Knock';
    } else {
      question = 'Cow Says'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  }else if (questionNum == 3) {
    if (input.toLowerCase() === 'who\'s there?') {
      answer = 'Europe';
      waitTime = 2000;
      question = '?';
    } else {
      question = 'Knock Knock'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  } else if (questionNum == 4) {
    if (input.toLowerCase() === 'europe who?') {
      answer = 'No I\'m not!';
      waitTime = 2000;
      question = 'Knock Knock';
    } else {
      question = 'Europe'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  } else if (questionNum == 5) {
    if (input.toLowerCase() === 'who\'s there?') {
      answer = 'Mustache';
      waitTime = 2000;
      question = '?';
    } else {
      question = 'Knock Knock'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  } else if (questionNum == 6) {
    if (input.toLowerCase() === 'mustache who?') {
      answer = 'I mustache you a question, but I’ll shave it for later.';
      waitTime = 2000;
      question = 'Knock Knock';
    } else {
      question = 'Mustache'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  }else if (questionNum == 7) {
    if (input.toLowerCase() === 'who\'s there?') {
      answer = 'Boo';
      waitTime = 2000;
      question = '?';
    } else {
      question = 'Knock Knock'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  } else if (questionNum == 8) {
    if (input.toLowerCase() === 'boo who?') {
      answer = 'No need to cry, it\'s only a joke!';
      waitTime = 2000;
      question = 'Knock Knock';
    } else {
      question = 'Boo'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  }else if (questionNum == 9) {
    if (input.toLowerCase() === 'who\'s there?') {
      answer = 'Candice';
      waitTime = 2000;
      question = '?';
    } else {
      question = 'Knock Knock'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  } else if (questionNum == 10) {
    if (input.toLowerCase() === 'candice who?') {
      answer = 'Candice door open, or what?';
      waitTime = 2000;
      question = 'Knock Knock';
    } else {
      question = 'Candice'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  }
   else if (questionNum == 11) {
    if (input.toLowerCase() === 'who\'s there?') {
      answer = 'Robin';
      waitTime = 2000;
      question = '?';
    } else {
      question = 'Knock Knock'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  } else if (questionNum == 12) {
    if (input.toLowerCase() === 'robin who?') {
      answer = 'Robin YOU, now hand over the cash!';
      waitTime = 2000;
      question = 'Am I funny?';
    } else {
      question = 'Robin'; // load next question
      answer = 'Try again. This is a Knock Knock Joke!'
      questionNum--;
      waitTime = 2000;
    }
  }

   else {
    answer = 'I have nothing more to say!'; // output response
    waitTime = 0;
    question = '';
  }


  /// We take the changed data and distribute it across the required objects.
  socket.emit('answer', answer);
  setTimeout(timedQuestion, waitTime, socket, question);
  return (questionNum + 1);
}

function timedQuestion(socket, question) {
  if (question != '') {
    socket.emit('question', question);
  } else {
    //console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
