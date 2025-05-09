<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";

useSeoMeta({
  title: "Terms of Service | AltLoc",
  description:
    "Read the Terms of Service for AltLoc and understand the rules governing your use of our platform.",
  ogTitle: "Terms of Service | AltLoc",
  ogDescription: "Terms and conditions for using the AltLoc platform",
  ogUrl: "https://altloc.com/terms",
  ogType: "website",
});
</script>

<template>
  <MainLayout>
    <section class="relative mt-12 mb-12 p-3 px-6 md:px-10">
      <div
        class="container max-w-4xl mx-auto flex flex-col gap-6 text-zinc-800"
      >
        <h1 class="text-3xl font-bold text-blue-700">Terms of Service</h1>
        <p class="text-sm text-zinc-500">Last updated: May 9, 2025</p>

        <p>
          These Terms of Service ("Terms") govern your access to and use of the
          AltLoc platform. By using AltLoc, you agree to be bound by these
          Terms.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">
          1. Use of the Platform
        </h2>
        <ul class="list-disc list-inside space-y-1">
          <li>You must be at least 13 years old to use AltLoc.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account.
          </li>
          <li>
            You agree not to misuse the platform or attempt to disrupt its
            functionality.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-blue-700">2. User Content</h2>
        <p>
          You retain ownership of the content you create (e.g., notes, goals,
          progress). However, by using the service, you grant us a limited
          license to use that content solely for providing the service.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">
          3. Intellectual Property
        </h2>
        <p>
          All platform content, code, branding, and designs are the intellectual
          property of AltLoc or its licensors. You may not copy, modify, or
          redistribute any part of the platform without written permission.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">4. Termination</h2>
        <p>
          We may suspend or terminate your access at any time for violation of
          these Terms. You may stop using the service at any time by deleting
          your account.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">
          5. Limitation of Liability
        </h2>
        <p>
          AltLoc is provided “as is” without warranties. We are not liable for
          any indirect damages or loss of data due to use of the platform.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">6. Modifications</h2>
        <p>
          We may revise these Terms from time to time. We’ll notify you of major
          changes, and your continued use of the service means you accept the
          new Terms.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">7. Governing Law</h2>
        <p>
          These Terms are governed by the laws of your country of residence
          unless otherwise required by law.
        </p>

        <h2 class="text-2xl font-semibold text-blue-700">8. Contact</h2>
        <p>
          If you have any questions or concerns, please contact us at
          <a href="mailto:contact@altloc.com" class="text-blue-600 underline"
            >contact@altloc.com</a
          >.
        </p>
      </div>
    </section>
  </MainLayout>
</template>
