<template>
  <div class="p-8" v-if="influencer">
    <NuxtLink to="/influencers" class="text-blue-600 underline mb-4 inline-block">
      ← Back to influencers
    </NuxtLink>
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="w-full sm:w-1/3">
        <img
          v-if="influencer.avatar_url"
          :src="influencer.avatar_url"
          :alt="influencer.name"
          class="w-full h-48 object-cover rounded-md"
        />
      </div>
      <div class="flex-1">
        <h1 class="text-3xl font-bold mb-2">{{ influencer.name }}</h1>
        <p class="mb-4">{{ influencer.bio }}</p>

        <h2 class="text-2xl font-semibold mt-4 mb-2">Social Accounts</h2>
        <ul class="list-disc pl-5 mb-4" v-if="influencer.social_accounts && influencer.social_accounts.length">
          <li v-for="sa in influencer.social_accounts" :key="sa.id">
            {{ sa.network }} – {{ sa.username }}
            ({{ sa.follower_count }} followers,
            {{ sa.engagement_rate }}% engagement)
          </li>
        </ul>
        <div v-else>No social accounts listed.</div>

        <h2 class="text-2xl font-semibold mt-4 mb-2">Rate Cards</h2>
        <ul class="list-disc pl-5" v-if="influencer.rate_cards && influencer.rate_cards.length">
          <li v-for="rc in influencer.rate_cards" :key="rc.id">
            {{ rc.service }} – {{ rc.price }}
            <span v-if="rc.description">({{ rc.description }})</span>
          </li>
        </ul>
        <div v-else>No rate cards listed.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useSupabaseClient } from "@nuxtjs/supabase";

const route = useRoute();
const client = useSupabaseClient();
const handle = route.params.handle as string;

// Load a single influencer with related social accounts and rate cards.
const { data: influencer, error } = await useAsyncData(
  `influencer-${handle}`,
  async () => {
    const { data, error } = await client
      .from("influencer_profiles")
      .select("*, social_accounts(*), rate_cards(*)")
      .eq("handle", handle)
      .single();
    if (error) throw error;
    return data;
  }
);
</script>
