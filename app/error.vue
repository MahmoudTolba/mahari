<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#1D2448] via-[#2E3F8F] to-[#5270FF] flex items-center justify-center px-4"
  >
    <div class="relative w-full max-w-xl">
      <!-- Decorative glows -->
      <div
        class="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-20 -right-8 h-44 w-44 rounded-full bg-black/20 blur-3xl"
      ></div>

      <!-- Card -->
      <div
        class="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 md:px-10 md:py-12"
        dir="rtl"
      >
        <!-- Header / Status -->
        <div class="flex flex-col items-center gap-4 mb-8 text-center">
          <!-- Logo -->
          <div
            class="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center bg-indigo-50"
          >
            <img
              :src="logoIcon"
              alt="logo"
              class="w-full h-full object-contain"
            />
          </div>

          <div>
            <p
              class="text-xs font-semibold tracking-[0.25em] text-indigo-500 mb-2"
            >
              {{ isNotFound ? "صفحة غير موجودة" : "حدث خطأ غير متوقع" }}
            </p>

            <div class="flex items-baseline justify-center gap-2">
              <span
                class="text-5xl md:text-6xl font-black text-gray-900 leading-none"
              >
                {{ displayStatusCode }}
              </span>
              <span class="text-sm font-semibold text-gray-500 mt-3">
                {{ isNotFound ? "خطأ" : "Error" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Message -->
        <div class="mb-8 text-center space-y-3">
          <h1 class="text-xl md:text-2xl font-bold text-gray-900">
            {{
              isNotFound
                ? "عذراً، لم نستطع العثور على الصفحة المطلوبة"
                : "عذراً، حدث خطأ أثناء معالجة طلبك"
            }}
          </h1>
          <p class="text-sm md:text-base text-gray-500 leading-relaxed">
            {{ description }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col md:flex-row gap-3 mb-4">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold px-5 py-3 shadow-lg shadow-indigo-500/40 hover:bg-indigo-700 transition"
            @click="handleHome"
          >
            <span>العودة للرئيسية</span>
            <span class="text-base">↩</span>
          </button>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 px-5 py-3 hover:bg-gray-50 hover:border-gray-300 transition"
            @click="handleBack"
          >
            <span>الرجوع للصفحة السابقة</span>
          </button>
        </div>

        <p class="text-[11px] text-gray-400 text-center">
          إذا استمر ظهور هذه المشكلة، يرجى التواصل مع الدعم وذكر رمز الخطأ
          {{ displayStatusCode }}.
        </p>

        <!-- Dev-only technical details -->
        <div
          v-if="isDev"
          class="mt-6 border-t border-dashed border-gray-200 pt-4"
        >
          <button
            type="button"
            class="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2"
            @click="showDetails = !showDetails"
          >
            <span>
              {{
                showDetails
                  ? "إخفاء التفاصيل التقنية"
                  : "إظهار التفاصيل التقنية (للمطورين)"
              }}
            </span>
            <span class="text-[10px]">
              {{ showDetails ? "▲" : "▼" }}
            </span>
          </button>

          <pre
            v-if="showDetails"
            class="text-[11px] text-left whitespace-pre-wrap break-all bg-gray-900 text-gray-100 rounded-xl px-4 py-3 overflow-x-auto"
          >
{{ errorDebug }}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import logoIcon from "~/assets/images/logo.png";

const error = useError();
const router = useRouter();

const isNotFound = computed(() => error.value?.statusCode === 404);

const displayStatusCode = computed(
  () => error.value?.statusCode || (isNotFound.value ? 404 : 500),
);

const description = computed(() => {
  if (isNotFound.value) {
    return "الصفحة التي تحاول الوصول إليها غير متاحة حالياً. تأكد من صحة الرابط أو عد إلى الصفحة الرئيسية.";
  }

  return (
    error.value?.message ||
    "حدث خطأ غير متوقع. حاول مرة أخرى لاحقاً أو عد إلى الصفحة الرئيسية."
  );
});

const handleHome = () => {
  clearError({ redirect: "/" });
};

const handleBack = () => {
  clearError();
  router.back();
};

const isDev = import.meta.env.DEV;
const showDetails = ref(false);

const errorDebug = computed(() => {
  if (!error.value) return "";

  return JSON.stringify(
    {
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
      message: error.value.message,
      url: (error.value as any).url,
      stack: error.value.stack,
    },
    null,
    2,
  );
});
</script>

