@extends('template')

@section('title', 'Transactions | Chat Support')

@section('css')
    <link rel="stylesheet" href="{{ URL::asset('assets/vendor/jquery-datatable/dataTables.bootstrap4.min.css') }}">

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
                    <h2>Chat Support</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="">Transactions</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Chat Support</li>
                        </ol>
                    </nav>
                </div>     
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-lg-12">                    
                <div class="card">
                    <div class="body">
                        <div class="chatapp_list">
                            
                            <ul class="right_chat list-unstyled mb-0">                                
                                <li class="offline">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <div class="avtar-pic w35 bg-red"><span>FC</span></div>
                                            <div class="media-body">
                                                <span class="name">Folisise Chosielie</span>
                                                <span class="message">offline</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="online">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <img class="media-object " src="../assets/images/xs/avatar3.jpg" alt="">
                                            <div class="media-body">
                                                <span class="name">Marshall Nichols</span>
                                                <span class="message">online</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="online">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <div class="avtar-pic w35 bg-red"><span>FC</span></div>
                                            <div class="media-body">
                                                <span class="name">Louis Henry</span>
                                                <span class="message">online</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="online">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <div class="avtar-pic w35 bg-orange"><span>DS</span></div>
                                            <div class="media-body">
                                                <span class="name">Debra Stewart</span>
                                                <span class="message">online</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="offline">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <div class="avtar-pic w35 bg-green"><span>SW</span></div>
                                            <div class="media-body">
                                                <span class="name">Lisa Garett</span>
                                                <span class="message">offline since May 12</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="online">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <img class="media-object " src="../assets/images/xs/avatar5.jpg" alt="">
                                            <div class="media-body">
                                                <span class="name">Debra Stewart</span>
                                                <span class="message">online</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="offline">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <img class="media-object " src="../assets/images/xs/avatar2.jpg" alt="">
                                            <div class="media-body">
                                                <span class="name">Lisa Garett</span>
                                                <span class="message">offline since Jan 18</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="online">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <div class="avtar-pic w35 bg-indigo"><span>FC</span></div>
                                            <div class="media-body">
                                                <span class="name">Louis Henry</span>
                                                <span class="message">online</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="online">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <div class="avtar-pic w35 bg-pink"><span>DS</span></div>
                                            <div class="media-body">
                                                <span class="name">Debra Stewart</span>
                                                <span class="message">online</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                                <li class="offline">
                                    <a href="javascript:void(0);">
                                        <div class="media">
                                            <div class="avtar-pic w35 bg-info"><span>SW</span></div>
                                            <div class="media-body">
                                                <span class="name">Lisa Garett</span>
                                                <span class="message">offline since May 12</span>
                                                <span class="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>                            
                                </li>
                            </ul>
                        </div>
                        <div class="chatapp_body" style="margin-right: 0;">
                            <div class="chat-header clearfix">
                                <div class="row clearfix">
                                    <div class="col-lg-12">
                                        <div class="chat-about">
                                            <h6 class="m-b-0">Louis Pierce</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-history">
                                <ul class="message_data">
                                    <li class="right clearfix">
                                        <img class="user_pix" src="../assets/images/xs/avatar7.jpg" alt="avatar">
                                        <div class="message">
                                            <span>Hi Aiden, how are you?<br> How is the project coming along?</span>
                                        </div>
                                        <span class="data_time">10:12 AM, Today</span>
                                    </li>
                                    <li class="left clearfix">
                                        <img class="user_pix" src="../assets/images/user.png" alt="avatar">
                                        <div class="message">
                                            <span>Are we meeting today?</span>
                                        </div>
                                        <span class="data_time">10:12 AM, Today</span>
                                    </li>
                                    <li class="right clearfix">
                                        <img class="user_pix" src="../assets/images/xs/avatar5.jpg" alt="avatar">
                                        <div class="message">
                                            <span>How is the project coming along?</span>
                                        </div>
                                        <span class="data_time">10:12 AM, Today</span>
                                    </li>
                                    <li class="left clearfix">
                                        <img class="user_pix" src="../assets/images/user.png" alt="avatar">
                                        <div class="message">
                                            <span>Project has been already finished and I have<br> results to show you.</span>
                                        </div>
                                        <span class="data_time">10:16 AM, Today</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="chat-message clearfix">
                                <div class="input-group mb-0">
                                    <textarea type="text" row="" class="form-control" placeholder="Enter text here..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{ URL::asset('assets/bundles/datatablescripts.bundle.js') }}"></script>
@endsection