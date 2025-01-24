<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('create-payment-intent', 'PaymentController@createPaymentIntent');
Route::post('paypal/create-order', 'PayPalController@createOrder');
Route::post('paypal/capture-order', 'PayPalController@captureOrder');
Route::get('send-confirmation-email', 'MailController@sendConfirmation');
Route::get('send-payment-receipt', 'MailController@sendPayment');
Route::get('send-verification-code', 'MailController@sendVerificationCode');
Route::get('change-password', 'UsersController@changePassword');
Route::get('delete-account', 'UsersController@deleteAccount');

Route::post('in', 'AuthController@in');
Route::post('out', 'AuthController@out');

Route::group(['name' => 'inventory', 'prefix' => 'inventory'], function () {
    Route::get('get-products','InventoryController@getProducts');
    Route::get('get-product','InventoryController@getProduct');
    Route::post('store','InventoryController@store');
    Route::post('edit','InventoryController@edit');
});

Route::group(['name' => 'orders', 'prefix' => 'orders'], function () {
    Route::get('get-orders','OrderController@getOrders');
    Route::post('edit','OrderController@edit');
    Route::post('send','OrderController@send');
});

Route::group(['name' => 'payments', 'prefix' => 'payments'], function () {
    Route::get('get-payments','PaymentController@getPayments');
});

Route::group(['name' => 'shipments', 'prefix' => 'shipments'], function () {
    Route::get('get-shipments','ShipmentController@getShipments');
});

Route::group(['name' => 'users', 'prefix' => 'users'], function () {
    Route::get('get-users','UsersController@getUsers');
    Route::post('store','UsersController@store');
    Route::post('edit','UsersController@edit');
});

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
