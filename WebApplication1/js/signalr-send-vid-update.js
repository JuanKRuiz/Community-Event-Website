/// <reference path="/Scripts/jquery-2.0.3.min.js" />

$(function () {
    var youtubeHangoutHubProxy = $.connection.youtubeHangoutHub;
    $.connection.hub.logging = true;

    $.connection.hub.start().done(
            function () {
                $('#btn-send').removeAttr('disabled');
                $('#btn-send').text('Send to everyone');
            });

    $('#btn-send').click(function () {
        var newvideoid = $('#input-video-id').val();


        $.ajax({
            url: '/api/ndiparam/update/' + newvideoid,
            type: 'PUT'
        }).done(function (data) {
            console.info('Last Video:' + data);
        }).fail(function (data) {
            console.error('Error:' + data);
        });

        youtubeHangoutHubProxy.server.update(newvideoid, $('#input-password').val());
        $('#btn-send').text('Wait tantico...');
        $('#btn-send').attr('disabled', 'disabled');

        setTimeout(function () {
            $('#btn-send').removeAttr('disabled');
            $('#btn-send').text('Send to everyone');
            $('#input-video-id').val('');
            $('#input-password').val('');

        }, 4000);
    });
}
);