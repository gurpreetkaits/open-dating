<?php

namespace App\Http\Controllers;

use App\Managers\ProfileManager;
use App\Data\ProfileData;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    public function __construct(
        private ProfileManager $profileManager
    ) {}

    public function register(Request $request): JsonResponse
    {
        try {
            $profileData = ProfileData::from([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => $request->input('password'),
                'password_confirmation' => $request->input('password_confirmation'),
                'profileVideo' => $request->file('profile_video'),
                'profilePhotos' => $request->file('profile_photos', []),
            ]);

            $user = $this->profileManager->createUserProfile($profileData);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Profile created successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile_video_url' => $user->profile_video_url ? asset('storage/' . $user->profile_video_url) : null,
                    'profile_photos' => $user->profile_photos ? array_map(fn($photo) => asset('storage/' . $photo), $user->profile_photos) : [],
                ],
                'token' => $token,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
