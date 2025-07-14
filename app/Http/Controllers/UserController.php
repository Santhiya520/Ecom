<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
class UserController extends Controller
{
    // 📝 Buyer Registration
    public function buyerRegister(Request $request)
    {
        $request->validate([
            'name'         => 'required|string|max:100',
            'email'        => 'required|email|unique:users',
            'password'     => 'required|string|min:6',
            'phone_number' => 'required|string|max:20',
            'address'      => 'required|string|max:255',
        ]);

        $user = User::create([
            'name'         => $request->name,
            'email'        => $request->email,
            'password'     => Hash::make($request->password),
            'role'         => 'buyer',
            'phone_number' => $request->phone_number,
            'address'      => $request->address,
        ]);

        return response()->json([
            'message' => 'Buyer registered successfully',
            'data'    => $user
        ], 201);
    }

    // 🔐 Buyer Login
    public function buyerLogin(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)
            ->where('role', 'buyer')
            ->first();

        session(['user_id' => $user->id]);

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid buyer credentials'], 401);
        }

        // Optional: login user using Auth
        Auth::login($user);

        return response()->json([
            'message' => 'Buyer login successful',
            'data'    => $user
        ]);
    }

    // 🔐 Seller Login
    public function sellerLogin(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)
            ->where('role', 'seller')
            ->first();

        session(['user_id' => $user->id]);

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid seller credentials'], 401);
        }

        Auth::login($user);

        return response()->json([
            'message' => 'Seller login successful',
            'data'    => $user
        ]);
    }

    // 🚪 Logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
