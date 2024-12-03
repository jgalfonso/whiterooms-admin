function logOut() {
    const baseUrl = window.location.protocol + '//' + window.location.host;

    $.ajax({
        url: baseUrl + '/api/out',
        type: 'POST',
        headers: {'X-CSRF-TOKEN':  $('meta[name="csrf-token"]').attr('content')},
        dataType: 'json',
        success: function(response) {
            window.location =  baseUrl + '/login';
        },
        error: function(request, status, error) {
            console.log(error);
        }
    });
}