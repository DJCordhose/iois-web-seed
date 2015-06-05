$(function () {
    function updateSendButtonState() {
        var value = inputField.val();
        $('.send').prop("disabled", value.length === 0);
    }

    var inputField = $('.greeting-form input[name="greeting"]');

    inputField.focus();

    inputField.on('keyup', function (e) {
        updateSendButtonState();
        $('.greeting-preview').text(inputField.val());
    });

    updateSendButtonState();
});

