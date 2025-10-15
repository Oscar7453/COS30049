package com.example.myPlant

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val auth = FirebaseAuth.getInstance()
        val currentUser = auth.currentUser
        
        // Launch React Native screens instead of Android screens
        if (currentUser == null) {
            // User not logged in, launch React Native Login screen
            startActivity(Intent(this, ReactHostActivity::class.java))
        } else {
            // User logged in, launch React Native Home screen
            startActivity(Intent(this, ReactHostActivity::class.java))
        }
        finish() // prevent user going back here
    }
}