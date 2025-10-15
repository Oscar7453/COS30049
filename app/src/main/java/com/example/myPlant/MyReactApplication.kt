package com.example.myPlant

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.defaults.DefaultReactNativeHost.getDefaultReactPackages

class MyReactApplication : Application(), ReactApplication {

    private val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override fun getPackages(): List<ReactPackage> = getDefaultReactPackages(this)

        override fun getJSMainModuleName(): String = "index"

        override fun isHermesEnabled(): Boolean = true
    }

    private val reactHost: ReactHost by lazy {
        DefaultReactHost(application = this, reactNativeHost = reactNativeHost)
    }

    override fun getReactNativeHost(): ReactNativeHost = reactNativeHost

    override fun getReactHost(): ReactHost = reactHost
}


