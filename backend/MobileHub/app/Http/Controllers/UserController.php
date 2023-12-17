<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\RoleUser;

class UserController extends Controller{

    // Return all client users
    public function index() {

        // Verify if users exists
        if (!$users) {
            return response()->json([
                'message' => 'Users not exists',
            ], 409);
        }

        return $users;
    }

    // Create user
    public function store(Request $request) {

        // Create user
        User::create([
            'full_name' => $request['full_name'],
            'email' => $request['email'],
            'birthyear' => $request['birthyear'],
            'rut' => $request['rut'],
            'password' => bcrypt($request['password']),
        ]);

        return response()->json([
            'message' => 'User created successfully',
        ]);

    }

    // Update user by identification
    public function update(Request $request, $rut) {

        // Find user by identification
        $user = User::where('rut', $rut)->first();

        // Verify if user exists
        if (!$user) {
            return response()->json([
                'message' => 'User not exists',
            ], 409);
        }

        $user->update($request->all());

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
            $request->all()
        ]);

    }

    // Delete user by identification
    public function destroy($rut) {

        // Find user by identification
        $user = User::where('rut', $rut)->first();

        // Verify if user exists
        if (!$user) {
            return response()->json([
                'message' => 'User not exists',
            ], 409);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);

    }

}
