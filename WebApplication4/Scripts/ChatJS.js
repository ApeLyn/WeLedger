﻿$(document).ready(function () {

    var username = prompt('Please enter a username:');

    // var uri = 'ws://' + window.location.hostname + '/api/Chat' + '?username=' + username;
    var uri = 'ws://' + window.location.hostname + ':58207' + window.location.pathname.replace('Home/Chat', 'api/Chat') + '?username=' + username;
    websocket = new WebSocket(uri);

    websocket.onopen = function () {
        $('#messages').prepend('<div>Connected.</div>');

        $('#chatform').submit(function (event) {
            websocket.send($('#inputbox').val());
            $('#inputbox').val('');
            event.preventDefault();
        });
    };

    websocket.onerror = function (event) {
        $('#messages').prepend('<div>ERROR</div>');
        $('#messages').prepend('<div>' + uri + '</div>');
        $('#messages').prepend('<div>' + window.location.pathname + '</div>');
    };

    websocket.onmessage = function (event) {
        $('#messages').prepend('<div>' + event.data + '</div>');
    };
});