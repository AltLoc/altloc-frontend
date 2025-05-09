<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";

useSeoMeta({
  title: "Privacy Policy",
  description:
    "Learn about our privacy policy, including data collection, usage, and your rights.",
  keywords: "privacy policy, data collection, user rights",
  ogTitle: "Privacy Policy | AltLoc",
  ogDescription:
    "Learn about our privacy policy, including data collection, usage, and your rights.",
  ogUrl: "https://altloc.com/legal/privacy-policy",
  ogType: "website",
});
</script>

<template>
  <MainLayout>
    <section class="relative mt-12 mb-12 p-3 px-6 md:px-10">
      <div
        class="container max-w-4xl mx-auto flex flex-col gap-6 text-zinc-800"
      >
        <h1 class="text-3xl font-bold text-blue-700">Privacy Policy</h1>
        <p class="text-sm text-zinc-500">Last updated: May 9, 2025</p>

        <p>
          Welcome to AltLoc. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our service.
          Please read it carefully.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">
          1. Information We Collect
        </h2>
        <ul class="list-disc list-inside space-y-1">
          <li>
            <strong>Personal Information:</strong> Name, email address, language
            preferences, and optionally social media handles.
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, actions taken,
            timestamps, and device/browser type.
          </li>
          <li>
            <strong>Cookies:</strong> We use cookies to improve the experience
            and gather analytics.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-blue-700">
          2. How We Use Your Information
        </h2>
        <ul class="list-disc list-inside space-y-1">
          <li>To personalize your experience and progress in the platform.</li>
          <li>To improve our features based on user behavior.</li>
          <li>
            To communicate important updates or newsletters (with opt-in).
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-blue-700">
          3. Data Sharing and Disclosure
        </h2>
        <p>
          We do not sell your personal data. We may share limited information
          with trusted services (e.g., hosting, analytics providers) under data
          processing agreements.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">4. Your Rights</h2>
        <ul class="list-disc list-inside space-y-1">
          <li>Access and review your data.</li>
          <li>Correct or delete your information.</li>
          <li>Withdraw consent at any time.</li>
          <li>Contact us to request data export or deletion.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-blue-700">5. Data Retention</h2>
        <p>
          We retain your data for as long as your account is active or as needed
          to provide you with the service.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">6. Security</h2>
        <p>
          We implement security measures such as HTTPS, hashed passwords, and
          server-side access controls. However, no method of transmission over
          the internet is 100% secure.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">
          7. Third-Party Links
        </h2>
        <p>
          Our site may contain links to third-party websites. We are not
          responsible for their content or privacy practices.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">
          8. Children's Privacy
        </h2>
        <p>
          Our service is not intended for users under 13 years old. We do not
          knowingly collect data from children.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">
          9. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be posted
          on this page with an updated date.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">10. Contact Us</h2>
        <p>
          If you have any questions or requests, contact us at
          <a href="mailto:contact@altloc.com" class="text-blue-600 underline">
            contact@altloc.com </a
          >.
        </p>
      </div>
    </section>
  </MainLayout>
</template>
