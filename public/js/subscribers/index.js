$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/subscribers/',
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

        initDataTable: function() {
            var table = $('#tbl').DataTable({
                processing: true,
                serverMethod: 'GET',
                bInfo: true,
                bDestroy: true,
                bLengthChange: true,
                pageLength: 25,
                scrollX: true,
                ajax: App.baseUrl + "get-subscribers",
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'id' },
                    { data: 'lastname' },
                    { data: 'firstname' },
                    { data: 'middlename' },
                    { data: 'email' },
                    { data: 'action', className: 'text-center' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By Name / Email'
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

                            return row['lastname'];

                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['firstname'];

                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['middlename'];

                        }
                    },
                    {
                        targets: 4,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['email'];

                        }
                    },
                    {
                        targets: 5,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a onclick="deleteAccount(\''+row['id']+'\');" class="btn btn-sm btn-default" title="Delete" data-toggle="tooltip" data-placement="top" data-original-title="Delete" style="cursor: pointer;"><i class="fa fa-trash-o" style="color: red;"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },
    }

    App.init();
});

function deleteAccount(id) 
{   
    swal({
        title: "Warning!",
        text: "Are you sure you want to delete this account?",
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
                url : window.location.protocol + '//' + window.location.host + '/api/subscribers/delete/',
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