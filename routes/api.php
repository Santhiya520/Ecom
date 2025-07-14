<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndustriesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

Route::apiResource('products', ProductController::class);

Route::get('products/category/{category}', [ProductController::class, 'getByCategory']);

Route::middleware(['web'])->group(function () {
    Route::post('buyer/login', [UserController::class, 'buyerLogin']);
    Route::post('buyer/register', [UserController::class, 'buyerRegister']);
    Route::post('seller/login', [UserController::class, 'sellerLogin']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('orders', [OrderController::class, 'orders']);
    Route::post('cart/add', [OrderController::class, 'addToCart']);
Route::put('cart/update/{id}', [OrderController::class, 'updateCart']);
    Route::delete('cart/remove/{id}', [OrderController::class, 'removeFromCart']); // 👈 DELETE method
    Route::get('cart/{user_id}', [OrderController::class, 'viewCart']);

    Route::post('checkout', [OrderController::class, 'checkout']);
    Route::get('all/orders', [OrderController::class, 'allOrders']);

    Route::get('dashboard', [DashboardController::class, 'index']);
});
