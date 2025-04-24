<h1 align="center">📰 每日早报 + 热搜推送脚本</h1>
<p align="center">通过 Telegram Bot 推送 60s 早报 + 多平台热搜，一键掌握每日最新热点 🚀</p>

---

## ✨ 功能特色

- 🗞 自动推送「60s 读懂世界」简报
- 🔥 多平台热搜（微博、知乎、抖音、B站等）同步更新
- 📦 支持多种类型自由组合，自定义推送内容
- 🔔 使用 Telegram Bot 消息推送
- 🧩 可部署至青龙面板等定时任务平台

---

## 📦 支持的平台类型

| 类型          | 描述         |
|---------------|--------------|
| `60s`         | 60s 读懂世界 |
| `WeiBo`       | 微博热搜     |
| `ZhiHu`       | 知乎热榜     |
| `DouYin`      | 抖音热搜     |
| `BiliBli`     | B站热搜      |
| `TouTiao`     | 今日头条     |
| `Baidu`       | 百度热搜     |
| `SoGou`       | 搜狗热搜     |
| `So`          | 360热搜      |
| `KuaiShou`    | 快手热搜     |
| `BaiduTieBa`  | 贴吧热搜     |

---

## 🤖 获取 Telegram Bot Token & 用户 ID

### 1️⃣ 获取 Bot Token
1. 打开 Telegram，搜索并开始与 [@BotFather](https://t.me/BotFather) 对话
2. 输入 `/newbot` 创建一个 Bot，设置名称和用户名
3. 完成后会返回一个 `Token`，形如：123456789:ABCdefGHIjkl-MNOPqrSTUvwxYZ

### 2️⃣ 获取你的 Telegram 用户 ID（推荐方法）
1. 打开 Telegram，搜索并私聊机器人 👉 [@userinfobot](https://t.me/userinfobot)
2. 发送任意消息
3. 它会返回你的 Telegram ID，例如：Your Telegram ID: 123456789

---

## ⚙️ 环境变量配置

以下变量用于控制脚本行为，请根据实际情况填写：

```bash
export QL_60s_TYPE='60s,WeiBo,DouYin,ZhiHu'
export TG_BOT_TOKEN='你的Telegram Bot Token'
export TG_USER_ID='你的Telegram 用户ID'
```
## ⚙️温馨提醒
<h3 style="color:red">❗温馨提示：</h3> <p><strong style="color:red">60s 早报接口建议每天只调用一次</strong>，否则可能会返回“接口格式错误”等异常。推荐每天早上定时获取，例如 <code>早上 7:30</code>。</p>
