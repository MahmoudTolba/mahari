<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
      dir="rtl"
      @click.self="handleCancel"
    >
      <div
        class="bg-white rounded-2xl sm:rounded-xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-4 sm:p-6"
        @click.stop
      >
        <div class="flex-1 overflow-y-auto">
          <!-- Padlock icon -->
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-blue-500 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <!-- Title -->
          <h2 class="text-lg sm:text-xl font-bold text-gray-900 text-center mb-1.5">
            التحقق الأمني
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 text-center mb-1">
            تم إرسال رمز التحقق إلى بريدك الإلكتروني
          </p>
          <p class="text-sm sm:text-base text-gray-900 font-medium text-center mb-4 sm:mb-6">
            أدخل رمز التحقق المكون من 6 أرقام
          </p>

          <!-- OTP inputs - LTR for left-to-right focus -->
          <div class="flex justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-6" dir="ltr">
            <input
              v-for="(_, i) in 6"
              :key="i"
              :ref="(el) => setOtpRef(el, i)"
              type="text"
              inputmode="numeric"
              maxlength="1"
              :value="otpDigits[i]"
              class="w-10 h-11 sm:w-12 sm:h-14 border border-gray-300 rounded-lg text-center text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="onOtpInput($event, i)"
              @keydown="onOtpKeydown($event, i)"
              @paste="onOtpPaste($event, i)"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          <button
            type="button"
            class="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
            @click="handleVerify"
          >
            تحقق
          </button>
          <button
            type="button"
            class="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
            @click="handleCancel"
          >
            إلغاء
          </button>
         
        </div>

        <!-- Resend link -->
        <button
          type="button"
          class="w-full text-center text-blue-500 hover:underline text-xs sm:text-sm font-medium cursor-pointer"
          @click="handleResend"
        >
          إعادة إرسال الرمز
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "verify", code: string): void;
  (e: "cancel"): void;
  (e: "resend"): void;
}>();

const otpDigits = ref<string[]>(Array(6).fill(""));
const otpRefs = ref<(HTMLInputElement | null)[]>([]);

const setOtpRef = (el: unknown, i: number) => {
  if (el) otpRefs.value[i] = el as HTMLInputElement;
};

const focusInput = (index: number) => {
  nextTick(() => {
    const el = otpRefs.value[index];
    if (el) el.focus();
  });
};

const onOtpPaste = (event: ClipboardEvent, index: number) => {
  event.preventDefault();
  const pasted = (event.clipboardData?.getData("text") || "").replace(/\D/g, "").slice(0, 6);
  const digits = pasted.split("");
  digits.forEach((d, i) => {
    if (index + i < 6) otpDigits.value[index + i] = d;
  });
  focusInput(Math.min(index + digits.length, 5));
};

const onOtpInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // Single character - digits only
  const digit = value.replace(/\D/g, "").slice(-1);
  otpDigits.value[index] = digit;
  if (digit && index < 5) focusInput(index + 1);
};

const onOtpKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
    event.preventDefault();
    focusInput(index - 1);
    otpDigits.value[index - 1] = "";
  }
  // Block non-digit keys (allow Backspace, Tab, Arrow keys, Delete, Ctrl/Cmd+V)
  if (
    !/^\d$/.test(event.key) &&
    !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(event.key) &&
    !(event.ctrlKey || event.metaKey)
  ) {
    event.preventDefault();
  }
};

const resetOtp = () => {
  otpDigits.value = Array(6).fill("");
};

const handleVerify = () => {
  const code = otpDigits.value.join("");
  emit("verify", code);
  emit("update:modelValue", false);
  resetOtp();
};

const handleCancel = () => {
  emit("cancel");
  emit("update:modelValue", false);
  resetOtp();
};

const handleResend = () => {
  emit("resend");
  resetOtp();
  focusInput(0);
};

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      resetOtp();
      focusInput(0);
    }
  }
);
</script>
