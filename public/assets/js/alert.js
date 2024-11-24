bootstrap_alert = function() {}
	bootstrap_alert.warning = function(e, message) {
		$(e).html('<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="min-width: 1% !important;"><span aria-hidden="true">×</span></button><i class="fa fa-times-circle"></i> '+message+'</div>')
    }

    bootstrap_alert.close = function(e){
    	$(e).html('');
    }
