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
        التقارير والإحصائيات
      </h1>
      <p class="text-[10px] sm:text-sm md:text-base text-gray-600">
        تحليل شامل لأداء المبيعات
      </p>
    </div>

    <!-- Time period selector -->
    <div
      class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6 mb-3 sm:mb-6"
    >
      <div class="flex items-center gap-2 sm:gap-4 flex-wrap">
        <span class="font-semibold text-gray-700 text-xs sm:text-sm">
          الفترة الزمنية:
        </span>
        <button
          type="button"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
          :class="
            selectedPeriod === 'week'
              ? 'bg-[#5270FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="selectedPeriod = 'week'"
        >
          أسبوع
        </button>
        <button
          type="button"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
          :class="
            selectedPeriod === 'month'
              ? 'bg-[#5270FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="selectedPeriod = 'month'"
        >
          شهر
        </button>
        <button
          type="button"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
          :class="
            selectedPeriod === 'year'
              ? 'bg-[#5270FF] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="selectedPeriod = 'year'"
        >
          سنة
        </button>
      </div>
    </div>

    <!-- KPI stats grid -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 mb-3 sm:mb-6 md:mb-8"
    >
      <div
        v-for="(stat, index) in statsCards"
        :key="index"
        class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2 sm:p-4 md:p-6"
      >
        <div class="flex items-center justify-between mb-1.5 sm:mb-3 md:mb-4">
          <div
            class="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#5270FF]/10 rounded-lg flex items-center justify-center"
          >
            <img
              :src="stat.icon"
              :alt="stat.label"
              class="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
            />
          </div>
          <span
            class="text-[10px] sm:text-xs font-semibold text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
          >
            {{ stat.percentage }}
          </span>
        </div>
        <h3 class="text-[9px] sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1">
          {{ stat.label }}
        </h3>
        <p class="text-base sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
          {{ stat.value }}
        </p>
      </div>
    </div>

    <!-- Daily sales + top categories -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 mb-3 sm:mb-6 md:mb-8"
    >
      <!-- Daily sales -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6">
        <h2
          class="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6"
        >
          المبيعات اليومية
        </h2>
        <div class="space-y-2 sm:space-y-4">
          <div
            v-for="(day, index) in salesData"
            :key="index"
            class="border-b pb-2 sm:pb-4 last:border-b-0"
          >
            <div class="flex items-center justify-between mb-1 sm:mb-2">
              <span class="text-xs sm:text-sm font-semibold text-gray-900">
                {{ day.date }}
              </span>
              <span class="text-xs sm:text-sm font-bold text-[#5270FF]">
                {{ day.amount.toLocaleString() }} ر.س
              </span>
            </div>
            <div class="flex items-center justify-between text-[10px] sm:text-xs text-gray-600">
              <span>{{ day.orders }} طلب</span>
              <span>{{ day.cards }} كارت</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top categories -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6">
        <h2
          class="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6"
        >
          أفضل الفئات
        </h2>
        <div class="space-y-4 sm:space-y-6">
          <div v-for="(category, index) in topCategories" :key="index">
            <div class="flex items-center justify-between mb-1 sm:mb-2">
              <span class="text-xs sm:text-sm font-semibold text-gray-900">
                {{ category.name }}
              </span>
              <span class="text-xs sm:text-sm font-bold text-gray-900">
                {{ category.sales.toLocaleString() }} ر.س
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-[#5270FF] h-2 rounded-full transition-all"
                :style="{ width: `${category.percentage}%` }"
              />
            </div>
            <span class="text-[10px] sm:text-xs text-gray-600 mt-1 block">
              {{ category.percentage }}% من الإجمالي
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Export section -->
    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-4 md:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-2 sm:mb-4 md:mb-6">
        <h2 class="text-sm sm:text-lg md:text-xl font-bold text-gray-900">
          تصدير التقارير
        </h2>
        <button
          type="button"
          class="bg-[#4269f4] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-[#3560e0] transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer text-xs sm:text-sm"
          @click="handleExportReport"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>تحميل التقرير الكامل</span>
        </button>
      </div>
      <p class="text-[10px] sm:text-sm text-gray-600">
        يمكنك تحميل تقرير شامل يحتوي على جميع البيانات والإحصائيات بصيغة PDF أو Excel
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import chartIcon from "~/assets/icons/chart-icon.svg";
import bagIcon from "~/assets/icons/bag-icon.svg";

definePageMeta({
  layout: "dashboard",
  pageTransition: {
    name: "dashboard-page",
    mode: "out-in",
  },
});

const selectedPeriod = ref<"week" | "month" | "year">("month");

const statsCards = [
  {
    label: "إجمالي المبيعات",
    value: "45,680 ر.س",
    icon: chartIcon,
    percentage: "+12.5%",
  },
  {
    label: "عدد الطلبات",
    value: "156",
    icon: bagIcon,
    percentage: "+8.3%",
  },
  {
    label: "الكروت المباعة",
    value: "1,240",
    icon: chartIcon,
    percentage: "+15.7%",
  },
  {
    label: "متوسط قيمة الطلب",
    value: "293 ر.س",
    icon: chartIcon,
    percentage: "+5.2%",
  },
];

const salesData = [
  { date: "2024-01-15", orders: 12, amount: 3450, cards: 95 },
  { date: "2024-01-16", orders: 18, amount: 5230, cards: 142 },
  { date: "2024-01-17", orders: 15, amount: 4120, cards: 108 },
  { date: "2024-01-18", orders: 22, amount: 6890, cards: 178 },
  { date: "2024-01-19", orders: 19, amount: 5450, cards: 135 },
  { date: "2024-01-20", orders: 25, amount: 7340, cards: 195 },
];

const topCategories = [
  { name: "كروت ألعاب", sales: 18500, percentage: 40 },
  { name: "كروت اتصالات", sales: 13700, percentage: 30 },
  { name: "كروت تسوق", sales: 13480, percentage: 30 },
];

function buildReportCsv(): string {
  const periodLabel =
    selectedPeriod.value === "week"
      ? "أسبوع"
      : selectedPeriod.value === "month"
        ? "شهر"
        : "سنة";
  const rows: string[] = [];
  const enc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;

  rows.push(enc("تقارير وإحصائيات - الفترة: " + periodLabel));
  rows.push("");

  rows.push(enc("ملخص المؤشرات"));
  rows.push([enc("المؤشر"), enc("القيمة"), enc("النسبة")].join(","));
  for (const s of statsCards) {
    rows.push([enc(s.label), enc(s.value), enc(s.percentage)].join(","));
  }
  rows.push("");

  rows.push(enc("المبيعات اليومية"));
  rows.push(
    [enc("التاريخ"), enc("الطلبات"), enc("المبلغ (ر.س)"), enc("الكروت")].join(
      ","
    )
  );
  for (const d of salesData) {
    rows.push(
      [
        enc(d.date),
        enc(String(d.orders)),
        enc(String(d.amount)),
        enc(String(d.cards)),
      ].join(",")
    );
  }
  rows.push("");

  rows.push(enc("أفضل الفئات"));
  rows.push([enc("الفئة"), enc("المبيعات (ر.س)"), enc("النسبة %")].join(","));
  for (const c of topCategories) {
    rows.push([
      enc(c.name),
      enc(String(c.sales)),
      enc(String(c.percentage)),
    ].join(","));
  }

  return "\uFEFF" + rows.join("\r\n");
}

function handleExportReport() {
  const csv = buildReportCsv();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `تقرير-${selectedPeriod.value}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>
