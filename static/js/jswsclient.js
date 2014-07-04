"use strict";

/**
 * Created by Liomka on 30/04/2014.
 */

var wsserver = null;

// ------------------------------------------------------------------------
// Get var from html
// ------------------------------------------------------------------------
function setWSServer(val) {
    wsserver = val;
}

window.addEventListener("load", function(event) {
    var chatLog = $('#chatLog');
    var userList = $('#userList');
    var userInput = $('#userInput');
    var userName = $('#userName');
    var toggleConnectionButton = $('#toggleConnectionButton');
    var sendTextButton = $('#sendText');

    var intervalID = null;
    var socket = null;

    // ------------------------------------------------------------------------
    // Functions for dom
    // ------------------------------------------------------------------------
    function initComponents() {
        chatLog.prop('disabled', false);
        userList.prop('disabled', false);
        userName.prop('disabled', false);

        userInput.prop('disabled', true);
        sendTextButton.prop('disabled', true);

        toggleConnectionButton.text('Connect');
    }

    function connected() {
        intervalID = setInterval(function(){ping();}, 40000);
        chatLog.prop('disabled', true);
        userList.prop('disabled', true);
        userName.prop('disabled', true);

        userInput.prop('disabled', false);
        sendTextButton.prop('disabled', false);

        toggleConnectionButton.text('Disconnect');

        messageEvent({content: "Connected"});
    }

    function connecting() {
        chatLog.prop('disabled', true);
        userList.prop('disabled', true);
        userName.prop('disabled', true);
        userInput.prop('disabled', true);
        sendTextButton.prop('disabled', true);

        toggleConnectionButton.text('Connecting ...');
    }

    function disconnected() {
        initComponents();
        clearInterval(intervalID);
        messageEvent({content: 'Disconnected'});
    }

    function messageWarning(msg) {
        appendMessage($(document.createTextNode(msg.content)), 'text-warning', msg.time);
    }

    function messageEvent(msg) {
        appendMessage($(document.createTextNode(msg.content)), 'text-muted', msg.time);
    }

    function messageError(msg) {
        appendMessage($(document.createTextNode(msg.content)), 'text-danger', msg.time);
    }

    function messageReceived(msg) {
        // Create the message element
        appendMessage($(document.createElement('span')).append(
            $(document.createElement('span')).addClass('userName').addClass('text-info').text(msg.from.name)).append(
            $(document.createTextNode(msg.content))
        ), 'messageReceived', msg.time);
    }

    function appendMessage(blocToAppend, messageType, time) {
        // Format the date
        // multiplied by 1000 so that the argument is in milliseconds, not seconds
        var date = null;
        if (time) {
            date = new Date(time * 1000);
        } else {
            date = new Date();
        }
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var formattedTime = hours + ':' + minutes + ':' + seconds;

        // Create the message element
        chatLog.append($(document.createElement('p')).addClass(messageType).append(
            $(document.createElement('span')).addClass('timeMessage').addClass('text-muted').text(formattedTime)).append(
            blocToAppend));
        chatLog.animate({scrollTop: chatLog[0].scrollHeight}, 'slow');
    }

    // ------------------------------------------------------------------------
    // Treat events from WebSockets
    // ------------------------------------------------------------------------
    function userListReceived(users) {
        messageEvent({content: users.length+ ' people connected', time: users.time});
        users.forEach(function (user) {
            userList.append($(document.createElement('dt')).text(user.name).attr('id', user.id));
        });
    }

    function userConnected(user) {
        messageEvent({content: user.name + ' is connected', time: user.time});
        userList.append($(document.createElement('dt')).text(user.name).attr('id', user.id));
    }

    function userDiconnected(user) {
        var element = $('#'+user.id);
        if (element) {
            messageEvent({content: element.text() + ' is disconnected', time: user.time});
            element.remove();
        }
    }

    function userChangeName(user) {
        var element = $('#'+user.id);
        messageEvent({content: element.text() + ' as now know as ' + user.name, time: user.time});
        element.textContent = user.name;
    }

    // ------------------------------------------------------------------------
    // Send actions to WebSockets
    // ------------------------------------------------------------------------
    function ping() {
        socket.send(JSON.stringify("ping"));
    }

    function send() {
        var text = userInput.val();

        if (text != '') {
            try {
                socket.send(JSON.stringify({"message": {"content": text}}));
            } catch (exception) {
                messageError({content: 'Fail to send a message ' + text});
            }
        }

        userInput.val("");
    }

    // Connect objects events
    if (!("WebSocket" in window)) {
        $('#chatLog, input, button').fadeOut("slow");
        $('<p>Oh no, you need a browser that supports WebSockets. How about <a href="http://www.google.com/chrome">Google Chrome</a>?</p>').appendTo('#container');
    } else {
        initComponents();

        toggleConnectionButton.click( function (event) {

            if (socket) {
                socket.close(1000);
                return;
            }

            var div = $("#userName").parents("div.form-group");
            if (userName.val() == '') {
                div.removeClass("has-success");
                div.addClass("has-error");
                return false;
            } else {
                div.removeClass("has-error");
                div.addClass("has-success");
            }

            connecting();

            try {
                socket = new WebSocket(wsserver);

                socket.onopen = function (event) {
                    socket.send(JSON.stringify({"hello": {"name": userName.val()}}));
                };

                socket.onclose = function (event) {
                    if (event.code != 1000)
                        messageError({content: 'Cannot reach server ' + wsserver});
                    else if (!event.wasClean)
                        messageWarning('The connection was not close properly, if you see this message: contact me');
                    disconnected();
                    socket = null;
                };

                socket.onmessage = function (event) {
                    try {
                        var msgObj = JSON.parse(event.data);
                        if (msgObj.accepted) {
                            connected(msgObj.accepted.time);
                        } else if (msgObj.rejected) {
                            socket.close();
                        } else if (msgObj.message) {
                            messageReceived(msgObj.message);
                        } else if (msgObj.userList) {
                            userListReceived(msgObj.userList);
                        } else if (msgObj.userConnected) {
                            userConnected(msgObj.userConnected);
                        } else if (msgObj.userDisconnected) {
                            userDiconnected(msgObj.userDisconnected);
                        } else if (msgObj.userChangeName) {
                            userChangeName(msgObj.userChangeName)
                        }
                    } catch (e) {
                        messageWarning({content: 'onMessage error: ' + event.data});
                        console.log(e)
                    }
                };

            } catch (exception) {
                messageWarning({content: "Error: " + exception});
                disconnected();
                socket = null;
            }
        });

        sendTextButton.click(function (event) {
            send();
        });

        userInput.keypress(function (event) {
            if (event.keyCode == '13') {
                send();
            }
        });
    }
});
