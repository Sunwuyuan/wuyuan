import avatar from "@/assets/avatar.svg";
import classworksLogo from "@/assets/cslogo.svg";
import zerocatLogo from "@/assets/zerocatlogo.svg";
import type { HomeContent } from "@/types/home";

export const homeContent: HomeContent = {
  profile: {
    name: "孙悟元",
    motto: "鸷鸟之不群兮，自前世而固然。",
    avatar,
    email: "sun@wuyuan.dev",
    quickLinks: [
      {
        label: "Kernyr 社区",
        href: "https://kernyr.wuyuan.dev",
        icon: "globe",
      },
      {
        label: "ZeroCat",
        href: "https://zerocat.dev",
        icon: "globe",
      },
      {
        label: "GitHub",
        href: "https://github.com/SunWuyuan",
        icon: "github",
      },
      {
        label: "邮箱",
        href: "mailto:sun@wuyuan.dev",
        icon: "mail",
      },
    ],
  },
  featuredProduct: {
    id: "zerocat",
    name: "ZeroCat 社区",
    slogan: "新一代开源编程社区",
    description: "Scratch 开源创作社区",
    logo: zerocatLogo,
    cover: "../src/assets/zerocat-cover.png",
    href: "https://zerocat.dev",
    repo: "https://github.com/ZeroCatDev/ZeroCat",
    tags: ["开源社区", "Scratch"],
    featured: true,
  },
  products: [
    {
      id: "kernyr",
      name: "Kernyr 社区",
      slogan: "kernyr.wuyuan.dev",
      description: "Kernyr 社区产品站点",
      logo: "https://www.google.com/s2/favicons?sz=128&domain_url=https://kernyr.wuyuan.dev",
      cover: "https://placehold.co/1600x900/ecf4ff/0f172a?text=Kernyr+Community",
      href: "https://kernyr.wuyuan.dev",
      tags: ["社区产品"],
    },
    {
      id: "classworks",
      name: "Classworks 作业板",
      slogan: "班级大屏作业展示工具",
      description: "课堂展示场景工具",
      logo: classworksLogo,
      cover: "https://placehold.co/1600x900/e9fbf4/0f172a?text=Classworks",
      href: "https://cs.houlangs.com",
      repo: "https://github.com/ZeroCatDev/Classworks",
      tags: ["教育工具", "大屏场景"],
    },
    {
      id: "classworks-kv",
      name: "Classworks KV 服务",
      slogan: "kv.houlang.cloud",
      description: "Classworks 键值存储服务",
      logo: "https://www.google.com/s2/favicons?sz=128&domain_url=https://kv.houlang.cloud",
      cover: "https://placehold.co/1600x900/e6f4ff/0f172a?text=Classworks+KV",
      href: "https://kv.houlang.cloud",
      tags: ["KV", "基础服务"],
    },
  ],
  social: {
    github: {
      username: "SunWuyuan",
      href: "https://github.com/SunWuyuan",
    },

    youtube: {
      channelName: "SunWuyuan",
      href: "https://youtube.com/",
    },
    bilibili: {
      uid: "661404066",
      username: "孙悟元",
      href: "https://space.bilibili.com/661404066",
    },
  },
  contacts: [
    {
      label: "GitHub",
      href: "https://github.com/SunWuyuan",
      icon: "github",
      handle: "@SunWuyuan",
    },
    {
      label: "Twitter / X",
      href: "https://x.com/wuyuandev",
      icon: "message-circle",
      handle: "@wuyuandev",
    },
    {
      label: "邮箱",
      href: "mailto:sun@wuyuan.dev",
      icon: "mail",
      handle: "sun@wuyuan.dev",
    },
    {
      label: "Telegram",
      href: "https://t.me/wuyuandev",
      icon: "send",
      handle: "@wuyuandev",
    },
  ],
  organizations: {
    current: [
      {
        name: "厚浪云",
        description: "长江后浪推前浪 浮世新人换旧人",
        period: "2024 - 至今",
        href: "https://hlyun.org/",
      },
      {
        name: "秦氏工作室 (YDJ 工作室)",
        description: "Scratch 工作室",
        period: "2021 - 至今",
        href: "https://ydj.wuyuan.dev/",
      },
    ],
    past: [],
  },
};
