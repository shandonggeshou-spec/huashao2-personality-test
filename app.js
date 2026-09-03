const CONFIG = window.APP_CONFIG || {};
const ASSESSMENT_VERSION = "3.0.0";
const QUESTIONS_PER_TEST = 24;
const QUESTIONS_PER_CHAPTER = 4;

const DIMENSIONS = [
  ["initiative", "主动掌控"],
  ["expression", "情绪表达"],
  ["boundary", "边界意识"],
  ["devotion", "团队投入"],
  ["confrontation", "冲突直面"],
  ["stability", "压力稳定"]
];

const PROFILES = {
  jing: { name: "井柏然", archetype: "清醒的定海神针", symbol: "⚓", color: "#326f89",
    summary: "你会先看清局面，再决定出手的力度。你愿意照顾团队，却很少把自己完全交给混乱；既能接住情绪，也知道什么时候该抽身。",
    traits: [["稳定不是迟钝", "越是兵荒马乱，你越能把事实、情绪和下一步分开处理。"], ["体面地解决问题", "你擅长给别人台阶，也希望重要问题能被认真说清。"], ["隐藏成本", "长期扮演可靠的人，容易让别人忘记你也会累、也需要被接住。"]],
    manual: [["团队位置", "稳定器 / 翻译官"], ["冲突反应", "先降温，再处理事实"], ["最在意", "公平、效率与彼此体面"], ["关系优势", "能理解多方立场"], ["关系盲区", "把疲惫藏得太深"], ["成长提醒", "可靠不等于事事都由你兜底"]],
    quote: "真正的成熟，不是永远不崩溃，而是知道什么值得接住，什么应该放下。" },
  ning: { name: "宁静", archetype: "直觉型破局者", symbol: "🔥", color: "#d94931",
    summary: "你对真假、强弱与关系里的暗流异常敏锐。与其维持表面和谐，你更愿意直接指出问题；只要认可一件事，就会给出很强的行动力与保护欲。",
    traits: [["对虚假低耐受", "场面话骗不过你，你会本能寻找每个人真正的动机。"], ["敢于重新开局", "当旧秩序失效，你不怕成为第一个说“这样不行”的人。"], ["隐藏成本", "锋利的判断跑得太快时，别人可能只感到被压迫，还没听懂你的在意。"]],
    manual: [["团队位置", "破局者 / 护航者"], ["冲突反应", "直面核心，不绕弯"], ["最在意", "真实、能力与担当"], ["关系优势", "关键时刻敢说敢做"], ["关系盲区", "结论先于沟通抵达"], ["成长提醒", "给别人一点跟上你的时间"]],
    quote: "真实可以锋利，但最有力量的锋利，知道刀尖应该朝向问题。" },
  xu: { name: "许晴", archetype: "高感受的真心派", symbol: "☁", color: "#d86e85",
    summary: "你把关系当成一种真实的情感联结，而不是共同完成任务的临时协议。氛围对你很重要；感受到爱时你明亮慷慨，感到疏离时也很难假装没事。",
    traits: [["高浓度感受力", "你能捕捉语气、眼神和关系温度里极细微的变化。"], ["不愿表演亲密", "你需要真实的喜欢，很难只为大局维持看似热闹的关系。"], ["隐藏成本", "当感受成为唯一证据，旁人会难以理解你的需求，也不知该怎样靠近。"]],
    manual: [["团队位置", "情绪显影剂"], ["冲突反应", "先感受关系是否安全"], ["最在意", "真心、偏爱与被理解"], ["关系优势", "真诚而有感染力"], ["关系盲区", "容易把落差理解为拒绝"], ["成长提醒", "把期待说出来，比让人猜更勇敢"]],
    quote: "敏感不是缺点；当你能为感受命名，它就不再只能以风暴的方式出现。" },
  zheng: { name: "郑爽", archetype: "超载的责任雷达", symbol: "📡", color: "#6e829d",
    summary: "你很早就开始扫描风险：钱够不够、时间赶不赶、别人是否满意。你希望事情被做好，也害怕自己让大家失望，于是常在主动承担与自我怀疑之间拉扯。",
    traits: [["风险雷达常开", "别人还在享受当下，你已经看见预算、时间和执行中的漏洞。"], ["责任感与不安共生", "你会努力掌控局面，因为失控很容易被你理解成“我没做好”。"], ["隐藏成本", "没有说出口的焦虑会变成急促、反复或突然撤退，让协作更加困难。"]],
    manual: [["团队位置", "预警员 / 执行者"], ["冲突反应", "先自责，再急于补救"], ["最在意", "不拖累别人、把事做好"], ["关系优势", "对细节和风险敏锐"], ["关系盲区", "把求助误认为失职"], ["成长提醒", "提前分工不是示弱，是管理"]],
    quote: "责任感不是一个人把所有路走完，而是让每个人都知道自己该走哪一段。" },
  mao: { name: "毛阿敏", archetype: "体面的现实管理者", symbol: "🌳", color: "#54745f",
    summary: "你擅长把旅行拉回能运转的现实：吃住、体力、规则和实际麻烦都在你的雷达里。你愿意承担，也在意场面体面；面对高风险冲突时，常先选择缓冲与管理。",
    traits: [["现实管理力", "你会关注吃住、体力、守时和执行漏洞，擅长让生活重新可持续。"], ["体面与分寸", "你能捕捉别人的情绪，也更习惯用成熟、委婉的方式表达关心。"], ["隐藏成本", "太在意风险和体面时，真正的需求可能只被暗示，重要决定也容易被推迟。"]],
    manual: [["团队位置", "现实管理者 / 长姐"], ["冲突反应", "先控风险，再处理情绪"], ["最在意", "体面、实用与可持续"], ["关系优势", "会照料现实，也能察觉情绪"], ["关系盲区", "希望别人主动领会暗示"], ["成长提醒", "把真实需求直说，比分寸周全更省力"]],
    quote: "真正的体面，不是把所有波澜藏住，而是让需要被看见，也让事情能继续。" },
  chen: { name: "陈意涵", archetype: "有边界的行动派", symbol: "☀", color: "#e8a638",
    summary: "你习惯用行动和好奇心穿过不确定，也能在亲密与独立之间保留选择权。你享受共同完成一件事的快乐，但不会为了站队放弃自己的节奏。",
    traits: [["行动制造能量", "运动、探索和主动尝试会迅速帮你从低气压中恢复。"], ["亲密而不粘连", "你能享受团队协作，也能清楚知道什么是自己的选择、什么是别人的课题。"], ["隐藏成本", "太快用行动翻篇时，可能压下自己的不舒服，也错过别人尚未说完的情绪。"]],
    manual: [["团队位置", "行动者 / 能量发动机"], ["冲突反应", "先找下一步可做的事"], ["最在意", "体验、自由与清晰边界"], ["关系优势", "主动、自洽、恢复快"], ["关系盲区", "不舒服容易被行动盖过去"], ["成长提醒", "慢下来听完，也是在保护边界"]],
    quote: "向前跑是你的天赋；偶尔停下来，也不会失去自由。" },
  yang: { name: "杨洋", archetype: "克制的秩序守望者", symbol: "🧭", color: "#4a6388",
    summary: "你重视规则、承诺和清楚的安排，不愿用情绪给别人增加负担。被忽略时你可能先独自消化，而不是立刻争取；但你的安静不代表没有立场。",
    traits: [["规则带来安全感", "明确的时间、地点和责任能让你安心，也让你成为可信赖的同行者。"], ["情绪克制", "你倾向先自我处理，不希望自己的不满破坏集体气氛。"], ["隐藏成本", "等别人主动发现你的需求，常会积累成“我果然不重要”的失落。"]],
    manual: [["团队位置", "秩序守望者"], ["冲突反应", "先忍耐，确认后再表达"], ["最在意", "承诺、尊重与清晰规则"], ["关系优势", "克制、可靠、执行稳定"], ["关系盲区", "需要容易说得太晚"], ["成长提醒", "及时发出坐标，别人才能找到你"]],
    quote: "表达需要不是麻烦别人，而是在共同的地图上标出你的位置。" }
};

const Q = (chapter, scene, text, options) => ({ chapter, scene, text, options });
const O = (text, people, dims) => ({ text, people, dims });
function readLocalList(key) {
  if (typeof localStorage === "undefined") return [];
  try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; }
  catch (_) { return []; }
}
function writeLocalList(key, value) {
  if (typeof localStorage === "undefined") return false;
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (_) { return false; }
}
const BASE_QUESTIONS = [
  Q("出发之前", "群聊突然安静", "七个人明早出发，但住宿和接机还没人确认。你会？", [
    O("马上拉一张清单，逐项确认负责人和截止时间", ["zheng","yang"], {initiative:2, stability:1, devotion:2}),
    O("先问大家想住得舒服还是省预算，再做方案", ["jing","mao"], {initiative:1, boundary:1, devotion:2}),
    O("直接发一个自己最想住的地方，号召大家快决定", ["ning","chen"], {initiative:2, expression:1, confrontation:1}),
    O("等气氛热起来再说，我不想一开始就像在上班", ["xu","chen"], {expression:1, boundary:1, stability:-1})]),
  Q("出发之前", "预算第一次分歧", "有人想住风景绝佳的贵酒店，有人坚持把钱留给后程。你最自然的反应是？", [
    O("把总预算摊开算，让数字代替争执", ["zheng","yang"], {boundary:1, stability:1, confrontation:1}),
    O("旅行开心最重要，贵一点也可以想办法补回来", ["xu","chen"], {expression:2, boundary:-1}),
    O("问清每个人的底线，做两档可选方案", ["jing","mao"], {devotion:2, stability:2}),
    O("不喜欢含糊，我会明确说哪个选择更合理", ["ning","yang"], {confrontation:2, boundary:2})]),
  Q("出发之前", "打包现场", "同伴带了四个大箱子，还默认大家会帮忙。你会？", [
    O("先帮这一次，但明确之后每个人要管理好自己的行李", ["jing","ning"], {boundary:2, devotion:1, confrontation:1}),
    O("既然一起旅行，能搭把手就搭把手", ["mao","chen"], {devotion:2, boundary:-1}),
    O("有点不舒服，但大概率先默默帮忙", ["yang","zheng"], {devotion:2, expression:-1}),
    O("直接问：你准备怎么处理这些箱子？", ["ning","xu"], {expression:2, confrontation:2, boundary:2})]),
  Q("出发之前", "陌生人的第一晚", "大家客气地聊天，却没有真正熟起来。你更可能？", [
    O("组织一个轻松小游戏，让气氛先动起来", ["chen","jing"], {initiative:2, devotion:1, stability:1}),
    O("找一两个合拍的人聊深一点，没必要和所有人熟", ["xu","ning"], {boundary:2, expression:2}),
    O("享受这种客气的平静，慢慢观察", ["mao","yang"], {stability:2, initiative:-1}),
    O("会担心是不是自己没照顾好大家，于是不断找话题", ["zheng","xu"], {devotion:2, stability:-2})]),

  Q("路上协作", "错过的集合时间", "一位同伴迟到，全队可能赶不上火车。你第一反应是？", [
    O("立刻查替代车次，同时让一个人联系对方", ["jing","zheng"], {initiative:2, stability:2, devotion:2}),
    O("很生气，会当面说清这件事影响了所有人", ["ning","yang"], {confrontation:2, boundary:2}),
    O("先赶车，等安全抵达后再谈责任", ["mao","jing"], {stability:2, confrontation:1}),
    O("担心迟到的人是不是出了状况，顾不上责备", ["xu","chen"], {devotion:2, expression:1, boundary:-1})]),
  Q("路上协作", "没人愿意当导游", "路线复杂、意见很多，大家都不愿负责。你会？", [
    O("接下任务，但要求每个人承担一块具体工作", ["jing","ning"], {initiative:2, boundary:2, devotion:2}),
    O("我可以做，只是会很担心大家不满意", ["zheng","yang"], {initiative:1, devotion:2, stability:-1}),
    O("我更适合配合，一个靠谱的人来定就好", ["mao","yang"], {initiative:-1, stability:1}),
    O("轮流当吧，今天谁最想去哪里就听谁的", ["chen","xu"], {boundary:1, expression:1, initiative:1})]),
  Q("路上协作", "意见被忽略", "你提了两次建议，大家都顺着另一个人继续讨论。你会？", [
    O("第三次明确说：请先听我把这个方案讲完", ["ning","jing"], {confrontation:2, expression:2, boundary:2}),
    O("不再争取，但之后参与感会明显下降", ["yang","xu"], {expression:-2, stability:-1}),
    O("换个更轻松的时机，单独和关键的人聊", ["mao","jing"], {stability:2, confrontation:1}),
    O("怀疑是不是自己说得不好，重新整理一个更细的版本", ["zheng","yang"], {devotion:2, stability:-2})]),
  Q("路上协作", "意外多出的半天", "天气让原计划全部取消。你最希望？", [
    O("立刻找一个新的户外体验，别浪费时间", ["chen","ning"], {initiative:2, stability:1}),
    O("大家慢慢吃顿饭，聊聊最近的感受", ["xu","mao"], {expression:2, devotion:1}),
    O("先确认交通和明天安排，再自由活动", ["yang","zheng"], {boundary:1, stability:2}),
    O("观察大家状态，疲惫就休息，想玩再分组", ["jing","mao"], {boundary:2, stability:2, devotion:1})]),

  Q("关系升温", "深夜的倾诉", "同伴半夜敲门，说自己在团队里很孤独。你会？", [
    O("认真听完，先让对方确认自己的感受被看见", ["xu","jing"], {expression:2, devotion:2}),
    O("陪着聊，但也会帮对方区分事实和猜测", ["jing","mao"], {stability:2, devotion:2}),
    O("直接指出：如果想改变，明天需要自己表达", ["ning","yang"], {confrontation:2, boundary:2}),
    O("拉对方出去散步或吃东西，先换换心情", ["chen","mao"], {initiative:1, stability:1, expression:1})]),
  Q("关系升温", "小团体出现", "队伍自然形成几个更亲近的小圈子。你怎么看？", [
    O("很正常，亲疏有别，不必强求所有人一样亲密", ["mao","ning"], {boundary:2, stability:2}),
    O("会在意是否有人被落下，主动创造全员活动", ["jing","zheng"], {devotion:2, initiative:2}),
    O("我只想和真正喜欢的人在一起，表面热闹没意义", ["xu","ning"], {boundary:2, expression:2}),
    O("哪里好玩去哪里，不太会固定站队", ["chen","yang"], {boundary:1, stability:1})]),
  Q("关系升温", "朋友公开吐槽你", "亲近的人在饭桌上拿你的缺点开玩笑，大家都笑了。你会？", [
    O("当场笑过去，私下认真告诉对方我不喜欢", ["jing","yang"], {boundary:2, confrontation:1, stability:2}),
    O("当场反问，让对方知道这个玩笑越界了", ["ning","xu"], {boundary:2, confrontation:2, expression:2}),
    O("如果没恶意就算了，别让一顿饭变难看", ["mao","chen"], {stability:2, confrontation:-1}),
    O("表面没事，之后反复想是不是大家都这么看我", ["zheng","xu"], {stability:-2, expression:-1})]),
  Q("关系升温", "表达感谢", "旅途中有人一直默默照顾大家。临别前你会？", [
    O("当众具体说出 TA 做过的事，让付出被看见", ["jing","xu"], {expression:2, devotion:2}),
    O("准备一个实用的小礼物，话不用太多", ["yang","mao"], {devotion:2, expression:0}),
    O("给一个大大的拥抱，想到什么就说什么", ["chen","xu"], {expression:2, initiative:1}),
    O("会感谢，但也提醒大家下次别总让一个人扛", ["ning","zheng"], {confrontation:1, boundary:2, devotion:2})]),

  Q("冲突现场", "真心话突然失控", "有人说出一句压抑已久的真话，饭桌瞬间安静。你会？", [
    O("追问具体发生了什么，避免所有人只围绕情绪站队", ["jing","ning"], {confrontation:2, stability:2}),
    O("先接住说话的人，能说出来一定已经很难受", ["xu","zheng"], {expression:2, devotion:2}),
    O("建议今晚先停在这里，大家冷静后再谈", ["mao","yang"], {stability:2, boundary:1}),
    O("把自己的真实看法也说出来，长痛不如短痛", ["ning","chen"], {confrontation:2, expression:2})]),
  Q("冲突现场", "被误会没有付出", "有人当众说你一路都在享受，没为团队做什么。你会？", [
    O("列出自己做过的事，并要求对方说明判断依据", ["ning","yang"], {confrontation:2, boundary:2, stability:1}),
    O("一下很委屈，可能无法冷静地解释", ["xu","zheng"], {expression:2, stability:-2}),
    O("先确认对方真正缺的是哪部分支持，再谈分工", ["jing","mao"], {stability:2, devotion:2, confrontation:1}),
    O("不想计较功劳，之后多做一点就好", ["chen","mao"], {devotion:1, boundary:-2})]),
  Q("冲突现场", "朋友正在情绪化", "你知道对方的说法不完全符合事实，但 TA 正在崩溃。你会？", [
    O("此刻先安抚，等恢复后再核对事实", ["jing","mao"], {stability:2, devotion:2}),
    O("温柔但马上纠正，错误的信息只会让事情更糟", ["yang","ning"], {confrontation:2, boundary:1}),
    O("陪 TA 一起哭或生气，事实可以以后再说", ["xu","zheng"], {expression:2, devotion:2, stability:-1}),
    O("带 TA 离开现场做点别的，情绪过去自然会清楚", ["chen","mao"], {initiative:2, stability:1})]),
  Q("冲突现场", "一句道歉", "你确认自己无意中伤害了同伴。你会怎么道歉？", [
    O("直接说明我做错了什么，不解释动机", ["jing","ning"], {confrontation:2, stability:2, expression:1}),
    O("会道歉，但需要先想很久怎样说才不尴尬", ["yang","zheng"], {expression:-1, stability:-1, devotion:1}),
    O("真诚表达我的感受，希望两个人重新亲近", ["xu","chen"], {expression:2, devotion:2}),
    O("请对方吃点好的，边放松边把话说开", ["mao","chen"], {stability:2, initiative:1})]),

  Q("压力测试", "房间不够", "临时少了一间房，必须有人住条件差很多的地方。你会？", [
    O("建立大家都认可的规则：轮换、抽签或补偿", ["yang","jing"], {boundary:2, stability:2, devotion:1}),
    O("我可以去住，尽快解决比继续争更重要", ["chen","zheng"], {devotion:2, boundary:-1}),
    O("谁做的安排谁先说解决方案，责任不能消失", ["ning","yang"], {confrontation:2, boundary:2}),
    O("看谁最在意条件，我没那么讲究", ["mao","jing"], {stability:2, devotion:1})]),
  Q("压力测试", "体力到达极限", "团队还想继续赶路，但你已经很累。你会？", [
    O("明确说我需要休息，不让团队猜我的状态", ["ning","jing"], {boundary:2, expression:2}),
    O("再坚持一下，不想成为拖慢所有人的那个", ["yang","zheng"], {devotion:2, boundary:-2}),
    O("提议就地吃饭休息，可能大家其实都累了", ["mao","jing"], {initiative:1, stability:2}),
    O("被新鲜风景吸引就又有能量，继续走", ["chen","xu"], {stability:1, initiative:1})]),
  Q("压力测试", "计划连续出错", "接连订错票、走错路，你开始怀疑自己不适合负责。你会？", [
    O("暂停，把任务拆出去，请大家一起纠错", ["jing","mao"], {boundary:2, stability:2, devotion:1}),
    O("更用力地掌控细节，必须把局面救回来", ["zheng","yang"], {initiative:2, devotion:2, stability:-2}),
    O("承认这个方法不行，果断换人或换路线", ["ning","chen"], {confrontation:2, initiative:2, boundary:1}),
    O("很需要有人先告诉我：没关系，不全是你的错", ["xu","zheng"], {expression:2, stability:-2})]),
  Q("压力测试", "全队低气压", "大家又累又烦，任何一句话都可能点燃冲突。你会？", [
    O("减少讨论，先解决吃饭、洗澡、睡觉", ["mao","jing"], {stability:2, initiative:1}),
    O("用玩笑或小游戏让气氛松一点", ["chen","mao"], {initiative:2, expression:1}),
    O("不再假装没事，把最核心的不满说开", ["ning","xu"], {confrontation:2, expression:2}),
    O("安静做好自己的事，避免再添乱", ["yang","zheng"], {devotion:1, expression:-1})]),

  Q("旅程终章", "最后一次自由活动", "旅程只剩半天，你会选？", [
    O("完成一直想做的挑战，给旅程一个高能结尾", ["chen","ning"], {initiative:2, boundary:1}),
    O("和最重要的人单独相处，认真告别", ["xu","yang"], {expression:2, devotion:1}),
    O("找家舒服的店慢慢坐着，不再赶景点", ["mao","jing"], {stability:2, boundary:1}),
    O("确认行李、交通和账目，确保大家顺利回家", ["zheng","yang"], {devotion:2, stability:1})]),
  Q("旅程终章", "给团队颁奖", "如果必须选一个“旅程最重要的人”，你会看重？", [
    O("在危机里最稳定、最能解决问题的人", ["jing","yang"], {stability:2, devotion:1}),
    O("最真实、最敢让问题浮出水面的人", ["ning","xu"], {expression:2, confrontation:2}),
    O("带来最多快乐和新鲜体验的人", ["chen","mao"], {initiative:1, stability:1}),
    O("做了最多琐碎工作、却很少被看见的人", ["zheng","jing"], {devotion:2, boundary:1})]),
  Q("旅程终章", "回看一场争吵", "旅行结束后，你最可能怎样理解曾经的冲突？", [
    O("它暴露了系统问题：分工、规则和信息不清", ["jing","yang"], {stability:2, boundary:2}),
    O("它证明有些关系不必勉强，真实比和谐重要", ["ning","xu"], {confrontation:2, expression:2}),
    O("当时都太累了，换个状态也许根本不会发生", ["mao","chen"], {stability:2, confrontation:-1}),
    O("我会反复复盘自己哪里可以做得更好", ["zheng","yang"], {devotion:2, stability:-1})]),
  Q("旅程终章", "下一次出发", "同样七个人再次邀你旅行，你最需要改变的是？", [
    O("更早说出需求，不等别人自动理解", ["yang","xu"], {expression:2, boundary:2}),
    O("少承担一点，让责任真正流动起来", ["zheng","jing"], {boundary:2, stability:1}),
    O("在说真话前，多确认一次对方能否听进去", ["ning","xu"], {confrontation:1, devotion:1}),
    O("不必改变太多，带着好奇心继续体验", ["chen","mao"], {initiative:1, stability:2})])
];

const QUESTION_BANK = [...BASE_QUESTIONS, ...(window.EXTRA_QUESTIONS || [])].map((question, index) => ({
  ...question, id: `q${String(index + 1).padStart(3, "0")}`
}));
let QUESTIONS = [];

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomValue = window.crypto?.getRandomValues ? (() => { const values = new Uint32Array(1); window.crypto.getRandomValues(values); return values[0] / 0x100000000; })() : Math.random();
    const target = Math.floor(randomValue * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function buildQuestionSet() {
  const chapters = shuffle([...new Set(QUESTION_BANK.map(question => question.chapter))]);
  let selected = [];
  chapters.forEach(chapter => {
    selected.push(...shuffle(QUESTION_BANK.filter(question => question.chapter === chapter)).slice(0, QUESTIONS_PER_CHAPTER));
  });
  selected = selected.map(question => ({ ...question, options: shuffle(question.options) }));
  const signature = selected.map(question => question.id).sort();
  const previous = readLocalList("hl-last-question-set");
  if (previous.length === signature.length && signature.every((id, index) => id === previous[index])) return buildQuestionSet();
  writeLocalList("hl-last-question-set", signature);
  return selected;
}

function calculateBaselines(questions) {
  const profiles = Object.fromEntries(Object.keys(PROFILES).map(id => {
    let mean = 0, variance = 0;
    questions.forEach(question => {
      const possible = question.options.map(option => {
        const rank = option.people.indexOf(id);
        return rank < 0 ? 0 : (rank === 0 ? 3 : 2);
      });
      const questionMean = possible.reduce((sum, value) => sum + value, 0) / possible.length;
      mean += questionMean;
      variance += possible.reduce((sum, value) => sum + ((value - questionMean) ** 2), 0) / possible.length;
    });
    return [id, { mean, variance: Math.max(variance, .0001) }];
  }));
  const dimensions = Object.fromEntries(DIMENSIONS.map(([id]) => {
    let mean = 0, variance = 0;
    questions.forEach(question => {
      const possible = question.options.map(option => option.dims[id] || 0);
      const questionMean = possible.reduce((sum, value) => sum + value, 0) / possible.length;
      mean += questionMean;
      variance += possible.reduce((sum, value) => sum + ((value - questionMean) ** 2), 0) / possible.length;
    });
    return [id, { mean, variance: Math.max(variance, .0001) }];
  }));
  return { profiles, dimensions };
}

let current = 0;
let answers = [];
let lastResult = null;
let startedAt = null;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function showScreen(id) {
  $$(".screen").forEach(el => el.classList.toggle("active", el.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  QUESTIONS = buildQuestionSet();
  current = 0; answers = []; startedAt = Date.now();
  showScreen("quiz-screen"); renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[current];
  const chapters = [...new Set(QUESTIONS.map(item => item.chapter))];
  const chapterIndex = chapters.indexOf(q.chapter) + 1;
  $("#chapter-kicker").textContent = `第${["一","二","三","四","五","六"][chapterIndex - 1]}站`;
  $("#chapter-name").textContent = q.chapter;
  $("#question-current").textContent = String(current + 1).padStart(2, "0");
  $("#progress-bar").style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;
  $("#scenario").textContent = q.scene;
  $("#question-text").textContent = q.text;
  $("#options").innerHTML = q.options.map((option, index) => `
    <button class="option ${answers[current] === index ? "selected" : ""}" data-index="${index}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${option.text}</span>
    </button>`).join("");
  $(".back-button").style.visibility = current ? "visible" : "hidden";
  $$(".option").forEach(button => button.addEventListener("click", chooseOption));
}

function chooseOption(event) {
  const index = Number(event.currentTarget.dataset.index);
  answers[current] = index;
  $$(".option").forEach((button, i) => button.classList.toggle("selected", i === index));
  window.setTimeout(() => {
    if (current < QUESTIONS.length - 1) { current += 1; renderQuestion(); }
    else finishQuiz();
  }, 220);
}

function previous() { if (current > 0) { current -= 1; renderQuestion(); } }

function calculate() {
  const baselines = calculateBaselines(QUESTIONS);
  const people = Object.fromEntries(Object.keys(PROFILES).map(id => [id, 0]));
  const dims = Object.fromEntries(DIMENSIONS.map(([id]) => [id, 0]));
  answers.forEach((answerIndex, qIndex) => {
    const option = QUESTIONS[qIndex].options[answerIndex];
    option.people.forEach((id, rank) => { people[id] += rank === 0 ? 3 : 2; });
    Object.entries(option.dims).forEach(([key, value]) => { dims[key] += value; });
  });
  const calibrated = Object.fromEntries(Object.entries(people).map(([id, score]) => [id, (score - baselines.profiles[id].mean) / Math.sqrt(baselines.profiles[id].variance)]));
  const ranking = Object.entries(calibrated).sort((a, b) => b[1] - a[1]);
  const calibratedDims = Object.fromEntries(Object.entries(dims).map(([id, score]) => [id, (score - baselines.dimensions[id].mean) / Math.sqrt(baselines.dimensions[id].variance)]));
  const normalizedDims = Object.fromEntries(Object.entries(calibratedDims).map(([id, z]) => [id, Math.max(10, Math.min(90, Math.round(50 + 15 * z)))]));
  const gap = ranking[0][1] - ranking[1][1];
  return {
    primary: ranking[0][0], secondary: ranking[1][0], ranking, rawScores: people,
    rawDimensions: dims, calibratedDimensions: calibratedDims, dimensions: normalizedDims,
    match: Math.min(96, Math.round(76 + Math.max(0, Math.min(1, gap / 1.8)) * 20)),
    assessmentVersion: ASSESSMENT_VERSION,
    id: `HL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  };
}

async function finishQuiz() {
  lastResult = calculate();
  // Make the result panel measurable before sizing its canvas.
  showScreen("result-screen"); renderResult(lastResult);
  await persistResult(lastResult);
}

function renderResult(result) {
  const profile = PROFILES[result.primary];
  const spectrum = result.ranking.map(([id, z]) => [id, Math.max(5, Math.min(99, Math.round(50 + 18 * z)))]);
  const minRank = Math.min(...spectrum.map(([,score]) => score));
  const maxRank = Math.max(...spectrum.map(([,score]) => score));
  $("#result-id").textContent = `REPORT NO. ${result.id}`;
  $("#result-symbol").textContent = profile.symbol;
  $("#result-name").textContent = profile.name;
  $("#result-archetype").textContent = profile.archetype;
  $("#result-summary").textContent = profile.summary;
  $("#match-score").textContent = result.match;
  $("#result-hero").style.background = profile.color;
  $("#trait-list").innerHTML = profile.traits.map(([title, text]) => `<div class="trait"><h4>${title}</h4><p>${text}</p></div>`).join("");
  $("#manual-grid").innerHTML = profile.manual.map(([title, text]) => `<div class="manual-item"><small>${title}</small><p>${text}</p></div>`).join("");
  $("#ranking-list").innerHTML = spectrum.map(([id, score]) => `<div class="rank-row"><span>${PROFILES[id].name}</span><div class="rank-track"><i style="width:${Math.round(28 + ((score - minRank) / Math.max(1, maxRank - minRank)) * 72)}%;background:${PROFILES[id].color}"></i></div><strong>${score}</strong></div>`).join("");
  $("#result-quote").textContent = profile.quote;
  drawRadar(result.dimensions, profile.color);
}

function drawRadar(values, color) {
  const canvas = $("#radar-canvas");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = Math.min(520, canvas.parentElement.clientWidth);
  const cssHeight = Math.round(cssWidth * .8);
  canvas.style.width = `${cssWidth}px`; canvas.style.height = `${cssHeight}px`;
  canvas.width = cssWidth * dpr; canvas.height = cssHeight * dpr;
  const ctx = canvas.getContext("2d"); ctx.scale(dpr, dpr);
  const cx = cssWidth / 2, cy = cssHeight / 2, radius = Math.min(cssWidth, cssHeight) * .33;
  const points = (ratio) => DIMENSIONS.map((_, i) => { const angle = -Math.PI / 2 + i * Math.PI * 2 / 6; return [cx + Math.cos(angle) * radius * ratio, cy + Math.sin(angle) * radius * ratio]; });
  ctx.lineWidth = 1; ctx.strokeStyle = "rgba(33,29,27,.16)";
  [0.25, .5, .75, 1].forEach(ratio => polygon(ctx, points(ratio), false));
  points(1).forEach(([x,y]) => { ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(x,y); ctx.stroke(); });
  const dataPoints = DIMENSIONS.map(([id], i) => { const angle = -Math.PI / 2 + i * Math.PI * 2 / 6; const ratio = values[id] / 100; return [cx + Math.cos(angle) * radius * ratio, cy + Math.sin(angle) * radius * ratio]; });
  ctx.fillStyle = `${color}33`; ctx.strokeStyle = color; ctx.lineWidth = 2; polygon(ctx, dataPoints, true);
  ctx.font = `12px "Noto Sans SC"`; ctx.fillStyle = "#4d443e"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  DIMENSIONS.forEach(([, label], i) => { const angle = -Math.PI / 2 + i * Math.PI * 2 / 6; const x = cx + Math.cos(angle) * radius * 1.26; const y = cy + Math.sin(angle) * radius * 1.17; ctx.fillText(label, x, y); });
}

function polygon(ctx, pts, fill) {
  ctx.beginPath(); pts.forEach(([x,y], i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y)); ctx.closePath(); if (fill) ctx.fill(); ctx.stroke();
}

function cloudEnabled() { return Boolean(CONFIG.supabaseUrl && CONFIG.supabaseAnonKey); }
function headers() { return { "apikey": CONFIG.supabaseAnonKey, "Authorization": `Bearer ${CONFIG.supabaseAnonKey}`, "Content-Type": "application/json", "Prefer": "return=minimal" }; }
async function persistResult(result) {
  const answerRecords = QUESTIONS.map((question, index) => ({ question_id: question.id, option_text: question.options[answers[index]].text }));
  const payload = { public_id: result.id, assessment_version: result.assessmentVersion, primary_type: result.primary, secondary_type: result.secondary, scores: result.rawScores, calibrated_scores: Object.fromEntries(result.ranking), dimensions: result.dimensions, dimension_raw_scores: result.rawDimensions, dimension_calibrated_scores: result.calibratedDimensions, question_ids: QUESTIONS.map(question => question.id), answers, answer_records: answerRecords, duration_seconds: Math.round((Date.now() - startedAt) / 1000) };
  const local = readLocalList("hl-results"); local.push({ ...payload, created_at: new Date().toISOString() });
  const localSaved = writeLocalList("hl-results", local.slice(-30));
  if (!cloudEnabled()) { $("#save-status").textContent = "测试结果仅供娱乐和自我观察，请勿用于严肃评价或决策。"; return; }
  try {
    const response = await fetch(`${CONFIG.supabaseUrl}/rest/v1/test_results`, { method: "POST", headers: headers(), body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    $("#save-status").textContent = "测试结果仅供娱乐和自我观察，请勿用于严肃评价或决策。";
  } catch (error) { $("#save-status").textContent = "测试结果仅供娱乐和自我观察，请勿用于严肃评价或决策。"; }
}

async function submitFeedback(event) {
  event.preventDefault();
  const form = event.currentTarget; const data = new FormData(form);
  const payload = { category: data.get("category"), message: data.get("message"), result_public_id: lastResult?.id || null, result_type: lastResult?.primary || null, page_url: location.href.slice(0, 500) };
  const status = $("#feedback-status"); status.textContent = "正在投递……";
  if (cloudEnabled()) {
    try {
      const response = await fetch(`${CONFIG.supabaseUrl}/rest/v1/feedback`, { method: "POST", headers: headers(), body: JSON.stringify(payload) });
      if (!response.ok) throw new Error();
      status.textContent = "收到啦，谢谢你认真告诉我们。"; form.reset(); return;
    } catch (_) { status.textContent = "暂时没投递成功，请稍后重试。"; return; }
  }
  const feedback = readLocalList("hl-feedback"); feedback.push({ ...payload, created_at: new Date().toISOString() });
  writeLocalList("hl-feedback", feedback.slice(-30));
  status.textContent = "暂时没投递成功，请稍后重试。"; form.reset();
}

async function shareResult() {
  if (!lastResult) return;
  const p = PROFILES[lastResult.primary]; const second = PROFILES[lastResult.secondary];
  const text = `我的花少2旅行人格是「${p.name}｜${p.archetype}」，匹配度 ${lastResult.match}%。第二人格是${second.name}。\n${p.quote}\n你在七人旅行团里会是谁？`;
  try { await navigator.clipboard.writeText(text); toast("结果文案已复制"); } catch (_) { toast("复制失败，请手动截图保存"); }
}

function toast(message) { const el = $("#toast"); el.textContent = message; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 2200); }
function openDialog(id) { $(id).showModal(); }
function closeDialogs() { $$('dialog[open]').forEach(dialog => dialog.close()); }

document.addEventListener("click", event => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  ({ start: startQuiz, previous, restart: startQuiz, share: shareResult, "open-about": () => openDialog("#about-dialog"), "open-privacy": () => openDialog("#privacy-dialog"), "open-feedback": () => openDialog("#feedback-dialog"), "close-dialog": closeDialogs })[action]?.();
});
$("#feedback-form").addEventListener("submit", submitFeedback);
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
window.addEventListener("resize", () => { if (lastResult && $("#result-screen").classList.contains("active")) drawRadar(lastResult.dimensions, PROFILES[lastResult.primary].color); });
