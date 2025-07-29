<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    public function getProfiles(): JsonResponse
    {
        $users = User::whereNotNull('profile_video_url')
                    ->whereNotNull('profile_photos')
                    ->get()
                    ->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'profile_video_url' => $user->profile_video_url ? asset('storage/' . $user->profile_video_url) : null,
                            'profile_photos' => $user->profile_photos ? array_map(fn($photo) => asset('storage/' . $photo), $user->profile_photos) : [],
                            'created_at' => $user->created_at,
                        ];
                    });

        return response()->json([
            'message' => 'Profiles retrieved successfully',
            'profiles' => $users,
            'total' => $users->count()
        ]);
    }

    public function getProfile($id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Profile not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Profile retrieved successfully',
            'profile' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_video_url' => $user->profile_video_url ? asset('storage/' . $user->profile_video_url) : null,
                'profile_photos' => $user->profile_photos ? array_map(fn($photo) => asset('storage/' . $photo), $user->profile_photos) : [],
                'created_at' => $user->created_at,
            ]
        ]);
    }
}
