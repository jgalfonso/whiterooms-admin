$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/issuance',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

            this.bindEvents();
        },

        setElements: function () {
            this.issuedto = $('#issuedto');
        },

        bindEvents: function () {
            this.issuedto.change(function() {
               
                App.initDataTable();
            });
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
                ajax: App.baseUrl + "/get-bylist?issuedTo="+$('#issuedto').val(),
                order: [[ 0, "asc" ]],
                columns:[
                    { data: 'udi' },
                    { data: 'issued_to' },
                    { data: 'issued_by' },
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
                        orderable: true,
                        'render': function (data, type, row){

                            var content = row['udi']+'<br/><b>'+row['name']+'</b><br/><small>'+row['description']+'</small>'; 
                            return content;
                        }
                    },
                    {
                        targets: 1,
                        orderable: true,
                        'render': function (data, type, row){

                            return row['doctor'];
                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            var content = row['issued_by']+'<br><small>'+formatDate(row['dt_issued'])+'</small>';
                            return content;
                        }
                    },
                    {
                        targets: 3,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a href="/returns/new?udi='+ row['udi']+'" class="btn btn-sm btn-default" title="Return" data-toggle="tooltip" data-placement="top" data-original-title="Return" style="cursor: pointer;"><i class="fa fa-external-link"></i></a>';
                            return content;
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

    return [day, month, year].join('-') +' '+ time;
}