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

        initDataTable: function() {
            
            var table = $('#tbl').DataTable({
                processing: true,
                serverMethod: 'GET',
                bInfo: true,
                bDestroy: true,
                bLengthChange: true,
                pageLength: 25,
                scrollX: true,
                ajax: App.baseUrl + "get-orders",
                order: [[ 7, "desc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'reference_no' },
                    { data: 'name' },
                    { data: 'items', 'className': 'text-right' },
                    { data: 'delivery_type' },
                    { data: 'payment_method' },
                    { data: 'total', 'className': 'text-right' },
                    { data: 'order_date' },
                    { data: 'status' },
                    { data: 'action', 'className': 'text-center' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By Reference # / Name'
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
                        orderable: false,
                        'render': function (data, type, row){

                            return row['reference_no'];

                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['profiles']['firstname']+' '+ row['profiles']['lastname'];
                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['order_items'].length;
                        }
                    },
                    {
                        targets: 4,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['delivery_type_id']==1?'Ship':'Pickup in Store';
                        }
                    },
                    {
                        targets: 5,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['payments']['payment_method_id']==1?'Credit Card':'Paypal';
                        }
                    },
                    {
                        targets: 6,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['total'];
                        }
                    },
                    {
                        targets: 7,
                        orderable: true,
                        'render': function (data, type, row){

                            return formatDate(row['created_at']);
                        }
                    },
                    {
                        targets: 8,
                        orderable: true,
                        'render': function (data, type, row){

                            return  '<span class="badge badge-info ml-0 mr-0">'+row['status']+'</span>';
                        }
                    },
                    {
                        targets: 9,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a href="/transactions/orders/view/'+row['id']+'" class="btn btn-sm btn-default" title="Edit" data-toggle="tooltip" data-placement="top" data-original-title="Edit" style="cursor: pointer;"><i class="icon-pencil"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },
    }

    App.init();
});

function set(id) {
   
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        time = d.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true})

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') +' '+ time;
}
