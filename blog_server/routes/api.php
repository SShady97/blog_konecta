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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::get('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::get('me', 'App\Http\Controllers\AuthController@me');
    Route::post('register', 'App\Http\Controllers\AuthController@register');
});

Route::group(['middleware' => ['jwt.verify']], function() {
    
    Route::get('users','App\Http\Controllers\UserController@index');
    Route::post('users/new','App\Http\Controllers\UserController@store');
    Route::post('users/likeItem','App\Http\Controllers\UserController@likeItem');
    Route::put('users/update','App\Http\Controllers\UserController@update');
    Route::delete('users/delete/{id}','App\Http\Controllers\UserController@destroy');

    Route::get('categories','App\Http\Controllers\CategoryController@index');
    Route::get('itemsCat/{category_id}','App\Http\Controllers\CategoryController@itemsByCat');
    Route::post('categories/new','App\Http\Controllers\CategoryController@store');
    Route::put('categories/update','App\Http\Controllers\CategoryController@update');
    Route::delete('categories/delete/{id}','App\Http\Controllers\CategoryController@destroy');

    Route::get('items','App\Http\Controllers\ItemController@index');
    Route::get('items/likes/{item_id}','App\Http\Controllers\ItemController@allLikes');
    Route::post('items/new','App\Http\Controllers\ItemController@store');
    Route::put('items/update','App\Http\Controllers\ItemController@update');
    Route::delete('items/delete/{id}','App\Http\Controllers\ItemController@destroy');

});


