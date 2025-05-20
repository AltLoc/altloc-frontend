<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <AppLayout>
    <section class="relative mt-6 px-3 md:px-10">
      <div class="container mx-auto flex flex-col gap-4">
        <h3
          class="text-xl sm:text-4xl font-bold text-center sm:text-left flex justify-start"
        >
          Guide
        </h3>

        <div
          class="flex flex-col space-y-10 gap-6 text-base leading-relaxed dark:text-gray-200 bg-neutral-300 dark:bg-neutral-800 rounded-lg p-6 shadow-md text-zinc-700"
          style="background: linear-gradient(180deg, #f0f4f8 0%, #e0e7ff 100%)"
        >
          <!-- Intro -->
          <section class="text-zinc-700">
            <p>
              <strong>AltLoc</strong> is a gamified self-development platform
              that turns your personal growth into an RPG-like adventure.
            </p>
          </section>

          <!-- Identity Matrix -->
          <section class="text-zinc-700">
            <h2 class="text-2xl font-semibold mb-2">🧠 Identity Matrix</h2>
            <p>
              Your personal development path. You define what kind of person you
              want to become — healthy, disciplined, creative, confident, etc.
            </p>
          </section>

          <!-- Domains -->
          <section class="text-zinc-700">
            <h2 class="text-2xl font-semibold mb-2">🌍 Domains</h2>
            <p>
              Life areas you want to improve — like Health, Finance, Education,
              or Creativity. You organize your goals into these categories.
            </p>
          </section>

          <!-- Habits -->
          <section class="text-zinc-700">
            <h2 class="text-2xl font-semibold mb-2">🔁 Habits</h2>
            <p>
              Specific daily actions like reading, working out, or meditating.
              Completing habits earns you XP and crystals 💎.
            </p>
          </section>

          <!-- Daily Comment -->
          <section class="text-zinc-700">
            <h2 class="text-2xl font-semibold mb-2">📝 Daily Comment</h2>
            <p>
              A space for daily reflection. Write how your day went, what
              worked, what didn’t, and how you felt.
            </p>
          </section>

          <!-- How it works -->
          <section class="text-zinc-700">
            <h2 class="text-2xl font-semibold mb-3">🎮 How it works</h2>
            <ul class="list-disc list-inside space-y-1">
              <li>
                <a
                  href="/user/matrix/create"
                  target="_blank"
                  class="text-blue-500 underline"
                >
                  Create your Identity Matrix
                </a>
              </li>
              <li>Add Domains (growth areas)</li>
              <li>Create Habits (daily actions)</li>
              <li>Complete tasks, earn XP and crystals</li>
              <li>Reflect with Daily Comments</li>
              <li>Track progress and level up!</li>
            </ul>
          </section>

          <!-- Mission -->
          <section class="text-zinc-700">
            <h2 class="text-2xl font-semibold mb-2">🎯 Our Mission</h2>
            <p>
              We turn boring self-improvement into an exciting quest. Build
              habits, reach goals, grow — all in a game-like experience.
            </p>
          </section>
        </div>
      </div>
    </section>
  </AppLayout>
</template>
