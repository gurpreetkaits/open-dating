<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function createUserWithProfile(array $userData, UploadedFile $video, array $photos): User
    {
        $videoPath = $this->storeVideo($video);
        $photoPaths = $this->storePhotos($photos);

        return User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => $userData['password'],
            'profile_video_url' => $videoPath,
            'profile_photos' => $photoPaths,
        ]);
    }

    public function updateUserProfile(User $user, UploadedFile $video = null, array $photos = []): User
    {
        $updateData = [];

        if ($video) {
            if ($user->profile_video_url) {
                Storage::disk('public')->delete($user->profile_video_url);
            }
            $updateData['profile_video_url'] = $this->storeVideo($video);
        }

        if (!empty($photos)) {
            if ($user->profile_photos) {
                foreach ($user->profile_photos as $photoPath) {
                    Storage::disk('public')->delete($photoPath);
                }
            }
            $updateData['profile_photos'] = $this->storePhotos($photos);
        }

        if (!empty($updateData)) {
            $user->update($updateData);
        }

        return $user->refresh();
    }

    private function storeVideo(UploadedFile $video): string
    {
        return $video->store('profile-videos', 'public');
    }

    private function storePhotos(array $photos): array
    {
        $photoPaths = [];
        foreach ($photos as $photo) {
            if ($photo instanceof UploadedFile) {
                $photoPaths[] = $photo->store('profile-photos', 'public');
            }
        }
        return $photoPaths;
    }
} 