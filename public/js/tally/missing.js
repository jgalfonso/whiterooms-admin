$(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/tally',
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
                ajax: App.baseUrl + "/get-missingitems?issuedTo="+$('#issuedto').val(),
                order: [[ 0, "asc" ]],
                columns:[
                    { data: 'udi' },
                    { data: 'no_instruments', 'className': 'text-right' },
                    { data: 'pending_instruments', 'className': 'text-right' },
                    { data: 'issued_to' },
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

                            return '<a onclick="view('+row['id']+', 1);" style="cursor: pointer;">'+row['no_instruments']+'</a>';
                        }
                    },
                     {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            return '<a onclick="view('+row['id']+', 2);" style="cursor: pointer;">'+row['pending_instruments']+'</a>';
                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        'render': function (data, type, row){

                            var content = row['doctor'];
                            return content;
                        }
                    },
                ]
            });
        },
    }

    App.init();
});

function view(id, status) {
    $.ajax({
        type: 'GET',
        url : window.location.protocol + '//' + window.location.host + (status == 2 &&  '/tally/get-pendingitems' ||  '/inventory/bins/get-byid'),
        data: {
            containerID: id,
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success : function(data) {
            if(data) {
                $html = '';

                $.each(data, function (key, value) {
                    $html += '<tr>';
                    $html += '<td>'+value.item_no+'<br/><b>'+value.description+'</b>'+(value.b_status=='Missing'&&'<br><span class="badge badge-danger mt-1 ml-0">Missing</span>'||'')+'</td>';
                    $html += '<td>'+value.catalog_no+'</td>';
                    $html += '<td>'+value.lot_no+'</td>';
                    $html += '<td>'+value.serial_no+'</td>';
                    $html += '<td>'+value.gtin+'</td>';
                    $html += '<td>'+value.basic_uid_di+'</td>';
                    $html += '<td>'+value.encoded_by+'<br><small>'+formatDate(value.dt_created)+'</small></td>';
                    $html += '</tr>';
                });
            }

            $('#modal-content').html($html);
            $('#view').modal('show');        
        },
        error : function(request, status, error) {
            alert(error);
        }
    });
}

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