package com.example.storyapp.data.repository

import com.example.storyapp.data.helper.Result
import com.example.storyapp.data.local.dao.UserDao
import com.example.storyapp.data.local.entity.UserEntity
import com.example.storyapp.data.remote.ApiService
import com.example.storyapp.data.remote.model.LoginRequest
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor(
    private val apiService: ApiService,
    private val userDao: UserDao
) {
    suspend fun login(email: String, password: String): Flow<Result<UserEntity>> = flow {
        emit(Result.Loading)
        try {
            val response = apiService.login(LoginRequest(email, password))

            if (response.status != 200) {
                emit(Result.Error(response.message))
            } else {
                val user = UserEntity(
                    userId = response.data.id,
                    name = response.data.name,
                    token = response.data.token
                )
                userDao.insertUser(user)
                emit(Result.Success(user))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message ?: "Terjadi kesalahan"))
        }
    }
}
