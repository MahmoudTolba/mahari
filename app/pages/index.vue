<template>
  <div
    class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8"
    dir="rtl"
  >
    <!-- Low balance alert -->
    <div
      v-if="showLowBalanceAlert"
      class="bg-[#FF5757]/10 border border-[#FF5757] rounded-xl p-4 mb-6 flex items-center justify-between"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 bg-[#FF5757] rounded-lg flex items-center justify-center"
        >
          <i class="ri-alert-line text-2xl text-white"></i>
        </div>
        <div>
          <h3 class="font-bold text-gray-900 mb-1">تنبيه: رصيد منخفض</h3>
          <p class="text-sm text-gray-600">
            رصيدك الحالي أقل من الحد الأدنى الموصى به. يرجى شحن الرصيد لتجنب تعطل
            الخدمة.
          </p>
        </div>
      </div>
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center hover:bg-white/50 rounded-lg cursor-pointer"
        @click="showLowBalanceAlert = false"
      >
        <i class="ri-close-line text-xl text-gray-600"></i>
      </button>
    </div>

    <!-- Heading -->
    <div class="mb-8 text-right">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        لوحة التحكم
      </h1>
      <p class="text-gray-600">مرحباً بك في لوحة التحكم الخاصة بالشريك</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="bg-white rounded-xl shadow-sm p-4 md:p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center"
            :class="stat.color"
          >
            <i :class="[stat.icon, 'text-2xl text-white']"></i>
          </div>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 mb-1">
          {{ stat.value }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ stat.label }}
        </p>
      </div>
    </div>

    <!-- Quick actions + account activity -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Quick actions -->
      <div class="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">إجراءات سريعة</h2>
        <div class="flex flex-col gap-4">
          <NuxtLink to="/dashboard/cards">
            <button
              type="button"
              class="w-full text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              :class="
                isQuickActionActive('/dashboard/cards')
                  ? 'bg-[#4160EE] shadow-md'
                  : 'bg-[#5270FF] hover:bg-[#4160EE]'
              "
            >
              <i class="ri-shopping-cart-line text-xl"></i>
              <span>شراء كروت شحن</span>
            </button>
          </NuxtLink>

          <NuxtLink to="/dashboard/orders">
            <button
              type="button"
              class="w-full text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              :class="
                isQuickActionActive('/dashboard/orders')
                  ? 'bg-green-600 shadow-md'
                  : 'bg-green-500 hover:bg-green-600'
              "
            >
              <i class="ri-file-list-line text-xl"></i>
              <span>عرض الطلبات</span>
            </button>
          </NuxtLink>

          <NuxtLink to="/dashboard/reports">
            <button
              type="button"
              class="w-full text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              :class="
                isQuickActionActive('/dashboard/reports')
                  ? 'bg-purple-600 shadow-md'
                  : 'bg-purple-500 hover:bg-purple-600'
              "
            >
              <i class="ri-bar-chart-line text-xl"></i>
              <span>التقارير والإحصائيات</span>
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Account activity -->
      <div class="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">نشاط الحساب</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4 pb-4 border-b">
            <div
              class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <i class="ri-check-line text-xl text-green-600"></i>
            </div>
            <div class="flex-1 text-right">
              <p class="font-semibold text-gray-900">طلب مكتمل</p>
              <p class="text-sm text-gray-600">ORD-1234 - 10 كروت</p>
            </div>
            <span class="text-xs text-gray-500">منذ ساعة</span>
          </div>

          <div class="flex items-center gap-4 pb-4 border-b">
            <div
              class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <i class="ri-shopping-bag-line text-xl text-blue-600"></i>
            </div>
            <div class="flex-1 text-right">
              <p class="font-semibold text-gray-900">طلب جديد</p>
              <p class="text-sm text-gray-600">ORD-1233 - 20 كروت</p>
            </div>
            <span class="text-xs text-gray-500">منذ 3 ساعات</span>
          </div>

          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <i class="ri-wallet-line text-xl text-purple-600"></i>
            </div>
            <div class="flex-1 text-right">
              <p class="font-semibold text-gray-900">شحن رصيد</p>
              <p class="text-sm text-gray-600">+5,000 ر.س</p>
            </div>
            <span class="text-xs text-gray-500">أمس</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent orders table -->
    <div class="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900">آخر الطلبات</h2>
        <NuxtLink
          to="/dashboard/orders"
          class="text-[#5270FF] font-semibold hover:underline cursor-pointer"
        >
          عرض الكل
        </NuxtLink>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th
                class="text-right py-2 px-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                رقم الطلب
              </th>
              <th
                class="text-right py-2 px-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                التاريخ
              </th>
              <th
                class="text-right py-2 px-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الفئة
              </th>
              <th
                class="text-right py-2 px-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الكمية
              </th>
              <th
                class="text-right py-2 px-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الإجمالي
              </th>
              <th
                class="text-right py-2 px-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap"
              >
                الحالة
              </th>
              <th
                class="text-right py-2 px-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap"
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
              <td class="py-4 px-4">
                <span class="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">
                  {{ order.id }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {{ order.date }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                  {{ order.category }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                  {{ order.quantity }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">
                  {{ order.total }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span
                  class="inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
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
              <td class="py-4 px-4">
                <button
                  type="button"
                  class="text-[#5270FF] hover:underline text-sm font-semibold whitespace-nowrap cursor-pointer"
                >
                  عرض التفاصيل
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
    icon: "ri-wallet-line",
    color: "bg-[#5270FF]",
  },
  {
    label: "عدد الطلبات",
    value: "48",
    icon: "ri-shopping-bag-line",
    color: "bg-green-500",
  },
  {
    label: "طلبات اليوم",
    value: "8",
    icon: "ri-calendar-line",
    color: "bg-purple-500",
  },
  {
    label: "إجمالي المشتريات",
    value: "156,800 ر.س",
    icon: "ri-line-chart-line",
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
</script>
