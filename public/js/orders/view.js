$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/orders/',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

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