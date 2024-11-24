@extends('template')

@section('title', 'Home')

@section('css')
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/sweetalert/sweetalert.css') }}">

    <style>
        .sa-button-container button {
            min-width: 100px !important;
        }
    </style>
@endsection

@section('content')
  	<div class="container-fluid">
        <div class="block-header">
            <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                    <h2>Home</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Main</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                    </nav>
                </div>     
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-md-9">
                <div class="alert alert-info alert-dismissible actives" role="alert"><i class="fa fa-info-circle"></i>  This engine is designed to check instrument details and status, including the container where the instrument is included.</div>

                <div class="card mb-2">
                    <div class="body">
                        <div class="row">    
                            <div class="col-lg-10">
                                <div class="form-group">
                                    <label>Search Engine:</label>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="input-group mb-3">
                                                <input id="key" type="text" class="form-control" placeholder="By Item No." autocomplete="off">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <button id="search" type="button" class="btn btn-sm btn-info btn-block btn-search" style="margin-top: 30px;">Search</button>
                            </div>
                        </div>
                    </div>

                    <div id="result" class="card mt-2" style="display: none;">
                        <div class="body">
                            <div class="media">
                                <div class="media-body">
                                    <h5 id="r1-item_no" class="m-0">?</h5>
                                    <p id="r1-description" class="text-muted mb-0">???</p>
                                </div>
                            </div>
                            <small class="text-muted">Catalog Number: </small>
                            <p id="r1-catalog_no">?</p>
                            <small class="text-muted">Lot Number: </small>
                            <p id="r1-lot_no">?</p>
                            <small class="text-muted">Serial Number: </small>
                            <p id="r1-serial_no">?</p>
                            <small class="text-muted">GTIN: </small>
                            <p id="r1-gtin">?</p>                                    
                            <small class="text-muted">Basic UID-DI: </small>
                            <p id="r1-basic_uiddi">?</p>
                            <small class="text-muted">Instrument Status: </small>
                            <p id="r1-status">?</p>
                            <small class="text-muted">Container UDI: </small>
                            <p id="r1-c_udi" class="bold">?</p>
                            <small class="text-muted">Name / Description: </small>
                            <p id="r1-c_detail">?</p>
                            <small class="text-muted">Container Status: </small>
                            <p id="r1-c_status" class="mb-0">?</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card">
                    <div class="body">
                        <div class="row text-center">
                            <div class="col-lg-12 col-md-5">
                                <label class="mb-2 mt-2">Available Containers</label>
                                <h4 class="h4 mb-0 font-weight-bold text-cyan">{{ $containers->available }}</h4>
                            </div>
                            <div class="col-12 col-md-2 col-lg-12">
                                <hr class="mt-4 mb-4" style="border-color: #e1e8ed;">
                            </div>
                            <div class="col-lg-12 col-md-5">
                                <label class="mb-2 mt-2">Issued Containers</label>
                                <h4 class="h4 mb-0 font-weight-bold text-success">{{ $containers->issued }}</h4>
                            </div>
                            <div class="col-12 col-md-2 col-lg-12">
                                <hr class="mt-4 mb-4" style="border-color: #e1e8ed;">
                            </div>
                            <div class="col-lg-12 col-md-5">
                                <label class="mb-2 mt-2">Missing Instruments</label>
                                <h4 class="h4 mb-0 font-weight-bold text-danger"><a onclick="view();" style="cursor: pointer;">{{ $instruments->missing }}</a></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="view" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title h4"></h5>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" style="background: #f1f4f7;">
                            <div class="table-responsive">
                                <table class="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
                                    <thead>
                                        <tr>
                                            <th>Item # / Description</th>
                                            <th>Catalog #</th>
                                            <th>Lot #</th>
                                            <th>Serial #</th>
                                            <th>GTIN</th>
                                            <th>Basic UID-DI</th>
                                            <th>Encoded By / Date</th>
                                        </tr>
                                    </thead>

                                    <tbody id="modal-content">
                                    </tbody>
                                </table>
                            </div>        
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{ URL::asset('assets/vendor/sweetalert/sweetalert.min.js') }}"></script>
    <script src="{{ URL::asset('js/index.js') }}"></script>
@endsection
