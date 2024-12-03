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

Route::post('in', 'AuthController@in');
Route::post('out', 'AuthController@out');

Route::group(['name' => 'inventory', 'prefix' => 'inventory'], function () {
    Route::get('get-products','InventoryController@getProducts');
    Route::get('get-product','InventoryController@getProduct');
    Route::post('store','InventoryController@store');
    Route::post('edit','InventoryController@edit');
});



/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
