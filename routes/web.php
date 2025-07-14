<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});


