 $(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/inventory',
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
                serverSide: true,
                serverMethod: 'GET',
                bInfo: true,
                bDestroy: true,
                bLengthChange: false,
                pageLength: 30,
                scrollX: true,
                ajax: App.baseUrl + "/containers/get-bylist?status=Available",
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'udi' },
                    { data: 'no_instruments', 'className': 'text-right' },
                    { data: 'created' },
                    { data: 'status' },
                    { data: 'action', 'className': 'hide text-center' },
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

                            return row['id'];
                        }
                    },
                    {
                        targets: 1,
                        orderable: true,
                        'render': function (data, type, row){

                            var content = row['udi']+'<br/><b>'+row['name']+'</b><br/><small>'+row['description']+'</small>'; 
                            return content;
                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        'render': function (data, type, row){

                            var content = '<a onclick="view('+row['id']+');" style="cursor: pointer;">'+row['no_instruments']+'</a>';
                            if(row['missing']) {
                                content += '<br><a onclick="view('+row['id']+', \'current\');" style="cursor: pointer;"><span class="badge badge-success text-uppercase mt-1 mr-0">Current: '+row['current']+' </span></a> <a onclick="view('+row['id']+', \'missing\');" style="cursor: pointer;"><span class="badge badge-danger text-uppercase mt-1 mr-0">Missing: '+row['missing']+'</span></a>';
                            }

                            return content;
                        }
                    },
                    {
                        targets: 3,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = row['encoded_by']+'<br><small>'+formatDate(row['dt_created'])+'</small>';
                            return content;
                        }
                    },
                    {
                        targets: 4,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<span class="badge badge-success text-uppercase">'+row['status']+'</span>';
                            return content;
                        }
                    },
                    {
                        targets: 5,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<button type="button" class="btn btn-sm btn-default" title="" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="icon-pencil"></i></button> <a href="/inventory/instruments/entry/'+row['id']+'" class="btn btn-sm btn-default" title="Add Instruments" data-toggle="tooltip" data-placement="top" data-original-title="Add Instruments"><i class="icon-eye"></i></a>';
                            return content;
                        }
                    }
                ]
            });
        },
    }

    App.init();
});

function view(id, status = 'available') {
    $.ajax({
        type: 'GET',
        url : window.location.protocol + '//' + window.location.host + '/inventory/bins/get-byid',
        data: {
            containerID: id,
            status: status,
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success : function(data) {
            if(data) {
                $html = '';

                $.each(data, function (key, value) {
                    $html += '<tr>';
                    $html += '<td><b>'+value.item_no+'</b><br/>'+value.description+(value.b_status=='Missing'&&'<br><span class="badge badge-danger mt-1 ml-0">Missing</span>'||'')+'</td>';
                    $html += '<td>'+value.catalog_no+'</td>';
                    $html += '<td>'+value.lot_no+'</td>';
                    $html += '<td>'+value.serial_no+'</td>';
                    $html += '<td>'+value.gtin+'</td>';
                    $html += '<td>'+value.basic_uid_di+'</td>';
                    $html += '<td>'+value.encoded_by+'<br><small>'+formatDate(value.dt_created)+'</small></td>';
                    $html += '</tr>';
                });
            }

            $('.modal-title').html(status=='available'?'Instruments':capitalizeFirstLetter(status)+' Instruments');
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

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}