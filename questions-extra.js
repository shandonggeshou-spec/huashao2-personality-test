window.EXTRA_QUESTIONS = (() => {
  const Q = (chapter, scene, text, options) => ({ chapter, scene, text, options });
  const O = (text, people, dims) => ({ text, people, dims });

  return [
    Q("出发之前", "证件提醒", "出发前三天，有人还没确认签证和证件。你会？", [
      O("发一份证件清单，请每个人逐项回复确认", ["yang","zheng"], {initiative:2, devotion:2, stability:1}),
      O("私下提醒最容易遗漏的人，避免让对方难堪", ["jing","mao"], {devotion:2, stability:2}),
      O("直接说明证件由个人负责，团队不替任何人兜底", ["ning","yang"], {boundary:2, confrontation:2}),
      O("各自负责证件，我只做一次轻松提醒，不接管检查", ["chen","xu"], {boundary:1, stability:1, initiative:-1})]),
    Q("出发之前", "分配房间", "房型有好有坏，大家都没有先开口。你更可能？", [
      O("先问每个人最在意什么，再设计轮换或补偿", ["jing","mao"], {devotion:2, stability:2, boundary:1}),
      O("我住哪里都行，把好房间留给更需要的人", ["zheng","chen"], {devotion:2, boundary:-1}),
      O("抽签最公平，别让客气变成暗中不满", ["yang","ning"], {boundary:2, confrontation:1, stability:1}),
      O("想和最亲近的人住，关系舒服比房型重要", ["xu","chen"], {expression:2, boundary:1})]),
    Q("出发之前", "第一次见面", "七个人第一次线下集合，气氛拘谨。你会？", [
      O("主动安排一个轻松的自我介绍游戏", ["chen","jing"], {initiative:2, expression:1, devotion:1}),
      O("先观察每个人的状态，不急着制造热闹", ["mao","yang"], {stability:2, initiative:-1}),
      O("自然地讲一点真实经历，希望大家快点熟起来", ["xu","chen"], {expression:2, initiative:1}),
      O("把关键安排先讲清楚，有共同任务就不尴尬了", ["zheng","ning"], {initiative:2, devotion:2})]),
    Q("出发之前", "保险选择", "有人觉得旅行保险浪费钱，有人坚持必须买。你会？", [
      O("列出风险与赔付范围，再让大家共同决定", ["zheng","yang"], {stability:2, boundary:1, devotion:1}),
      O("我会买自己的，别人怎么选由别人负责", ["ning","chen"], {boundary:2, confrontation:1}),
      O("倾向都买，少一点预算也比出事后慌乱好", ["zheng","jing"], {stability:1, devotion:2}),
      O("更看重团队共识；若多数人不买，我会接受这个选择", ["xu","mao"], {expression:1, confrontation:-1, boundary:-1})]),
    Q("出发之前", "角色认领", "需要有人管钱、导航、订票和记录，你最自然的做法是？", [
      O("先把任务拆清楚，再按能力让大家认领", ["jing","yang"], {initiative:2, devotion:2, boundary:2}),
      O("主动接下最麻烦的一块，免得一直没人做", ["zheng","mao"], {initiative:2, devotion:2, boundary:-1}),
      O("选我真正擅长的，其他事情不勉强包办", ["chen","ning"], {boundary:2, stability:1}),
      O("更想负责记录和氛围，留下大家真实的样子", ["xu","chen"], {expression:2, devotion:1})]),
    Q("出发之前", "行李超重", "出发前发现公共物资让行李严重超重。你会？", [
      O("现场称重，按必要程度删减并重新分配", ["yang","jing"], {initiative:2, stability:2, boundary:1}),
      O("先把最实用的留下，漂亮但用不到的别带", ["mao","ning"], {stability:2, confrontation:1}),
      O("愿意多背一点，别在出发前为小事争执", ["zheng","xu"], {devotion:2, boundary:-1}),
      O("大家各自选一件最舍不得的，其余随机舍弃", ["chen","xu"], {initiative:1, expression:1, boundary:1})]),
    Q("出发之前", "叫早安排", "有人睡得很沉，却要求全队负责叫醒。你会？", [
      O("答应一次，同时让对方设置多个闹钟", ["jing","mao"], {devotion:1, boundary:2, stability:2}),
      O("明确拒绝，成年人要对自己的时间负责", ["ning","yang"], {boundary:2, confrontation:2}),
      O("把叫早当成共同保障，提前设计双重提醒", ["zheng","xu"], {devotion:2, stability:-2}),
      O("顺手叫一下没什么，醒了再一起去吃早餐", ["chen","mao"], {devotion:1, stability:1})]),
    Q("出发之前", "行程投票", "两个目的地票数相同，但今晚必须决定。你会？", [
      O("比较交通、预算和体力，选整体成本更低的", ["jing","mao"], {stability:2, devotion:1}),
      O("支持更少见、更有挑战的那个", ["chen","ning"], {initiative:2, boundary:1}),
      O("让最在意的人充分说明，别只看票数", ["xu","zheng"], {expression:2, devotion:2}),
      O("用事先约好的规则决胜，不临时偏袒谁", ["yang","ning"], {boundary:2, confrontation:1, stability:2})]),

    Q("路上协作", "导航争议", "你和同伴的导航给出完全不同的路线。你会？", [
      O("停下来核对路标和实时交通，再统一路线", ["yang","zheng"], {stability:2, initiative:1}),
      O("选一条先走，错了再调整，别原地争论", ["chen","ning"], {initiative:2, confrontation:1}),
      O("让更熟悉当地的人决定，我负责配合", ["mao","zheng"], {devotion:1, stability:1}),
      O("先确认这次争议背后，是否还藏着长期的信任落差", ["xu","jing"], {expression:2, stability:-1})]),
    Q("路上协作", "语言卡壳", "点餐时谁也说不清当地语言，队伍开始急躁。你会？", [
      O("用翻译、图片和手势逐项确认", ["jing","zheng"], {initiative:2, stability:2, devotion:1}),
      O("大胆试着说，点错了也算旅行体验", ["chen","ning"], {initiative:2, stability:1}),
      O("先点最稳妥的基本餐，保证大家吃上东西", ["mao","yang"], {stability:2, devotion:1}),
      O("鼓励最紧张的人慢慢来，不催促也不取笑", ["xu","jing"], {expression:1, devotion:2})]),
    Q("路上协作", "行李没到", "一位同伴的托运行李没出现，全队还要赶下一程。你会？", [
      O("分两组，一组报失、一组处理后续交通", ["jing","zheng"], {initiative:2, devotion:2, stability:2}),
      O("坚持先陪对方解决，行程可以重新安排", ["xu","mao"], {devotion:2, expression:1}),
      O("确认航空公司负责后继续走，别让全队停摆", ["ning","yang"], {boundary:2, confrontation:1}),
      O("带对方先买必需品，用行动降低焦虑", ["chen","mao"], {initiative:2, stability:1})]),
    Q("路上协作", "饮食差异", "有人忌口很多，选餐厅总是难以统一。你会？", [
      O("先列硬性忌口，再找所有人都能接受的店", ["mao","yang"], {devotion:2, stability:2}),
      O("偶尔分开吃，各自满足比勉强一致更好", ["ning","chen"], {boundary:2, confrontation:1}),
      O("这顿迁就忌口的人，下顿让其他人选择", ["mao","zheng"], {devotion:2, boundary:1}),
      O("会先问对方是不是因此觉得很有负担", ["xu","jing"], {expression:2, devotion:2})]),
    Q("路上协作", "拍照节奏", "有人每到一处都要拍很久，团队进度不断被打断。你会？", [
      O("约定每站拍摄时间，超时就自由行动", ["yang","jing"], {boundary:2, stability:2}),
      O("直接提醒别让所有人一直等", ["ning","mao"], {confrontation:2, boundary:2}),
      O("帮对方快速拍好，早点完成就能继续走", ["chen","zheng"], {initiative:2, devotion:1}),
      O("如果这一刻大家都开心，我愿意为共同回忆放慢节奏", ["xu","mao"], {expression:1, stability:1, boundary:-1})]),
    Q("路上协作", "账单分摊", "一顿饭有人没喝酒，却被默认平均付款。你会？", [
      O("把差额算清楚，公平不等于所有人付一样", ["yang","ning"], {boundary:2, confrontation:1, stability:1}),
      O("这次简化均摊，把分账规则留到下顿提前约定", ["mao","chen"], {stability:2, confrontation:-1}),
      O("先问没喝的人介不介意，再决定怎么算", ["jing","xu"], {devotion:2, expression:1}),
      O("先垫付让结账顺利，回去再把差额单独整理清楚", ["zheng","xu"], {devotion:2, stability:-1})]),
    Q("路上协作", "同伴生病", "同伴发烧，但当天有很难预约的活动。你会？", [
      O("确认病情和就医方案，再决定谁留下陪同", ["jing","mao"], {stability:2, devotion:2}),
      O("我留下照顾，别人按计划去，不必全员牺牲", ["zheng","yang"], {devotion:2, boundary:1}),
      O("先问病人真实需要，不替对方决定", ["ning","xu"], {boundary:2, expression:2}),
      O("买药和食物陪一会儿，再看状态灵活调整", ["chen","mao"], {initiative:2, stability:1})]),
    Q("路上协作", "临时分组", "半天自由活动，大家想去的地方完全不同。你会？", [
      O("按兴趣分组，约好集合时间和紧急联系人", ["yang","jing"], {boundary:2, stability:2, initiative:1}),
      O("独自去最想去的地方，不勉强任何人陪", ["ning","chen"], {boundary:2, initiative:2}),
      O("选择人数最少的一组，免得有人落单", ["zheng","xu"], {devotion:2, expression:1}),
      O("跟着气氛最好的一组，计划随时可以变", ["chen","mao"], {initiative:1, stability:1})]),

    Q("关系升温", "旅行生日", "旅途中有人生日，但本人说不用特别安排。你会？", [
      O("准备一个不打扰行程的小惊喜", ["jing","chen"], {devotion:2, initiative:1}),
      O("尊重对方说的，不把惊喜变成表演", ["yang","ning"], {boundary:2, stability:1}),
      O("认真问一次：是真的不想，还是怕麻烦大家", ["xu","mao"], {expression:2, devotion:1}),
      O("把庆祝细节准备充分，让对方不用操心也能收到心意", ["zheng","xu"], {devotion:2, stability:-1})]),
    Q("关系升温", "保守秘密", "同伴私下告诉你一件脆弱的往事。你会？", [
      O("明确告诉对方，未经允许不会向团队转述", ["yang","zheng"], {boundary:2, devotion:2}),
      O("先陪对方感受，不急着分析或给建议", ["xu","mao"], {expression:2, devotion:2}),
      O("如果影响团队安全，我会说明必须寻求帮助", ["ning","jing"], {boundary:2, confrontation:2}),
      O("约对方出去走走，让沉重的话题有出口", ["chen","mao"], {initiative:1, stability:1})]),
    Q("关系升温", "照片发布", "朋友想发布一张你不喜欢的合照。你会？", [
      O("直接请对方换一张，这是我的肖像边界", ["ning","yang"], {boundary:2, confrontation:2}),
      O("私下解释原因，给一张双方都喜欢的替代图", ["jing","mao"], {boundary:2, stability:2}),
      O("先保留这张，再私下说明我更希望公开哪一张", ["zheng","xu"], {expression:-1, boundary:-2}),
      O("一起挑照片，把这件事变成好玩的回忆", ["chen","xu"], {initiative:1, expression:1})]),
    Q("关系升温", "想独处", "连续相处一周后，你很想一个人待半天。你会？", [
      O("提前说清楚并约好归队时间，安心独处", ["jing","yang"], {boundary:2, stability:2}),
      O("直接去做自己的事，不需要为独处解释", ["ning","chen"], {boundary:2, initiative:1}),
      O("先陪大家完成共同安排，再留一段自己的独处时间", ["zheng","xu"], {devotion:1, stability:-2, boundary:-1}),
      O("找一个最亲近的人同行，既放松又不孤单", ["xu","mao"], {expression:2, stability:1})]),
    Q("关系升温", "借用物品", "同伴未经询问就用了你的东西。你会？", [
      O("当下说明以后先问，这是基本边界", ["ning","yang"], {boundary:2, confrontation:2}),
      O("先了解是不是紧急情况，再约定之后的规则", ["jing","mao"], {boundary:2, stability:2}),
      O("把分享看作亲近的一部分，这次会自然地借给对方", ["chen","xu"], {devotion:1, boundary:-1}),
      O("先感受这份越界，等情绪平稳后再认真表达", ["zheng","xu"], {expression:-1, stability:-2})]),
    Q("关系升温", "赞美落差", "大家都在夸一个人，你的付出却没人提起。你会？", [
      O("不抢话，但会找合适时机说明自己的贡献", ["jing","yang"], {boundary:2, expression:1, stability:1}),
      O("直接开玩笑提醒：别忘了还有我", ["chen","ning"], {expression:2, initiative:1}),
      O("坦率表达这份失落，也说出我希望被怎样看见", ["xu","zheng"], {expression:2, stability:-2}),
      O("做了就做了，不需要每一份付出都被点名", ["mao","yang"], {stability:2, devotion:1})]),
    Q("关系升温", "单独邀约", "你被邀请参加一个不包括其他队友的小活动。你会？", [
      O("想去就去，小团体不等于背叛团队", ["ning","chen"], {boundary:2, initiative:1}),
      O("自然告诉大家去向，避免信息差引发误会", ["jing","yang"], {stability:2, devotion:1}),
      O("会考虑没被邀请的人是否难受", ["xu","zheng"], {expression:2, devotion:2}),
      O("如果只是轻松玩一会儿，不必把关系想太重", ["mao","chen"], {stability:2, boundary:1})]),
    Q("关系升温", "深夜复盘", "一天结束后，朋友想聊聊团队里微妙的变化。你会？", [
      O("愿意聊，但区分事实、感受和猜测", ["jing","mao"], {stability:2, expression:1}),
      O("把真实判断说出来，不用假装谁都没问题", ["ning","xu"], {confrontation:2, expression:2}),
      O("先听对方讲，确认这段关系让 TA 安全", ["xu","zheng"], {expression:2, devotion:2}),
      O("聊一会儿就去休息，明天还有新的体验", ["chen","yang"], {boundary:1, stability:2})]),

    Q("冲突现场", "花钱质疑", "有人公开质疑你花公共预算太随意。你会？", [
      O("拿出记录逐项核对，先解决事实争议", ["yang","zheng"], {stability:2, confrontation:1}),
      O("当场问清楚对方凭什么这样评价", ["ning","xu"], {confrontation:2, expression:2}),
      O("先复核自己的决策盲点，再把补救方案列出来", ["zheng","jing"], {devotion:2, stability:-1}),
      O("先承担差额快速止损，之后减少繁琐的公共支出", ["chen","mao"], {boundary:-1, stability:1})]),
    Q("冲突现场", "语气刺人", "同伴说的事实没错，但语气让你很不舒服。你会？", [
      O("先回应事实，再说明我不接受这种表达方式", ["ning","yang"], {boundary:2, confrontation:2, stability:2}),
      O("当场指出语气的问题，让交流回到彼此尊重", ["ning","xu"], {confrontation:2, expression:2, stability:-1}),
      O("等双方冷静后私下谈，避免继续升级", ["mao","jing"], {stability:2, confrontation:1}),
      O("先分清我介意的是事实还是语气，再决定怎样回应", ["zheng","chen"], {expression:-1, stability:-2})]),
    Q("冲突现场", "被要求站队", "两个朋友争吵，都要求你证明自己站在 TA 那边。你会？", [
      O("拒绝选人，只讨论具体行为和解决办法", ["yang","jing"], {boundary:2, stability:2}),
      O("谁更有道理就支持谁，不维持虚假的中立", ["ning","chen"], {confrontation:2, boundary:1}),
      O("先分别安抚两个人，不让任何人觉得被抛下", ["xu","zheng"], {expression:2, devotion:2}),
      O("劝大家先吃饭休息，疲惫时很难讲清楚", ["mao","chen"], {stability:2, initiative:1})]),
    Q("冲突现场", "房间太乱", "室友总把公共区域弄乱，你已经忍了几天。你会？", [
      O("明确约定哪些区域必须保持整洁", ["yang","ning"], {boundary:2, confrontation:2}),
      O("一起快速收拾，再讨论怎样分工最省力", ["jing","mao"], {initiative:1, devotion:2, stability:2}),
      O("先收好影响使用的部分，再用实际分工减少争论", ["zheng","mao"], {devotion:2, boundary:-2}),
      O("用夸张玩笑提醒，让对方意识到问题", ["chen","xu"], {expression:2, initiative:1})]),
    Q("冲突现场", "承诺落空", "朋友答应帮你，却临时去参加别的活动。你会？", [
      O("直接说这影响了信任，并要求新的解决方案", ["ning","yang"], {confrontation:2, boundary:2}),
      O("先确认发生了什么，再判断是意外还是选择", ["jing","mao"], {stability:2, confrontation:1}),
      O("直接说这让我受伤，并确认彼此如何看待这段关系", ["xu","zheng"], {expression:2, stability:-2}),
      O("自己想办法完成，之后减少对 TA 的依赖", ["chen","yang"], {boundary:2, initiative:1})]),
    Q("冲突现场", "当众落泪", "争论中有人突然哭了，所有人都停下来。你会？", [
      O("先暂停争论，让对方恢复再继续", ["mao","jing"], {stability:2, devotion:2}),
      O("安静陪伴并问对方现在需要什么", ["xu","zheng"], {expression:2, devotion:2}),
      O("情绪值得照顾，但问题不能因此消失", ["ning","yang"], {confrontation:2, boundary:2}),
      O("带大家换个空间或活动，先把压力降下来", ["chen","mao"], {initiative:2, stability:1})]),
    Q("冲突现场", "传话失真", "你发现有人转述你的话时改变了原意。你会？", [
      O("找当事人一起核对原话，阻止误会继续扩散", ["jing","yang"], {confrontation:2, stability:2}),
      O("当众澄清，并说明这种传话不可接受", ["ning","xu"], {confrontation:2, expression:2}),
      O("私下问转述者是不是理解错了", ["mao","zheng"], {stability:1, devotion:1}),
      O("先和信任的人核对理解，再决定是否公开澄清", ["xu","chen"], {expression:1, stability:-1})]),
    Q("冲突现场", "冷战开始", "同伴突然不回应你，也不说明原因。你会？", [
      O("给一次明确邀请：愿意谈时我们把话说清", ["jing","yang"], {boundary:2, stability:2, expression:1}),
      O("直接追问，不接受用沉默控制关系", ["ning","xu"], {confrontation:2, expression:2}),
      O("先回看最近的互动，整理可能遗漏的信号再开口", ["zheng","xu"], {devotion:1, stability:-2}),
      O("先各自活动，空间有时比追问更有效", ["chen","mao"], {boundary:2, stability:2})]),

    Q("压力测试", "护照遗失", "临近跨境交通时，有人发现护照不见了。你会？", [
      O("马上分工报警、联系领馆并查找最后出现地点", ["jing","zheng"], {initiative:2, devotion:2, stability:2}),
      O("陪失主留下处理，让其他人先按计划走", ["mao","yang"], {devotion:2, boundary:1}),
      O("先跳过追责，直接确认对方能否承担下一步", ["ning","jing"], {confrontation:1, boundary:2}),
      O("先稳住对方的情绪，让 TA 能一起参与下一步行动", ["xu","chen"], {expression:2, devotion:2})]),
    Q("压力测试", "航班取消", "深夜航班取消，住宿和改签窗口都排长队。你会？", [
      O("一人排队、一人查线上改签、一人找住宿", ["jing","yang"], {initiative:2, stability:2, devotion:2}),
      O("先确保大家有地方休息，明早再处理", ["mao","zheng"], {stability:2, devotion:1}),
      O("直接找工作人员确认最有效的解决路径", ["ning","chen"], {initiative:2, confrontation:2}),
      O("给疲惫的人买水和食物，先稳住情绪", ["xu","mao"], {devotion:2, expression:1})]),
    Q("压力测试", "自己发烧", "你开始发烧，但大家正期待当天的重头行程。你会？", [
      O("清楚说明症状并退出，不让团队猜测", ["jing","ning"], {boundary:2, expression:2, stability:1}),
      O("先自己处理症状并观察，确认影响行程时再说明", ["yang","zheng"], {devotion:2, boundary:-2}),
      O("找一家舒服的店休息，也邀请想放慢的人同行", ["mao","xu"], {stability:2, expression:1}),
      O("根据身体状态随时决定，不为错过体验自责", ["chen","ning"], {boundary:2, initiative:1})]),
    Q("压力测试", "现金不足", "偏远地区突然无法刷卡，团队现金不够。你会？", [
      O("盘点现金和刚需，按优先级重新分配", ["yang","jing"], {stability:2, initiative:2}),
      O("主动去找兑换点或向住宿方协调", ["chen","ning"], {initiative:2, confrontation:1}),
      O("先保证吃住，其他消费全部暂停", ["mao","zheng"], {stability:2, devotion:1}),
      O("先核对预算偏差，把追责留到基本物资稳定之后", ["zheng","xu"], {stability:-1, devotion:1})]),
    Q("压力测试", "路线不安全", "夜路看起来不安全，但绕路会多花一个小时。你会？", [
      O("立刻绕路，安全成本不需要投票", ["yang","mao"], {boundary:2, stability:2}),
      O("先向当地人或酒店确认风险再决定", ["jing","zheng"], {stability:2, initiative:1}),
      O("如果有人明显害怕，就尊重 TA 的底线", ["xu","mao"], {expression:1, devotion:2}),
      O("不盲目恐惧，但会快速评估后果断行动", ["ning","chen"], {initiative:2, confrontation:1})]),
    Q("压力测试", "工作打断", "同伴临时要处理工作，团队必须等待两小时。你会？", [
      O("调整为附近自由活动，约定准确集合时间", ["jing","yang"], {boundary:2, stability:2, initiative:1}),
      O("理解一次，但会说明之后不能总让全队等待", ["mao","ning"], {boundary:2, confrontation:1}),
      O("留下陪对方处理紧急工作，避免 TA 独自承压", ["xu","zheng"], {devotion:2, expression:1}),
      O("马上去探索周围，两小时也能有新体验", ["chen","ning"], {initiative:2, stability:1})]),
    Q("压力测试", "暴雨突袭", "户外行程遇到暴雨，有人仍坚持继续。你会？", [
      O("检查天气预警和撤离条件，再决定是否继续", ["zheng","yang"], {stability:2, boundary:2}),
      O("安全没有讨价还价，直接要求返程", ["ning","mao"], {confrontation:2, boundary:2}),
      O("找到室内替代活动，不让一天完全报废", ["chen","jing"], {initiative:2, stability:1}),
      O("先照顾已经害怕或淋湿的人", ["xu","mao"], {devotion:2, expression:1})]),
    Q("压力测试", "负责人倒下", "一直做决定的人突然崩溃，说自己什么都不想管。你会？", [
      O("接过最紧急的部分，同时把剩余任务分出去", ["jing","yang"], {initiative:2, devotion:2, boundary:1}),
      O("先让 TA 休息，不追问为什么撑到现在", ["mao","xu"], {stability:2, devotion:2}),
      O("指出这证明权力和责任早该重新分配", ["ning","chen"], {confrontation:2, boundary:2}),
      O("补上一个明确任务，用行动回应我感受到的责任", ["zheng","xu"], {devotion:2, stability:-2})]),

    Q("旅程终章", "纪念品选择", "最后一天只能买一件纪念品，你会选？", [
      O("一件真正会长期使用、能提醒我这段旅程的东西", ["mao","yang"], {stability:2, boundary:1}),
      O("最独特、最能代表冒险瞬间的东西", ["chen","ning"], {initiative:2, expression:1}),
      O("和重要的人一起挑一件有共同故事的东西", ["xu","jing"], {expression:2, devotion:1}),
      O("先确认预算和行李空间，避免回程添麻烦", ["zheng","yang"], {stability:1, devotion:1})]),
    Q("旅程终章", "合照选择", "团队要选一张照片作为共同封面。你最看重？", [
      O("每个人都自然、没有谁被挡住", ["jing","zheng"], {devotion:2, stability:1}),
      O("画面最有张力，即使有人表情不完美", ["ning","chen"], {expression:2, boundary:1}),
      O("能看出大家真心快乐，而不是摆拍", ["xu","mao"], {expression:2, stability:1}),
      O("清晰、有代表性，也方便所有人保存", ["yang","mao"], {stability:2, devotion:1})]),
    Q("旅程终章", "结清账目", "回程前还有一笔复杂的公共账目没算清。你会？", [
      O("今晚逐项对完，不把问题带回家", ["yang","zheng"], {initiative:2, confrontation:1, devotion:2}),
      O("抓住大额差异，小金额不必消耗关系", ["mao","jing"], {stability:2, boundary:1}),
      O("公开账目并请有异议的人直接提出", ["ning","jing"], {confrontation:2, boundary:2}),
      O("会先确认大家是不是对钱之外的事有情绪", ["xu","chen"], {expression:2, devotion:1})]),
    Q("旅程终章", "告别动态", "回家后要发一条旅行总结，你会？", [
      O("记录具体的人和事，让每份付出被看见", ["jing","zheng"], {devotion:2, expression:1}),
      O("只写自己真正的感受，不做标准化感谢", ["ning","xu"], {expression:2, boundary:2}),
      O("发最快乐的片段，复杂的部分留给自己", ["chen","mao"], {stability:2, initiative:1}),
      O("先征求大家对照片和故事公开范围的意见", ["yang","jing"], {boundary:2, devotion:1})]),
    Q("旅程终章", "回家后的联系", "旅行结束一个月后，群聊逐渐安静。你会？", [
      O("主动约一次聚会，看看关系能否继续", ["chen","jing"], {initiative:2, devotion:1}),
      O("联系真正想念的人，不要求全员一直亲密", ["xu","ning"], {expression:2, boundary:2}),
      O("顺其自然，共同经历不必变成长期义务", ["mao","yang"], {stability:2, boundary:1}),
      O("在群里分享照片或近况，用轻量方式维持联系", ["zheng","xu"], {devotion:2, stability:-2})]),
    Q("旅程终章", "迟来的道歉", "回家后，有人为旅途中的伤害向你道歉。你会？", [
      O("听完并说明影响，原谅与否不急着决定", ["jing","yang"], {boundary:2, stability:2, expression:1}),
      O("如果道歉真实，我愿意重新开始", ["xu","chen"], {expression:2, devotion:1}),
      O("更看重之后是否改变，不被漂亮话打动", ["ning","mao"], {confrontation:2, boundary:2}),
      O("会先检讨自己是不是也伤害过对方", ["zheng","mao"], {devotion:2, stability:-1})]),
    Q("旅程终章", "再次组队", "如果下次可以自己选旅行搭档，你会优先选？", [
      O("遇事冷静、能共同解决问题的人", ["jing","yang"], {stability:2, devotion:1}),
      O("敢讲真话、不把矛盾藏起来的人", ["ning","xu"], {confrontation:2, expression:2}),
      O("轻松有趣、愿意探索新体验的人", ["chen","mao"], {initiative:2, stability:1}),
      O("认真负责、会把细节照顾好的人", ["zheng","jing"], {devotion:2, stability:1})]),
    Q("旅程终章", "旅程的意义", "多年后回想这段旅行，你最希望记住什么？", [
      O("我们如何在混乱里仍然把事情做成", ["jing","zheng"], {devotion:2, stability:2}),
      O("那些说过真话、重新认识彼此的时刻", ["ning","xu"], {expression:2, confrontation:2}),
      O("身体真正到过的地方和意外的快乐", ["chen","mao"], {initiative:2, stability:1}),
      O("我更清楚自己的边界、责任和位置", ["yang","ning"], {boundary:2, stability:1})])
  ];
})();
