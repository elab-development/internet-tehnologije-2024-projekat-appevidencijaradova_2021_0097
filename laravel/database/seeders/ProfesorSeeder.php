<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProfesorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email'=>'profesor@gmail.com'],
            [
                'name'=>'Profesor',
                'password'=>Hash::make('password'),
                'role'=>'profesor'
            ]
        );
        User::firstOrCreate(
            ['email'=>'dusan@gmail.com'],
            [
                'name'=>'Dusan Stepancic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'uros@gmail.com'],
            [
                'name'=>'Uros Sumic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'rosko@gmail.com'],
            [
                'name'=>'Rosko Klikovac',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'nikola@gmail.com'],
            [
                'name'=>'Nikola Zoric',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'aleksandar@gmail.com'],
            [
                'name'=>'Aleksandar Uzelac',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'matija@gmail.com'],
            [
                'name'=>'Matija Zivanovic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'petar@gmail.com'],
            [
                'name'=>'Petar Lukic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'milenko@gmail.com'],
            [
                'name'=>'Milenko Kozic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'matijaz@gmail.com'],
            [
                'name'=>'Matija Zarubica',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'aleksa@gmail.com'],
            [
                'name'=>'Aleksa Milanovic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'pavle@gmail.com'],
            [
                'name'=>'Pavle Martic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'jovan@gmail.com'],
            [
                'name'=>'Jovan Jovanovic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'ivan@gmail.com'],
            [
                'name'=>'Ivan Ivanovic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'tamara@gmail.com'],
            [
                'name'=>'Tamara Naumovic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'petarl@gmail.com'],
            [
                'name'=>'Petar Lukovac',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'filip@gmail.com'],
            [
                'name'=>'Filip Filipovic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );

        User::firstOrCreate(
            ['email'=>'marko@gmail.com'],
            [
                'name'=>'Marko Markovic',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test1@gmail.com'],
            [
                'name'=>'TestUser',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test2@gmail.com'],
            [
                'name'=>'TestUser2',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test3@gmail.com'],
            [
                'name'=>'TestUser3',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test4@gmail.com'],
            [
                'name'=>'Test User 4',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test5@gmail.com'],
            [
                'name'=>'Test User 5',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test6@gmail.com'],
            [
                'name'=>'Test User 6',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test7@gmail.com'],
            [
                'name'=>'Test User 7',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test8@gmail.com'],
            [
                'name'=>'Test User 8',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
            ['email'=>'test9@gmail.com'],
            [
                'name'=>'Test User 9',
                'password'=>Hash::make('password'),
                'role'=>'student'
            ]
        );
        User::firstOrCreate(
    ['email'=>'test10@gmail.com'],
    [
        'name'=>'Test User 10',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test11@gmail.com'],
    [
        'name'=>'Test User 11',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test12@gmail.com'],
    [
        'name'=>'Test User 12',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test13@gmail.com'],
    [
        'name'=>'Test User 13',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test14@gmail.com'],
    [
        'name'=>'Test User 14',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test15@gmail.com'],
    [
        'name'=>'Test User 15',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test16@gmail.com'],
    [
        'name'=>'Test User 16',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test17@gmail.com'],
    [
        'name'=>'Test User 17',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test18@gmail.com'],
    [
        'name'=>'Test User 18',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test19@gmail.com'],
    [
        'name'=>'Test User 19',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test20@gmail.com'],
    [
        'name'=>'Test User 20',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test21@gmail.com'],
    [
        'name'=>'Test User 21',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test22@gmail.com'],
    [
        'name'=>'Test User 22',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test23@gmail.com'],
    [
        'name'=>'Test User 23',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test24@gmail.com'],
    [
        'name'=>'Test User 24',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test25@gmail.com'],
    [
        'name'=>'Test User 25',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test26@gmail.com'],
    [
        'name'=>'Test User 26',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test27@gmail.com'],
    [
        'name'=>'Test User 27',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test28@gmail.com'],
    [
        'name'=>'Test User 28',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test29@gmail.com'],
    [
        'name'=>'Test User 29',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test30@gmail.com'],
    [
        'name'=>'Test User 30',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test31@gmail.com'],
    [
        'name'=>'Test User 31',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test32@gmail.com'],
    [
        'name'=>'Test User 32',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test33@gmail.com'],
    [
        'name'=>'Test User 33',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

User::firstOrCreate(
    ['email'=>'test34@gmail.com'],
    [
        'name'=>'Test User 34',
        'password'=>Hash::make('password'),
        'role'=>'student'
    ]
);

        

        

    }
}
