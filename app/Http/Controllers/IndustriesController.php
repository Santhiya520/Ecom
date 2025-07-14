<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Industries;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class IndustriesController extends Controller
{
    public function index()
    {
        $industries = Industries::all();
        return response(['data' => $industries], 200);
    }



    public function store(Request $request)
    {
        $request->validate([
            'section_id'    => 'required|exists:section,id',
            'title'         => 'required|string|max:255',
            'subtitle'      => 'nullable|string',
            'description1'  => 'nullable|string',
            'description2'  => 'nullable|string',
            'description3'  => 'nullable|string',
            'list'          => 'nullable|string',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->only([
            'section_id',
            'title',
            'subtitle',
            'description1',
            'description2',
            'description3',
            'list'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            // Generate a unique name
            $filename = 'industries-' . Str::random(8) . '.' . $file->getClientOriginalExtension();

            // Set path: public/images/industries
            $destinationPath = public_path('images/industries');

            // Create directory if not exists
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            // Move file
            $file->move($destinationPath, $filename);

            // Save relative path to DB
            $data['image'] = 'images/industries/' . $filename;
        }

        Industries::create($data);

        return response(['message' => 'Industry created successfully'], 200);
    }


    public function edit(Industries $industry)
    {
        return response(['data' => $industry], 200);
    }



    public function update(Request $request, Industries $industry)
    {
        $request->validate([
            'section_id'    => 'required|exists:section,id',
            'title'         => 'required|string|max:255',
            'subtitle'      => 'nullable|string',
            'description1'  => 'nullable|string',
            'description2'  => 'nullable|string',
            'description3'  => 'nullable|string',
            'list'          => 'nullable|string',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = $request->only([
            'section_id',
            'title',
            'subtitle',
            'description1',
            'description2',
            'description3',
            'list'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($industry->image && file_exists(public_path($industry->image))) {
                unlink(public_path($industry->image));
            }

            $file = $request->file('image');
            $filename = 'cloud-abt-' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('images/industries');

            // Create folder if not exists
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            // Move new file
            $file->move($destinationPath, $filename);

            // Save relative path
            $data['image'] = 'images/industries/' . $filename;
        }

        $industry->update($data);

        return response(['message' => 'Industry updated successfully'], 200);
    }


    public function destroy(Industries $industry)
    {
        if ($industry->image && Storage::disk('public')->exists($industry->image)) {
            Storage::disk('public')->delete($industry->image);
        }

        $industry->delete();

        return response(['message' => 'Industry deleted successfully'], 200);
    }
}
