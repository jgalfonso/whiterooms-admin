$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/payments/',
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
                ajax: App.baseUrl + "get-payments",
                order: [[ 2, "desc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'invoice_no' },
                    { data: 'payment_date' },
                    { data: 'name' },
                    { data: 'payment_method' },
                    { data: 'order_no' },
                    { data: 'total', 'className': 'text-right' },
                    { data: 'delivery_fee', 'className': 'text-right' },
                    { data: 'discount', 'className': 'text-right' },
                    { data: 'net', 'className': 'text-right' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By Invoice # / Name'
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

                            return row['payments']['reference_no'];

                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return formatDate(row['payments']['created_at']);
                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['profiles']['firstname']+' '+ row['profiles']['lastname'];
                        }
                    },

                    {
                        targets: 4,
                        orderable: false,
                        'render': function (data, type, row){

                            return row['reference_no'];

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
                        orderable: false,
                        'render': function (data, type, row){

                            return row['payments']['total'];
                        }
                    },
                    {
                        targets: 7,
                        orderable: false,
                        'render': function (data, type, row){

                            return row['payments']['delivery_fee'];
                        }
                    },
                    {
                        targets: 8,
                        orderable: false,
                        'render': function (data, type, row){

                            return  row['payments']['discount'];
                        }
                    },
                    {
                        targets: 9,
                        orderable: false,
                        'render': function (data, type, row){

                            return  row['payments']['net'];
                        }
                    }
                ]
            });
        },
    }

    App.init();
});

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
