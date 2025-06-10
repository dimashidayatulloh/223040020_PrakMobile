package com.example.storyapp.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.storyapp.data.helper.Result
import com.example.storyapp.data.local.entity.UserEntity
import com.example.storyapp.data.repository.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel(){

    private val _loginState = MutableStateFlow<Result<UserEntity>?>(null)
    val loginState: StateFlow<Result<UserEntity>?> = _loginState

    fun login(email: String, password: String){
        viewModelScope.launch {
            authRepository.login(email, password).collect{ result ->
                _loginState.value = result
            }
        }
    }
}