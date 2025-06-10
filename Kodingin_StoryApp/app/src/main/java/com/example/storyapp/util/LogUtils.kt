package com.example.storyapp.util

import android.content.Context
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

object LogUtils {
    fun writeLogToFile(context: Context, tag: String, message: String) {
        val logDir = File(context.filesDir, "logs")
        if (!logDir.exists()) logDir.mkdirs()

        val logFile = File(logDir, "auth_log.txt")
        val timestamp = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(Date())
        logFile.appendText("[$timestamp][$tag] $message\n")
    }
}
