<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-2 sm:p-4"
      @click.self="handleClose"
      
    >
      <div
        class="bg-white rounded-2xl sm:rounded-xl shadow-lg w-full max-w-lg sm:max-w-xl max-h-[90vh] flex flex-col overflow-hidden"
        dir="ltr"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-3 py-3 sm:p-4 border-b">
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"
              @click="handleClose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              class="flex items-center gap-1.5 px-2.5 py-1 border border-red-500 bg-red-400 rounded-lg text-white text-xs sm:text-sm font-medium"
            >
            <span>{{ formattedTime }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              
            </div>
          </div>
          <h2 class="text-base sm:text-lg font-bold text-gray-900">
            {{ orderId }}
            أكواد الطلب 
          </h2>
        </div>

        <!-- Warning banner -->
        <div class="mx-3 sm:mx-4 mt-3 sm:mt-4 flex items-start justify-end gap-2 p-2.5 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg text-right">
       
          <p class="text-xs sm:text-sm text-amber-800">
            سيتم إخفاء الأكواد تلقائياً بعد انتهاء الوقت. تأكد من حفظها في مكان آمن.          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <!-- Code list -->
        <div class="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-2">
          <div
            v-for="(code, index) in displayCodes"
            :key="index"
            class="flex items-center justify-between gap-3 p-3 bg-gray-100 rounded-lg"
          >
            <button
              type="button"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 cursor-pointer flex-shrink-0"
              title="نسخ"
              @click="copyCode(code)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <span class="flex-1 text-center font-mono text-xs sm:text-sm md:text-base text-gray-900">
              {{ code }}
            </span>
            <div
              class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs sm:text-sm font-semibold flex-shrink-0"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="p-4 border-t flex gap-3">
          <button
            type="button"
            class="flex-1 py-3 px-4 rounded-lg font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
            @click="handleClose"
          >
            إغلاق
          </button>
          <button
            type="button"
            class="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
            @click="handleDownload"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            تحميل الأكواد
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  orderId: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const DURATION_SECONDS = 5 * 60; // 5 minutes
const remainingSeconds = ref(DURATION_SECONDS);
let timer: ReturnType<typeof setInterval> | null = null;

const formattedTime = computed(() => {
  const m = Math.floor(remainingSeconds.value / 60);
  const s = remainingSeconds.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});

// Mock codes - format XXXX-XXXX-YYYY (last 4 digits visible)
const displayCodes = ref<string[]>([
  "XXXX-XXXX-1234",
  "XXXX-XXXX-5678",
  "XXXX-XXXX-9012",
  "XXXX-XXXX-3456",
  "XXXX-XXXX-7890",
]);

const resetTimer = () => {
  remainingSeconds.value = DURATION_SECONDS;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    remainingSeconds.value--;
    if (remainingSeconds.value <= 0 && timer) {
      clearInterval(timer);
      timer = null;
      emit("update:modelValue", false);
    }
  }, 1000);
};

const handleClose = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  emit("update:modelValue", false);
};

const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    // Fallback for older browsers
  }
};

const handleDownload = () => {
  const text = displayCodes.value.join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `codes-${props.orderId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      resetTimer();
    } else if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
);
</script>
