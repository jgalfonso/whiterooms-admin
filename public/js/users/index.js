$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/users/',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

            this.bindEvents();
        },

        setElements: function () {
            this.save = $('#save');
            this.cancel = $('#cancel');
        },

        bindEvents: function () {
            this.save.on('click',  function () {
                $('#hdID').val() ? App.edit() : App.store()
            });
            this.cancel.on('click',  this.clear);
        },

        initDataTable: function() {
            var table = $('#tbl').DataTable({
                processing: true,
                serverMethod: 'GET',
                bInfo: true,
                bDestroy: true,
                bLengthChange: true,
                pageLength: 25,
                scrollX: true,
                ajax: App.baseUrl + "get-users",
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'id' },
                    { data: 'fulllname' },
                    { data: 'email' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By Fullname / Email'
                },
                initComplete: function(settings, json) {
                    //$('.span-counter').html(json.recordsTotal);
                    //$('.span-counter').css('display', 'inline');
                },
                columnDefs: [
                    {
                        targets: 0,
                        orderable: false,
                        'render': function (data, type, row){

                            return row['id'];
                        }
                    },
                    {
                        targets: 1,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['lastname']+', '+row['firstname']+' '+(row['middlename']?row['middlename']:'');

                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['email'];

                        }
                    },
                    {
                        targets: 3,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a onclick="set(\''+row['id']+'\',\''+row['lastname']+'\',\''+row['firstname']+'\',\''+row['middlename']+'\',\''+row['email']+'\');" class="btn btn-sm btn-default" title="Edit" data-toggle="tooltip" data-placement="top" data-original-title="Edit" style="cursor: pointer;"><i class="icon-pencil"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },

        store : function(event) {
            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            $.ajax({
                type:'POST',
                url :  App.baseUrl + 'store',
                data: {
                    email       : $('#email').val(),
                    lastname    : $('#lastname').val(),
                    firstname   : $('#firstname').val(),
                    middlename  : $('#middlename').val(),
                    password    : $('#password').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        App.clear();
                        swal({
                            title: "Success!", text: '1 row successfully submitted.', type: "success",
                            showCancelButton: false,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        }, function () {
                            setTimeout(function () {
                                window.location.reload();
                            }, 500);
                        });
                    }
                    else swal({ title: "Error!", text: data.message, type: "error" });
                },
                error : function(request, status, error) {
                            
                    var errors = request.responseJSON.message;  

                    errors += '<ul style="margin: 10px 0 0 35px;">';
                    $.each(request.responseJSON.errors, function(id, val) {
                        errors += '<li>'+val+'</li>';
                    });
                    errors += '</ul>';

                    bootstrap_alert.warning('#alert', errors); 
                }
            });
        },

        edit : function(event) {
            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            $.ajax({
                type:'POST',
                url :  App.baseUrl + 'edit',
                data: {
                    id          : $('#hdID').val(),
                    lastname    : $('#lastname').val(),
                    firstname   : $('#firstname').val(),
                    middlename  : $('#middlename').val(),
                    password    : $('#password').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        App.clear();
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
                    else swal({ title: "Error!", text: data.message, type: "error" });
                },
                error : function(request, status, error) {
                            
                    var errors = request.responseJSON.message;  

                    errors += '<ul style="margin: 10px 0 0 35px;">';
                    $.each(request.responseJSON.errors, function(id, val) {
                        errors += '<li>'+val+'</li>';
                    });
                    errors += '</ul>';

                    bootstrap_alert.warning('#alert', errors); 
                }
            });
        },

        clear : function() {
            $('#form-title').html('New User');
            $('#hdID').val('');
            $('#lastname').val('');
            $('#firstname').val('');
            $('#middlename').val('');
            $('#email').val('');
            $('#email').prop('disabled', false);
            $('#password').val('');
            $('#cancel').css('display', 'none')
            bootstrap_alert.close('#alert');     
            $('#form').parsley().reset();
            $('#lastname').focus();
        },
    }

    App.init();
});

function set(id, lastname, firstname, middlename, email) {
    $('#form-title').html('Edit User');
    $('#hdID').val(id);
    $('#lastname').val(lastname);
    $('#firstname').val(firstname);
    $('#middlename').val(middlename=='null'?'':middlename);
    $('#email').val(email);
    $('#email').prop('disabled', true);
    $('#password').val('');
    $('#cancel').css('display', 'inline');
    bootstrap_alert.close('#alert');     
    $('#form').parsley().reset();
    $('#lastname').focus();
}