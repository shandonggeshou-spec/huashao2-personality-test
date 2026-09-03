# 花路人格局

一款“你是《花儿与少年》第二季中的哪种旅行人格”娱乐测试。每次按主题平衡组合 24 道原创旅行情境题，并随机排列题目与选项；重复测试可能遇到不同场景。测试输出主/副人格、六维关系雷达、人格光谱与相处建议。

## 本地预览

```bash
python3 -m http.server 8000 -d .
```

打开 `http://localhost:8000`。不配置数据库也能完整答题，结果会保存在当前浏览器的 `localStorage`。

## 配置结果存储和反馈

1. 登录 [Supabase](https://supabase.com/) 并新建免费项目。
2. 打开 **SQL Editor**，执行仓库中的 `supabase.sql`。
3. 在 **Project Settings → API** 复制 Project URL 和 anon/public key。
4. 填入 `config.js`：

```js
window.APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_ANON_KEY",
  siteName: "花路人格局"
};
```

前端公开 anon key 是 Supabase 的正常用法。`supabase.sql` 已启用 RLS：访客只能新增记录，不能读取、修改或删除数据。测试网站不包含管理入口或管理员登录页；站长使用独立的 Supabase Dashboard 查看 `test_result_overview` 和 `feedback_overview`。

`supabase.sql` 末尾附有 12 个月数据保留期的清理语句。正式运营时由站长定期执行，或在 Supabase 中配置定时任务。

详细配置、权限验收和站长查看方式见 `SUPABASE_SETUP.md`。

## 部署到 GitHub Pages

1. 在 GitHub 新建空仓库，例如 `huashao2-personality-test`。
2. 在本目录执行：

```bash
git init
git add .
git commit -m "Launch 花少2旅行人格测试"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/huashao2-personality-test.git
git push -u origin main
```

3. 仓库 **Settings → Pages → Build and deployment** 选择 `Deploy from a branch`，分支选 `main` 和 `/ (root)`。

几分钟后网站会发布到 `https://YOUR_NAME.github.io/huashao2-personality-test/`。

## 文件说明

- `index.html`：页面结构与文案
- `styles.css`：响应式视觉设计
- `app.js`：随机抽题、七种人格、计分与数据提交
- `questions-extra.js`：扩展旅行情境题
- `config.js`：Supabase 配置
- `supabase.sql`：数据库表和安全策略
- `CONTENT_NOTES.md`：视频内容结构化梳理与测试转译方法
- `METHODOLOGY.md`：量表计分、配平方法与已知限制
- `PRIVACY.md`：匿名结果和反馈的数据说明
- `SUPABASE_SETUP.md`：正式数据库配置和验收说明

## 内容与隐私

- 本测试为独立创作的娱乐内容，不是专业心理量表。
- 题目为原创情境，不复制视频逐字稿或节目台词。
- 不要求姓名、手机号、社交账号等身份字段；意见箱不提供联系方式输入项。
- 不主动采集或保存 IP、城市、精确位置、浏览器指纹等信息。
- 后台数据只在独立的 Supabase Dashboard 中查看，不在测试网站公开任何管理入口。
- 正式运营按 `PRIVACY.md` 和数据库注释执行 12 个月数据保留与删除流程。
