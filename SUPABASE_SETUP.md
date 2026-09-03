# 正式环境数据库接入

本项目使用独立的 Supabase 项目，不与 Maria Studio Demo 共用数据库。

## 一次性配置

1. 在项目的 **SQL Editor** 新建查询，完整执行仓库根目录的 `supabase.sql`。
2. 在 **Project Settings → API Keys** 复制：
   - Project URL；
   - Publishable key（如界面仍显示 legacy key，则使用 anon/public key）。
3. 将两项填入 `config.js`。不要把 Secret key、`service_role` key 或数据库密码放进项目。
4. 运行内部验收脚本：

```bash
work/.venv/bin/python work/verify_supabase.py \
  --url "https://xxxxx.supabase.co" \
  --anon-key "你的 publishable 或 anon key"
```

脚本会写入一份标记为自动验收的测试结果和反馈，并确认匿名访客不能读取、修改或删除数据。

## 独立管理后台

测试网站不部署后台页面、登录窗口或管理入口。站长直接登录 [Supabase Dashboard](https://supabase.com/dashboard/) 管理：

- **Table Editor → test_result_overview**：测试时间、总耗时、测试结果、报告编号；
- **Table Editor → feedback_overview**：建议时间、类别、内容、关联报告和状态；
- **Table Editor → test_results**：需要排查时查看完整匿名答卷；
- **Table Editor → feedback**：修改建议的处理状态。

这些页面受 Supabase 账号登录保护，不属于公开测试网站。公开访客只有业务表的 `INSERT` 权限，无法读取任何提交记录。

## 数据边界

- 不采集姓名、手机号、账号、位置或浏览器指纹；
- 不主动采集或保存 IP 地址；
- 测试表只保存完成时间、总耗时、测试结果、匿名报告编号及答题数据；
- 反馈表只保存建议内容、类别、状态及可选的关联报告编号；
- 单份记录最长保留 12 个月，清理语句在 `supabase.sql` 末尾。
