 $(function () {

    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host + '/inventory',
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            App.initDataTable();

            this.bindEvents();

            $('#udi').focus();
        },

        setElements: function () {
            this.udi = $('#udi');
            this.save = $('#save');
            this.reset = $('#reset');
            this.continue = $('#continue');
        },

        bindEvents: function () {
            this.udi.change(function() {
                if($(this).val()) {
                    $.ajax({
                        type: 'GET',
                        url : App.baseUrl + "/containers/get-byitem",
                        data: {
                            udi: $(this).val(),
                            _token: App.csrfToken
                        },
                        dataType: 'json',
                        success : function(data) {
                            console.log(data);

                            if(data && Object.values(data).length > 0) {
                                swal({
                                    title: "",
                                    text: "Container already exist. view container details?",
                                    type: "warning",
                                    confirmButtonText: "Yes",
                                    showCancelButton: true,
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: true
                                }, function (ret) {
                                    
                                    if(ret == true){
                                        $('#title').text('Edit Container');
                                        $('#containerid').val(data.id);
                                        $('#name').val(data.name);
                                        $('#description').val(data.description);
                                        $("#basket").prop('checked', data.is_basket == 1 && true || false);
                                        $('#mat').prop('checked', data.is_mat == 1 && true || false);
                                        $('#label').prop('checked', data.is_label == 1 && true || false);
                                        $("#udi").prop('readonly', true);
                                        $("#container-issued").hide();
                                        $("#reset").show();
                                        $("#continue").hide();
                                        $('#name').focus();
                                        swal.close();
                                    }
                                    else {
                                        $('#udi').val('');
                                        $('#udi').focus();
                                    }
                                });
                            }
                        },
                        error : function(request, status, error) {
                            alert(error);
                        }
                    });
                }
            });

            this.save.on('click', { continue: false }, function() {
                if($('#containerid').val()) App.edit();
                else App.store();
            });

            this.reset.on('click', this.clear);
            this.continue.on('click', { continue: true }, this.store);
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
                ajax: App.baseUrl + "/containers/get-bylist",
                order: [[ 1, "asc" ]],
                columns:[
                    { data: 'id', 'className': 'hide' },
                    { data: 'udi' },
                    { data: 'created' },
                    { data: 'status' },
                    { data: 'action', 'className': 'text-center' },
                ],
                language: {
                    paginate: {
                        next: '»', 
                        previous: '«' 
                    },
                    processing: "Please wait while we load the data...",
                    searchPlaceholder: 'By UDI / Name'
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

                            var content = row['udi']+'<br/><b>'+row['name']+'</b><br/><small>'+row['description']+'</small><br/># Instruments: <a onclick="view('+row['id']+');" style="cursor: pointer;">'+row['no_instruments']+'</a>'; 
                            if(row['missing']) {
                                content += ' [ Current: <a onclick="view('+row['id']+', \'current\');" style="cursor: pointer;">'+row['current']+'</a> | Missing: <a onclick="view('+row['id']+', \'missing\');" style="color: red; cursor: pointer;">'+row['missing']+'</a> ]';
                            }
                            content += '<br>Cycle: <b style="color: '+(row['cycle']>=1990&&'#FF0000'||'#008000')+ '">'+row['cycle'];
                            
                            return content;
                        }
                    },
                    {
                        targets: 2,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '';
                            if(row['is_basket']) content += 'Basket';
                            if(row['is_mat']) content += (content && ', ' || '') + 'Mat';
                            if(row['is_label']) content += (content && ', ' || '') + 'Label';

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

                            var content = '<span class="badge badge-'+(row['status']=='New' && 'info' || (row['status']=='Available' && 'success' || 'warning'))+' text-uppercase">'+row['status']+'</span>';
                            return content;
                        }
                    },
                    {
                        targets: 5,
                        orderable: false,
                        'render': function (data, type, row){

                            var content = '<a onclick="set('+row['id']+');" class="btn btn-sm btn-default" title="Edit" data-toggle="tooltip" data-placement="top" data-original-title="Edit" style="cursor: pointer;"><i class="icon-pencil"></i></a> <a href="/inventory/instruments/entry/'+row['id']+'" class="btn btn-sm btn-default" title="Add Instruments" data-toggle="tooltip" data-placement="top" data-original-title="Add Instruments"><i class="icon-eye"></i></a>';
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
                url : App.baseUrl + "/containers/store",
                data: {
                    udi         : $('#udi').val(),
                    name        : $('#name').val(),
                    description : $('#description').val(),
                    isBasket    : $('#basket').is(":checked") && 1 || 0,
                    isMat       : $('#mat').is(":checked") && 1 || 0,
                    isLabel     : $('#label').is(":checked") && 1 || 0,
                    issuedTo    : $('#issuedto').val(),
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        if(event && event.data.continue) window.location =  App.baseUrl + "/instruments/entry/" + data.id;
                        else {

                            App.initDataTable();
                            App.clear();
                            
                            swal({ title: "Success!", text: '1 row successfully submitted.', type: "success" });
                        }
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
                url : App.baseUrl + "/containers/edit",
                data: {
                    containerID : $('#containerid').val(),
                    name        : $('#name').val(),
                    description : $('#description').val(),
                    isBasket    : $('#basket').is(":checked") && 1 || 0,
                    isMat       : $('#mat').is(":checked") && 1 || 0,
                    isLabel     : $('#label').is(":checked") && 1 || 0,
                    _token      : App.csrfToken,
                },
                dataType: 'json',
                success: function(data) {
                    if(data && data.success == true) {
                        
                        App.initDataTable();
                        App.clear();
                        
                        swal({ title: "Success!", text: '1 row successfully updated.', type: "success" });
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
            $('#title').text('New Container');
            $('#containerid').val('');
            $('#udi').val('');
            $('#name').val('');
            $('#description').val('');
            $("#basket").prop('checked', false);
            $("#mat").prop('checked', false);
            $("#label").prop('checked', false);
            $("#udi").prop('readonly', false);
            $("#container-issued").show();
            $("#reset").hide();
            $("#continue").show();
            $('#udi').focus();
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

            $('.modal-title').html(status=='available'?'Instruments':capitalizeFirstLetter(status)+' Instruments');
            $('#modal-content').html($html);
            $('#view').modal('show');        
        },
        error : function(request, status, error) {
            alert(error);
        }
    });
}

function set(id) {
    $.ajax({
        type: 'GET',
        url : window.location.protocol + '//' + window.location.host + "/inventory/containers/get-byid",
        data: {
            containerID: id,
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success : function(data) {
            console.log(data);

            $('#title').text('Edit Container');
            $('#containerid').val(data.id);
            $('#udi').val(data.udi);
            $('#name').val(data.name);
            $('#description').val(data.description);
            $("#basket").prop('checked', data.is_basket == 1 && true || false);
            $('#mat').prop('checked', data.is_mat == 1 && true || false);
            $('#label').prop('checked', data.is_label == 1 && true || false);
            $("#udi").prop('readonly', true);
            $("#container-issued").hide();
            $("#reset").show();
            $("#continue").hide();
            $('#name').focus();
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