<?php

namespace App\Managers;

use App\Services\ProfileService;
use App\Data\ProfileData;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class ProfileManager
{
    public function __construct(
        private ProfileService $profileService
    ) {}

    public function createUserProfile(ProfileData $profileData): User
    {
        $this->validateProfileCreation($profileData);

        $userData = [
            'name' => $profileData->name,
            'email' => $profileData->email,
            'password' => Hash::make($profileData->password),
        ];

        return $this->profileService->createUserWithProfile(
            $userData,
            $profileData->profileVideo,
            $profileData->profilePhotos
        );
    }

    private function validateProfileCreation(ProfileData $profileData): void
    {
        if ($profileData->password !== $profileData->password_confirmation) {
            throw ValidationException::withMessages([
                'password_confirmation' => ['The password confirmation does not match.']
            ]);
        }

        if (User::where('email', $profileData->email)->exists()) {
            throw ValidationException::withMessages([
                'email' => ['The email has already been taken.']
            ]);
        }

        $this->validateVideoFile($profileData->profileVideo);
        $this->validatePhotoFiles($profileData->profilePhotos);
    }

    private function validateVideoFile($video): void
    {
        if (!$video || !$video->isValid()) {
            throw ValidationException::withMessages([
                'profile_video' => ['A valid video file is required.']
            ]);
        }

        $allowedVideoTypes = ['mp4', 'mov', 'avi', 'wmv'];
        $videoExtension = $video->getClientOriginalExtension();

        if (!in_array(strtolower($videoExtension), $allowedVideoTypes)) {
            throw ValidationException::withMessages([
                'profile_video' => ['The video must be of type: ' . implode(', ', $allowedVideoTypes)]
            ]);
        }

        $maxVideoSize = 50 * 1024 * 1024; // 50MB
        if ($video->getSize() > $maxVideoSize) {
            throw ValidationException::withMessages([
                'profile_video' => ['The video file size cannot exceed 50MB.']
            ]);
        }
    }

    private function validatePhotoFiles(array $photos): void
    {
        if (count($photos) !== 4) {
            throw ValidationException::withMessages([
                'profile_photos' => ['Exactly 4 photos are required.']
            ]);
        }

        foreach ($photos as $index => $photo) {
            if (!$photo || !$photo->isValid()) {
                throw ValidationException::withMessages([
                    "profile_photos.{$index}" => ['Each photo file must be valid.']
                ]);
            }

            $allowedImageTypes = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
            $imageExtension = $photo->getClientOriginalExtension();

            if (!in_array(strtolower($imageExtension), $allowedImageTypes)) {
                throw ValidationException::withMessages([
                    "profile_photos.{$index}" => ['Each photo must be of type: ' . implode(', ', $allowedImageTypes)]
                ]);
            }

            $maxImageSize = 5 * 1024 * 1024; // 5MB
            if ($photo->getSize() > $maxImageSize) {
                throw ValidationException::withMessages([
                    "profile_photos.{$index}" => ['Each photo file size cannot exceed 5MB.']
                ]);
            }
        }
    }
} 