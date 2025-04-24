<h1 align="center">📢 每日早报 + 热搜推送脚本</h1>
<p align="center">通过 Telegram Bot 推送 60s 早报 + 多平台热搜，自动高效掌握每日热点 🚀</p>

---

## ✨ 功能特色

- 📬 **自动推送 60s 读懂世界**
- 🔥 **支持多个平台热搜：**
  - 微博、知乎、抖音、B站、头条等
- ⚙️ **灵活配置内容类型**
- 🛠 **基于 Node.js 编写，部署简单**
- 📅 **支持定时任务，适配青龙面板等自动化平台**

---

## 🔧 环境变量配置

请设置以下环境变量用于脚本运行：

```bash
export QL_60s_TYPE='60s,WeiBo,DouYin,ZhiHu'
export TG_BOT_TOKEN='你的Telegram Bot Token'
export TG_USER_ID='你的Telegram 用户ID'
