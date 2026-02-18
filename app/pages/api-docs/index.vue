<template>
  <div
    class="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8"
    dir="rtl"
  >
 
        <div class="mb-6">
        <h1 class="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-2">
        API Documentation
      </h1>
      <p class="text-[10px] sm:text-sm md:text-base text-gray-600">
        توثيق واجهات برمجة التطبيقات الخاصة بالطرف الخارجي
      </p>
    </div>

    <div class="space-y-4 sm:space-y-6">
      <!-- Authentication & API Token -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Authentication & API Token
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              API Token
            </label>
            <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div class="flex-1 min-w-0">
                <input
                  :type="showToken ? 'text' : 'password'"
                  :value="apiToken"
                  readonly
                  class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-xs sm:text-sm"
                />
              </div>
              <button
                type="button"
                class="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                @click="showToken = !showToken"
              >
                <i :class="showToken ? 'ri-eye-off-line' : 'ri-eye-line'" class="text-lg text-gray-700"></i>
              </button>
              <button
                type="button"
                class="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                @click="copyToken"
              >
                <i class="ri-file-copy-line text-lg text-gray-700"></i>
              </button>
              <button
                type="button"
                class="px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="regenerating"
                @click="showRegenerateModal = true"
              >
                <i v-if="regenerating" class="ri-loader-4-line animate-spin"></i>
                <i v-else class="ri-refresh-line"></i>
                Regenerate
              </button>
            </div>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
            <div class="flex gap-3">
              <i class="ri-alert-line text-amber-600 text-xl flex-shrink-0"></i>
              <p class="text-xs sm:text-sm text-amber-800">
                احتفظ بالتوكن في مكان آمن. أي استخدام له يمنح صلاحية الوصول إلى واجهات الـ API.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- GET: عرض فئات الكروت -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border overflow-hidden">
        <div
          class="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          @click="toggleSection('categories')"
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm font-bold">GET</span>
            <h2 class="text-base sm:text-xl font-bold text-gray-900">عرض فئات الكروت</h2>
          </div>
          <i :class="expandedSections.categories ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-xl sm:text-2xl text-gray-400"></i>
        </div>
        <div v-show="expandedSections.categories" class="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2">Endpoint</h3>
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm">
              <span class="text-green-600 font-bold">GET</span> /api/v1/cards/categories
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2">Headers</h3>
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-1">
              <div><span class="text-blue-600">Authorization:</span> Bearer &lt;API_TOKEN&gt;</div>
              <div><span class="text-blue-600">Content-Type:</span> application/json</div>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2 sm:mb-3">Query Parameters</h3>
            <div class="overflow-x-auto">
              <table class="w-full border border-gray-200 rounded-lg text-right">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Parameter</th>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Type</th>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Required</th>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">lang</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">string</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">اختياري</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">ar / en</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">page</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">integer</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">اختياري</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">رقم الصفحة</td>
                  </tr>
                  <tr>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">limit</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">integer</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">اختياري</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">عدد النتائج</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2">Response Example</h3>
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre class="text-gray-800 whitespace-pre">{{ categoriesResponseExample }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- POST: شراء كارت من الطرف الخارجي -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border overflow-hidden">
        <div
          class="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          @click="toggleSection('purchase')"
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-bold">POST</span>
            <h2 class="text-base sm:text-xl font-bold text-gray-900">شراء كارت من الطرف الخارجي</h2>
          </div>
          <i :class="expandedSections.purchase ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'" class="text-xl sm:text-2xl text-gray-400"></i>
        </div>
        <div v-show="expandedSections.purchase" class="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2">Endpoint</h3>
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm">
              <span class="text-blue-600 font-bold">POST</span> /api/v1/cards/purchase
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2">Headers</h3>
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-1">
              <div><span class="text-blue-600">Authorization:</span> Bearer &lt;API_TOKEN&gt;</div>
              <div><span class="text-blue-600">Content-Type:</span> application/json</div>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2 sm:mb-3">Request Body</h3>
            <div class="overflow-x-auto">
              <table class="w-full border border-gray-200 rounded-lg text-right">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Field</th>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Type</th>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Required</th>
                    <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b bg-red-50">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">customer_id</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">string</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Required</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">معرف العميل</td>
                  </tr>
                  <tr class="border-b bg-red-50">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">card_category_id</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">integer</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Required</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">معرف فئة الكارت</td>
                  </tr>
                  <tr class="border-b bg-red-50">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">amount</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">decimal</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Required</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">المبلغ</td>
                  </tr>
                  <tr class="border-b bg-red-50">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">external_order_id</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">string</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Required</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">رقم الطلب الخارجي</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">customer_name</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">string</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Optional</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">اسم العميل</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">notes</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">string</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Optional</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">ملاحظات</td>
                  </tr>
                  <tr>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 font-mono text-xs sm:text-sm">metadata</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">object</td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Optional</span>
                    </td>
                    <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">بيانات إضافية</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-2">Response Example</h3>
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre class="text-gray-800 whitespace-pre">{{ purchaseResponseExample }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Codes -->
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4">Error Codes</h2>
        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 rounded-lg text-right">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Code</th>
                <th class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2 sm:py-3 px-3 sm:px-4">
                  <span class="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded font-mono text-xs sm:text-sm font-bold">401</span>
                </td>
                <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700">Unauthorized – غير مصرح</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 sm:py-3 px-3 sm:px-4">
                  <span class="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded font-mono text-xs sm:text-sm font-bold">403</span>
                </td>
                <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700">Forbidden – محظور</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 sm:py-3 px-3 sm:px-4">
                  <span class="px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 rounded font-mono text-xs sm:text-sm font-bold">422</span>
                </td>
                <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700">Validation Error – خطأ في التحقق</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 sm:py-3 px-3 sm:px-4">
                  <span class="px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 rounded font-mono text-xs sm:text-sm font-bold">409</span>
                </td>
                <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700">Duplicate external_order_id – رقم طلب مكرر</td>
              </tr>
              <tr>
                <td class="py-2 sm:py-3 px-3 sm:px-4">
                  <span class="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded font-mono text-xs sm:text-sm font-bold">500</span>
                </td>
                <td class="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700">Server Error – خطأ في الخادم</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Regenerate Token Modal -->
    <Teleport to="body">
      <div
        v-if="showRegenerateModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showRegenerateModal = false"
      >
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <i class="ri-alert-line text-2xl text-orange-600"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-2">تأكيد إعادة توليد التوكن</h2>
              <p class="text-sm text-gray-600">
                سيتم إلغاء التوكن الحالي ولن يعمل بعد الآن. هل أنت متأكد؟
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <button
              type="button"
              class="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="regenerating"
              @click="showRegenerateModal = false"
            >
              إلغاء
            </button>
            <button
              type="button"
              class="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="regenerating"
              @click="handleRegenerate"
            >
              <i v-if="regenerating" class="ri-loader-4-line animate-spin"></i>
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast -->
    <Teleport to="body">
      <div v-if="toastMessage" class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div
          class="text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-3"
          :class="toastVariant === 'error' ? 'bg-red-600' : 'bg-green-600'"
        >
          <i :class="toastVariant === 'error' ? 'ri-error-warning-line' : 'ri-check-line'" class="text-xl"></i>
          <span class="font-semibold text-sm sm:text-base">{{ toastMessage }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const showToken = ref(false);
const showRegenerateModal = ref(false);
const regenerating = ref(false);
const toastMessage = ref('');
const toastVariant = ref<'success' | 'error'>('success');
const expandedSections = ref<Record<string, boolean>>({
  categories: true,
  purchase: true,
});

const apiToken = ref('pk_live_51Hx7K2eZvKYlo2C9xYz3mN8pQ4rT6vU1wS2dF3gH4jK5lM6nO7pQ8rS9tU0vW1xY2zA3bC4dE5fG6hI7jK8lM9nO0pQ');

let toastTimeout: ReturnType<typeof setTimeout> | null = null;
function showToast(message: string, variant: 'success' | 'error' = 'success') {
  if (toastTimeout) clearTimeout(toastTimeout);
  toastMessage.value = message;
  toastVariant.value = variant;
  toastTimeout = setTimeout(() => {
    toastMessage.value = '';
    toastTimeout = null;
  }, 3000);
}

const categoriesResponseExample = `{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "كروت الشحن",
      "icon_url": "https://example.com/icon.png",
      "is_active": true
    }
  ]
}`;

const purchaseResponseExample = `{
  "status": "success",
  "order_id": 45821,
  "payment_status": "paid",
  "card_serial": "XXXX-XXXX-XXXX",
  "message": "تمت عملية الشراء بنجاح"
}`;

function copyToken() {
  navigator.clipboard.writeText(apiToken.value);
  showToast('تم نسخ التوكن بنجاح');
}

async function handleRegenerate() {
  regenerating.value = true;
  showRegenerateModal.value = false;
  try {
    const res = await $fetch<{ token: string }>('/api/regenerate-token', { method: 'POST' });
    if (res?.token) {
      apiToken.value = res.token;
      showToast('تم إعادة توليد التوكن بنجاح');
    } else {
      showToast('لم يتم استلام توكن جديد', 'error');
    }
  } catch {
    showToast('فشل إعادة توليد التوكن. حاول مرة أخرى.', 'error');
  } finally {
    regenerating.value = false;
  }
}

function toggleSection(section: string) {
  expandedSections.value = {
    ...expandedSections.value,
    [section]: !expandedSections.value[section],
  };
}
definePageMeta({
  layout: 'dashboard',
});
</script>
