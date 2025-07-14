<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Section;

class SectionController extends Controller
{
    public function index()
    {
        $industries = Section::all();
        return response(['data' => $industries], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = $request->only(['title', 'body']);
        Section::create($data);

        return response(['message' => 'section created successfully'], 200);
    }

    public function edit(Section $section)
    {
        return response(['data' => $section], 200);
    }

    public function update(Request $request, Section $section)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = $request->only(['title', 'body']);

        $section->update($data);

        return response(['message' => 'section updated successfully'], 200);
    }

    public function destroy(Section $section)
    {
        $section->delete();

        return response(['message' => 'section deleted successfully'], 200);
    }
}
