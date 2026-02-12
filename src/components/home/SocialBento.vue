<script setup lang="ts">
import OrganizationsCard from "@/components/home/OrganizationsCard.vue";
import educationImage from "@/assets/xx.png";
import musicImage from "@/assets/jiaoyuan (中).jpeg";
import vscodeImage from "@/assets/画板 15.png";
import type { Organization } from "@/types/home";

interface SceneCard {
  id: string;
  category: string;
  title: string;
  footer: string;
  image: string;
  chips?: string[];
  action?: string;
}

defineProps<{
  organizations: {
    current: Organization[];
    past: Organization[];
  };
}>();

const sceneCards: SceneCard[] = [
  {
    id: "starrail",
    category: "爱好游戏",
    title: "崩坏：星穹铁道",
    footer: "国际服 826866884",
    image: "https://zerocat-bitiful.houlangs.com/assets/61/db/61db461ae5cc36bd4df2f07630f64dfc.jpg",
  },
  {
    id: "vscode",
    category: "微软大战代码",
    title: "Visual Studio Code",
    footer: "Code editing. Redefined.",
    image: vscodeImage,
  },
  {
    id: "education",
    category: "学历",
    title: "高中（在读）",
    footer: "不知名学校",
    image: educationImage,
  },
  {
    id: "music",
    category: "音乐偏好",
    title: "古风",
    footer: "您在视频下评论『为人民服务』被举报涉嫌违规，经核实已被移除。",
    image: musicImage,

  },
];
</script>

<template>
  <section class="section-reveal grid grid-cols-1 gap-5 md:grid-cols-2">
    <OrganizationsCard
      :current="organizations.current"
      :past="organizations.past"
      class="h-[18rem] sm:h-[20rem]"
    />

    <article class="bento-card relative h-[18rem] overflow-hidden rounded-xl sm:h-[20rem]">
      <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500" />
      <div class="relative flex h-full flex-col p-6 sm:p-7">
        <p class="text-sm font-semibold text-white/85">座右铭</p>
        <h3 class="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
鸷鸟之不群兮，<br/>自前世而固然。

        </h3>
        <p class="mt-3 text-lg font-bold text-white/90 sm:text-2xl">
          离骚 屈原
        </p>
      </div>
    </article>

    <article
      v-for="card in sceneCards"
      :key="card.id"
      class="bento-card group relative h-[18rem] overflow-hidden rounded-xl sm:h-[20rem]"
    >
      <img
        :src="card.image"
        :alt="card.title"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

      <div class="relative flex h-full flex-col justify-between p-6 sm:p-7">
        <div>
          <p class="text-sm font-semibold text-white/80">{{ card.category }}</p>
          <h3 class="mt-2 text-4xl font-black leading-tight text-white sm:text-5xl">
            {{ card.title }}
          </h3>
        </div>

        <div class="flex items-end justify-between gap-3">
          <div>
            <p class="text-lg font-semibold text-white/90">
              {{ card.footer }}
            </p>
            <div v-if="card.chips?.length" class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="chip in card.chips"
                :key="chip"
                class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/15 text-xs font-semibold text-white shadow-sm backdrop-blur-sm"
              >
                {{ chip.slice(0, 1) }}
              </span>
            </div>
          </div>

          <span
            v-if="card.action"
            class="inline-flex items-center rounded-full border border-white/35 bg-white/15 px-3 py-1.5 text-sm font-semibold text-white/95 backdrop-blur-sm"
          >
            {{ card.action }}
          </span>
        </div>
      </div>
    </article>
  </section>
</template>
