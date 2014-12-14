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

$(window).ready(function () {
    var chatLog = $('#chatLog');
    var userList = $('#userList');
    var userInput = $('#userInput');
    var userName = $('#userName');
    var toggleConnectionButton = $('#toggleConnectionButton');
    var sendTextButton = $('#sendText');

    var intervalID = null;
    var socket = null;

    var initialTitle = document.title;
    var window_has_focus = true;
    var nbMissedMessage = 0;


    function haiku() {
        var adjs = [
            "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
            "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
            "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
            "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
            "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
            "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
            "wandering", "withered", "wild", "black", "young", "holy", "solitary",
            "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
            "polished", "ancient", "purple", "lively", "nameless"
        ];
        var nouns = [
            "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
            "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
            "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
            "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
            "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
            "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
            "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
            "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
            "frog", "smoke", "star"
        ];
        var rnd = Math.floor(Math.random() * Math.pow(2,12));
        var adj = adjs[rnd>>6%64];
        var noun = nouns[rnd%64];
        return adj.charAt(0).toUpperCase() + adj.slice(1)
            + ' '
            + noun.charAt(0).toUpperCase() + noun.slice(1);
    }

    userName.val(haiku());

    // -----------------------------------------------------------------------------------------------------------------
    // Listen from window
    // -----------------------------------------------------------------------------------------------------------------
    $(window).focus(function() {
        window_has_focus = true;
        document.title = initialTitle;
        nbMissedMessage = 0;
    }).blur(function() {
        window_has_focus = false;
    });

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

    function connected(message) {
        intervalID = setInterval(function(){ping();}, 40000);
        chatLog.prop('disabled', true);
        userList.prop('disabled', true);
        userName.prop('disabled', true);

        userInput.prop('disabled', false);
        sendTextButton.prop('disabled', false);

        toggleConnectionButton.text('Disconnect');

        messageEvent("Connected", message.time);
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
        userList.empty();
        messageEvent('Disconnected');
    }

    function messageWarning(msg, time) {
        appendMessage($(document.createTextNode(msg)), 'text-warning', time);
    }

    function messageEvent(msg, time) {
        appendMessage($(document.createTextNode(msg)), 'text-muted', time);
    }

    function messageError(msg, time) {
        appendMessage($(document.createTextNode(msg)), 'text-danger', time);
    }

    function messageReceived(msg) {
        // Create the message element
        appendMessage($(document.createElement('span')).append(
            $(document.createElement('span')).addClass('userName').addClass('text-info').text(msg.from.name)).append(
            $(document.createTextNode(msg.content))
        ), 'messageReceived: ', msg.time);

        if (!window_has_focus)
            document.title = '(' + ++nbMissedMessage + ') ' +initialTitle;
    }

    function appendMessage(blocToAppend, messageType, time) {
        // Format the date
        // multiplied by 1000 so that the argument is in milliseconds, not seconds
        var date = (time) ? new Date(time * 1000) : new Date();

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var formattedTime = hours + ':' + minutes + ':' + seconds;

        // Create the message element
        chatLog.append($(document.createElement('p')).addClass(messageType).append(
            $(document.createElement('span')).addClass('timeMessage').addClass('text-muted').text(formattedTime)).append(
            blocToAppend));
        if (chatLog.filter(':animated').length > 0)
            chatLog.stop();
        chatLog.animate({scrollTop: chatLog[0].scrollHeight}, 'slow');
    }

    // ------------------------------------------------------------------------
    // Treat events from WebSockets
    // ------------------------------------------------------------------------
    function userListReceived(message) {
        messageEvent(message.content.length + ' people connected', message.time);
        message.content.forEach(function (user) {
            userList.append($(document.createElement('dt')).text(user.name).attr('id', user.id));
        });
    }

    function userConnected(message) {
        messageEvent(message.name + ' is connected', message.time);
        userList.append($(document.createElement('dt')).text(message.name).attr('id', message.id));
    }

    function userDiconnected(message) {
        var element = $('#' + message.id);
        if (element) {
            messageEvent(element.text() + ' is disconnected', message.time);
            element.remove();
        }
    }

    function userChangeName(message) {
        var element = $('#' + message.userId);
        messageEvent(message.oldName + ' as now know as ' + message.newName, message.time);
        element.textContent = message.newName;
    }

    function historyReceived(history) {
        history.content.forEach(function (message) {
            messageReceived(message);
        });
    }

    function unexpectedMessage(message) {
        appendMessage($(document.createTextNode('Unexpected message: ' + message.toString())), 'unexpected')
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
            var jtext = null;
            if (text.match("^/")) {
                if (text.match("^/nick "))
                    jtext = JSON.stringify({"method": "nick",
                                            "newName": text.substring(6)});
                else if (text.match("^/history"))
                    jtext = JSON.stringify({"method": "history"});
            }

            if (jtext == null)
                jtext = JSON.stringify({"method": "message",
                                        "content": text});

            try {
                socket.send(jtext);
            } catch (exception) {
                messageError('Fail to send a message ' + text);
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
                    socket.send(JSON.stringify({"method": "hello",
                                                "name": userName.val()}));
                };

                socket.onclose = function (event) {
                    if (event.code != 1000)
                        messageError('Cannot reach server ' + wsserver);
                    else if (!event.wasClean)
                        messageWarning('The connection was not close properly, if you see this message: contact me');
                    disconnected();
                    socket = null;
                };

                socket.onmessage = function (event) {
                    try {
                        var msgObj = JSON.parse(event.data);
                        switch (msgObj["method"]) {
                            case "accepted": connected(msgObj); break;
                            case "rejected": socket.close(); break;
                            case "message": messageReceived(msgObj); break;
                            case "userList": userListReceived(msgObj); break;
                            case "userConnected": userConnected(msgObj); break;
                            case "userDisconnected": userDiconnected(msgObj); break;
                            case "nick": userChangeName(msgObj); break;
                            case "history": historyReceived(msgObj); break;
                            default: unexpectedMessage(event); break;
                        }

                    } catch (e) {
                        messageWarning('onMessage error: ' + event.data);
                        console.log(e)
                    }
                };

            } catch (exception) {
                messageWarning("Error: " + exception);
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
