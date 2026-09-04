const CONFIG = window.APP_CONFIG || {};
const ASSESSMENT_VERSION = "3.1.0";
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
  jing: { name: "井柏然", archetype: "人形行程稳定器", avatar: 1, color: "#326f89",
    summary: "你不是没脾气，你只是习惯先把烂摊子收好，再决定该对谁翻白眼。别人负责制造剧情，你负责把剧情从事故现场改回旅行日记。",
    traits: [["全团隐形客服", "路线乱了你查地图，气氛僵了你递台阶，连沉默都被你安排得很体面。"], ["情商长期满格", "你能听懂一句话里的三层意思，却常假装只听懂第一层，主打一个看破不说破。"], ["稳定器也会没电", "大家太习惯你靠谱，容易把你的崩溃也当成待办事项交给你处理。"]],
    manual: [["团内职位", "总协调兼人类翻译器"], ["开撕模式", "先灭火，再查谁带的打火机"], ["核心需求", "公平、效率、别太难看"], ["隐藏技能", "把七嘴八舌翻译成人话"], ["系统漏洞", "累到关机还显示在线"], ["使用提醒", "可以帮忙，但别默认我包售后"]],
    quote: "我不是爱操心，我只是见不得事情死得这么随便。" },
  ning: { name: "宁静", archetype: "人形真话扩音器", avatar: 3, color: "#d94931",
    summary: "你的耐心可以很多，但绝不批发给废话。别人还在组织委婉措辞，你已经把问题、责任人和解决方案一起端上桌了。",
    traits: [["场面话过敏体质", "一句“大家都挺好的”，能让你立刻开始寻找到底是谁不太好。"], ["越乱越有主意", "局面一失控，你反而精神了：终于轮到说人话、办正事。"], ["锋利自带回声", "你本来只想切开问题，偶尔连旁边人的自尊也顺手切片了。"]],
    manual: [["团内职位", "破局者兼真话质检员"], ["开撕模式", "跳过寒暄，直达病灶"], ["核心需求", "真实、担当、别装"], ["隐藏技能", "三秒识破塑料和平"], ["系统漏洞", "结论比语气先抵达"], ["使用提醒", "刀可以快，落点要准"]],
    quote: "我不是脾气大，我只是懒得给荒唐加滤镜。" },
  xu: { name: "许晴", archetype: "旅行团情绪显微镜", avatar: 4, color: "#d86e85",
    summary: "别人旅行看风景，你旅行还顺便看关系气压图。一个眼神、半句敷衍、座位少留了十厘米，都可能被你的情绪雷达精准捕获。",
    traits: [["空气变化第一知情人", "大家说“没事”，你已经听见空气里那声很大的“有事”。"], ["真心必须原装正品", "热闹可以不要，客套也能省略，你只想确认这份喜欢到底是不是本人签收。"], ["感受容易自动加戏", "当别人回复慢半拍，你的内心编剧可能已经写完关系大结局。"]],
    manual: [["团内职位", "气氛探测器兼真心鉴定师"], ["开撕模式", "先确认你还爱不爱我，再谈事情"], ["核心需求", "真心、偏爱、被看见"], ["隐藏技能", "从语气里提取潜台词"], ["系统漏洞", "把落差翻译成拒绝"], ["使用提醒", "别让别人猜你心里的标准答案"]],
    quote: "我不是难哄，我只是不接受把敷衍包装成成熟。" },
  zheng: { name: "郑爽", archetype: "二十四小时风险雷达", avatar: 6, color: "#6e829d",
    summary: "大家还没出发，你已经在脑内经历了超支、迟到、走散和集体失望。你不是悲观，你只是把全团明天要踩的坑，提前在今晚焦虑完了。",
    traits: [["脑内常驻应急指挥部", "别人看到计划，你看到计划里所有可能突然冒烟的地方。"], ["责任心自带加班功能", "没人开口时你会默默接活，接完又怀疑是不是自己哪里做得还不够。"], ["越想负责越容易卡顿", "焦虑一多，表达就容易反复横跳，让别人跟不上你脑内已经演到第八集的剧情。"]],
    manual: [["团内职位", "预警员兼漏洞扫描器"], ["开撕模式", "先怪自己，再试图拯救全团"], ["核心需求", "别失控、别拖累、别出错"], ["隐藏技能", "提前发现明天的麻烦"], ["系统漏洞", "把求助识别成能力不足"], ["使用提醒", "分工不是甩锅，是给脑子放假"]],
    quote: "我不是想太多，我只是把你们明天要踩的坑提前焦虑完了。" },
  mao: { name: "毛阿敏", archetype: "全团生活总务处", avatar: 2, color: "#54745f",
    summary: "别人负责诗和远方，你负责确认远方有没有热水、早饭和按时出发的车。你嘴上说“都行”，心里已经把不靠谱方案逐一判了缓刑。",
    traits: [["现实问题终结者", "谁饿了、谁累了、谁的房卡又丢了，你通常比当事人更早发现。"], ["体面是默认操作系统", "再大的意见也先包一层礼貌，毕竟架可以晚点吵，饭不能凉。"], ["暗示发了但无人签收", "你以为自己已经说得很明显，别人只听见一句温柔的“没关系”。"]],
    manual: [["团内职位", "总务处长兼生活售后"], ["开撕模式", "先把饭吃了，再文明追责"], ["核心需求", "体面、实用、能落地"], ["隐藏技能", "把混乱过成正常日子"], ["系统漏洞", "暗示发出后默认全员已读"], ["使用提醒", "需求直说，省掉全团阅读理解"]],
    quote: "我不是爱管，我只是知道放着不管，最后还是我管。" },
  chen: { name: "陈意涵", archetype: "人形充电宝兼逃生通道", avatar: 5, color: "#e8a638",
    summary: "气氛一沉，你的第一反应不是开会，而是先把大家拖出去晒太阳。你相信很多烦恼不是想通的，是走着走着发现懒得再想了。",
    traits: [["行动就是你的氧气", "计划卡住不要紧，先出门；情绪卡住也不要紧，还是先出门。"], ["亲密但拒绝捆绑销售", "可以一起疯、一起扛，但谁的人生课题谁自己签收。"], ["跑太快会漏听台词", "你已经翻篇去看日落了，队友可能还停在上一页等一句回应。"]],
    manual: [["团内职位", "能量发动机兼户外逃生口"], ["开撕模式", "先找能做的，做完再说"], ["核心需求", "体验、自由、别绑架"], ["隐藏技能", "把低气压拽去见太阳"], ["系统漏洞", "用下一站盖住上一站"], ["使用提醒", "偶尔停下听完，不算浪费生命"]],
    quote: "我不是没烦恼，我只是先去玩，回来再决定要不要烦。" },
  yang: { name: "杨洋", archetype: "沉默版秩序管理员", avatar: 7, color: "#4a6388",
    summary: "你不抢麦、不抢戏，只想准时出发、按约办事。别人以为你没意见，其实你的内心表格已经把每个人的靠谱程度更新到了最新版本。",
    traits: [["规则是你的旅行护栏", "时间、地点、责任一旦写清楚，你整个人都会肉眼可见地安心。"], ["情绪采用静音模式", "不满先自己消化，实在消化不了再以一句“没事”申请延期处理。"], ["存在感容易延迟到账", "你一直等别人主动发现需求，最后常收到一句：“你怎么不早说？”"]],
    manual: [["团内职位", "纪律委员兼可靠备用机"], ["开撕模式", "先忍住，证据齐了再开口"], ["核心需求", "守约、尊重、说清楚"], ["隐藏技能", "默默把承诺执行到底"], ["系统漏洞", "需求总在过期后弹窗"], ["使用提醒", "早点发坐标，别人不是定位软件"]],
    quote: "我不是没意见，我只是等你们说完，再把错误答案划掉。" }
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
    O("先用轻松话题熟悉彼此，安排等大家进入状态再谈", ["xu","chen"], {expression:1, boundary:1, stability:-1})]),
  Q("出发之前", "预算第一次分歧", "有人想住风景绝佳的贵酒店，有人坚持把钱留给后程。你最自然的反应是？", [
    O("把总预算摊开算，让数字代替争执", ["zheng","yang"], {boundary:1, stability:1, confrontation:1}),
    O("旅行开心最重要，贵一点也可以想办法补回来", ["xu","chen"], {expression:2, boundary:-1}),
    O("问清每个人的底线，做两档可选方案", ["jing","mao"], {devotion:2, stability:2}),
    O("直接说清我的预算底线，也请每个人表明取舍", ["ning","yang"], {confrontation:2, boundary:2})]),
  Q("出发之前", "打包现场", "同伴带了四个大箱子，还默认大家会帮忙。你会？", [
    O("先帮这一次，但明确之后每个人要管理好自己的行李", ["jing","ning"], {boundary:2, devotion:1, confrontation:1}),
    O("既然一起旅行，能搭把手就搭把手", ["mao","chen"], {devotion:2, boundary:-1}),
    O("先一起把行李运走，路上再商量之后怎样分担", ["yang","zheng"], {devotion:2, expression:-1}),
    O("直接问：你准备怎么处理这些箱子？", ["ning","xu"], {expression:2, confrontation:2, boundary:2})]),
  Q("出发之前", "陌生人的第一晚", "大家客气地聊天，却没有真正熟起来。你更可能？", [
    O("组织一个轻松小游戏，让气氛先动起来", ["chen","jing"], {initiative:2, devotion:1, stability:1}),
    O("找一两个合拍的人聊深一点，没必要和所有人熟", ["xu","ning"], {boundary:2, expression:2}),
    O("享受这种客气的平静，慢慢观察", ["mao","yang"], {stability:2, initiative:-1}),
    O("主动问一圈各自期待，让慢热的人也有机会开口", ["zheng","xu"], {devotion:2, stability:-2})]),

  Q("路上协作", "错过的集合时间", "一位同伴迟到，全队可能赶不上火车。你第一反应是？", [
    O("立刻查替代车次，同时让一个人联系对方", ["jing","zheng"], {initiative:2, stability:2, devotion:2}),
    O("先明确迟到影响，抵达后再和对方约定下次规则", ["ning","yang"], {confrontation:2, boundary:2}),
    O("先赶车，等安全抵达后再谈责任", ["mao","jing"], {stability:2, confrontation:1}),
    O("先确认对方是否安全，必要时为 TA 调整行程", ["xu","chen"], {devotion:2, expression:1, boundary:-1})]),
  Q("路上协作", "没人愿意当导游", "路线复杂、意见很多，大家都不愿负责。你会？", [
    O("接下任务，但要求每个人承担一块具体工作", ["jing","ning"], {initiative:2, boundary:2, devotion:2}),
    O("先接下导游角色，把关键节点准备成两套方案", ["zheng","yang"], {initiative:1, devotion:2, stability:-1}),
    O("主动认领执行和补给，让擅长路线的人来定方向", ["mao","yang"], {initiative:-1, stability:1}),
    O("轮流当吧，今天谁最想去哪里就听谁的", ["chen","xu"], {boundary:1, expression:1, initiative:1})]),
  Q("路上协作", "意见被忽略", "你提了两次建议，大家都顺着另一个人继续讨论。你会？", [
    O("第三次明确说：请先听我把这个方案讲完", ["ning","jing"], {confrontation:2, expression:2, boundary:2}),
    O("先听完这一轮，稍后确认我的建议是不是被遗漏了", ["yang","xu"], {expression:-2, stability:-1}),
    O("换个更轻松的时机，单独和关键的人聊", ["mao","chen"], {stability:2, confrontation:1}),
    O("把建议整理得更具体，再用路线和时间请大家判断", ["zheng","yang"], {devotion:2, stability:-2})]),
  Q("路上协作", "意外多出的半天", "天气让原计划全部取消。你最希望？", [
    O("立刻找一个新的户外体验，别浪费时间", ["chen","ning"], {initiative:2, stability:1}),
    O("大家慢慢吃顿饭，聊聊最近的感受", ["xu","mao"], {expression:2, devotion:1}),
    O("先确认交通和明天安排，再自由活动", ["yang","zheng"], {boundary:1, stability:2}),
    O("观察大家状态，疲惫就休息，想玩再分组", ["jing","mao"], {boundary:2, stability:2, devotion:1})]),

  Q("关系升温", "深夜的倾诉", "同伴半夜敲门，说自己在团队里很孤独。你会？", [
    O("认真听完，先让对方确认自己的感受被看见", ["xu","jing"], {expression:2, devotion:2}),
    O("陪着聊，但也会帮对方区分事实和猜测", ["jing","zheng"], {stability:2, devotion:2}),
    O("提醒对方：我愿意支持，但明天需要由 TA 亲自表达", ["ning","yang"], {confrontation:2, boundary:2}),
    O("拉对方出去散步或吃东西，先换换心情", ["chen","mao"], {initiative:1, stability:1, expression:1})]),
  Q("关系升温", "小团体出现", "队伍自然形成几个更亲近的小圈子。你怎么看？", [
    O("很正常，亲疏有别，不必强求所有人一样亲密", ["mao","ning"], {boundary:2, stability:2}),
    O("会在意是否有人被落下，主动创造全员活动", ["jing","zheng"], {devotion:2, initiative:2}),
    O("我只想和真正喜欢的人在一起，表面热闹没意义", ["xu","ning"], {boundary:2, expression:2}),
    O("哪里好玩去哪里，不太会固定站队", ["chen","yang"], {boundary:1, stability:1})]),
  Q("关系升温", "朋友公开吐槽你", "亲近的人在饭桌上拿你的缺点开玩笑，大家都笑了。你会？", [
    O("当场笑过去，私下认真告诉对方我不喜欢", ["jing","yang"], {boundary:2, confrontation:1, stability:2}),
    O("当场反问，让对方知道这个玩笑越界了", ["ning","xu"], {boundary:2, confrontation:2, expression:2}),
    O("判断没有恶意就顺势带过，把轻松留在当下", ["mao","chen"], {stability:2, confrontation:-1}),
    O("记下这份不舒服，之后找亲近的人确认真实看法", ["zheng","xu"], {stability:-2, expression:-1})]),
  Q("关系升温", "表达感谢", "旅途中有人一直默默照顾大家。临别前你会？", [
    O("当众具体说出 TA 做过的事，让付出被看见", ["jing","xu"], {expression:2, devotion:2}),
    O("准备一个实用的小礼物，话不用太多", ["yang","mao"], {devotion:2, expression:0}),
    O("给一个大大的拥抱，想到什么就说什么", ["chen","xu"], {expression:2, initiative:1}),
    O("会感谢，但也提醒大家下次别总让一个人扛", ["ning","zheng"], {confrontation:1, boundary:2, devotion:2})]),

  Q("冲突现场", "真心话突然失控", "有人说出一句压抑已久的真话，饭桌瞬间安静。你会？", [
    O("先暂停站队，把事实经过和各自诉求一件件问清", ["jing","ning"], {confrontation:2, stability:2}),
    O("先接住说话的人，能说出来一定已经很难受", ["xu","zheng"], {expression:2, devotion:2}),
    O("建议今晚先停在这里，大家冷静后再谈", ["mao","yang"], {stability:2, boundary:1}),
    O("把自己的真实看法也说出来，长痛不如短痛", ["ning","chen"], {confrontation:2, expression:2})]),
  Q("冲突现场", "被误会没有付出", "有人当众说你一路都在享受，没为团队做什么。你会？", [
    O("列出自己做过的事，并要求对方说明判断依据", ["ning","yang"], {confrontation:2, boundary:2, stability:1}),
    O("先讲清这句话让我受伤，再说明我在意的付出", ["xu","zheng"], {expression:2, stability:-2}),
    O("先确认对方真正缺的是哪部分支持，再谈分工", ["jing","mao"], {stability:2, devotion:2, confrontation:1}),
    O("先把眼前缺口补上，功劳留到事情结束后再谈", ["chen","mao"], {devotion:1, boundary:-2})]),
  Q("冲突现场", "朋友正在情绪化", "你知道对方的说法不完全符合事实，但 TA 正在崩溃。你会？", [
    O("此刻先安抚，等恢复后再核对事实", ["jing","mao"], {stability:2, devotion:2}),
    O("温和指出关键事实，但接受对方此刻可能听不进去", ["yang","ning"], {confrontation:2, boundary:1}),
    O("陪 TA 一起哭或生气，事实可以以后再说", ["xu","zheng"], {expression:2, devotion:2, stability:-1}),
    O("带 TA 离开现场做点别的，情绪过去自然会清楚", ["chen","mao"], {initiative:2, stability:1})]),
  Q("冲突现场", "一句道歉", "你确认自己无意中伤害了同伴。你会怎么道歉？", [
    O("直接说明我做错了什么，不解释动机", ["jing","ning"], {confrontation:2, stability:2, expression:1}),
    O("先整理好重点，选双方都能听进去的时机道歉", ["yang","zheng"], {expression:-1, stability:-1, devotion:1}),
    O("真诚表达我的感受，希望两个人重新亲近", ["xu","chen"], {expression:2, devotion:2}),
    O("请对方吃点好的，边放松边把话说开", ["mao","chen"], {stability:2, initiative:1})]),

  Q("压力测试", "房间不够", "临时少了一间房，必须有人住条件差很多的地方。你会？", [
    O("建立大家都认可的规则：轮换、抽签或补偿", ["yang","jing"], {boundary:2, stability:2, devotion:1}),
    O("我可以去住，尽快解决比继续争更重要", ["chen","zheng"], {devotion:2, boundary:-1}),
    O("谁做的安排谁先说解决方案，责任不能消失", ["ning","yang"], {confrontation:2, boundary:2}),
    O("看谁最在意条件，我没那么讲究", ["mao","xu"], {stability:2, devotion:1})]),
  Q("压力测试", "体力到达极限", "团队还想继续赶路，但你已经很累。你会？", [
    O("明确说我需要休息，不让团队猜我的状态", ["ning","jing"], {boundary:2, expression:2}),
    O("先评估自己还能走多久，到临界点就提出休息", ["yang","zheng"], {devotion:2, boundary:-2}),
    O("提议就地吃饭休息，可能大家其实都累了", ["mao","jing"], {initiative:1, stability:2}),
    O("被新鲜风景吸引就又有能量，继续走", ["chen","xu"], {stability:1, initiative:1})]),
  Q("压力测试", "计划连续出错", "接连订错票、走错路，你开始怀疑自己不适合负责。你会？", [
    O("暂停原计划，把决定权分出去，请大家一起纠错", ["jing","mao"], {boundary:2, stability:2, devotion:1}),
    O("回到细节逐项排查，用更严密的检查把局面拉回来", ["zheng","yang"], {initiative:2, devotion:2, stability:-2}),
    O("承认这个方法不行，果断换人或换路线", ["ning","chen"], {confrontation:2, initiative:2, boundary:1}),
    O("先确认大家仍愿意信任我，再一起重整状态", ["xu","zheng"], {expression:2, stability:-2})]),
  Q("压力测试", "全队低气压", "大家又累又烦，任何一句话都可能点燃冲突。你会？", [
    O("减少讨论，先解决吃饭、洗澡、睡觉", ["mao","jing"], {stability:2, initiative:1}),
    O("用玩笑或小游戏让气氛松一点", ["chen","mao"], {initiative:2, expression:1}),
    O("不再假装没事，把最核心的不满说开", ["ning","xu"], {confrontation:2, expression:2}),
    O("守住自己的节奏，把该做的部分稳定完成", ["yang","zheng"], {devotion:1, expression:-1})]),

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
    O("记下这次暴露的盲点，为下次准备更稳妥的做法", ["zheng","yang"], {devotion:2, stability:-1})]),
  Q("旅程终章", "下一次出发", "同样七个人再次邀你旅行，你最需要改变的是？", [
    O("更早说出需求，不等别人自动理解", ["yang","xu"], {expression:2, boundary:2}),
    O("少承担一点，让责任真正流动起来", ["zheng","jing"], {boundary:2, stability:1}),
    O("在说真话前，多确认一次对方能否听进去", ["ning","xu"], {confrontation:1, devotion:1}),
    O("不必改变太多，带着好奇心继续体验", ["chen","mao"], {initiative:1, stability:2})])
];

const makeQuestionBank = () => [...BASE_QUESTIONS, ...(window.EXTRA_QUESTIONS || [])].map((question, index) => ({
  ...question, id: `q${String(index + 1).padStart(3, "0")}`
}));
let QUESTION_BANK = makeQuestionBank();
let QUESTIONS = [];
let extraQuestionsPromise = null;

function loadExtraQuestions() {
  if (window.EXTRA_QUESTIONS) { QUESTION_BANK = makeQuestionBank(); return Promise.resolve(); }
  if (extraQuestionsPromise) return extraQuestionsPromise;
  extraQuestionsPromise = new Promise(resolve => {
    const script = document.createElement("script");
    script.src = "questions-extra.js?v=20260904-balance31";
    script.onload = script.onerror = () => { QUESTION_BANK = makeQuestionBank(); resolve(); };
    document.head.appendChild(script);
  });
  return extraQuestionsPromise;
}

window.addEventListener("load", () => {
  const begin = () => loadExtraQuestions();
  if ("requestIdleCallback" in window) requestIdleCallback(begin, { timeout: 1200 });
  else window.setTimeout(begin, 600);
}, { once: true });

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
let advancing = false;
let avatarPreloadStarted = false;
let radarRenderToken = 0;
let avatarExtension = "avif";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const avatarUrl = avatar => `assets/result-avatar-${avatar}.${avatarExtension}`;
const avatarFallbackUrl = avatar => `assets/result-avatar-${avatar}.png`;

function preloadResultAvatars() {
  if (avatarPreloadStarted) return;
  avatarPreloadStarted = true;
  const urls = Object.values(PROFILES).map(profile => avatarUrl(profile.avatar));
  let index = 0;
  const loadNext = () => {
    if (index >= urls.length) return;
    const image = new Image();
    image.decoding = "async";
    image.fetchPriority = "low";
    image.onload = () => {
      index += 1;
      window.setTimeout(loadNext, 80);
    };
    image.onerror = () => {
      if (avatarExtension === "avif") {
        avatarExtension = "png";
        urls.splice(0, urls.length, ...Object.values(PROFILES).map(profile => avatarUrl(profile.avatar)));
        index = 0;
      } else index += 1;
      window.setTimeout(loadNext, 80);
    };
    image.src = urls[index];
  };
  const begin = () => window.setTimeout(loadNext, 400);
  if ("requestIdleCallback" in window) requestIdleCallback(begin, { timeout: 1800 });
  else window.setTimeout(begin, 900);
}

function showScreen(id) {
  $$(".screen").forEach(el => el.classList.toggle("active", el.id === id));
  document.body.dataset.screen = id;
  window.scrollTo(0, 0);
}

async function startQuiz() {
  await loadExtraQuestions();
  QUESTIONS = buildQuestionSet();
  current = 0; answers = []; startedAt = Date.now(); advancing = false;
  showScreen("quiz-screen"); renderQuestion();
  preloadResultAvatars();
}

function renderQuestion() {
  advancing = false;
  const q = QUESTIONS[current];
  const chapters = [...new Set(QUESTIONS.map(item => item.chapter))];
  const chapterIndex = chapters.indexOf(q.chapter) + 1;
  $("#chapter-kicker").textContent = `第${["一","二","三","四","五","六"][chapterIndex - 1]}站`;
  $("#chapter-name").textContent = q.chapter;
  $("#question-current").textContent = String(current + 1).padStart(2, "0");
  $("#progress-bar").style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;
  $("#scenario").textContent = q.scene;
  const questionText = $("#question-text");
  questionText.replaceChildren(...[...q.text].map(character => {
    if (character !== "回") return document.createTextNode(character);
    const fallback = document.createElement("span");
    fallback.className = "question-glyph-fallback";
    fallback.textContent = character;
    return fallback;
  }));
  $("#options").innerHTML = q.options.map((option, index) => `
    <button class="option ${answers[current] === index ? "selected" : ""}" data-index="${index}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${option.text}</span>
    </button>`).join("");
  $(".back-button").style.visibility = current ? "visible" : "hidden";
  $$(".option").forEach(button => button.addEventListener("click", chooseOption));
}

function chooseOption(event) {
  if (advancing) return;
  advancing = true;
  const index = Number(event.currentTarget.dataset.index);
  answers[current] = index;
  $$(".option").forEach((button, i) => button.classList.toggle("selected", i === index));
  event.currentTarget.blur();
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
    match: Math.min(95, Math.round(55 + (1 - Math.exp(-Math.max(0, gap) / 1.4)) * 40)),
    assessmentVersion: ASSESSMENT_VERSION,
    id: `HL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  };
}

async function finishQuiz() {
  lastResult = calculate();
  const resultAvatar = new Image();
  resultAvatar.decoding = "async";
  resultAvatar.src = avatarUrl(PROFILES[lastResult.primary].avatar);
  if (resultAvatar.decode) await Promise.race([resultAvatar.decode().catch(() => {}), new Promise(resolve => window.setTimeout(resolve, 180))]);
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
  const avatar = $("#result-symbol");
  const picture = document.createElement("picture");
  const source = document.createElement("source");
  const avatarImage = document.createElement("img");
  source.type = "image/avif";
  source.srcset = avatarUrl(profile.avatar);
  avatarImage.src = avatarFallbackUrl(profile.avatar);
  avatarImage.alt = `${profile.name}的手绘头像`;
  avatarImage.decoding = "async";
  avatarImage.fetchPriority = "high";
  picture.append(source, avatarImage);
  avatar.replaceChildren(picture);
  avatar.className = `result-symbol result-avatar result-avatar-${profile.avatar}`;
  avatar.setAttribute("role", "img");
  avatar.setAttribute("aria-label", `${profile.name}的手绘头像`);
  $("#result-name").textContent = profile.name;
  $("#result-archetype").textContent = profile.archetype;
  $("#result-summary").textContent = profile.quote;
  $("#result-explanation").textContent = profile.summary;
  $("#match-score").textContent = result.match;
  $("#result-hero").style.removeProperty("background");
  $("#trait-list").innerHTML = profile.traits.map(([title, text]) => `<div class="trait"><h4>${title}</h4><p>${text}</p></div>`).join("");
  $("#manual-grid").innerHTML = profile.manual.map(([title, text]) => `<div class="manual-item"><small>${title}</small><p>${text}</p></div>`).join("");
  $("#ranking-list").innerHTML = spectrum.map(([id, score]) => `<div class="rank-row"><span>${PROFILES[id].name}</span><div class="rank-track"><i style="width:${Math.round(28 + ((score - minRank) / Math.max(1, maxRank - minRank)) * 72)}%;background:${PROFILES[id].color}"></i></div><strong>${score}</strong></div>`).join("");
  const renderToken = ++radarRenderToken;
  const renderRadar = () => { if (renderToken === radarRenderToken) drawRadar(result.dimensions, profile.color); };
  requestAnimationFrame(() => {
    if ("requestIdleCallback" in window) requestIdleCallback(renderRadar, { timeout: 350 });
    else window.setTimeout(renderRadar, 60);
  });
}

function drawRadar(values, color) {
  const canvas = $("#radar-canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 680 ? 1.5 : 2);
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
  ctx.font = `12px "PingFang SC", sans-serif`; ctx.fillStyle = "#4d443e"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
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
  writeLocalList("hl-results", local.slice(-30));
  if (!cloudEnabled()) return;
  try {
    const response = await fetch(`${CONFIG.supabaseUrl}/rest/v1/test_results`, { method: "POST", headers: headers(), body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch (error) { /* 测试结果仍可在当前页面正常查看。 */ }
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
  const text = `我的花少2旅行人格是「${p.name}｜${p.archetype}」，第二人格是${second.name}。\n人格锐评：${p.quote}\n测测你在七人旅行团里是哪种人格。`;
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
