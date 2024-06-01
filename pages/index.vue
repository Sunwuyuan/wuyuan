<script setup lang="ts">
const route = useRoute()
import 'mdui/mdui.css';
import 'mdui';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';
setColorScheme('#3a8cd6');
import '~/assets/grid.css'

</script>

<template>

  <div class="container mx-auto ui-container">
    <div class="  mx-8  my-24 ">
      <svg width="182" height="182" viewBox="0 0 182 182" fill="none" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" class="w-120px h-120px md:w-150px md:h-150px lg:w-180px lg:h-180px">
        <path
          d="M65.8329 7.61157C81.0982 -2.46432 100.902 -2.46432 116.167 7.61157V7.61157C121.03 10.8211 126.461 13.0708 132.169 14.2397V14.2397C150.088 17.9091 164.091 31.9124 167.76 49.8313V49.8313C168.929 55.539 171.179 60.9705 174.388 65.8329V65.8329C184.464 81.0982 184.464 100.902 174.388 116.167V116.167C171.179 121.03 168.929 126.461 167.76 132.169V132.169C164.091 150.088 150.088 164.091 132.169 167.76V167.76C126.461 168.929 121.03 171.179 116.167 174.388V174.388C100.902 184.464 81.0982 184.464 65.8329 174.388V174.388C60.9705 171.179 55.539 168.929 49.8313 167.76V167.76C31.9124 164.091 17.9091 150.088 14.2397 132.169V132.169C13.0708 126.461 10.8211 121.03 7.61157 116.167V116.167C-2.46432 100.902 -2.46432 81.0982 7.61157 65.8329V65.8329C10.8211 60.9705 13.0708 55.539 14.2397 49.8313V49.8313C17.9091 31.9124 31.9123 17.9091 49.8313 14.2397V14.2397C55.539 13.0708 60.9705 10.8211 65.8329 7.61157V7.61157Z"
          fill="#C4C4C4"></path>
        <path
          d="M65.8329 7.61157C81.0982 -2.46432 100.902 -2.46432 116.167 7.61157V7.61157C121.03 10.8211 126.461 13.0708 132.169 14.2397V14.2397C150.088 17.9091 164.091 31.9124 167.76 49.8313V49.8313C168.929 55.539 171.179 60.9705 174.388 65.8329V65.8329C184.464 81.0982 184.464 100.902 174.388 116.167V116.167C171.179 121.03 168.929 126.461 167.76 132.169V132.169C164.091 150.088 150.088 164.091 132.169 167.76V167.76C126.461 168.929 121.03 171.179 116.167 174.388V174.388C100.902 184.464 81.0982 184.464 65.8329 174.388V174.388C60.9705 171.179 55.539 168.929 49.8313 167.76V167.76C31.9124 164.091 17.9091 150.088 14.2397 132.169V132.169C13.0708 126.461 10.8211 121.03 7.61157 116.167V116.167C-2.46432 100.902 -2.46432 81.0982 7.61157 65.8329V65.8329C10.8211 60.9705 13.0708 55.539 14.2397 49.8313V49.8313C17.9091 31.9124 31.9123 17.9091 49.8313 14.2397V14.2397C55.539 13.0708 60.9705 10.8211 65.8329 7.61157V7.61157Z"
          fill="url(#pattern0)"></path>
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_14_11" transform="scale(0.00138889)"></use>
          </pattern>
          <image id="image0_14_11" width="720" height="720" xlink:href="https://cdn.wuyuan.dev/sitelogo.png"></image>
        </defs>
      </svg>
      <div
        class="text-slate-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl !leading-tight tracking-tight dark:text-white mt-6 font-serif">
        孙悟元</div>
      <div class=" text-xl   mx-auto  font-serif">刀光似月，影渡徘徊</div>
      <br />
     
      <mdui-card style="width: 100%;">

        <mdui-button icon="public" href="https://blog.wuyuan.dev" target="_blank"
          style="margin-right: 5px;">博客</mdui-button>
        <mdui-button icon="public" href="https://zerocat.wuyuan.dev" target="_blank"
          style="margin-right: 5px;">ZeroCat社区</mdui-button>
        <mdui-button icon="public" href="https://space.bilibili.com/661404066" target="_blank"
          style="margin-right: 5px;">哔哩哔哩</mdui-button>
        <mdui-button icon="public" href="https://github.com/sunwuyuan" target="_blank"
          style="margin-right: 5px;">Github</mdui-button>



      </mdui-card>
      <div style=" " class="ui-row ">
        <card3D dataImage="/800px-2.0匹诺康尼.png" class="ui-col-sm-12 ui-col-md-5" coverImage="/画板18.png" href="https://blog.wuyuan.dev"/>
        <card3D dataImage="/624f42a6452944fb8b6f.png" class="ui-col-sm-12 ui-col-md-5" coverImage="/画板19.png" href="https://zerocat.wuyuan.dev"/>

      </div>

      <mdui-card variant="filled" style="width: 100%;  padding:1rem;">
        <img
          src="https://gh.190823.xyz/https://raw.githubusercontent.com/sunwuyuan/sunwuyuan/output/github-contribution-grid-snake-dark.svg"></img>
        <div style="width: 100%; padding:0.5rem; margin-top: 1rem;" class="mdui-prose">



          <div class=" text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white mt-6 font-serif">你好，我是孙悟元</div>
          <p class="text-base" style="margin-left: 0.2rem"> 来自中国初中学生,<br />代码写的不是很好，也不经常在线，如果需要联系请发邮件给sun@wuyuan.dev
          </p>

        </div>

        <mdui-card variant="elevated" style="width: 100%; padding:0.5rem; margin-top: 1rem;">
          <mdui-list>
            <mdui-list-subheader>Personal Introduction / 个人介绍</mdui-list-subheader>

            <mdui-collapse>
              <mdui-collapse-item value="item-1">
                <mdui-list-item rounded slot="header" icon="school"><mdui-icon slot="end-icon"
                    name="keyboard_arrow_down"></mdui-icon>学校</mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item rounded description="或许以后公开?" icon="school">某不知名小学</mdui-list-item>
                  <mdui-list-item rounded description="或许以后曝光?" icon="school">某不知名初中</mdui-list-item>
                </div>
              </mdui-collapse-item>
              <mdui-collapse-item value="item-2">
                <mdui-list-item rounded slot="header" icon="favorite"><mdui-icon slot="end-icon"
                    name="keyboard_arrow_down"></mdui-icon>技能&amp;特长</mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item rounded description="前端/Nodejs/画饼" icon="code">软件编程</mdui-list-item>
                  <mdui-list-item rounded description="摸鱼，无论上课与下课" icon="table">摸鱼🐟</mdui-list-item>
                  <mdui-list-item rounded> <img
                      src="https://github-readme-stats.190823.xyz/api?username=SUNWUYUAN&theme=github_dark&show_icons=true"></img>
                  </mdui-list-item>
                  <mdui-list-item rounded> <img
                      src="https://github-readme-stats.190823.xyz/api/top-langs/?username=SUNWUYUAN&layout=compact&theme=github_dark"></img>
                  </mdui-list-item>
                </div>

              </mdui-collapse-item>
            </mdui-collapse>
          </mdui-list>
        </mdui-card>
        <mdui-card variant="elevated" style="width: 100%; padding:0.5rem; margin-top: 1rem;">
          <mdui-list>
            <mdui-list-subheader>Project / 作品</mdui-list-subheader>
            <mdui-collapse class="example-value">
              <mdui-collapse-item value="item-1">
                <mdui-list-item rounded slot="header" icon="movie"><mdui-icon slot="end-icon"
                    name="keyboard_arrow_down"></mdui-icon>ZeroCat社区<span
                    slot="description">开源Scratch社区</span></mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item rounded>
                    <mdui-button href="https://zerocat.wuyuan.dev" target="_blank" icon="public" name="" value=""
                      type="button" variant="filled">网站</mdui-button>
                    <mdui-button href="https://github.com/zerocatdev/zerocat" target="_blank" icon="public" name=""
                      value="" type="button" variant="filled">Github</mdui-button>

                  </mdui-list-item>
                </div>
              </mdui-collapse-item>
            </mdui-collapse></mdui-list>
        </mdui-card>
        <mdui-card variant="elevated" style="width: 100%; padding:0.5rem; margin-top: 1rem;">
          <mdui-list>
            <mdui-list-subheader>Organization / 组织</mdui-list-subheader>
            <mdui-list-item rounded href="https://langs.ink/" target="_blank" end-icon="open_in_new">
              厚浪云<span slot="description">长江后浪推前浪 浮世新人换旧人 本人2024-至今</span>
            </mdui-list-item>

            <mdui-list-item rounded end-icon="open_in_new" href="https://ydj.wuyuan.dev/">
              秦氏工作室(YDJ工作室)
              <span slot="description">有道小图灵上的Scratch工作室 本人2021-至今</span>
            </mdui-list-item>

            <mdui-collapse class="example-value">
              <mdui-collapse-item value="item-1">
                <mdui-list-item rounded slot="header" icon="history"><mdui-icon slot="end-icon"
                    name="keyboard_arrow_down"></mdui-icon>已退出<span slot="description">历史</span></mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item rounded>
                    蜜蜂云<span slot="description">不好评价 本人2024-2024</span>
                  </mdui-list-item>
                </div>
              </mdui-collapse-item>
            </mdui-collapse>
          </mdui-list>
        </mdui-card>
        <mdui-card variant="elevated" style="width: 100%; padding:0.5rem; margin-top: 1rem;">
          <mdui-list>
            <mdui-list-subheader>Social Information / 社交信息</mdui-list-subheader>

            <mdui-list-item rounded description="661404066" icon="people" href='https://space.bilibili.com/661404066'
              target="_blank" end-icon="open_in_new">哔哩哔哩 悟元喵</mdui-list-item>
            <mdui-list-item rounded description="sunwuyuan" icon="people" href='https://www.zhihu.com/people/sunwuyuan'
              target="_blank" end-icon="open_in_new">知乎 孙悟元​</mdui-list-item>
            <mdui-list-item rounded description="SunWuyuan" icon="people" href='https://github.com/SunWuyuan'
              target="_blank" end-icon="open_in_new">Github SunWuyuan</mdui-list-item>
            <mdui-list-item rounded description="群聊" icon="people" href='https://qm.qq.com/q/q4Uw6NSWIg' target="_blank"
              end-icon="open_in_new">QQ群聊 悟元喵喵喵</mdui-list-item>
            <mdui-collapse>

              <mdui-collapse-item value="item-1">
                <mdui-list-item rounded slot="header" icon="people"><mdui-icon slot="end-icon"
                    name="keyboard_arrow_down"></mdui-icon>Emmm</mdui-list-item>
                <div style="margin-left: 2.5rem">
                  <mdui-list-item rounded description="@sunwuyuan" icon="people"
                    href='https://www.youtube.com/@sunwuyuan'>YouTube</mdui-list-item>
                </div>
              </mdui-collapse-item>

            </mdui-collapse>
          </mdui-list>
        </mdui-card>
      </mdui-card>


    </div>
  </div>
  <!-- Filled -->
  <link href="https://fonts.font.im/icon?family=Material+Icons" rel="stylesheet">
</template>

<style>
.mdui-list-margin {
  margin-left: 2.5rem
}

:not(:defined) {
  visibility: hidden;
}
</style>