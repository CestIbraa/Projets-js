<?php

use App\Http\Controllers\TacheController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/taches', [TacheController::class, 'index']);
Route::post('/taches', [TacheController::class, 'store']);
Route::delete('/taches/{tache}', [TacheController::class, 'delete']);

