<template>
  <div
    class="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8"
    dir="rtl"
  >
    <!-- Heading -->
    <div class="mb-4 sm:mb-6 md:mb-8 text-right">
      <h1
        class="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2"
      >
        كروت الشحن المتاحة
      </h1>
      <p class="text-[10px] sm:text-sm md:text-base text-gray-600">
        اختر الفئة والكمية المطلوبة
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
      <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
        <span class="font-semibold text-gray-700 text-xs sm:text-sm">
          تصفية حسب:
        </span>

        <button
          type="button"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
          :class="
            selectedCategory === 'all'
              ? 'bg-[#5270FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="selectedCategory = 'all'"
        >
          الكل
        </button>

        <button
          type="button"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
          :class="
            selectedCategory === 'gaming'
              ? 'bg-[#5270FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="selectedCategory = 'gaming'"
        >
          ألعاب
        </button>

        <button
          type="button"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
          :class="
            selectedCategory === 'telecom'
              ? 'bg-[#5270FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="selectedCategory = 'telecom'"
        >
          اتصالات
        </button>

        <button
          type="button"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
          :class="
            selectedCategory === 'shopping'
              ? 'bg-[#5270FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="selectedCategory = 'shopping'"
        >
          تسوق
        </button>
      </div>
    </div>

    <!-- Cards grid -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      <div
        v-for="card in filteredCards"
        :key="card.id"
        class="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="bg-gradient-to-br from-[#5270FF] to-[#7B8FFF] p-4 sm:p-5 md:p-6 text-white">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <i class="ri-bank-card-line text-2xl sm:text-3xl"></i>
            <span
              class="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap"
              :class="
                card.status === 'Available'
                  ? 'bg-green-500'
                  : card.status === 'Low Stock'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              "
            >
              {{
                card.status === 'Available'
                  ? 'متاح'
                  : card.status === 'Low Stock'
                    ? 'كمية محدودة'
                    : 'غير متاح'
              }}
            </span>
          </div>
          <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
            {{ card.value }} ر.س
          </h3>
          <p class="text-xs sm:text-sm opacity-90">
            كارت شحن
          </p>
        </div>

        <div class="p-4 sm:p-5 md:p-6">
          <div class="flex items-center justify-between mb-2.5 sm:mb-3.5">
            <span class="text-xs sm:text-sm text-gray-600">
              السعر
            </span>
            <span class="text-lg sm:text-xl font-bold text-gray-900">
              {{ card.price }} ر.س
            </span>
          </div>

          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <span class="text-xs sm:text-sm text-gray-600">
              المتوفر
            </span>
            <span class="text-xs sm:text-sm font-semibold text-gray-900">
              {{ card.stock }} كارت
            </span>
          </div>

          <button
            type="button"
            class="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
            :class="
              card.status === 'Out of Stock'
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#5270FF] text-white hover:bg-[#4160EE]'
            "
            :disabled="card.status === 'Out of Stock'"
            @click="handlePurchase(card)"
          >
            {{ card.status === 'Out of Stock' ? 'غير متاح' : 'شراء الآن' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Purchase modal -->
    <div
      v-if="showPurchaseModal && selectedCard"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-5 sm:p-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          تأكيد الشراء
        </h2>

        <div class="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div class="flex items-center justify-between mb-2.5 sm:mb-3">
            <span class="text-xs sm:text-sm text-gray-600">
              الفئة
            </span>
            <span class="text-xs sm:text-sm font-semibold text-gray-900">
              كارت {{ selectedCard.value }} ر.س
            </span>
          </div>

          <div class="flex items-center justify-between mb-2.5 sm:mb-3">
            <span class="text-xs sm:text-sm text-gray-600">
              السعر للكارت الواحد
            </span>
            <span class="text-xs sm:text-sm font-semibold text-gray-900">
              {{ selectedCard.price }} ر.س
            </span>
          </div>

          <div class="border-t pt-2.5 sm:pt-3 mb-2.5 sm:mb-3">
            <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
              الكمية
            </label>
            <input
              type="number"
              min="1"
              :max="selectedCard.stock"
              :value="quantity"
              @input="onQuantityInput"
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5270FF] focus:border-transparent text-xs sm:text-sm"
            />
          </div>

          <div class="border-t pt-2.5 sm:pt-3">
            <div class="flex items-center justify-between mb-1.5 sm:mb-2">
              <span class="text-xs sm:text-sm text-gray-600">
                الإجمالي
              </span>
              <span class="text-xl sm:text-2xl font-bold text-gray-900">
                {{ calculateTotal.toLocaleString() }} ر.س
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs sm:text-sm text-gray-600">
                الرصيد بعد الشراء
              </span>
              <span
                class="text-xs sm:text-sm font-semibold"
                :class="remainingBalance < 0 ? 'text-[#FF5757]' : 'text-green-600'"
              >
                {{ remainingBalance.toLocaleString() }} ر.س
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="remainingBalance < 0"
          class="bg-[#FF5757]/10 border border-[#FF5757] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
        >
          <i class="ri-error-warning-line text-xl sm:text-2xl text-[#FF5757]"></i>
          <div>
            <p class="font-semibold text-gray-900 text-xs sm:text-sm">
              رصيد غير كافٍ
            </p>
            <p class="text-[11px] sm:text-sm text-gray-600">
              يرجى شحن الرصيد أو تقليل الكمية
            </p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            class="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
            :class="
              remainingBalance < 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#5270FF] text-white hover:bg-[#4160EE]'
            "
            :disabled="remainingBalance < 0"
            @click="onConfirmPurchase"
          >
            تأكيد الشراء
          </button>

          <button
            type="button"
            class="flex-1 bg-gray-200 text-gray-700 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm md:text-base font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
            @click="closeModal"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

definePageMeta({
  layout: "dashboard",
  pageTransition: {
    name: "dashboard-page",
    mode: "out-in",
  },
});

type CardCategory = "gaming" | "telecom" | "shopping";
type CardStatus = "Available" | "Low Stock" | "Out of Stock";

interface Card {
  id: number;
  value: number;
  price: number;
  status: CardStatus;
  stock: number;
  category: CardCategory;
}

type CategoryFilter = "all" | CardCategory;

const selectedCategory = ref<CategoryFilter>("all");
const selectedCard = ref<Card | null>(null);
const quantity = ref(1);
const showPurchaseModal = ref(false);

const cards = ref<Card[]>([
  { id: 1, value: 50, price: 47.5, status: "Available", stock: 150, category: "gaming" },
  { id: 2, value: 100, price: 95, status: "Available", stock: 200, category: "gaming" },
  { id: 3, value: 200, price: 190, status: "Available", stock: 80, category: "gaming" },
  { id: 4, value: 500, price: 475, status: "Available", stock: 45, category: "gaming" },
  { id: 5, value: 50, price: 48, status: "Available", stock: 120, category: "telecom" },
  { id: 6, value: 100, price: 96, status: "Low Stock", stock: 15, category: "telecom" },
  { id: 7, value: 200, price: 192, status: "Available", stock: 90, category: "shopping" },
  { id: 8, value: 500, price: 480, status: "Out of Stock", stock: 0, category: "shopping" },
]);

const filteredCards = computed(() => {
  if (selectedCategory.value === "all") {
    return cards.value;
  }

  return cards.value.filter((card) => card.category === selectedCategory.value);
});

const currentBalance = 12450;

const calculateTotal = computed(() => {
  if (!selectedCard.value) return 0;
  return selectedCard.value.price * quantity.value;
});

const remainingBalance = computed(() => currentBalance - calculateTotal.value);

const handlePurchase = (card: Card) => {
  selectedCard.value = card;
  quantity.value = 1;
  showPurchaseModal.value = true;
};

const closeModal = () => {
  showPurchaseModal.value = false;
  selectedCard.value = null;
};

const onQuantityInput = (event: Event) => {
  if (!selectedCard.value) return;

  const target = event.target as HTMLInputElement;
  const parsed = parseInt(target.value || "1", 10);
  const safeValue = Number.isNaN(parsed) ? 1 : parsed;

  const clamped = Math.max(1, Math.min(selectedCard.value.stock || 1, safeValue));
  quantity.value = clamped;
};

const onConfirmPurchase = () => {
  if (remainingBalance.value < 0 || !selectedCard.value) return;

  // TODO: Wire this action to a real purchase API (create order & deduct balance).
  closeModal();
};
</script>

