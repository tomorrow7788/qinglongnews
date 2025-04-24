/*
cron: 30 7 * * *
名称: 每日早报 + 热搜
环境变量:
export QL_60s_TYPE='60s,WeiBo,DouYin,ZhiHu'
export TG_BOT_TOKEN='你的Telegram Bot Token'
export TG_USER_ID='你的Telegram用户ID'
*/

const https = require('https');
const httpsReq = require('https');
const querystring = require('querystring');

const ALL_TYPE = {
  '60s': '60s读懂世界',
  BiliBli: 'B站热搜',
  WeiBo: '微博热搜',
  ZhiHu: '知乎热榜',
  TouTiao: '头条热搜',
  DouYin: '抖音热搜',
  Baidu: '百度热搜',
  SoGou: '搜狗热搜',
  So: '360热搜',
  KuaiShou: '快手热搜',
  BaiduTieBa: '贴吧热搜',
};

// ✅ 获取环境变量
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_USER_ID = process.env.TG_USER_ID;

function getJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let raw = '';
      res.on('data', chunk => (raw += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(raw);
          resolve(json);
        } catch (e) {
          reject(new Error('解析 JSON 失败: ' + e.message));
        }
      });
    }).on('error', err => reject(err));
  });
}

// ✅ 使用 Telegram Bot 发送消息
async function notify(content, title = '消息提醒') {
  if (!TG_BOT_TOKEN || !TG_USER_ID) {
    console.log(`❌ 未设置 TG_BOT_TOKEN 或 TG_USER_ID`);
    console.log(`【${title}】\n${content}`);
    return;
  }

  const postData = querystring.stringify({
    chat_id: TG_USER_ID,
    text: `${title}\n\n${content}`,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  });

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${TG_BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = httpsReq.request(options, res => {
      let raw = '';
      res.on('data', chunk => (raw += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ 推送成功：${title}`);
          resolve();
        } else {
          console.log(`❌ 推送失败:`, raw);
          reject(raw);
        }
      });
    });

    req.on('error', e => {
      console.error(`❌ Telegram发送失败: ${e.message}`);
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

// ✅ 60s简报
async function fetch60s() {
  try {
    const info = await getJSON(`https://60s.lzw.me/api?type=60s`);
    if (!info?.data?.news || !Array.isArray(info.data.news)) {
      throw new Error('接口数据结构错误');
    }

    const news = info.data.news.map((d, i) => `${i + 1}. ${d}`).join('\n');
    const tip = info.data.tip || '';
    const link = info.data.link || info.data.url || '';
    const finalMsg = `${news}\n\n📌 ${tip}\n🔗 原文链接: ${link}\n\n🔢 共 ${info.data.news.length} 条`;

    await notify(finalMsg, `[60s]60s读懂世界`);
  } catch (err) {
    console.error('60s 接口错误:', err.message);
    await notify('获取60s失败: ' + err.message, '[60s]60s读懂世界');
  }
}

// ✅ gumengya 热搜
async function fetchOtherHot(type) {
  try {
    const apiUrl = `https://api.gumengya.com/Api/${type}Hot?format=json`;
    const info = await getJSON(apiUrl);
    if (!info?.data || !Array.isArray(info.data)) throw new Error('返回数据结构不合法');

    let news = '';
    for (let i = 0; i < Math.min(info.data.length, 8); i++) {
      const item = info.data[i];
      news += `${i + 1}. ${item.title}\n🔗 ${item.url}\n\n`;
    }

    const title = ALL_TYPE[type] || `${type}热搜`;
    const stat = `🔢 共 ${info.data.length} 条（推送前8条）`;
    await notify(`${news}${stat}`, `[${type}]${title}`);
  } catch (err) {
    console.error(`${type} 错误:`, err.message);
    await notify(`${type} 热搜获取失败: ${err.message}`, `[${type}]获取失败`);
  }
}

// ✅ 主程序入口
async function start() {
  const types = (process.env.QL_60s_TYPE || '60s').split(',');
  for (const type of types.map(t => t.trim())) {
    if (type === '60s') {
      await fetch60s();
    } else {
      await fetchOtherHot(type);
    }
  }
}

start().finally(() => process.exit(0));
