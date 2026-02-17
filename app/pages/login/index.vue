<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#5270ff] px-4"
  >
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10 md:px-10 md:py-12"
      dir="rtl"
    >
      <!-- Logo -->
      <div class="flex flex-col items-center gap-3 mb-8">
        <div
          class="flex items-center justify-center w-14 h-14 rounded-2xl "
        >
        <img :src="logoIcon" alt="logo" class="w-full h-full">
          
        </div>
        <div class="text-center">
          <h1 class="text-[30px] font-bold text-[#111827] mb-1">
            تسجيل الدخول
          </h1>
          <p class="text-[16px] text-[#4B5563]">
            مرحباً بك في بوابة الشركاء
          </p>
        </div>
      </div>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="onSubmit">
        <!-- Email -->
        <div class="space-y-1.5 text-right">
          <label class="block text-sm font-medium text-gray-700 text-right">
            البريد الإلكتروني
          </label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              placeholder="example@email.com"
              class="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-12 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none text-right focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <span
              class="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none"
            >
              <img :src="emailIcon" alt="email" class="w-5 h-5" />
            </span>
          </div>
        </div>

        <!-- Password -->
        <div class="space-y-1.5 text-right">
          <label class="block text-sm font-medium text-gray-700 text-right">
            كلمة المرور
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-12 pl-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none text-right focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <!-- Lock icon on the right -->
            <span
              class="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none"
            >
              <img :src="lockIcon" alt="lock" class="w-5 h-5" />
            </span>
            <!-- Eye toggle icon on the left -->
            <button
              type="button"
              class="absolute inset-y-0 left-4 flex items-center text-gray-400 hover:text-gray-600"
              @click="showPassword = !showPassword"
              aria-label="إظهار/إخفاء كلمة المرور"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5 fill-current"
              >
                <path
                  d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-6a2 2 0 1 0 .001 4.001A2 2 0 0 0 12 10Z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5 fill-current"
              >
                <path
                  d="M12 5c-1.7 0-3.3.3-4.8 1L9 7.8A7.7 7.7 0 0 1 12 7c4.1 0 7.5 2.5 9 5-.5.9-1.2 1.7-2.1 2.4l1.4 1.4C21.6 14.7 23 13 24 12c-1.7-3.9-6-7-12-7-.7 0-1.3 0-2 .1L12 5Zm-10-.7L3.3 5 5 6.7C3 7.9 1.6 9.7 0 12c1.7 3.9 6 7 12 7 2 0 3.8-.3 5.5-1l1.5 1.5 1.3-1.3L3.3 3 2 4.3ZM7.1 8.8 8.6 10.3A4 4 0 0 0 12 15a4 4 0 0 0 1.5-.3l1.5 1.5A6 6 0 0 1 6 12c0-1.2.3-2.3.8-3.2Zm4.2-.8 4.7 4.7A4 4 0 0 0 11.3 8Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Links & remember me -->
        <div class="flex items-center justify-between text-xs mt-1">
         

          <label class="inline-flex items-center gap-2 text-gray-500 cursor-pointer">
            <input
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>تذكرني</span>
          </label>
          <button
            type="button"
            class="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        <!-- Submit -->
        <button
          @click="navigateTo('/')"
          class="mt-4 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-700 transition"
        >
          تسجيل الدخول
        </button>

        <!-- Footer -->
        <p class="mt-4 text-center text-xs text-gray-500">
          ليس لديك حساب؟
          <button
          @click="navigateTo('/register')"
            type="button"
            class="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer hover:underline"
          >
            إنشاء حساب
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import emailIcon from '~/assets/icons/mail-icon.svg'
import lockIcon from '~/assets/icons/lock-icon.svg'
import logoIcon from '~/assets/images/logo.png'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const onSubmit = () => {
  // TODO: استبدل هذا بالكود الخاص بإرسال بيانات تسجيل الدخول إلى الـ API
  console.log({
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  })
}
</script>
