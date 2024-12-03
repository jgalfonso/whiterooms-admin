@extends('template')

@section('title', 'Manage Inventory | Products')

@section('css')
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/sweetalert/sweetalert.css') }}">

    <style>
        .parsley-errors-list {
            padding-inline-start: 17px !important;
        }

        .sa-button-container button {
            min-width: 100px !important;
        }

        div.dataTables_wrapper div.dataTables_filter input {
            width: 300px;
        }

        .form-control:disabled, .form-control[readonly] {
            background-color: #f5f5f5;
        }
    </style>
@endsection

@section('content')
  	<div class="container-fluid">
        <div class="block-header">
            <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                    <h2>Products</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Manage Inventory</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Products</li>
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
                                    <th>ID</th>
                                    <th>#</th>
                                    <th>SKU / Name / Description</th>
                                    <th>Qty In Stocks</th>
                                    <th>Unit Price</th>
                                    <th>Discount</th>
                                    <th>Net</th>
                                    <th>New Arrival</th>
                                    <th>Recommended</th>
                                    <th>Featured</th>
                                    <th>Best Selling</th>
                                    <th style="width: 1%;"><i class="fa fa-level-down"></i></th>
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
                            <h5 id="title" style="margin-bottom: 30px;">New Product</h5>
                            <p>All fields marked with an asterisk (*) are required.</p>

                            <div id="alert"></div>

                            <input id="id" name="id" type="hidden" />

                            <form id="form" novalidate="">
                                <div class="form-group">
                                    <label>SKU</label><span class="text-secondary"> (Auto Generated) </span> 
                                    <input id="sku" name="sku" type="text" class="form-control" readonly />
                                </div>
                                
                                <div class="form-group">
                                    <label>Name</label><span style="color: red"> * </span>
                                    <input id="name" name="name" type="text" class="form-control" required />
                                </div>

                                <div class="form-group">
                                    <label>Description</label><span style="color: red"> * </span>
                                    <textarea id="description" name="description" class="form-control" rows="4" required></textarea>
                                </div>

                                <div class="form-group">
                                    <label>Qty</label><span style="color: red"> * </span>
                                    <input id="qty" name="qty" type="number" class="form-control" required />
                                </div>

                                <div class="form-group">
                                    <label>Unit Price</label><span style="color: red"> * </span>
                                    <input id="unitprice" name="unitprice" type="text" class="form-control" required />
                                </div>

                                <div class="form-group">
                                    <label>Discount</label>
                                    <input id="discount" name="discount" type="text" class="form-control" />
                                </div>

                                <div class="form-group">
                                    <label>Net</label>
                                    <input id="net" name="net" type="text" class="form-control" readonly  />
                                </div>

                                <div class="form-group">
                                    <label>Thumbnail Path</label>
                                    <input id="thumbnailpath" name="thumbnailpath" type="text" class="form-control"/>
                                </div>

                                <div class="form-group">
                                    <label>Net</label>
                                    <div class="fancy-checkbox">
                                        <label><input id="isnewarrival" name="isnewarrival" type="checkbox" checked><span>New Arrival</span></label>
                                    </div>
                                    <div class="fancy-checkbox">
                                        <label><input id="isrecommended" name="isrecommended" type="checkbox"><span>Recommended</span></label>
                                    </div>
                                    <div class="fancy-checkbox">
                                        <label><input id="isfeatured" name="isfeatured" type="checkbox"><span>Featured</span></label>
                                    </div>
                                    <div class="fancy-checkbox">
                                        <label><input id="isbestselling" name="isbestselling" type="checkbox"><span>Best Selling</span></label>
                                    </div>
                                </div>

                                <div class="form-group mt-5">
                                    <button id="save" type="button" class="btn btn-success" style="width: 100px">Save</button>
                                    <button id="reset" type="button" class="btn btn-default" style="width: 100px">Clear</button>
                                </div>
                            </form>
                        </div>
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

    <script src="{{ URL::asset('js/inventory/index.js') }}"></script>
@endsection
