/// <reference path="/Scripts/jquery-2.0.3.min.js" />

$(function () {
    var youtubeHangoutHubProxy = $.connection.youtubeHangoutHub;
    $.connection.hub.logging = true;

    $.connection.hub.start().done(
            function () {

                $('#btn-send').click(function () {

                    youtubeHangoutHubProxy.server.update($('#input-video-id').val(), $('#input-password').val());
                    $('#btn-send').text('Wait tantico...');
                    $('#btn-send').attr('disabled', 'disabled');

                    setTimeout(function () {
                        $('#btn-send').removeAttr('disabled');
                        $('#btn-send').text('Send to everyone');
                        $('#input-video-id').val('');
                        $('#input-password').val('');

                    }, 4000);
                }
                );

                $('#btn-send').removeAttr('disabled');
                $('#btn-send').text('Send to everyone');
            });
}
);