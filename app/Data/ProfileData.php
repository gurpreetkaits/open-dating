<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Array as ArrayValidation;
use Spatie\LaravelData\Attributes\Validation\Size;
use Spatie\LaravelData\Attributes\Validation\File;
use Spatie\LaravelData\Attributes\Validation\Mimes;

class ProfileData extends Data
{
    public function __construct(
        #[Required]
        public string $name,
        
        #[Required]
        public string $email,
        
        #[Required]
        public string $password,
        
        #[Required]
        public string $password_confirmation,
        
        #[Required]
        #[File]
        #[Mimes(['mp4', 'mov', 'avi', 'wmv'])]
        public $profileVideo,
        
        #[Required]
        #[ArrayValidation]
        #[Size(min: 4, max: 4)]
        public array $profilePhotos,
    ) {}
} 