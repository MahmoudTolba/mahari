<template>
  <div
    class="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8"
    dir="rtl"
  >
    <!-- Heading -->
    <div class="mb-3 sm:mb-6 md:mb-8 text-right">
      <h1
        class="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-2"
      >
        طلباتي
      </h1>
      <p class="text-[10px] sm:text-sm md:text-base text-gray-600">
        عرض وإدارة جميع طلباتك
      </p>
    </div>

    <!-- Orders table card -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6">
      <!-- Mobile card view -->
      <div class="block sm:hidden space-y-2">
        <div
          v-for="order in orders"
          :key="order.id"
          class="border border-gray-200 rounded-lg p-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-gray-900 text-xs">
              {{ order.id }}
            </span>
            <span
              class="inline-flex px-2 py-0.5 rounded-full text-[9px] font-semibold"
              :class="
                order.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'Processing'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              "
            >
              {{
                order.status === "Completed"
                  ? "مكتمل"
                  : order.status === "Processing"
                    ? "قيد المعالجة"
                    : "ملغي"
              }}
            </span>
          </div>

          <div class="flex items-center justify-between text-[10px] text-gray-600 mb-1.5">
            <span class="whitespace-nowrap">
              {{ order.date }}
            </span>
            <span class="whitespace-nowrap">
              {{ order.category }}
            </span>
          </div>

          <div class="flex items-center justify-between text-[10px] text-gray-600 mb-1.5">
            <span>الكمية: {{ order.quantity }}</span>
            <span>الإجمالي: {{ order.total.toLocaleString() }} ر.س</span>
          </div>

          <div class="flex items-center justify-end mt-1.5">
            <button
              v-if="order.status === 'Completed'"
              type="button"
              class="text-white bg-[#5270FF] hover:bg-[#4160EE] text-[10px] font-semibold whitespace-nowrap cursor-pointer py-1.5 px-3 rounded-lg"
              @click="handleViewCodes(order)"
            >
              عرض الأكواد
            </button>
          </div>
        </div>
      </div>

      <!-- Desktop table view -->
      <div class="hidden sm:block overflow-x-auto -mx-2.5 sm:-mx-4 md:mx-0 px-2.5 sm:px-4 md:px-0">
        <table class="w-full text-[10px] sm:text-xs md:text-sm min-w-[600px]">
          <thead>
            <tr class="border-b">
              <th
                class="text-right py-3 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                رقم الطلب
              </th>
              <th
                class="text-right py-3 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                التاريخ والوقت
              </th>
              <th
                class="text-right py-3 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الفئة
              </th>
              <th
                class="text-right py-3 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الكمية
              </th>
              <th
                class="text-right py-3 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الإجمالي
              </th>
              <th
                class="text-right py-3 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الحالة
              </th>
              <th
                class="text-right py-3 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="font-semibold text-gray-900 whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
                >
                  {{ order.id }}
                </span>
              </td>
              <td class="py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="text-[10px] sm:text-xs md:text-sm text-gray-600 whitespace-nowrap"
                >
                  {{ order.date }}
                </span>
              </td>
              <td class="py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="text-[10px] sm:text-xs md:text-sm text-gray-900 whitespace-nowrap"
                >
                  {{ order.category }}
                </span>
              </td>
              <td class="py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="text-[10px] sm:text-xs md:text-sm text-gray-900 whitespace-nowrap"
                >
                  {{ order.quantity }}
                </span>
              </td>
              <td class="py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="font-semibold text-gray-900 whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
                >
                  {{ order.total.toLocaleString() }} ر.س
                </span>
              </td>
              <td class="py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="inline-flex px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold whitespace-nowrap"
                  :class="
                    order.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  "
                >
                  {{
                    order.status === "Completed"
                      ? "مكتمل"
                      : order.status === "Processing"
                        ? "قيد المعالجة"
                        : "ملغي"
                  }}
                </span>
              </td>
              <td class="py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <button
                  v-if="order.status === 'Completed'"
                  type="button"
                  class="bg-[#5270FF] text-white px-4 py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-semibold hover:bg-[#4160EE] transition-colors whitespace-nowrap cursor-pointer"
                  @click="handleViewCodes(order)"
                >
                  عرض الأكواد
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Security Verification Modal -->
    <SecurityVerificationModal
      v-model="showSecurityModal"
      @verify="onVerify"
      @cancel="showSecurityModal = false"
      @resend="onResendCode"
    />

    <!-- Order Codes Modal -->
    <OrderCodesModal
      v-if="selectedOrderForCodes"
      v-model="showOrderCodesModal"
      :order-id="selectedOrderForCodes.id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "dashboard",
  pageTransition: {
    name: "dashboard-page",
    mode: "out-in",
  },
});

type OrderStatus = "Completed" | "Processing" | "Cancelled";

type Order = {
  id: string;
  date: string;
  category: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  codes: string[];
};

const orders = ref<Order[]>([
  {
    id: "ORD-1234",
    date: "2024-01-20 14:30",
    category: "كارت 100 ريال",
    quantity: 10,
    total: 950,
    status: "Completed",
    codes: [
      "XXXX-XXXX-1234",
      "XXXX-XXXX-5678",
      "XXXX-XXXX-9012",
      "XXXX-XXXX-3456",
      "XXXX-XXXX-7890",
      "XXXX-XXXX-2468",
      "XXXX-XXXX-1357",
      "XXXX-XXXX-9753",
      "XXXX-XXXX-8642",
      "XXXX-XXXX-7531",
    ],
  },
  {
    id: "ORD-1233",
    date: "2024-01-19 11:15",
    category: "كارت 50 ريال",
    quantity: 20,
    total: 950,
    status: "Completed",
    codes: [
      "YYYY-YYYY-1111",
      "YYYY-YYYY-2222",
      "YYYY-YYYY-3333",
      "YYYY-YYYY-4444",
      "YYYY-YYYY-5555",
      "YYYY-YYYY-6666",
      "YYYY-YYYY-7777",
      "YYYY-YYYY-8888",
      "YYYY-YYYY-9999",
      "YYYY-YYYY-0000",
      "YYYY-YYYY-1122",
      "YYYY-YYYY-3344",
      "YYYY-YYYY-5566",
      "YYYY-YYYY-7788",
      "YYYY-YYYY-9900",
      "YYYY-YYYY-2233",
      "YYYY-YYYY-4455",
      "YYYY-YYYY-6677",
      "YYYY-YYYY-8899",
      "YYYY-YYYY-0011",
    ],
  },
  {
    id: "ORD-1232",
    date: "2024-01-19 09:45",
    category: "كارت 200 ريال",
    quantity: 5,
    total: 950,
    status: "Processing",
    codes: [],
  },
  {
    id: "ORD-1231",
    date: "2024-01-18 16:20",
    category: "كارت 500 ريال",
    quantity: 3,
    total: 1425,
    status: "Completed",
    codes: ["ZZZZ-ZZZZ-1234", "ZZZZ-ZZZZ-5678", "ZZZZ-ZZZZ-9012"],
  },
]);

const showSecurityModal = ref(false);
const showOrderCodesModal = ref(false);
const selectedOrderForCodes = ref<Order | null>(null);

const handleViewCodes = (order: Order) => {
  selectedOrderForCodes.value = order;
  showSecurityModal.value = true;
};

const onVerify = (code: string) => {
  // TODO: Wire OTP verification with backend
  showSecurityModal.value = false;
  showOrderCodesModal.value = true;
};

const onResendCode = () => {
  // TODO: Wire resend OTP with backend
  if (selectedOrderForCodes.value) {
    console.log("Resend code for order:", selectedOrderForCodes.value.id);
  }
};
</script>

