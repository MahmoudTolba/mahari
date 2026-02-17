<template>
  <div
    class="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-8"
    dir="rtl"
  >
    <!-- Low balance alert -->
    <div
      v-if="showLowBalanceAlert"
      class="bg-[#FF5757]/10 border border-[#FF5757] rounded-lg sm:rounded-xl p-2.5 sm:p-4 mb-2.5 sm:mb-4 md:mb-6 flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4"
    >
      <div
        class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#FF5757] rounded-lg flex items-center justify-center flex-shrink-0"
      >
        <!-- <i class="ri-alert-line text-sm sm:text-lg md:text-2xl text-white"></i> -->
         <!-- <img :src="alertIcon" alt="alert" class="w-full h-full"> -->
          <img src="~/assets/icons/alert-icon.svg" alt="alert" class="w-full h-full p-1">
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-gray-900 mb-0.5 text-xs sm:text-sm md:text-base">تنبيه: رصيد منخفض</h3>
        <p class="text-gray-600 leading-snug text-[10px] sm:text-xs md:text-sm">
          رصيدك الحالي أقل من الحد الأدنى الموصى به. يرجى شحن الرصيد لتجنب تعطل الخدمة.
        </p>
      </div>
      <button
        type="button"
        class="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-white/50 rounded-lg cursor-pointer flex-shrink-0"
        @click="showLowBalanceAlert = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>

    <!-- Heading -->
    <div class="mb-3 sm:mb-6 md:mb-8 text-right">
      <h1 class="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-2">
        لوحة التحكم
      </h1>
      <p class="text-[10px] sm:text-sm md:text-base text-gray-600">
        مرحباً بك في لوحة التحكم الخاصة بالشريك
      </p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 mb-3 sm:mb-6 md:mb-8">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2 sm:p-4 md:p-6"
      >
        <div class="flex items-center justify-between mb-1.5 sm:mb-3 md:mb-4">
          <div
            class="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
            :class="stat.color"
          >
            <img
              :src="stat.icon"
              :alt="stat.label"
              class="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
            />
          </div>
        </div>
        <h3 class="text-base sm:text-2xl md:text-3xl font-bold text-gray-900 mb-0.5 leading-tight">
          {{ stat.value }}
        </h3>
        <p class="text-[9px] sm:text-xs md:text-sm text-gray-600 leading-tight">
          {{ stat.label }}
        </p>
      </div>
    </div>

    <!-- Quick actions + account activity -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 mb-3 sm:mb-6 md:mb-8">
      <!-- Quick actions -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6">
        <h2 class="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6">
          إجراءات سريعة
        </h2>
        <div class="flex flex-col gap-1.5 sm:gap-3 md:gap-4">
          <NuxtLink to="/dashboard/cards">
            <button
              type="button"
              class="w-full text-white py-2 sm:py-3 px-2.5 sm:px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm md:text-base cursor-pointer active:scale-95"
              :class="
                isQuickActionActive('/dashboard/cards')
                  ? 'bg-[#4160EE] shadow-md'
                  : 'bg-[#5270FF] hover:bg-[#4160EE]'
              "
            >
              <i class="ri-shopping-cart-line text-sm sm:text-lg md:text-xl"></i>
              <span>شراء كروت شحن</span>
            </button>
          </NuxtLink>

          <NuxtLink to="/dashboard/orders">
            <button
              type="button"
              class="w-full text-white py-2 sm:py-3 px-2.5 sm:px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm md:text-base cursor-pointer active:scale-95"
              :class="
                isQuickActionActive('/dashboard/orders')
                  ? 'bg-green-600 shadow-md'
                  : 'bg-green-500 hover:bg-green-600'
              "
            >
              <i class="ri-file-list-line text-sm sm:text-lg md:text-xl"></i>
              <span>عرض الطلبات</span>
            </button>
          </NuxtLink>

          <NuxtLink to="/dashboard/reports">
            <button
              type="button"
              class="w-full text-white py-2 sm:py-3 px-2.5 sm:px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm md:text-base cursor-pointer active:scale-95"
              :class="
                isQuickActionActive('/dashboard/reports')
                  ? 'bg-purple-600 shadow-md'
                  : 'bg-purple-500 hover:bg-purple-600'
              "
            >
              <i class="ri-bar-chart-line text-sm sm:text-lg md:text-xl"></i>
              <span>التقارير والإحصائيات</span>
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Account activity -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6">
        <h2 class="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6">
          نشاط الحساب
        </h2>
        <div class="space-y-2 sm:space-y-4">
          <div class="flex items-center gap-1.5 sm:gap-3 md:gap-4 pb-2 sm:pb-4 border-b">
            <div
              class="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <i class="ri-check-line text-sm sm:text-lg md:text-xl text-green-600"></i>
            </div>
            <div class="flex-1 text-right min-w-0">
              <p class="font-semibold text-gray-900 text-[11px] sm:text-sm md:text-base truncate">
                طلب مكتمل
              </p>
              <p class="text-[9px] sm:text-xs md:text-sm text-gray-600 truncate">
                ORD-1234 - 10 كروت
              </p>
            </div>
            <span class="text-[9px] sm:text-[11px] md:text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">منذ ساعة</span>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-3 md:gap-4 pb-2 sm:pb-4 border-b">
            <div
              class="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <i class="ri-shopping-bag-line text-sm sm:text-lg md:text-xl text-blue-600"></i>
            </div>
            <div class="flex-1 text-right min-w-0">
              <p class="font-semibold text-gray-900 text-[11px] sm:text-sm md:text-base truncate">
                طلب جديد
              </p>
              <p class="text-[9px] sm:text-xs md:text-sm text-gray-600 truncate">
                ORD-1233 - 20 كروت
              </p>
            </div>
            <span class="text-[9px] sm:text-[11px] md:text-xs text-gray-500 flex-shrink-0 whitespace-nowrap"
              >منذ 3 ساعات</span
            >
          </div>

          <div class="flex items-center gap-1.5 sm:gap-3 md:gap-4">
            <div
              class="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <i class="ri-wallet-line text-sm sm:text-lg md:text-xl text-purple-600"></i>
            </div>
            <div class="flex-1 text-right min-w-0">
              <p class="font-semibold text-gray-900 text-[11px] sm:text-sm md:text-base truncate">
                شحن رصيد
              </p>
              <p class="text-[9px] sm:text-xs md:text-sm text-gray-600 truncate">+5,000 ر.س</p>
            </div>
            <span class="text-[9px] sm:text-[11px] md:text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">أمس</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent orders table -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6">
      <div class="flex items-center justify-between mb-2.5 sm:mb-4 md:mb-6">
        <h2 class="text-sm sm:text-lg md:text-xl font-bold text-gray-900">آخر الطلبات</h2>
        <NuxtLink
          to="/dashboard/orders"
          class="text-[#5270FF] text-[10px] sm:text-sm font-semibold hover:underline cursor-pointer"
        >
          عرض الكل
        </NuxtLink>
      </div>

      <!-- Mobile card view -->
      <div class="block sm:hidden space-y-2">
        <div
          v-for="order in recentOrders"
          :key="order.id"
          class="border border-gray-200 rounded-lg p-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-gray-900 text-xs">{{ order.id }}</span>
            <span
              class="inline-flex px-2 py-0.5 rounded-full text-[9px] font-semibold"
              :class="
                order.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              "
            >
              {{ order.status === 'Completed' ? 'مكتمل' : 'قيد المعالجة' }}
            </span>
          </div>
          <div class="flex items-center justify-between text-[10px] text-gray-600 mb-1.5">
            <span>{{ order.category }}</span>
            <span>الكمية: {{ order.quantity }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold text-gray-900 text-xs">{{ order.total }}</span>
            <button
              type="button"
              class="text-[#5270FF] hover:underline text-[10px] font-semibold cursor-pointer"
            >
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>

      <!-- Desktop table view -->
      <div class="hidden sm:block overflow-x-auto -mx-2.5 sm:-mx-4 md:mx-0 px-2.5 sm:px-4 md:px-0">
        <table class="w-full text-[10px] sm:text-xs md:text-sm min-w-[500px]">
          <thead>
            <tr class="border-b">
              <th
                class="text-right py-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                رقم الطلب
              </th>
              <th
                class="text-right py-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                التاريخ
              </th>
              <th
                class="hidden md:table-cell text-right py-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الفئة
              </th>
              <th
                class="hidden md:table-cell text-right py-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الكمية
              </th>
              <th
                class="text-right py-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الإجمالي
              </th>
              <th
                class="text-right py-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الحالة
              </th>
              <th
                class="text-right py-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in recentOrders"
              :key="order.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="font-semibold text-gray-900 whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
                >
                  {{ order.id }}
                </span>
              </td>
              <td class="py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="text-[10px] sm:text-xs md:text-sm text-gray-600 whitespace-nowrap"
                >
                  {{ order.date }}
                </span>
              </td>
              <td class="hidden md:table-cell py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="text-[10px] sm:text-xs md:text-sm text-gray-900 whitespace-nowrap"
                >
                  {{ order.category }}
                </span>
              </td>
              <td class="hidden md:table-cell py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="text-[10px] sm:text-xs md:text-sm text-gray-900 whitespace-nowrap"
                >
                  {{ order.quantity }}
                </span>
              </td>
              <td class="py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="font-semibold text-gray-900 whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
                >
                  {{ order.total }}
                </span>
              </td>
              <td class="py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <span
                  class="inline-flex px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold whitespace-nowrap"
                  :class="
                    order.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  "
                >
                  {{
                    order.status === 'Completed' ? 'مكتمل' : 'قيد المعالجة'
                  }}
                </span>
              </td>
              <td class="py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
                <button
                  type="button"
                  class="text-[#5270FF] hover:underline text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap cursor-pointer"
                >
                  عرض
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import walletIcon from "~/assets/icons/wallet-icon.svg";
import bagIcon from "~/assets/icons/bag-icon.svg";
import calenderIcon from "~/assets/icons/calender-icon.svg";
import chartIcon from "~/assets/icons/chart-icon.svg";

definePageMeta({
  layout: "dashboard",
  pageTransition: {
    name: "dashboard-page",
    mode: "out-in",
  },
});

const route = useRoute();

const showLowBalanceAlert = ref(true);

const stats = [
  {
    label: "الرصيد الحالي",
    value: "12,450 ر.س",
    icon: walletIcon,
    color: "bg-[#5270FF]",
  },
  {
    label: "عدد الطلبات",
    value: "48",
    icon: bagIcon,
    color: "bg-green-500",
  },
  {
    label: "طلبات اليوم",
    value: "8",
    icon: calenderIcon,
    color: "bg-purple-500",
  },
  {
    label: "إجمالي المشتريات",
    value: "156,800 ر.س",
    icon: chartIcon,
    color: "bg-orange-500",
  },
];

const recentOrders = [
  {
    id: "ORD-1234",
    date: "2024-01-20",
    category: "كارت 100 ريال",
    quantity: 10,
    total: "950 ر.س",
    status: "Completed",
  },
  {
    id: "ORD-1233",
    date: "2024-01-19",
    category: "كارت 50 ريال",
    quantity: 20,
    total: "950 ر.س",
    status: "Completed",
  },
  {
    id: "ORD-1232",
    date: "2024-01-19",
    category: "كارت 200 ريال",
    quantity: 5,
    total: "950 ر.س",
    status: "Processing",
  },
];

const isQuickActionActive = (href: string) => {
  return route.path === href || route.path.startsWith(href + "/");
};
const alertIcon = ref('~/assets/icons/alert-icon.svg');
</script>
