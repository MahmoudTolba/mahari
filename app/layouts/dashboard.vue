<template>
  <div class="min-h-screen bg-gray-50" dir="rtl">
    <!-- Top Navbar -->
    <nav
      class="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-40"
    >
      <div class="px-6 py-4">
        <div
          class="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap"
        >
          <NuxtLink href="/">
            <img
              src="https://static.readdy.ai/image/bdf2ab49f6243fb2a29b7dab4b761c4e/899ee449877bd608c950a56cf8fac3a2.png"
              alt="Logo"
              class="h-10 cursor-pointer"
            />
          </NuxtLink>

          <div class="flex items-center gap-3 ms-auto">
            <!-- Mobile menu toggle -->
            <button
              type="button"
              class="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              @click="showSidebar = true"
              aria-label="فتح القائمة الجانبية"
            >
              <i class="ri-menu-line text-xl"></i>
            </button>

            <div
              class="hidden sm:block bg-[#5270FF] text-white px-4 py-2 rounded-lg font-semibold whitespace-nowrap"
            >
              الرصيد: {{ currentBalance.toLocaleString() }} ر.س
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex pt-[72px]">
      <!-- Mobile overlay -->
      <div
        v-if="showSidebar"
        class="fixed inset-0 bg-black/30 z-40 md:hidden"
        @click="showSidebar = false"
      ></div>

      <!-- Sidebar -->
      <aside
        class="w-64 bg-white border-l fixed right-0 top-[72px] bottom-0 overflow-y-auto z-50 transform transition-transform duration-200 md:translate-x-0"
        :class="showSidebar ? 'translate-x-0' : 'translate-x-full md:translate-x-0'"
      >
        <div class="p-4 h-full flex flex-col">
          <!-- Close button (mobile only) -->
          <div class="flex items-center justify-between mb-4 md:hidden">
            <span class="text-sm font-semibold text-gray-700">القائمة</span>
            <button
              type="button"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500"
              @click="showSidebar = false"
              aria-label="إغلاق القائمة الجانبية"
            >
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>

          <nav class="space-y-2 flex-1">
            <NuxtLink
              v-for="item in menuItems"
              :key="item.href"
              :href="item.href"
              class="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
              :class="
                isActive(item.href)
                  ? 'bg-[#5270FF] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              "
              @click="showSidebar = false"
            >
              <img
                :src="isActive(item.href) ? item.iconActive : item.iconInactive"
                :alt="item.label"
                class="w-5 h-5 object-contain"
              />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-4 md:p-6 mr-0 md:mr-64">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import bHomeIcon from "~/assets/icons/bhome-icon.svg";
import wHomeIcon from "~/assets/icons/whome-icon.svg";
import bCardsIcon from "~/assets/icons/bcards-icon.svg";
import wCardsIcon from "~/assets/icons/wcards-icon.svg";
import bOrdersIcon from "~/assets/icons/borders-icon.svg";
import wOrdersIcon from "~/assets/icons/worders-icon.svg";
import bReportsIcon from "~/assets/icons/breports-icon.svg";
import wReportsIcon from "~/assets/icons/wreports-icon.svg";
import bApiIcon from "~/assets/icons/bapi-icon.svg";
import wApiIcon from "~/assets/icons/wapi-icon.svg";

const route = useRoute();
const showSidebar = ref(false);

const menuItems = [
  {
    href: "/",
    label: "لوحة التحكم",
    iconActive: wHomeIcon,
    iconInactive: bHomeIcon,
  },
  {
    href: "/dashboard/cards",
    label: "الكروت",
    iconActive: wCardsIcon,
    iconInactive: bCardsIcon,
  },
  {
    href: "/dashboard/orders",
    label: "الطلبات",
    iconActive: wOrdersIcon,
    iconInactive: bOrdersIcon,
  },
  {
    href: "/dashboard/reports",
    label: "التقارير",
    iconActive: wReportsIcon,
    iconInactive: bReportsIcon,
  },
  {
    href: "/dashboard/api-docs",
    label: "API Documentation",
    iconActive: wApiIcon,
    iconInactive: bApiIcon,
  },
];

const currentBalance = 12450;

const isActive = (href: string) => {
  if (href === "/dashboard") {
    return route.path === href || route.path === "/";
  }

  return route.path === href || route.path.startsWith(href + "/");
};
</script>

