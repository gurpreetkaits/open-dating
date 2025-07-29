<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiController;

Route::get('/', function () {
    return view('welcome');
});

// API Routes
Route::prefix('api')->group(function () {
    Route::post('/register', [ProfileController::class, 'register']);
    Route::get('/profiles', [ApiController::class, 'getProfiles']);
    Route::get('/profiles/{id}', [ApiController::class, 'getProfile']);
});
