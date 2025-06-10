import io.github.cdimascio.dotenv.dotenv

val dotenv = dotenv {
    directory = rootProject.projectDir.absolutePath
    ignoreIfMissing = true
}

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.kapt)
    alias(libs.plugins.ksp)
    alias(libs.plugins.hilt)
}

android {
    namespace = "com.example.storyapp"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.storyapp"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

//    buildTypes {
//        release {
//            isMinifyEnabled = false
//            proguardFiles(
//                getDefaultProguardFile("proguard-android-optimize.txt"),
//                "proguard-rules.pro"
//            )
//        }
//    }
//    buildTypes {
//        debug {
//            buildConfigField("String", "API_URL", "\"${dotenv["API_URL_DEBUG"] ?: "http://192.168.245.68/"}\"")
//        }
//        release {
//            buildConfigField("String", "API_URL", "\"${dotenv["API_URL_RELEASE"] ?: "http://192.168.245.68/"}\"")
//            // Konfigurasi release lainnya
//            isMinifyEnabled = true
//            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
//        }
//    }

    buildTypes {
        debug {
            val apiUrl = dotenv["API_URL_DEBUG"] ?: "http://192.168.245.68:3000/"
            buildConfigField("String", "API_URL", "\"$apiUrl\"")

            val apiKey = dotenv["API_KEY"] ?: "Bearer lol123"
            buildConfigField("String", "API_KEY", "\"$apiKey\"")
        }
        release {
            val apiUrl = dotenv["API_URL_RELEASE"] ?: "http://192.168.245.68:3000/"
            buildConfigField("String", "API_URL", "\"$apiUrl\"")

            val apiKey = dotenv["API_KEY"] ?: "Bearer lol123"
            buildConfigField("String", "API_KEY", "\"$apiKey\"")

            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }


    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)

    // Jetpack Compose - untuk membuat UI

    implementation(libs.androidx.activity.compose.v182)      // Activity Compose
    implementation(libs.ui)                 // Compose UI
    implementation(libs.ui.graphics)        // Graphics
    implementation(libs.material3)   // Material Design 3

// Navigation - untuk perpindahan antar halaman
    implementation(libs.androidx.navigation.compose)

// ViewModel - untuk state management
    implementation(libs.androidx.lifecycle.viewmodel.compose)

// Room - untuk database lokal
    implementation(libs.androidx.room.runtime)
    ksp(libs.androidx.room.compiler)
    implementation(libs.androidx.room.ktx)

// Retrofit - untuk network calls
    implementation(libs.retrofit)        // Library utama
    implementation(libs.converter.gson)  // Konverter JSON
    implementation(libs.logging.interceptor) // Logging

// DataStore - untuk penyimpanan kecil seperti token
    implementation(libs.androidx.datastore.preferences)

// WorkManager - untuk background tasks
    implementation(libs.androidx.work.runtime.ktx)

// Hilt - untuk dependency injection
    implementation(libs.hilt.android)
    kapt(libs.hilt.android.compiler)
    implementation(libs.androidx.hilt.navigation.compose)


}