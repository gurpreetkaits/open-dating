<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $profiles = [
            [
                'name' => 'Emma Watson',
                'email' => 'emma@example.com',
                'password' => Hash::make('password123'),
                'profile_video_url' => 'sample-media/videos/video1.mp4',
                'profile_photos' => [
                    'sample-media/photos/photo1.jpg',
                    'sample-media/photos/photo2.jpg',
                    'sample-media/photos/photo3.jpg',
                    'sample-media/photos/photo4.jpg'
                ]
            ],
            [
                'name' => 'Michael Chen',
                'email' => 'michael@example.com',
                'password' => Hash::make('password123'),
                'profile_video_url' => 'sample-media/videos/video2.mp4',
                'profile_photos' => [
                    'sample-media/photos/photo5.jpg',
                    'sample-media/photos/photo6.jpg',
                    'sample-media/photos/photo7.jpg',
                    'sample-media/photos/photo8.jpg'
                ]
            ],
            [
                'name' => 'Sofia Rodriguez',
                'email' => 'sofia@example.com',
                'password' => Hash::make('password123'),
                'profile_video_url' => 'sample-media/videos/video3.mp4',
                'profile_photos' => [
                    'sample-media/photos/photo9.jpg',
                    'sample-media/photos/photo10.jpg',
                    'sample-media/photos/photo11.jpg',
                    'sample-media/photos/photo12.jpg'
                ]
            ],
            [
                'name' => 'James Thompson',
                'email' => 'james@example.com',
                'password' => Hash::make('password123'),
                'profile_video_url' => 'sample-media/videos/video4.mp4',
                'profile_photos' => [
                    'sample-media/photos/photo1.jpg',
                    'sample-media/photos/photo5.jpg',
                    'sample-media/photos/photo9.jpg',
                    'sample-media/photos/photo3.jpg'
                ]
            ]
        ];

        foreach ($profiles as $profileData) {
            $existingUser = User::where('email', $profileData['email'])->first();
            
            if (!$existingUser) {
                $user = User::create($profileData);
                $this->command->info("Created profile for: {$user->name}");
            } else {
                $this->command->info("Profile already exists for: {$profileData['name']}");
            }
        }

        $this->command->info('Sample profiles have been created successfully!');
        $this->command->info('You can now test the dating app with these profiles:');
        $this->command->info('- Email: emma@example.com | Password: password123');
        $this->command->info('- Email: michael@example.com | Password: password123');
        $this->command->info('- Email: sofia@example.com | Password: password123');
        $this->command->info('- Email: james@example.com | Password: password123');
    }
}
