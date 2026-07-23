# ▲ SAKURA — 海外虚拟好物商店

少而美的海外虚拟商品代购小店（静态网站）。黑白终端风视觉 + 手绘线条插画，纯 HTML / CSS / JavaScript 实现，无任何框架和构建步骤。

**在线预览**：<https://merlowy.github.io/sakura-store/>

## 页面

| 页面 | 文件 | 说明 |
| --- | --- | --- |
| 首页 | `index.html` | 黑白双终端动画首屏、商品星图（连线呈现在售品类）、FAQ 手风琴、顾客评价轮播 |
| 商品列表 | `store.html` | 商品清单与结账弹窗（帆船航道装饰动画） |
| 登录 / 注册 | `login.html` | 前后叠卡切换的毛玻璃登录/注册卡、Welcome Back 果冻弹窗、乘风小纸船 |
| 客服 | `support.html` | 聊天式客服页（消息撕裂删除、纸飞机等细节动画） |

## 在售品类

邮箱账号（Gmail / Outlook / ProtonMail）· AI 订阅（ChatGPT Plus / Claude Pro / Midjourney）· 海外手机号（实体号 / eSIM）· 礼品卡（App Store / Google Play / Steam）· 流媒体会员（Netflix / Spotify / YouTube Premium）

## 本地运行

任意静态服务器即可，例如：

```bash
python -m http.server 8000
# 打开 http://localhost:8000/index.html
```

## 特色

- 全站黑白 mono 终端美学，统一的硬阴影 + 虚线边框语言
- 大量手工 CSS 动画：打字机、进度条循环、连线描画与呼吸、3D 翻卡、果冻收缩弹窗、纸船纸飞机等
- 所有动画均适配 `prefers-reduced-motion`
- 零依赖，直接部署到 GitHub Pages
