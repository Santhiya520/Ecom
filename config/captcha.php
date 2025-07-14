<?php

return [
    'disable' => env('CAPTCHA_DISABLE', false),

    'characters' => ['2', '3', '4', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'm', 'n', 'p', 'q', 'r', 't', 'u', 'x', 'y', 'z'],

    'default' => [
        'length' => 9,
        'width' => 120,
        'height' => 36,
        'quality' => 90,
        'math' => false,
        'expire' => 60,
        'encrypt' => false,
    ],

    'math' => [
        'length' => 9,
        'width' => 120,
        'height' => 36,
        'quality' => 90,
        'math' => true,
    ],

    'flat' => [
    'length' => 5, // or 6
    'width' => 120,
    'height' => 36,
    'quality' => 90,
    'lines' => 3,
    'bgImage' => false,
    'bgColor' => '#ecf2f4',
    'fontColors' => ['#2c3e50'], // Use 1 color for readability
    'contrast' => 0,
    'characters' => ['2', '3', '4', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'm', 'n', 'p', 'q', 'r', 't', 'u', 'x', 'y', 'z'],
],


    'mini' => [
        'length' => 3,
        'width' => 60,
        'height' => 32,
    ],

    'inverse' => [
        'length' => 5,
        'width' => 120,
        'height' => 36,
        'quality' => 90,
        'sensitive' => true,
        'angle' => 12,
        'sharpen' => 10,
        'blur' => 2,
        'invert' => true,
        'contrast' => -5,
    ],

    // 👇 Add this for simple and clear CAPTCHA
    'simple' => [
        'length' => 6,
        'width' => 130,
        'height' => 40,
        'quality' => 90,
        'math' => false,
        'lines' => 0,
        'bgImage' => false,
        'bgColor' => '#f4f8ff',
        'fontColors' => ['#000000'],
        'contrast' => 0,
        'angle' => 0,
        'sharpen' => 0,
        'blur' => 0,
        'invert' => false,
    ]
];
