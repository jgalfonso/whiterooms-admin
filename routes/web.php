<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('login', ['as' => 'login', 'uses' => 'AuthController@index']);

Route::group(['name' => 'paypal', 'prefix' => 'paypal'], function () {
    Route::get('success', 'PayPalController@success')->name('paypal.success');
    Route::get('cancelled', 'PayPalController@cancelled')->name('paypal.cancelled');
});

Route::group(['middleware' => 'supabase.session'], function() {
    Route::get('/', 'MainController@index')->name('index');

    Route::group(['name' => 'inventory', 'prefix' => 'inventory'], function () {
        Route::get('/', 'InventoryController@index')->name('inventory');
    });

    Route::group(['name' => 'transactions', 'prefix' => 'transactions'], function () {
        Route::group(['name' => 'orders', 'prefix' => 'orders'], function () {
            Route::get('/', 'OrderController@index')->name('orders');
            Route::get('/view/{id}', 'OrderController@view')->name('orders.view');
        });

        Route::group(['name' => 'payments', 'prefix' => 'payments'], function () {
            Route::get('/', 'PaymentController@index')->name('payments');
        });

        Route::group(['name' => 'shipments', 'prefix' => 'shipments'], function () {
            Route::get('/', 'ShipmentController@index')->name('shipments');
        });

        Route::group(['name' => 'returns', 'prefix' => 'returns'], function () {
            Route::get('/', 'ReturnController@index')->name('returns');
        });

        Route::group(['name' => 'vouchers', 'prefix' => 'vouchers'], function () {
            Route::get('/', 'VoucherController@index')->name('vouchers');
        });

        Route::group(['name' => 'chat', 'prefix' => 'chat'], function () {
            Route::get('/', 'ChatController@index')->name('chat');
        });
    });

    Route::group(['name' => 'users', 'prefix' => 'users'], function () {
        Route::group(['name' => 'admin', 'prefix' => 'admin'], function () {
            Route::get('/', 'UsersController@index')->name('admin');
        });

        Route::group(['name' => 'subscribers', 'prefix' => 'subscribers'], function () {
            Route::get('/', 'SubscribersController@index')->name('subscribers');
        });
    });
});