package com.example.storyapp.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.storyapp.data.local.dao.UserDao
import com.example.storyapp.data.local.entity.UserEntity

@Database(entities = [UserEntity:: class], version = 1, exportSchema = false)
abstract class StoryDatabase : RoomDatabase(){
    abstract fun userDao(): UserDao
}