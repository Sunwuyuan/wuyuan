<template>
  <div class="container mx-auto " style="max-width: 1280px;">
    <div class="mx-8 my-24">
      <LogoSvg image-url="/src/assets/sitelogo.png" class="animate-fade-in " />
      <div
        class="font-bold text-4xl sm:text-5xl lg:text-6xl !leading-tight tracking-tight dark:text-white mt-6 animate-slide-up"
      >
        {{ profile.name }}
      </div>
      <div class="text-xl sm:text-2xl lg:text-3xl mx-auto animate-slide-up-delay">
        {{ profile.motto }}
      </div>
      <br />


        <mdui-button
          v-for="link in quickLinks"
          :key="link.url"
          :icon="link.icon"
          :href="link.url"
          target="_blank"
          class="quick-link-btn"
          >{{ link.text }}</mdui-button
        >


      <br />
      <!-- ZeroCat Card -->
      <ZeroCatCard class="shadow-elegant"/>
      <ClassworksCard class="shadow-elegant"/>
      <br />

      <mdui-card variant="filled" style="width: 100%; padding: 1rem" class="shadow-elegant">
        <img :src="githubSnake" />
        <div
          style="width: 100%; padding: 0.5rem; margin-top: 1rem"
          class="mdui-prose"
        >
          <div
            class="text-3xl sm:text-4xl lg:text-4xl tracking-tight dark:text-white mt-6"
          >
            {{ introduction.greeting }}
          </div>
          <p
            class="text-base"
            style="margin-left: 0.2rem"
            v-html="introduction.description"
          ></p>
        </div>

        <!-- Personal Introduction Card -->
        <mdui-card
          variant="elevated"
          style="width: 100%; padding: 0.5rem; margin-top: 1rem"
          class="shadow-elegant"
        >
          <mdui-list>
            <mdui-list-subheader>{{
              sections.personal.title
            }}</mdui-list-subheader>

            <mdui-collapse>
              <mdui-collapse-item
                v-for="(item, index) in sections.personal.items"
                :key="index"
                :value="'item-' + (index + 1)"
              >
                <mdui-list-item rounded slot="header" :icon="item.icon">
                  <mdui-icon
                    slot="end-icon"
                    name="keyboard_arrow_down"
                  ></mdui-icon>
                  <b>{{ item.title }}</b>
                  <span slot="description">{{ item.description }}</span>
                </mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item
                    v-for="(subItem, subIndex) in item.content"
                    :key="subIndex"
                    rounded
                    :description="subItem.description"
                    :icon="subItem.icon"
                  >
                    <template v-if="subItem.type === 'text'">
                      <b>{{ subItem.text }}</b>
                    </template>
                    <template v-else-if="subItem.type === 'image'">
                      <img :src="subItem.src" />
                    </template>
                  </mdui-list-item>
                </div>
              </mdui-collapse-item>
            </mdui-collapse>
          </mdui-list>
        </mdui-card>

        <!-- Projects Card -->
        <mdui-card
          variant="elevated"
          style="width: 100%; padding: 0.5rem; margin-top: 1rem"
          class="shadow-elegant"
        >
          <mdui-list>
            <mdui-list-subheader>{{
              sections.projects.title
            }}</mdui-list-subheader>
            <mdui-collapse class="example-value">
              <mdui-collapse-item
                v-for="(project, index) in sections.projects.items"
                :key="index"
                :value="'item-' + (index + 1)"
              >
                <mdui-list-item rounded slot="header" :icon="project.icon">
                  <mdui-icon
                    slot="end-icon"
                    name="keyboard_arrow_down"
                  ></mdui-icon>
                  <b>{{ project.title }}</b>
                  <span slot="description">{{ project.description }}</span>
                </mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <template v-if="project.component">
                    <component :is="project.component"></component>
                  </template>
                  <template v-else>
                    <mdui-list-item
                      v-for="link in project.links"
                      :key="link.url"
                      rounded
                      :href="link.url"
                      target="_blank"
                      :icon="link.icon"
                      end-icon="open_in_new"
                      :description="link.description"
                    >
                      {{ link.text }}
                    </mdui-list-item>
                  </template>
                </div>
              </mdui-collapse-item>
            </mdui-collapse>
          </mdui-list>
        </mdui-card>

        <!-- Organizations Card -->
        <mdui-card
          variant="elevated"
          style="width: 100%; padding: 0.5rem; margin-top: 1rem"
          class="shadow-elegant"
        >
          <mdui-list>
            <mdui-list-subheader>{{
              sections.organizations.title
            }}</mdui-list-subheader>
            <mdui-list-item
              v-for="org in sections.organizations.current"
              :key="org.name"
              rounded
              :href="org.url"
              target="_blank"
              end-icon="open_in_new"
            >
              <b>{{ org.name }}</b>
              <span slot="description">{{ org.description }}</span>
            </mdui-list-item>

            <mdui-collapse>
              <mdui-collapse-item value="item-1">
                <mdui-list-item rounded slot="header" icon="history">
                  <mdui-icon
                    slot="end-icon"
                    name="keyboard_arrow_down"
                  ></mdui-icon>
                  {{ sections.organizations.past.title }}
                  <span slot="description">{{
                    sections.organizations.past.description
                  }}</span>
                </mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item
                    v-for="org in sections.organizations.past.items"
                    :key="org.name"
                    rounded
                  >
                    <b>{{ org.name }}</b>
                    <span slot="description">{{ org.description }}</span>
                  </mdui-list-item>
                </div>
              </mdui-collapse-item>
            </mdui-collapse>
          </mdui-list>
        </mdui-card>

        <!-- Social Information Card -->
        <mdui-card
          variant="elevated"
          style="width: 100%; padding: 0.5rem; margin-top: 1rem"
          class="shadow-elegant"
        >
          <mdui-list>
            <mdui-list-subheader>{{
              sections.social.title
            }}</mdui-list-subheader>

            <mdui-list-item
              v-for="platform in sections.social.mainPlatforms"
              :key="platform.name"
              rounded
              :description="platform.description"
              :icon="platform.icon"
              :href="platform.url"
              target="_blank"
              end-icon="open_in_new"
              >{{ platform.name }}</mdui-list-item
            >

            <mdui-collapse>
              <mdui-collapse-item value="item-1">
                <mdui-list-item rounded slot="header" icon="people">
                  <mdui-icon
                    slot="end-icon"
                    name="keyboard_arrow_down"
                  ></mdui-icon>
                  {{ sections.social.other.title }}
                </mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item
                    v-for="platform in sections.social.other.platforms"
                    :key="platform.name"
                    rounded
                    :description="platform.description"
                    :icon="platform.icon"
                    :href="platform.url"
                    >{{ platform.name }}</mdui-list-item
                  >
                </div>
              </mdui-collapse-item>
            </mdui-collapse>
          </mdui-list>
        </mdui-card>
      </mdui-card>
    </div>
  </div>
</template>

<script>
import "@/style/grid.css";
import LogoSvg from "@/components/LogoSvg.vue";
import ZeroCatCard from "@/components/ZeroCatCard.vue";
import ClassworksCard from "@/components/ClassworksCard.vue";
export default {
  name: "IndexPage",
  components: {
    LogoSvg,
    ZeroCatCard,
    ClassworksCard,
  },
  mounted() {
    // 为每个卡片添加索引以实现级联动画
    const cards = document.querySelectorAll('.mdui-card');
    cards.forEach((card, index) => {
      card.style.setProperty('--card-index', index);
    });
  },
  data() {
    return {
      profile: {
        name: "孙悟元",
        motto: "鸷鸟之不群兮，自前世而固然。",
      },
      quickLinks: [
        { icon: "public", text: "ZeroCat社区", url: "https://zerocat.dev" },
        {
          icon: "tv",
          text: "哔哩哔哩",
          url: "https://space.bilibili.com/661404066",
        },
        { icon: "code", text: "Github", url: "https://github.com/sunwuyuan" },
      ],
      githubSnake:
        "https://gh.190823.xyz/https://raw.githubusercontent.com/sunwuyuan/sunwuyuan/output/github-contribution-grid-snake-dark.svg",
      introduction: {
        greeting: "你好，我是孙悟元",
        description:
          "来自中国初中学生,<br />代码写的不是很好，也不经常在线，如果需要联系请发邮件给sun@wuyuan.dev",
      },
      sections: {
        personal: {
          title: "Personal Introduction / 个人介绍",
          items: [
            {
              title: "学校",
              description: "高中了",
              icon: "school",
              content: [
                {
                  type: "text",
                  text: "某不知名小学",
                  description: "或许以后公开?",
                  icon: "school",
                },
                {
                  type: "text",
                  text: "某不知名初中",
                  description: "或许以后公开?",
                  icon: "school",
                },
              ],
            },
            {
              title: "技能&特长",
              description: "几乎啥都不会",
              icon: "favorite",
              content: [
                {
                  type: "text",
                  text: "软件编程",
                  description: "前端/Nodejs/画饼",
                  icon: "code",
                },
                {
                  type: "text",
                  text: "摸鱼🐟",
                  description: "摸鱼，无论上课与下课",
                  icon: "table",
                },
                {
                  type: "image",
                  src: "https://github-readme-stats.190823.xyz/api?username=SUNWUYUAN&theme=github_dark&show_icons=true",
                },
                {
                  type: "image",
                  src: "https://github-readme-stats.190823.xyz/api/top-langs/?username=SUNWUYUAN&layout=compact&theme=github_dark",
                },
              ],
            },
          ],
        },
        projects: {
          title: "Project / 作品",
          items: [
            {
              title: "ZeroCat 社区",
              description: "开源Scratch社区",
              icon: "extension",
              component: "ZeroCatCard",
            },
            {
              title: "Classworks 作业板",
              description: "适用于班级大屏的作业板小工具",
              icon: "school",
              component: "ClassworksCard",
              links: [
                {
                  text: "网站",
                  url: "https://cs.houlangs.com",
                  icon: "public",
                  description: "在线访问地址",
                },
                {
                  text: "Github",
                  url: "https://github.com/ZeroCatDev/Classworks",
                  icon: "code",
                  description: "开源代码仓库",
                },
              ],
            },
          ],
        },
        organizations: {
          title: "Organization / 组织",
          current: [
            {
              name: "厚浪云",
              description: "长江后浪推前浪 浮世新人换旧人 本人2024-至今",
              url: "https://hlyun.org/",
            },
            {
              name: "秦氏工作室(YDJ工作室)",
              description: "有道小图灵上的Scratch工作室 本人2021-至今",
              url: "https://ydj.wuyuan.dev/",
            },
          ],
          past: {
            title: "已退出",
            description: "历史",
            items: [
              {
                name: "蜜蜂云",
                description: "不好评价 本人2024-2024",
              },
            ],
          },
        },
        social: {
          title: "Social Information / 社交信息",
          mainPlatforms: [
            {
              name: "哔哩哔哩 悟元喵",
              description: "661404066",
              icon: "tv",
              url: "https://space.bilibili.com/661404066",
            },
            {
              name: "知乎 孙悟元​",
              description: "sunwuyuan",
              icon: "question_answer",
              url: "https://www.zhihu.com/people/sunwuyuan",
            },
            {
              name: "Github SunWuyuan",
              description: "SunWuyuan",
              icon: "code",
              url: "https://github.com/SunWuyuan",
            },
            {
              name: "QQ群",
              description: "群聊",
              icon: "chat",
              url: "https://qm.qq.com/q/q4Uw6NSWIg",
            },
          ],
          other: {
            title: "Emmm",
            platforms: [
              {
                name: "YouTube",
                description: "@sunwuyuan",
                icon: "tv",
                url: "https://www.youtube.com/@sunwuyuan",
              },
              {
                name: "Telegram",
                description: "@zerocatdev",
                icon: "chat",
                url: "https://t.me/@zerocatdev",
              },
            ],
          },
        },
      },
    };
  },

};
</script>

<style>
.mdui-list-margin {
  margin-left: 2.5rem;
}

:not(:defined) {
  visibility: hidden;
}

/* 快速链接按钮样式 */
.quick-link-btn {
  margin-right: 5px;
  font-weight: bold;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.quick-link-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 25px rgba(var(--mdui-color-primary), 0.6);
}

.quick-link-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(circle at center, rgba(var(--mdui-color-primary), 0.3) 0%, transparent 80%);
  pointer-events: none;
}

.quick-link-btn:hover::after {
  opacity: 1;
}

/* 页面加载动画 */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.animate-slide-up-delay {
  animation: slideUp 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 卡片动画和阴影效果 */
.shadow-elegant {
  box-shadow:
    0px 0px 0px 1px rgba(14, 63, 126, 0.05),
    0px 2px 2px -1px rgba(42, 51, 70, 0.05),
    0px 4px 4px -2px rgba(42, 51, 70, 0.05),
    0px 8px 8px -4px rgba(42, 51, 70, 0.05),
    0px 16px 16px -8px rgba(14, 63, 126, 0.05),
    0px 32px 32px -16px rgba(14, 63, 126, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.shadow-elegant:hover {
  box-shadow:
    0px 0px 0px 1px rgba(14, 63, 126, 0.1),
    0px 4px 4px -1px rgba(42, 51, 70, 0.1),
    0px 8px 8px -2px rgba(42, 51, 70, 0.1),
    0px 16px 16px -4px rgba(42, 51, 70, 0.1),
    0px 32px 32px -8px rgba(14, 63, 126, 0.1),
    0px 64px 64px -16px rgba(14, 63, 126, 0.1);
}

.mdui-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 列表项动画 */
.mdui-list-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mdui-list-item:hover {
  transform: translateX(8px);
  background-color: rgba(var(--mdui-color-primary), 0.15);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
}

/* 折叠面板动画 */
.mdui-collapse-item {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mdui-collapse-item[open] {
  animation: expandCollapse 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes expandCollapse {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
