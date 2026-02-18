<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#5270FF] to-[#7B8FFF] flex items-center justify-center p-6"
    dir="rtl"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 my-8">
      <div class="text-center mb-8">
        <NuxtLink to="/">
          <img
            :src="logoIcon"
            alt="Logo"
            class="h-12 mx-auto mb-6 cursor-pointer"
          />
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          إنشاء حساب جديد
        </h1>
        <p class="text-gray-600">
          انضم إلى شبكة شركائنا
        </p>
      </div>

      <form class="space-y-8" @submit.prevent="onSubmit">
        <!-- Section 1: Company info -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="ri-building-line text-[#5270FF]" />
            <span>معلومات الشركة</span>
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                اسم الشركة <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i class="ri-building-line text-xl text-gray-400" />
                </div>
                <input
                  v-model="formData.companyName"
                  type="text"
                  required
                  class="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-sm"
                  placeholder="اسم الشركة"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                نوع الشركة <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.companyType"
                  required
                  class="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent appearance-none text-sm cursor-pointer"
                >
                  <option value="">
                    اختر نوع الشركة
                  </option>
                  <option value="Bank">
                    بنك
                  </option>
                  <option value="Wallet">
                    محفظة إلكترونية
                  </option>
                  <option value="Marketplace">
                    متجر إلكتروني
                  </option>
                  <option value="Reseller">
                    موزع
                  </option>
                  <option value="Telecom">
                    شركة اتصالات
                  </option>
                  <option value="FinTech">
                    شركة تقنية مالية
                  </option>
                  <option value="Other">
                    أخرى
                  </option>
                </select>
                <i class="ri-arrow-down-s-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                رقم السجل التجاري <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i class="ri-file-text-line text-xl text-gray-400" />
                </div>
                <input
                  v-model="formData.commercialRegister"
                  type="text"
                  required
                  class="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-sm"
                  placeholder="1010000000"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Documents -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="ri-folder-upload-line text-[#5270FF]" />
            <span>المستندات المطلوبة</span>
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                صورة السجل التجاري <span class="text-[#FF5757]">*</span>
              </label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#5270FF] transition-colors">
                <input
                  type="file"
                  id="commercialRegisterDoc"
                  accept=".pdf,.jpg,.jpeg,.png"
                  class="hidden"
                  @change="handleFileUpload('commercialRegisterDoc', ($event.target as HTMLInputElement).files?.[0] ?? null)"
                >
                <label for="commercialRegisterDoc" class="cursor-pointer block text-center">
                  <template v-if="uploadedFiles.commercialRegisterDoc">
                    <div class="flex items-center justify-center gap-3">
                      <i class="ri-file-check-line text-3xl text-green-500" />
                      <div class="text-right">
                        <p class="text-sm font-semibold text-gray-900">
                          {{ uploadedFiles.commercialRegisterDoc.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ (uploadedFiles.commercialRegisterDoc.size / 1024).toFixed(2) }} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
                        @click.prevent="handleFileUpload('commercialRegisterDoc', null)"
                      >
                        <i class="ri-close-line text-xl text-gray-600" />
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <i class="ri-upload-cloud-line text-4xl text-gray-400 mb-2" />
                    <p class="text-sm text-gray-600">
                      اسحب الملف هنا أو انقر للتحميل
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                      PDF, JPG, PNG (الحد الأقصى 5MB)
                    </p>
                  </template>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                شهادة الضريبة <span class="text-gray-500">(اختياري)</span>
              </label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#5270FF] transition-colors">
                <input
                  type="file"
                  id="taxCertificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  class="hidden"
                  @change="handleFileUpload('taxCertificate', ($event.target as HTMLInputElement).files?.[0] ?? null)"
                >
                <label for="taxCertificate" class="cursor-pointer block text-center">
                  <template v-if="uploadedFiles.taxCertificate">
                    <div class="flex items-center justify-center gap-3">
                      <i class="ri-file-check-line text-3xl text-green-500" />
                      <div class="text-right">
                        <p class="text-sm font-semibold text-gray-900">
                          {{ uploadedFiles.taxCertificate.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ (uploadedFiles.taxCertificate.size / 1024).toFixed(2) }} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
                        @click.prevent="handleFileUpload('taxCertificate', null)"
                      >
                        <i class="ri-close-line text-xl text-gray-600" />
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <i class="ri-upload-cloud-line text-4xl text-gray-400 mb-2" />
                    <p class="text-sm text-gray-600">
                      اسحب الملف هنا أو انقر للتحميل
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                      PDF, JPG, PNG (الحد الأقصى 5MB)
                    </p>
                  </template>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                خطاب التفويض <span class="text-gray-500">(اختياري)</span>
              </label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#5270FF] transition-colors">
                <input
                  type="file"
                  id="authorizationLetter"
                  accept=".pdf,.jpg,.jpeg,.png"
                  class="hidden"
                  @change="handleFileUpload('authorizationLetter', ($event.target as HTMLInputElement).files?.[0] ?? null)"
                >
                <label for="authorizationLetter" class="cursor-pointer block text-center">
                  <template v-if="uploadedFiles.authorizationLetter">
                    <div class="flex items-center justify-center gap-3">
                      <i class="ri-file-check-line text-3xl text-green-500" />
                      <div class="text-right">
                        <p class="text-sm font-semibold text-gray-900">
                          {{ uploadedFiles.authorizationLetter.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ (uploadedFiles.authorizationLetter.size / 1024).toFixed(2) }} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
                        @click.prevent="handleFileUpload('authorizationLetter', null)"
                      >
                        <i class="ri-close-line text-xl text-gray-600" />
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <i class="ri-upload-cloud-line text-4xl text-gray-400 mb-2" />
                    <p class="text-sm text-gray-600">
                      اسحب الملف هنا أو انقر للتحميل
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                      PDF, JPG, PNG (الحد الأقصى 5MB)
                    </p>
                  </template>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Admin details -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="ri-user-line text-[#5270FF]" />
            <span>بيانات المسؤول</span>
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                الاسم الكامل <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i class="ri-user-line text-xl text-gray-400" />
                </div>
                <input
                  v-model="formData.fullName"
                  type="text"
                  required
                  class="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-sm"
                  placeholder="الاسم الكامل"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                البريد الإلكتروني <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i class="ri-mail-line text-xl text-gray-400" />
                </div>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-sm"
                  placeholder="example@email.com"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                رقم الجوال <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i class="ri-phone-line text-xl text-gray-400" />
                </div>
                <input
                  v-model="formData.phone"
                  type="tel"
                  required
                  class="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-sm"
                  placeholder="05xxxxxxxx"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                كلمة المرور <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i class="ri-lock-line text-xl text-gray-400" />
                </div>
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-sm"
                  placeholder="••••••••"
                >
                <button
                  type="button"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'ri-eye-line' : 'ri-eye-off-line'" class="text-xl text-gray-400" />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                تأكيد كلمة المرور <span class="text-[#FF5757]">*</span>
              </label>
              <div class="relative">
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i class="ri-lock-line text-xl text-gray-400" />
                </div>
                <input
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-sm"
                  placeholder="••••••••"
                >
                <button
                  type="button"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <i :class="showConfirmPassword ? 'ri-eye-line' : 'ri-eye-off-line'" class="text-xl text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Password requirements -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 flex items-center justify-center mt-0.5">
              <i class="ri-information-line text-xl text-blue-600" />
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900 mb-1">
                متطلبات كلمة المرور:
              </p>
              <ul class="text-xs text-gray-600 space-y-1">
                <li>• لا تقل عن 8 أحرف</li>
                <li>• تحتوي على حرف كبير وحرف صغير</li>
                <li>• تحتوي على رقم واحد على الأقل</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Terms -->
        <div>
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="acceptTerms"
              type="checkbox"
              class="w-4 h-4 mt-1 text-[#5270FF] border-gray-300 rounded focus:ring-[#5270FF] cursor-pointer"
            >
            <span class="text-sm text-gray-700">
              أوافق على
              <NuxtLink to="/terms" class="text-[#5270FF] font-semibold hover:underline">
                الشروط والأحكام
              </NuxtLink>
              و
              <NuxtLink to="/privacy" class="text-[#5270FF] font-semibold hover:underline">
                سياسة الخصوصية
              </NuxtLink>
            </span>
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-[#5270FF] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#4160EE] transition-colors whitespace-nowrap cursor-pointer"
        >
          إنشاء الحساب
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          لديك حساب بالفعل؟
          <NuxtLink to="/login" class="text-[#5270FF] font-semibold hover:underline cursor-pointer">
            تسجيل الدخول
          </NuxtLink>
        </p>
      </div>

      <div class="mt-8 pt-6 border-t">
        <NuxtLink
          to="/"
          class="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <i class="ri-arrow-right-line text-lg" />
          <span>العودة للصفحة الرئيسية</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoIcon from '~/assets/images/logo.png'

const formData = reactive({
  companyName: '',
  companyType: '',
  commercialRegister: '',
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const acceptTerms = ref(false)

const uploadedFiles = reactive<Record<string, File | null>>({
  commercialRegisterDoc: null,
  taxCertificate: null,
  authorizationLetter: null,
})

function handleFileUpload(key: string, file: File | null) {
  uploadedFiles[key] = file
}

function onSubmit() {
  if (formData.password !== formData.confirmPassword) {
    alert('كلمة المرور غير متطابقة')
    return
  }
  if (!acceptTerms.value) {
    alert('يجب الموافقة على الشروط والأحكام')
    return
  }
  if (!uploadedFiles.commercialRegisterDoc) {
    alert('يرجى رفع صورة السجل التجاري')
    return
  }
  navigateTo('/login')
}
</script>
