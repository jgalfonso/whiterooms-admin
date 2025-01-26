$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/vouchers/',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

            this.bindEvents();
        },

        setElements: function () {
            this.save = $('#save');
        },

        bindEvents: function () {
            this.save.on('click',  this.store);
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
                ajax: App.baseUrl + "get-vouchers",
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'code' },
                    { data: 'name' },
                    { data: 'discount', className: 'text-right' },
                    { data: 'user' },
                    { data: 'status' },
                    { data: 'action', className: 'text-center' },
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

                            return row['code'];
                        }
                    },
                    {
                        targets: 1,
                        orderable: true,
                        'render': function (data, type, row){

                            return '<b>'+row['name']+'</b><br>'+ row['description'];

                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['discount']+'%';

                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            if(row['profiles']) return row['profiles']['lastname']+', '+row['profiles']['firstname']+' '+row['profiles']['middlename'];
                            return '';
                        }
                    },
                    {
                        targets: 4,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['status'];

                        }
                    },
                    {
                        targets: 5,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a onclick="set(\''+row['id']+'\',\''+row['code']+'\',\''+row['name']+'\',\''+row['description']+'\');" class="btn btn-sm btn-default" title="Voucher Allocation" data-toggle="tooltip" data-placement="top" data-original-title="Voucher Allocation" style="cursor: pointer;"><i class="icon-user"></i></a> <a onclick="destroy(\''+row['id']+'\');" class="btn btn-sm btn-default" title="Delete" data-toggle="tooltip" data-placement="top" data-original-title="Delete" style="cursor: pointer;"><i class="fa fa-trash-o" style="color: red;"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },

        store : function() {
            if (!$('#form').parsley().validate()) { bootstrap_alert.warning('#alert', ' There are some error/s, please correct them bellow.'); return; }

            $.ajax({
                type:'POST',
                url :  App.baseUrl + 'store',
                data: {
                    name        : $('#name').val(),
                    description : $('#description').val(),
                    discount    : $('#discount').val(),
                    pax           : $('#pax').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        App.clear();
                        swal({
                            title: "Success!", text: 'The generation of voucher(s) was completed successfully.', type: "success",
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
            $('#name').val('');
            $('#description').val('');
            $('#discount').val('');
            $('#pax').val('');
            bootstrap_alert.close('#alert');     
            $('#form').parsley().reset();
            $('#name').focus();
        },
    }

    App.init();
});

function destroy(id) {
    swal({
        title: "Warning!",
        text: "Are you sure you want to delete this voucher?",
        type: "warning",
        showCancelButton: true, 
        confirmButtonText: "Yes", 
        cancelButtonText: "Cancel", 
        closeOnConfirm: false,
        showLoaderOnConfirm: true, 
    }, function (isConfirm) {
        if (isConfirm) {
            
            $.ajax({
                type:'POST',
                url : window.location.protocol + '//' + window.location.host + '/api/vouchers/destroy',
                data: {
                    id : id,
                    _token : $('meta[name="csrf-token"]').attr('content'),
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        swal({
                            title: "Success!", text: '1 row successfully deleted.', type: "success",
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
            });
        } else {
            swal.close(); 
        }
    });
}

function set(id, code, name, description) {
    $('#hdID').val(id);
    $('#code').val(code);
    $('#details').val(name+' / '+description);
    $('#mdlAllocation').modal('show');
}

function submit() {
    if (!$('#form2').parsley().validate()) { return; }

    $.ajax({
        type:'POST',
        url : window.location.protocol + '//' + window.location.host + '/api/vouchers/edit',
        data: {
            id : $('#hdID').val(),
            userID : $('#user option:selected').val(),
            _token : $('meta[name="csrf-token"]').attr('content'),
        },
        dataType: 'json',
        success: function(data) {
            if(data && data.success == true) {
                
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
    });
}