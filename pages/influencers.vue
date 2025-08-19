<template>
  <div class="p-8">
    <h1 class="text-2xl font-semibold mb-4">Influencers</h1>
    <div v-if="pending">Loading influencers...</div>
    <div v-else>
      <div v-if="error" class="text-red-600">
        Error loading influencers: {{ error.message }}
      </div>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="inf in influencers"
          :key="inf.id"
          class="border rounded-lg p-4 hover:shadow"
        >
          <NuxtLink :to="`/i/${inf.handle}`" class="no-underline">
            <img
              v-if="inf.avatar_url"
              :src="inf.avatar_url"
              :alt="inf.name"
              class="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 class="text-xl font-medium mb-1">{{ inf.name }}</h2>
            <p class="text-gray-600 mb-1">{{ inf.niche }}</p>
            <p class="text-sm">Followers: {{ inf.total_followers }}</p>
            <p class="text-sm">Engagement: {{ (inf.avg_engagement_rate || 0).toFixed(2) }}%</p>
            <p class="text-sm">Starting rate: {{ inf.starting_rate || '-' }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseClient } from "@nuxtjs/supabase";

// Fetch the list of influencers from the v_influencers view.
const client = useSupabaseClient();
const { data: influencers, pending, error } = await useAsyncData(
  "influencers",
  async () => {
    const { data, error } = await client.from("v_influencers").select("*");
    if (error) throw error;
    return data || [];
  }
);
</script>
