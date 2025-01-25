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
            ///this.save.on('click',  this.store);
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
                    { data: 'description' },
                    { data: 'discount', className: 'text-right' },
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

                            return row['name'];

                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['description'];

                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['discount']+'%';

                        }
                    },
                    {
                        targets: 4,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a class="btn btn-sm btn-default" title="Edit" data-toggle="tooltip" data-placement="top" data-original-title="Edit" style="cursor: pointer;"><i class="icon-pencil"></i></a> <a onclick="deleteAccount(\''+row['id']+'\');" class="btn btn-sm btn-default" title="Delete" data-toggle="tooltip" data-placement="top" data-original-title="Delete" style="cursor: pointer;"><i class="fa fa-trash-o" style="color: red;"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },

       
        clear : function() {
           $('#lastname').val('');
            $('#firstname').val('');
            $('#middlename').val('');
            bootstrap_alert.close('#alert');     
            $('#form').parsley().reset();
            $('#lastname').focus();
        },
    }

    App.init();
});