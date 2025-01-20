$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/api/shipments/',
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
                ajax: App.baseUrl + "get-shipments",
                order: [[ 2, "desc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'order_no' },
                    { data: 'order_date' },
                    { data: 'name' },
                    { data: 'items', 'className': 'text-right' },
                    { data: 'delivery_type' },
                    { data: 'address' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By Order # / Name'
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

                            return formatDate(row['created_at']);
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

                            return row['order_items'].length;
                        }
                    },
                    {
                        targets: 5,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['delivery_type_id']==1?'Ship':'Pickup in Store';

                        }
                    },
                    {
                        targets: 6,
                        orderable: false,
                        'render': function (data, type, row){

                            return row['shipping_address']['line_1']+' '+row['shipping_address']['line_2']+' '+row['shipping_address']['city']+' '+row['shipping_address']['states']['name']+' '+row['shipping_address']['countries']['name'];
                        }
                    },
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
