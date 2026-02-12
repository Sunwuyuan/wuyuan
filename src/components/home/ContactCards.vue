<script setup lang="ts">
import { ArrowUpRight, X } from "lucide-vue-next";
import { computed, onBeforeUnmount, ref, watch } from "vue";

import AppIcon from "@/components/home/AppIcon.vue";
import type { ContactLink } from "@/types/home";

const props = defineProps<{
  contacts: ContactLink[];
}>();

interface ContactCard extends ContactLink {
  nickname: string;
  resolvedLogo: string;
}

const qrModalContact = ref<ContactCard | null>(null);
const qrOwnerName = "孙悟元";

const contactCards = computed<ContactCard[]>(() =>
  props.contacts.map((contact) => ({
    ...contact,
    nickname: resolveNickname(contact),
    resolvedLogo: resolveLogo(contact),
  })),
);

function resolveLogo(contact: ContactLink) {
  if (contact.logo?.trim()) {
    return contact.logo;
  }

  const href = contact.href;
  if (href.startsWith("mailto:")) {
    return "";
  }

  if (!/^https?:\/\//.test(href)) {
    return "";
  }

  try {
    const targetUrl = new URL(href);
    return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(targetUrl.origin)}`;
  } catch {
    return "";
  }
}

function resolveNickname(contact: ContactLink) {
  if (contact.handle?.trim()) {
    return contact.handle;
  }

  return resolveFallbackNickname(contact.href);
}

function resolveFallbackNickname(href: string) {
  if (href.startsWith("mailto:")) {
    return href.replace("mailto:", "");
  }

  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function isQrContact(contact: ContactCard) {
  return Boolean(contact.qrCode);
}

function closeQrModal() {
  qrModalContact.value = null;
}

function openQrModal(contact: ContactCard) {
  qrModalContact.value = contact;
}

function handleQrContactClick(event: MouseEvent, contact: ContactCard) {
  event.preventDefault();
  openQrModal(contact);
}

function handleEscKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeQrModal();
  }
}

watch(qrModalContact, (contact) => {
  if (contact) {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscKeydown);
    return;
  }

  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleEscKeydown);
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleEscKeydown);
});
</script>

<template>
  <section class="section-reveal">

    <div class="flex flex-wrap gap-2 sm:hidden">
      <template v-for="contact in contactCards" :key="`mobile-${contact.href}`">
        <button
          v-if="isQrContact(contact)"
          type="button"
          :title="contact.label"
          class="group inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-card/90 text-muted-foreground transition-colors duration-200 hover:border-primary/45 hover:text-primary"
          @click="handleQrContactClick($event, contact)"
        >
          <img
            v-if="contact.resolvedLogo"
            :src="contact.resolvedLogo"
            :alt="`${contact.label} logo`"
            class="h-3.5 w-3.5 rounded-sm"
            loading="lazy"
          />
          <AppIcon v-else :name="contact.icon" class="h-3.5 w-3.5" />
          <span class="sr-only">{{ contact.label }}</span>
        </button>

        <a
          v-else
          :href="contact.href"
          target="_blank"
          rel="noreferrer"
          :title="contact.label"
          class="group inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-card/90 text-muted-foreground transition-colors duration-200 hover:border-primary/45 hover:text-primary"
        >
          <img
            v-if="contact.resolvedLogo"
            :src="contact.resolvedLogo"
            :alt="`${contact.label} logo`"
            class="h-3.5 w-3.5 rounded-sm"
            loading="lazy"
          />
          <AppIcon v-else :name="contact.icon" class="h-3.5 w-3.5" />
          <span class="sr-only">{{ contact.label }}</span>
        </a>
      </template>
    </div>

    <div class="hidden gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
      <template v-for="contact in contactCards" :key="`desktop-${contact.href}`">
        <button
          v-if="isQrContact(contact)"
          type="button"
          class="bento-card group rounded-xl p-4 text-left sm:p-5"
          @click="handleQrContactClick($event, contact)"
        >
          <div class="flex items-start justify-between gap-3">
            <span
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-card/80 shadow-sm"
            >
              <img
                v-if="contact.resolvedLogo"
                :src="contact.resolvedLogo"
                :alt="`${contact.label} logo`"
                class="h-7 w-7 rounded-md"
                loading="lazy"
              />
              <AppIcon v-else :name="contact.icon" class="h-5 w-5 text-muted-foreground" />
            </span>

            <ArrowUpRight
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>

          <div class="mt-4 min-w-0 space-y-1">
            <p class="truncate text-base font-semibold text-foreground">{{ contact.nickname }}</p>
            <p class="truncate text-xs tracking-wide text-muted-foreground">{{ contact.label }}</p>
          </div>
        </button>

        <a
          v-else
          :href="contact.href"
          target="_blank"
          rel="noreferrer"
          class="bento-card group rounded-xl p-4 sm:p-5"
        >
          <div class="flex items-start justify-between gap-3">
            <span
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-card/80 shadow-sm"
            >
              <img
                v-if="contact.resolvedLogo"
                :src="contact.resolvedLogo"
                :alt="`${contact.label} logo`"
                class="h-7 w-7 rounded-md"
                loading="lazy"
              />
              <AppIcon v-else :name="contact.icon" class="h-5 w-5 text-muted-foreground" />
            </span>

            <ArrowUpRight
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>

          <div class="mt-4 min-w-0 space-y-1">
            <p class="truncate text-base font-semibold text-foreground">{{ contact.nickname }}</p>
            <p class="truncate text-xs tracking-wide text-muted-foreground">{{ contact.label }}</p>
          </div>
        </a>
      </template>
    </div>

    <Teleport to="body">
      <div
        v-if="qrModalContact"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          class="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
          aria-label="关闭二维码弹框"
          @click="closeQrModal"
        />

        <div class="relative w-full max-w-xs rounded-2xl border border-border bg-card p-5 shadow-2xl">
          <button
            type="button"
            class="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="关闭"
            @click="closeQrModal"
          >
            <X class="h-4 w-4" />
          </button>

          <p class="text-xs text-muted-foreground">{{ qrModalContact.label }}</p>
          <h3 class="mt-1 text-xl font-semibold text-foreground">{{ qrOwnerName }}</h3>
          <img
            v-if="qrModalContact.qrCode"
            :src="qrModalContact.qrCode"
            alt="微信公众号二维码"
            class="mx-auto mt-4 h-52 w-52 rounded-xl border border-border/60 bg-white p-1"
            loading="lazy"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>
