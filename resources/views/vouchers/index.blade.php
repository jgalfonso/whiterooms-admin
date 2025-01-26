@extends('template')

@section('title', 'Transactions | Vouchers')

@section('css')
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/sweetalert/sweetalert.css') }}">

    <style>
        div.dataTables_wrapper div.dataTables_filter input {
            width: 300px;
        }

        .parsley-errors-list {
            padding-inline-start: 17px !important;
        }

        .dataTables_filter {
            display: none;
        }

        .sa-button-container button {
            width: 100px;
        }

        .w1 {
            width: 1%;
        }
    </style>
@endsection

@section('content')
  	<div class="container-fluid">
        <div class="block-header">
            <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                    <h2>Vouchers</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="">Transactions</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Vouchers</li>
                        </ol>
                    </nav>
                </div>     
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-md-8">
                <div class="card">
                    <div class="table-responsive">
                        <table id="tbl" class="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
                             <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name / Description</th>
                                    <th>Discount</th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th><i class="fa fa-level-down"></i></th>
                                </tr>
                            </thead>

                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="body">
                    <div class="card">
                        <div class="body">
                            <div class="card-value float-right text-warning" style="height: auto;"><i class="fa fa-file-o"></i></div>
                            <h5 id="form-title" style="margin-bottom: 30px;">New Vouchers</h5>
                            <p>All fields marked with an asterisk (*) are required.</p>

                            <div id="alert"></div>

                            <form id="form" novalidate="">
                                <div class="form-group">
                                    <label>Name</label><span style="color: red"> * </span>
                                    <input id="name" name="name" type="text" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Description</label><span style="color: red"> * </span>
                                    <input id="description" name="description" type="text" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Discount (%)</label>
                                    <input id="discount" name="discount" type="number" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Pax</label><span style="color: red"> * </span>
                                    <input id="pax" name="pax" type="number" class="form-control" required>
                                </div>

                                <div class="form-group mt-5">
                                    <button id="save" type="button" class="btn btn-success" style="width: 100px">Save</button>
                                    <button id="cancel" type="button" class="btn btn-default" style="width: 100px; display: none;">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="mdlAllocation" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Voucher Allocation</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-md-12">
                            <form id="form2" novalidate="">
                                <div class="form-group">
                                    <label>Code</label>
                                    <input id="code" name="code" type="text" class="form-control" disabled>
                                    <input id="hdID" type="hidden">
                                </div>

                                <div class="form-group">
                                    <label>Name / Description</label>
                                    <input id="details" name="details" type="text" class="form-control" disabled>
                                </div>

                                <div class="form-group">
                                    <label>User</label><span style="color: red"> * </span>
                                    <select id="user" name="user" class="form-control" required>
                                        <option value="" selected="">Choose User...</option>
                                        @foreach ($subscribers as $item)
                                            <option value="{{ $item['id'] }}">{{ $item['lastname'] }}, {{ $item['firstname'] }} {{ $item['middlename'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-round btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-round btn-primary" onclick="submit();">Submit </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{ URL::asset('assets/bundles/datatablescripts.bundle.js') }}"></script>
    <script src="{{ URL::asset('assets/vendor/parsleyjs/js/parsley.min.js') }}"></script>
    <script src="{{ URL::asset('assets/vendor/sweetalert/sweetalert.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/alert.js') }}"></script>
    <script src="{{ URL::asset('js/vouchers/index.js') }}"></script>
@endsection