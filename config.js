// Supabase 的 anon key 本来就是供浏览器公开使用的；真正的安全边界在 supabase.sql 的 RLS 策略。
// 留空时网站仍可完整测试，结果仅保存在访问者自己的浏览器。
window.APP_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",
  siteName: "花路人格局"
};
