<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{
    // 🛒 Add to Cart
 public function addToCart(Request $request)
{
    $validated = $request->validate([
        'user_id'    => 'required|integer',
        'product_id' => 'required|exists:products,id',
        'quantity'   => 'required|integer', // allow positive or negative
    ]);
    $userId = session('user_id');
    $validated['user_id']=$userId;
    $cartItem = Cart::where('user_id', $validated['user_id'])
        ->where('product_id', $validated['product_id'])
        ->first();

    if ($cartItem) {
        $cartItem->quantity += $validated['quantity'];

        if ($cartItem->quantity < 1) {
            $cartItem->delete();

            return response()->json([
                'message' => 'Cart item removed',
            ]);
        }

        $cartItem->save();
    } else {
        if ($validated['quantity'] < 1) {
            return response()->json([
                'message' => 'Cannot add with negative quantity',
            ], 422);
        }

        $cartItem = Cart::create($validated);
    }

    return response()->json([
        'message' => 'Cart updated successfully',
        'data'    => $cartItem,
    ]);
}


public function updateCart(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::findOrFail($id);
        $cart->quantity = $validated['quantity'];
        $cart->save();

        return response()->json(['message' => 'Cart updated']);
    }

    public function removeFromCart($id)
    {
        $deleted = Cart::where('id', $id)->delete();

        if ($deleted) {
            return response()->json(['message' => 'Product removed from cart']);
        }

        return response()->json(['message' => 'Product not found in cart'], 404);
    }


    // ✅ Checkout and create order
    public function checkout(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer'
        ]);

        $userId = session('user_id');
        $cartItems = Cart::where('user_id', $userId)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $total = 0;

        foreach ($cartItems as $item) {
            $product = Product::find($item->product_id);
            $total += $product->price * $item->quantity;
        }

        $order = Order::create([
            'user_id'    => $userId,
            'total_price'=> $total,
        ]);

        foreach ($cartItems as $item) {
            $product = Product::find($item->product_id);
            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $product->id,
                'quantity'   => $item->quantity,
                'price'      => $product->price,
            ]);
        }

        Cart::where('user_id', $userId)->delete();

        return response()->json(['message' => 'Order placed successfully', 'order_id' => $order->id]);
    }

    public function orders()
    {
        $userId = session('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Not logged in'], 401);
        }

        $orders = Order::with('items.product')->where('user_id', $userId)->get();

        return response()->json(['orders' => $orders]);
    }

    // 📦 Get all orders
    public function allOrders()
    {
        $orders = Order::with('items.product','user')->get();
        return response()->json($orders);
    }

    // 🛒 View cart items for a user
    public function viewCart($user_id)
    {
        $userId = session('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Not logged in'], 401);
        }
        $cartItems = Cart::where('user_id', $userId)->with('product')->get();
        return response()->json(['cart' => $cartItems]);
    }
}

