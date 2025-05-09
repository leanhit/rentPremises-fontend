<template>
    <nav
        class="flex items-center justify-between p-4 border-b shadow-sm bg-white sticky top-0 z-50">
        <!-- Logo -->
        <div class="text-2xl font-bold text-pink-600">
            <span>airbnb</span>
        </div>

        <!-- Search -->
        <!--<div
            class="hidden md:flex items-center border rounded-full py-2 px-4 shadow-sm hover:shadow-md cursor-pointer w-[450px] transition">
            <input
                v-model="searchQuery"
                @keyup.enter="updateSearch"
                type="text"
                :placeholder="t('search.placeholder')"
                class="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" />
            <button
                @click="updateSearch"
                class="ml-2 text-gray-500 hover:text-gray-700 transition">
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        </div>-->
        <!-- Search box center -->
        <div class="flex-1 flex justify-center">
            <SearchBox />
        </div>

        <!-- Right Menu -->
        <div class="flex items-center gap-4">
            <!-- Host Button -->
            <a href="\lease" class="text-sm font-semibold">Cho thuê mặt bằng</a>

            <!-- Globe Icon -->
            <div class="relative" ref="globeMenu">
                <button
                    @click.stop="toggleGlobeDropdown"
                    class="w-10 h-10 rounded-full hover:bg-gray-100 transition flex items-center justify-center">
                    <div class="w-6 h-6 flex items-center justify-center">
                        <span
                            class="w-5 h-5 flex items-center justify-center"
                            v-html="currentFlag">
                        </span>
                    </div>
                </button>

                <!-- Dropdown menu -->
                <div
                    v-if="globeDropdownVisible"
                    class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul class="py-2">
                        <!-- Languages -->
                        <li
                            v-for="(item, index) in local.supportedLocales"
                            :key="'lang-' + index"
                            class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            @click="changeLocale(item.value)">
                            <div class="flex items-center gap-2">
                                <span
                                    class="w-5 h-5 flex items-center justify-center"
                                    v-html="item.flag">
                                </span>
                                {{ item.label }}
                            </div>
                        </li>

                        <li class="border-t my-2"></li>

                        <!-- Currencies -->
                        <li
                            v-for="(item, index) in local.currencyEnum"
                            :key="'currency-' + index"
                            class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                            @click="changeCurrency(item.value)">
                            <span>{{ item.label }} ({{ item.symbol }})</span>
                            <span
                                v-if="item.value === currentCurrency"
                                class="text-green-500"
                                >✓</span
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <!-- User Menu -->
            <div class="relative" ref="dropdownMenu">
                <div
                    class="flex items-center gap-2 border rounded-full p-2 hover:shadow-md cursor-pointer"
                    @click.stop="toggleDropdown">
                    <svg
                        class="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="M2.5 5a.5.5 0 01.5-.5h14a.5.5 0 010 1h-14a.5.5 0 01-.5-.5zM2 10a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15A.5.5 0 012 10zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z" />
                    </svg>
                    <img
                        :src="userAvatarUrl"
                        alt="User"
                        class="w-8 h-8 rounded-full" />
                </div>

                <div
                    v-if="dropdownVisible"
                    class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul class="py-2">
                        <template v-if="isAuthenticated">
                            <li
                                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                <a href="/profile">Profile</a>
                            </li>
                            <li
                                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Your Listings
                            </li>
                            <li
                                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Settings
                            </li>
                            <li class="border-t my-2"></li>
                            <li
                                @click="handleLogout"
                                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Logout
                            </li>
                        </template>
                        <template v-else>
                            <li
                                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                <a href="/login">Login</a>
                            </li>
                            <li
                                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                <a href="/register">Sign Up</a>
                            </li>
                            <li class="border-t my-2"></li>
                            <li
                                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                <a href="/help">Help</a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" src="@/scripts/layout/topnav/index.ts"></script>
