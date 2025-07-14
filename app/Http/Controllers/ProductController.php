<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Product::all()], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'price'      => 'required|numeric',
            'categories' => 'required|string',
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->only(['name', 'price', 'categories']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'product-' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('images/products');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $data['image'] = 'images/products/' . $filename;
        }

        $product = Product::create($data);

        return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json(['data' => $product], 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name'       => 'sometimes|string|max:255',
            'price'      => 'sometimes|numeric',
            'categories' => 'sometimes|string|max:255',
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->only(['name', 'price', 'categories']);

        if ($request->hasFile('image')) {
            if ($product->image && file_exists(public_path($product->getRawOriginal('image')))) {
                unlink(public_path($product->getRawOriginal('image')));
            }

            $file = $request->file('image');
            $filename = 'product-' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('images/products');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $data['image'] = 'images/products/' . $filename;
        }

        $product->update($data);

        return response()->json(['message' => 'Product updated successfully', 'data' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image && file_exists(public_path($product->getRawOriginal('image')))) {
            unlink(public_path($product->getRawOriginal('image')));
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function getByCategory($category)
    {
        $products = Product::where('categories', $category)->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found in this category.'], 404);
        }

        return response()->json(['data' => $products], 200);
    }
}
