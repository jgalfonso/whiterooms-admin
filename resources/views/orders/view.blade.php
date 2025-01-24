@extends('template')

@section('title', 'Manage Inventory | Products')

@section('css')
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/sweetalert/sweetalert.css') }}">

    <style>
        div.dataTables_wrapper div.dataTables_filter input {
            width: 300px;
        }
    </style>
@endsection

@section('content')
  	<div class="container-fluid">
        <div class="block-header">
            <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                    <h2>Order Summary</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="">Transactions</a></li>
                            <li class="breadcrumb-item"><a href="/transactions/orders">Orders</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Order Summary</li>
                        </ol>
                    </nav>
                </div>    
                
                <div class="col-md-6 col-sm-12 text-right hidden-xs">
                    <a href="javascript:void(0);" class="btn btn-sm btn-primary btn-round" title="" data-toggle="modal" data-target="#mdlStatus">Update</a>
                    <a href="javascript:void(0);" class="btn btn-sm btn-success btn-round" title="" data-toggle="modal" data-target="#mdlChat"><i class="fa fa-wechat"></i> Chat</a>
                </div>
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card mb-3">
                            <div class="header">
                                <h2>Customer</h2>
                            </div>
                            <div class="body">
                                <small class="text-muted">Name: </small>
                                <p>{{ $data[0]['profiles']['firstname'] }} {{ $data[0]['profiles']['lastname'] }}</p>
                                
                                <small class="text-muted">Email: </small>
                                <p>{{ $data[0]['profiles']['email'] }}</p>    
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="card">
                            <div class="header">
                                <h2>Items</h2>
                            </div>
                            
                            <table class="table table-hover table-custom">
                                <thead>
                                    <tr>
                                        <th class="w60"></th>
                                        <th>Item</th>
                                        <th class="text-right">Unit Price</th>
                                        <th class="text-right">Qty</th>
                                        <th class="text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($data[0]['order_items'] as $item)
                                        <tr>
                                            <td class="width45">
                                            <img class="rounded" src="{{ $item['products']['image'] }}" alt="" style="width: 100px;">
                                            </td>
                                            <td>{{ $item['products']['name'] }}</td>
                                            <td class="text-right">{{ $item['unit_price'] }}</td>
                                            <td class="text-right">{{ $item['qty'] }}</td>
                                            <td class="text-right">{{ $item['total'] }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>    
                        </div> 
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="header">
                        <h2>Summary</h2>
                    </div>
                    <div class="body">
                        <input id="id" name="id" type="hidden" value="{{ $data[0]['id'] }}" />
                        <input id="user_id" name="user_id" type="hidden" value="{{ $data[0]['user_id'] }}" />
                        <input id="reference_no" name="reference_no" type="hidden" value="{{ $data[0]['reference_no'] }}" />
                        <input id="email" name="email" type="hidden" value="{{ $data[0]['profiles']['email'] }}" />

                        <small class="text-muted">Shipping Details: </small>
                        <p class="mb-0">{{ $data[0]['shipping_address']['firstname'] }} {{ $data[0]['shipping_address']['lastname'] }}</p>
                        <p class="mb-0">{{ $data[0]['shipping_address']['phone_no'] }}</p>
                        <p>{{ $data[0]['shipping_address']['line_1'] }} {{ $data[0]['shipping_address']['line_2'] }} {{ $data[0]['shipping_address']['city'] }} {{ $data[0]['shipping_address']['states']['name'] }} {{ $data[0]['shipping_address']['countries']['name'] }}</p>
                        <small class="text-muted">Delivery Type: </small>
                        <p>{{ $data[0]['delivery_type_id']==1?'Ship':'Pickup in Store' }} - {{ $data[0]['delivery_type_id']==1?$data[0]['delivery_methods']['name']:$data[0]['stores']['name'] }}</p> 
                        <small class="text-muted">Payment Method: </small>
                        <p>{{ $data[0]['payments']['payment_method_id']==1?'Credit Card':'Paypal' }}</p>
                        <small class="text-muted">Voucher: </small>
                        <p>{{ $data[0]['payments']['vouchers']?['name']:'' }}</p>
                        <small class="text-muted">Order Date: </small>
                        <p>{{ $data[0]['created_at'] }}</p> 
                        <small class="text-muted">Merchandise Subtotal: </small>
                        <p>{{ $data[0]['payments']['total'] }}</p>
                        <small class="text-muted">Delivery Fee: </small>
                        <p>{{ $data[0]['payments']['delivery_fee'] }}</p>
                        <small class="text-muted">Discount: </small>
                        <p>{{ $data[0]['payments']['discount'] }}</p>
                        <small class="text-muted">Total Payment: </small>
                        <p><b>{{ $data[0]['payments']['net'] }}</b></p>
                        @if($data[0]['notes'])
                            <small class="text-muted">Notes: </small>
                            <p>{{ $data[0]['notes'] }}</p>
                        @endif
                        <small class="text-muted">Status: </small>
                        <p class="text-success">{{ $data[0]['status'] }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="mdlStatus" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Order Status</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-md-12">
                            <div class="fancy-radio">
                                <label><input name="status" value="For Packing" type="radio" checked=""><span><i></i>For Packing</span></label>
                            </div>
                            <div class="fancy-radio">
                                <label><input name="status" value="Packed" type="radio"><span><i></i>Packed</span></label>
                            </div>
                            <div class="fancy-radio">
                                <label><input name="status" value="For Shipping" type="radio"><span><i></i>For Shipping</span></label>
                            </div>
                            <div class="fancy-radio">
                                <label><input name="status" value="Shipped" type="radio"><span><i></i>Shipped</span></label>
                            </div>
                            <div class="fancy-radio">
                                <label><input name="status" value="Delivered" type="radio"><span><i></i>Delivered</span></label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-round btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-round btn-primary" onclick="submit();">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div  id="mdlChat" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chat</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex mb-3">
                            <div class="chatapp_body" style="margin: 0; width: 100%; border-bottom: 1px solid #e1e8ed;">
                                <div class="chat-history">
                                    <ul class="message_data">
                                        @foreach ($chat as $item)
                                            @if($item['is_admin'] === 1)
                                                <li class="right clearfix">
                                                    <img class="user_pix" src="{{ URL::asset('assets/images/avatar1.png') }}" alt="avatar">
                                                    <div class="message">
                                                        <span>{{ $item['body'] }}</span>
                                                    </div>
                                                    <span class="data_time">
                                                        {{ \Carbon\Carbon::parse($item['created_at'])->isToday() ? \Carbon\Carbon::parse($item['created_at'])->format('g:i A') . ', Today' : \Carbon\Carbon::parse($item['created_at'])->format('g:i A, F j, Y') }}
                                                    </span>
                                                </li>
                                            @else
                                                <li class="left clearfix">
                                                    <img class="user_pix" src="{{ URL::asset('assets/images/avatar2.png') }}" alt="avatar">
                                                    <div class="message">
                                                        <span>{{ $item['body'] }}</span>
                                                    </div>
                                                    <span class="data_time">
                                                        {{ \Carbon\Carbon::parse($item['created_at'])->isToday() ? \Carbon\Carbon::parse($item['created_at'])->format('g:i A') . ', Today' : \Carbon\Carbon::parse($item['created_at'])->format('g:i A, F j, Y') }} 
                                                    </span>
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <form id="form" novalidate="">
                                <textarea id="message" name="message" rows="4" class="form-control no-resize" placeholder="Type a message..." required></textarea>
                            </form>
                        </div>
                        <div class="align-right">
                            <button class="btn btn-round btn-warning" onclick="send();">Send</button>
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

    <script src="{{ URL::asset('js/orders/view.js') }}"></script>
@endsection