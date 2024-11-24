 $(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/users',
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
                $('#hdUserID').val() ? App.edit() : App.store()
            });
            this.cancel.on('click',  this.clear);
        },

        initDataTable: function() {
            
            var table = $('#tbl').DataTable({
                processing: true,
                serverSide: true,
                serverMethod: 'GET',
                bInfo: true,
                bDestroy: true,
                bLengthChange: false,
                pageLength: 30,
                scrollX: true,
                ajax: App.baseUrl + "/get-bylist",
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'user_id', 'className': 'hide' },
                    { data: 'fullname' },
                    { data: 'email' },
                    { data: 'action', 'className': 'text-center w1' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data..."
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

                            return row['user_id'];
                        }
                    },
                    {
                        targets: 1,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['fullname'];
                        }
                    },
                    {
                        targets: 2,
                        orderable: false,
                        'render': function (data, type, row){

                            return row['email'];
                        }
                    },
                    {
                        targets: 3,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a onclick="set('+row['user_id']+',\''+row['fullname']+'\',\''+row['email']+'\');" class="btn btn-sm btn-default" title="Edit" data-toggle="tooltip" data-placement="top" data-original-title="Edit" style="cursor: pointer;"><i class="icon-pencil"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },

        store : function(event) {
            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            bootstrap_alert.close('#alert');     

            $.ajax({
                type:'POST',
                url : App.baseUrl + "/store",
                data: {
                    fullname    : $('#fullname').val(),
                    email       : $('#email').val(),
                    password    : $('#password').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        swal({ title: "Success!", text: '1 row successfully submitted.', type: "success" });
                        App.initDataTable();
                        App.clear();
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

            bootstrap_alert.close('#alert');     

            $.ajax({
                type:'POST',
                url : App.baseUrl + "/edit",
                data: {
                    userID      : $('#hdUserID').val(),
                    fullname    : $('#fullname').val(),
                    password    : $('#password').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        swal({ title: "Success!", text: '1 row successfully updated.', type: "success" });
                        App.initDataTable();
                        App.clear();
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
            $('#hdUserID').val('');
            $('#fullname').val('');
            $('#email').val('');
            $('#email').prop('disabled', false);
            $('#password').val('');
            $('#cancel').css('display', 'none')
            bootstrap_alert.close('#alert');     
            $('#form').parsley().reset();
            $('#fullname').focus();
        },
    }

    App.init();
});

function set(userID, fullname, email) {
    $('#form-title').html('Edit User');
    $('#hdUserID').val(userID);
    $('#fullname').val(fullname);
    $('#email').val(email);
    $('#email').prop('disabled', true);
    $('#password').val('');
    $('#cancel').css('display', 'inline');
    bootstrap_alert.close('#alert');     
    $('#form').parsley().reset();
    $('#fullname').focus();
}