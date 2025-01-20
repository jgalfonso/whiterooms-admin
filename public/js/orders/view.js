$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/orders/',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            this.bindEvents();
        },

        setElements: function () {
           
        },

        bindEvents: function () {
            
        },
    }

    App.init();
});

function submit() {
    $.ajax({
        type:'POST',
        url : window.location.protocol + '//' + window.location.host + '/api/orders/edit',
        data: {
            id : $('#id').val(),
            userID : $('#user_id').val(),
            referenceNo : $('#reference_no').val(),
            status : $("input[name='status']:checked").val(),
            _token : $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        success: function(data) {
            if(data && data.success == true) {
                
                $('#mdlStatus').modal('hide');
                swal({
                    title: "Success!", text: '1 row successfully updated.', type: "success",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                });
            }
        },
    });
}

function send() {
    if (!$('#form').parsley().validate()) { return; }
    
    $.ajax({
        type:'POST',
        url : window.location.protocol + '//' + window.location.host + '/api/orders/send',
        data: {
            orderID : $('#id').val(),
            userID : $('#user_id').val(),
            body : $('#message').val(),
            _token : $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        success: function(data) {
            if(data && data.success == true) {
                
                var html = '<li class="right clearfix">';
                html += '<img class="user_pix" src="../../../assets/images/avatar1.png" alt="avatar">';
                html += '<div class="message">';
                html += '<span>'+$('#message').val()+'</span>';
                html += '</div>';
                html += '<span class="data_time">a few seconds ago</span>';
                html += '</li>';
                $('.message_data').append(html);
                $('#message').val('');
            }
        },
    });
}