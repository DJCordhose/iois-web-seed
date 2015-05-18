$(function () {
    var inputField = $('.greeting-form input[name="greeting"]');

    inputField.focus();

    inputField.on('keyup', function (e) {
        $('.greeting-preview').text(inputField.val());
    });
});

