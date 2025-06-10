package com.example.storyapp.data.remote.model

//data class LoginResponse(
//    val error: Boolean,
//    val message: String,
//    val loginResult: LoginResult
//)
//
//data class LoginResult(
//    val userId: String,
//    val name: String,
//    val token: String
//)

data class LoginResponse(
    val status: Int,
    val message: String,
    val data: LoginResult
)

data class LoginResult(
    val id: String,
    val name: String,
    val token: String
)
