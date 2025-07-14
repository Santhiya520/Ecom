<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();
        $totalOrders   = Order::count();
        $totalUsers    = User::count();
        $totalSales    = Order::sum('total_price');

        $today = Carbon::today();
        $todaysOrders = Order::whereDate('created_at', $today)->count();
        $todaysSales  = Order::whereDate('created_at', $today)->sum('total_price');

        // Assuming you differentiate buyer/seller using a 'role' column
        $totalBuyers = User::where('role', 'buyer')->count();
        $totalSellers = User::where('role', 'seller')->count();

        $latestOrders = Order::with('items.product')
            ->latest()
            ->take(5)
            ->get();

        $topProduct = OrderItem::select('product_id', DB::raw('SUM(quantity) as total_quantity'))
            ->groupBy('product_id')
            ->orderByDesc('total_quantity')
            ->with('product')
            ->first();


        return response()->json([
            'total_products'        => $totalProducts,
            'total_orders'          => $totalOrders,
            'total_users'           => $totalUsers,
            'total_sales'           => $totalSales,
            'todays_orders'         => $todaysOrders,
            'todays_sales'          => $todaysSales,
            'total_buyers'          => $totalBuyers,
            'total_sellers'         => $totalSellers,
            'top_selling_product'   => $topProduct ? [
                'product_id' => $topProduct->product_id,
                'name'       => $topProduct->product->name ?? null,
                'quantity'   => $topProduct->total_quantity,
            ] : null,
            'latest_orders' => $latestOrders
        ]);
    }
}
