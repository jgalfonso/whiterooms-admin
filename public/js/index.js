$(function () {
    
    var App = {
        baseUrl : window.location.protocol + '//' + window.location.host,
        csrfToken : $('meta[name="csrf-token"]').attr('content'),

        init: function () {
            this.setElements();

            this.bindEvents();
        },

        setElements: function () {
            this.key = $('#key');
            this.search = $('#search');
        },

        bindEvents: function () {
            this.key.off('keyup').on('keyup', debounce(function(e) {
                if(e.key === 'Enter' || $(this).val().length > 37) {

                    App.searchItem();
                }
            }, 300));

            this.search.on('click', this.searchItem);
        },

        searchItem: function() {
            $.ajax({
                type: 'GET',
                url : App.baseUrl + "/search",
                data: {
                    key: $('#key').val(),
                    _token: App.csrfToken
                },
                dataType: 'json',
                success : function(data) {
                    if(data && Object.values(data).length === 0) swal({ title: "Not Found!", text: 'Invalid key.', type: "warning" });
                    else {

                        $('#r1-item_no').text(data.item_no);
                        $('#r1-description').text(data.description);
                        $('#r1-catalog_no').text(data.catalog_no);
                        $('#r1-lot_no').text(data.lot_no);
                        $('#r1-serial_no').text(data.serial_no);
                        $('#r1-gtin').text(data.gtin);
                        $('#r1-basic_uiddi').text(data.basic_uid_di);
                        $('#r1-status').text(data.b_status);
                        $('#r1-c_udi').text(data.udi);
                        $('#r1-c_detail').text(data.name+' / '+data.c_description);
                        $('#r1-c_status').text(data.c_status);
                        $('#result').css('display', 'block')
                    }

                    $('#key').val('');
                }
            });
        }
    }

    App.init();
});

function debounce(fn, delay) {
    let timer = null;
    return function(e) {
        clearTimeout(timer); // Clear the previous timer
        timer = setTimeout(() => fn.call(this, e), delay); // Ensure `this` is the input element
    };
} 

function view() {
    $.ajax({
        type: 'GET',
        url : window.location.protocol + '//' + window.location.host + '/inventory/bins/get-byid',
        data: {
            status: 'missing',
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success : function(data) {
            if(data) {
                $html = '';

                $.each(data, function (key, value) {
                    $html += '<tr>';
                    $html += '<td>'+value.item_no+'<br/><b>'+value.description+'</b><br><span class="badge badge-danger mt-1 mb-1 ml-0">Missing</span><br><i class="fa fa-inbox"></i> '+value.udi+'</td>';
                    $html += '<td>'+value.catalog_no+'</td>';
                    $html += '<td>'+value.lot_no+'</td>';
                    $html += '<td>'+value.serial_no+'</td>';
                    $html += '<td>'+value.gtin+'</td>';
                    $html += '<td>'+value.basic_uid_di+'</td>';
                    $html += '<td>'+value.encoded_by+'<br><small>'+formatDate(value.dt_created)+'</small></td>';
                    $html += '</tr>';
                });
            }

            $('.modal-title').html('Missing Instruments');
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