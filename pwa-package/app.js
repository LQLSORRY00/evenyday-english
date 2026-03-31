// 应用状态管理
const appState = {
    currentUser: {
        name: '学习者',
        level: 1,
        exp: 0
    },
    progress: {
        todayWords: 0,
        todayTime: 0,
        streakDays: 0,
        longestStreak: 0,
        totalWords: 0,
        totalHours: 0,
        listeningCount: 0, // 听力练习次数
        grammarCount: 0 // 语法学习次数
    },
    listening: {
        currentLevel: 'zero', // 默认从零基础开始
        speed: 0.6, // 默认较慢速度，适合听力薄弱者
        isPlaying: false
    },
    speaking: {
        isRecording: false,
        currentMode: 'repeat'
    },
    settings: {
        showChinese: false,
        showEnglish: true
    }
};

// 词汇数据（初级基础词汇 - 适合35岁成人零基础）
const vocabularyData = [
    // 基础动词
    { word: 'be', phonetic: '/biː/', meaning: '是', example: 'I am a student.' },
    { word: 'have', phonetic: '/hæv/', meaning: '有', example: 'I have a car.' },
    { word: 'do', phonetic: '/duː/', meaning: '做', example: 'What do you do?' },
    { word: 'say', phonetic: '/seɪ/', meaning: '说', example: 'What do you say?' },
    { word: 'go', phonetic: '/ɡəʊ/', meaning: '去', example: 'I go to work.' },
    { word: 'get', phonetic: '/ɡet/', meaning: '得到', example: 'I get up at 7.' },
    { word: 'make', phonetic: '/meɪk/', meaning: '制作', example: 'I make lunch.' },
    { word: 'know', phonetic: '/nəʊ/', meaning: '知道', example: 'I know him.' },
    { word: 'think', phonetic: '/θɪŋk/', meaning: '认为', example: 'I think so.' },
    { word: 'take', phonetic: '/teɪk/', meaning: '拿/花费', example: 'Take your time.' },
    { word: 'come', phonetic: '/kʌm/', meaning: '来', example: 'Come here.' },
    { word: 'want', phonetic: '/wɒnt/', meaning: '想要', example: 'I want to go.' },
    { word: 'look', phonetic: '/lʊk/', meaning: '看', example: 'Look at me.' },
    { word: 'use', phonetic: '/juːz/', meaning: '使用', example: 'Use this pen.' },
    { word: 'find', phonetic: '/faɪnd/', meaning: '找到', example: 'Find the key.' },
    // 基础名词
    { word: 'time', phonetic: '/taɪm/', meaning: '时间', example: 'What time is it?' },
    { word: 'person', phonetic: '/ˈpɜːsn/', meaning: '人', example: 'That person is my friend.' },
    { word: 'work', phonetic: '/wɜːk/', meaning: '工作', example: 'I go to work.' },
    { word: 'family', phonetic: '/ˈfæmɪli/', meaning: '家庭', example: 'I love my family.' },
    { word: 'money', phonetic: '/ˈmʌni/', meaning: '钱', example: 'I need money.' },
    { word: 'house', phonetic: '/haʊs/', meaning: '房子', example: 'This is my house.' },
    { word: 'car', phonetic: '/kɑː/', meaning: '汽车', example: 'I drive my car.' },
    { word: 'food', phonetic: '/fuːd/', meaning: '食物', example: 'The food is good.' },
    { word: 'water', phonetic: '/ˈwɔːtə/', meaning: '水', example: 'Drink water.' },
    { word: 'phone', phonetic: '/fəʊn/', meaning: '电话', example: 'My phone is here.' },
    // 基础形容词
    { word: 'good', phonetic: '/ɡʊd/', meaning: '好的', example: 'You are good.' },
    { word: 'new', phonetic: '/njuː/', meaning: '新的', example: 'I have a new car.' },
    { word: 'old', phonetic: '/əʊld/', meaning: '旧的', example: 'This is an old book.' },
    { word: 'big', phonetic: '/bɪɡ/', meaning: '大的', example: 'It is a big house.' },
    { word: 'small', phonetic: '/smɔːl/', meaning: '小的', example: 'It is a small room.' },
    { word: 'happy', phonetic: '/ˈhæpi/', meaning: '快乐的', example: 'I am happy.' },
    { word: 'sad', phonetic: '/sæd/', meaning: '悲伤的', example: 'He looks sad.' },
    { word: 'hot', phonetic: '/hɒt/', meaning: '热的', example: 'It is hot today.' },
    { word: 'cold', phonetic: '/kəʊld/', meaning: '冷的', example: 'It is cold outside.' },
    { word: 'tired', phonetic: '/ˈtaɪəd/', meaning: '累的', example: 'I am tired.' },
    // 基础代词
    { word: 'I', phonetic: '/aɪ/', meaning: '我', example: 'I am here.' },
    { word: 'you', phonetic: '/juː/', meaning: '你', example: 'You are my friend.' },
    { word: 'he', phonetic: '/hiː/', meaning: '他', example: 'He is my brother.' },
    { word: 'she', phonetic: '/ʃiː/', meaning: '她', example: 'She is my sister.' },
    { word: 'it', phonetic: '/ɪt/', meaning: '它', example: 'It is a cat.' },
    { word: 'we', phonetic: '/wiː/', meaning: '我们', example: 'We are friends.' },
    { word: 'they', phonetic: '/ðeɪ/', meaning: '他们', example: 'They are good people.' },
    { word: 'my', phonetic: '/maɪ/', meaning: '我的', example: 'This is my book.' },
    { word: 'your', phonetic: '/jɔː/', meaning: '你的', example: 'This is your pen.' },
    { word: 'his', phonetic: '/hɪz/', meaning: '他的', example: 'This is his car.' },
    // 基础常用短语
    { word: 'hello', phonetic: '/həˈləʊ/', meaning: '你好', example: 'Hello, how are you?' },
    { word: 'thank you', phonetic: '/θæŋk juː/', meaning: '谢谢', example: 'Thank you very much.' },
    { word: 'sorry', phonetic: '/ˈsɒri/', meaning: '对不起', example: 'I am sorry.' },
    { word: 'please', phonetic: '/pliːz/', meaning: '请', example: 'Please help me.' },
    { word: 'good morning', phonetic: '/ɡʊd ˈmɔːnɪŋ/', meaning: '早上好', example: 'Good morning, sir.' },
    { word: 'good night', phonetic: '/ɡʊd naɪt/', meaning: '晚安', example: 'Good night, mom.' },
    { word: 'see you', phonetic: '/siː juː/', meaning: '再见', example: 'See you tomorrow.' },
    { word: 'of course', phonetic: '/ɒv kɔːs/', meaning: '当然', example: 'Of course I can.' },
    { word: 'excuse me', phonetic: '/ɪkˈskjuːz miː/', meaning: '打扰一下', example: 'Excuse me, where is the station?' },
    { word: 'no problem', phonetic: '/nəʊ ˈprɒbləm/', meaning: '没问题', example: 'No problem at all.' }
];

// 听力材料数据（优化为超慢速简单内容，适合听力薄弱者）
const listeningData = {
    zero: {
        text: 'Hello. My name is Tom. I am a man. I am thirty-five. I am happy.',
        chinese: '你好。我叫汤姆。我是个男人。我三十五岁。我很开心。',
        tips: '建议速度：0.5x，重点听数字和简单词汇'
    },
    beginner: {
        text: 'Good morning. How are you? I am fine, thank you. I have a family. I have a wife. I have a son. They are good.',
        chinese: '早上好。你好吗？我很好，谢谢。我有一个家庭。我有妻子。我有一个儿子。他们很好。',
        tips: '建议速度：0.6x，注意语调变化'
    },
    easy: {
        text: 'I go to work every day. I work in an office. I have a computer. I work from nine to five. I like my job.',
        chinese: '我每天都去上班。我在办公室工作。我有一台电脑。我从九点工作到五点。我喜欢我的工作。',
        tips: '建议速度：0.7x，注意时间和工作相关词汇'
    },
    intermediate: {
        text: 'Today is Monday. The weather is nice. I want to go to the park. I can walk there. I can take a bus. The bus is slow. I will walk.',
        chinese: '今天是星期一。天气很好。我想去公园。我可以走过去。我可以坐公交车。公交车很慢。我会走路。',
        tips: '建议速度：0.8x，注意星期和天气词汇'
    }
};

// 阅读材料数据
const readingData = [
    {
        title: 'The Importance of Continuous Learning',
        content: `In today's fast-paced world, continuous learning has become essential for personal and professional growth. The skills and knowledge that were valuable yesterday may not be sufficient tomorrow. 

The ability to learn new things quickly and effectively is one of the most valuable skills you can develop. This doesn't mean you need to go back to formal education, but rather that you should embrace a mindset of lifelong learning.

There are many ways to continue learning. Reading books, taking online courses, attending workshops, and even having meaningful conversations with others can all contribute to your knowledge and skills. The key is to be curious and open to new ideas.

Remember, learning is a journey, not a destination. Every day presents an opportunity to grow and improve. By committing to continuous learning, you invest in your future self.`,
        questions: [
            {
                question: 'Why has continuous learning become essential?',
                options: ['Because it\'s required by law', 'For personal and professional growth', 'Because it\'s fashionable', 'To avoid boredom'],
                correct: 1
            },
            {
                question: 'What is one of the most valuable skills to develop?',
                options: ['Speaking multiple languages', 'The ability to learn new things quickly', 'Managing large teams', 'Working with computers'],
                correct: 1
            }
        ]
    }
];

// 成就系统（调整为更易达成的成就，激励零基础学习者）
const achievements = [
    { id: 'first_step', name: '初学者', desc: '学习第一个单词', icon: '🎯', requirement: 1, type: 'words' },
    { id: 'ten_words', name: '词汇入门', desc: '学习10个单词', icon: '📝', requirement: 10, type: 'words' },
    { id: 'fifty_words', name: '词汇进阶', desc: '学习50个单词', icon: '📚', requirement: 50, type: 'words' },
    { id: 'first_listening', name: '听力初试', desc: '完成第一次听力', icon: '🎧', requirement: 1, type: 'listening' },
    { id: 'listener', name: '听力达人', desc: '完成5次听力练习', icon: '🎵', requirement: 5, type: 'listening' },
    { id: 'consistent_learner', name: '坚持3天', desc: '连续学习3天', icon: '🔥', requirement: 3, type: 'streak' },
    { id: 'dedicated_student', name: '坚持一周', desc: '连续学习7天', icon: '⭐', requirement: 7, type: 'streak' },
    { id: 'first_grammar', name: '语法入门', desc: '学习第一个语法点', icon: '📖', requirement: 1, type: 'grammar' }
];

// 初始化应用
function initApp() {
    loadUserData();
    setupEventListeners();
    updateUI();
    generateCalendar();
}

// 加载用户数据
function loadUserData() {
    const savedData = localStorage.getItem('dailyEnglishData');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        Object.assign(appState, parsed);
        
        // 检查是否需要更新连续学习天数
        checkStreak();
    }
}

// 保存用户数据
function saveUserData() {
    localStorage.setItem('dailyEnglishData', JSON.stringify(appState));
}

// 检查连续学习天数
function checkStreak() {
    const today = new Date().toDateString();
    const lastStudy = localStorage.getItem('lastStudyDate');
    
    if (lastStudy) {
        const lastDate = new Date(lastStudy);
        const daysDiff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff > 1) {
            // 连续学习中断
            appState.progress.streakDays = 0;
        }
    }
    
    // 更新今天的学习状态
    if (lastStudy !== today) {
        localStorage.setItem('lastStudyDate', today);
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 侧边栏导航菜单点击（桌面端）
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            navigateTo(page);
        });
    });

    // 移动端底部导航点击
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            navigateTo(page);
        });
    });
}

// 导航到指定页面
function navigateTo(pageName) {
    // 更新侧边栏导航菜单状态（桌面端）
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    // 更新移动端底部导航状态
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    // 切换页面显示
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 页面特定初始化
    switch(pageName) {
        case 'vocabulary':
            loadNewWords();
            break;
        case 'listening':
            loadListeningContent();
            break;
        case 'reading':
            loadNewArticle();
            break;
        case 'review':
            loadReviewQueue();
            break;
        case 'stats':
            loadStats();
            break;
    }
}

// 更新UI
function updateUI() {
    // 更新首页统计
    document.getElementById('todayWords').textContent = appState.progress.todayWords;
    document.getElementById('todayTime').textContent = appState.progress.todayTime;
    document.getElementById('streakDays').textContent = appState.progress.streakDays;
    
    // 更新用户信息
    document.getElementById('userName').textContent = appState.currentUser.name;
    document.getElementById('userLevel').textContent = `Lv.${appState.currentUser.level}`;
    
    // 更新每日进度
    const progressPercent = Math.min((appState.progress.todayWords / 15) * 100, 100);
    document.getElementById('dailyProgress').style.width = `${progressPercent}%`;
    document.getElementById('progressText').textContent = `完成度: ${Math.round(progressPercent)}%`;
}

// 加载新词汇
function loadNewWords() {
    const list = document.getElementById('vocabulary-list');
    list.innerHTML = '';
    
    // 随机选择10个未学习的单词
    const unlearnedWords = vocabularyData.filter(word => 
        !appState.learnedWords.includes(word.word)
    );
    
    const wordsToLearn = unlearnedWords.slice(0, 10);
    
    if (wordsToLearn.length === 0) {
        list.innerHTML = '<p>恭喜！你已经学完了所有单词。</p>';
        return;
    }
    
    wordsToLearn.forEach((word, index) => {
        const card = createWordCard(word, index);
        list.appendChild(card);
    });
}

// 创建单词卡片
function createWordCard(wordData, index) {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
        <div class="word">${wordData.word}</div>
        <div class="phonetic">${wordData.phonetic}</div>
        <div class="meaning">${wordData.meaning}</div>
        <div class="example">${wordData.example}</div>
        <div class="word-actions">
            <button class="btn btn-secondary" onclick="playWord('${wordData.word}')">🔊</button>
            <button class="btn btn-success" onclick="markAsLearned('${wordData.word}', this)">✓ 已学</button>
            <button class="btn btn-warning" onclick="addToReview('${wordData.word}')">🔄</button>
        </div>
    `;
    return card;
}

// 播放单词发音
function playWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    } else {
        alert('您的浏览器不支持语音合成功能');
    }
}

// 标记为已学
function markAsLearned(word, button) {
    if (!appState.learnedWords.includes(word)) {
        appState.learnedWords.push(word);
        appState.progress.todayWords++;
        appState.progress.totalWords++;
        
        // 添加到复习队列
        appState.reviewQueue.push({
            word: word,
            lastReview: Date.now(),
            nextReview: Date.now() + 24 * 60 * 60 * 1000, // 24小时后
            interval: 1
        });
        
        saveUserData();
        updateUI();
        updateAchievements();
        
        button.textContent = '✓ 已掌握';
        button.disabled = true;
        button.className = 'btn btn-success';
    }
}

// 添加到复习队列
function addToReview(word) {
    if (!appState.reviewQueue.find(item => item.word === word)) {
        appState.reviewQueue.push({
            word: word,
            lastReview: Date.now(),
            nextReview: Date.now() + 24 * 60 * 60 * 1000,
            interval: 1
        });
        saveUserData();
    }
}

// 加载听力内容
function loadListeningContent() {
    const level = document.getElementById('listening-level').value;
    const content = listeningData[level];
    
    const audioText = document.getElementById('audioText');
    audioText.innerHTML = `<p class="english-text">${content.text}</p>`;
    
    // 显示学习提示
    if (content.tips) {
        const audioTips = document.getElementById('audioTips');
        if (audioTips) {
            audioTips.innerHTML = `<p>💡 ${content.tips}</p>`;
        }
    }
    
    // 根据级别调整默认速度
    if (level === 'zero') {
        appState.listening.speed = 0.5;
    } else if (level === 'beginner') {
        appState.listening.speed = 0.6;
    } else if (level === 'easy') {
        appState.listening.speed = 0.7;
    } else {
        appState.listening.speed = 0.8;
    }
    
    document.getElementById('speedDisplay').textContent = `${appState.listening.speed.toFixed(2)}x`;
    
    // 重置播放状态
    appState.listening.isPlaying = false;
    document.getElementById('playBtn').textContent = '▶️ 播放';
}

// 播放/暂停听力
function togglePlay() {
    const level = document.getElementById('listening-level').value;
    const content = listeningData[level];
    
    if (appState.listening.isPlaying) {
        speechSynthesis.cancel();
        appState.listening.isPlaying = false;
        document.getElementById('playBtn').textContent = '▶️ 播放';
    } else {
        const utterance = new SpeechSynthesisUtterance(content.text);
        utterance.lang = 'en-US';
        utterance.rate = appState.listening.speed;
        
        utterance.onend = () => {
            appState.listening.isPlaying = false;
            document.getElementById('playBtn').textContent = '▶️ 播放';
            // 记录听力练习次数
            appState.progress.listeningCount++;
            saveUserData();
            updateAchievements();
        };
        
        speechSynthesis.speak(utterance);
        appState.listening.isPlaying = true;
        document.getElementById('playBtn').textContent = '⏸️ 暂停';
    }
}

// 改变播放速度
function changeSpeed(delta) {
    const newSpeed = Math.max(0.3, Math.min(2.0, appState.listening.speed + delta)); // 最小0.3x，更适合听力薄弱者
    appState.listening.speed = newSpeed;
    document.getElementById('speedDisplay').textContent = `${newSpeed.toFixed(2)}x`;
}

// 切换字幕
function toggleSubtitle(type) {
    const level = document.getElementById('listening-level').value;
    const content = listeningData[level];
    const audioText = document.getElementById('audioText');
    
    let html = '';
    const showEnglish = document.getElementById('showEnglish').checked;
    const showChinese = document.getElementById('showChinese').checked;
    
    if (showEnglish) {
        html += `<p class="english-text">${content.text}</p>`;
    }
    if (showChinese) {
        html += `<p class="chinese-text">${content.chinese}</p>`;
    }
    
    audioText.innerHTML = html;
}

// 检查听写答案
function checkDictation() {
    const userText = document.getElementById('dictationInput').value.toLowerCase();
    const level = document.getElementById('listening-level').value;
    const correctText = listeningData[level].text.toLowerCase();
    
    const result = document.getElementById('dictationResult');
    result.className = 'result-feedback show';
    
    // 简单比较（实际应用中可以使用更复杂的相似度算法）
    const similarity = calculateSimilarity(userText, correctText);
    
    if (similarity >= 0.8) {
        result.innerHTML = `<p>✅ 优秀！准确率: ${(similarity * 100).toFixed(1)}%</p>`;
        result.classList.add('success');
    } else if (similarity >= 0.5) {
        result.innerHTML = `<p>⚠️ 不错！准确率: ${(similarity * 100).toFixed(1)}%</p>`;
        result.classList.add('warning');
    } else {
        result.innerHTML = `<p>❌ 继续努力！准确率: ${(similarity * 100).toFixed(1)}%</p>`;
        result.classList.add('error');
    }
}

// 计算相似度（简化版）
function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    let matchCount = 0;
    
    words1.forEach(word1 => {
        if (words2.includes(word1)) {
            matchCount++;
        }
    });
    
    return matchCount / Math.max(words1.length, words2.length);
}

// 加载新文章
function loadNewArticle() {
    const article = readingData[0];

    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleContent').innerHTML = article.content.split('\n\n').map(para =>
        `<p>${para}</p>`
    ).join('');

    // 生成测试题
    generateQuiz(article.questions);
}

// 播放状态跟踪
let isArticlePaused = false;

// 播放文章（包括开始和继续）
function toggleArticlePlay() {
    console.log('toggleArticlePlay 被调用');
    console.log('isArticlePaused:', isArticlePaused);
    console.log('paused:', window.speechSynthesis.paused);
    console.log('speaking:', window.speechSynthesis.speaking);

    if ('speechSynthesis' in window) {
        const playBtn = document.getElementById('playArticleBtn');
        const pauseBtn = document.getElementById('pauseArticleBtn');

        // 如果是暂停状态（即使 speaking 是 false），重新开始播放
        if (isArticlePaused) {
            console.log('检测到暂停状态，重新开始播放');
            window.speechSynthesis.cancel();
            startNewArticlePlayback();
            return;
        }

        // 如果正在播放，不做任何事
        if (window.speechSynthesis.speaking && !isArticlePaused) {
            console.log('正在播放中，忽略点击');
            return;
        }

        // 否则重新开始播放
        console.log('开始新的播放');
        startNewArticlePlayback();
    } else {
        alert('您的浏览器不支持语音播放功能');
    }
}

// 开始新的文章播放
function startNewArticlePlayback() {
    console.log('startNewArticlePlayback 被调用');
    isArticlePaused = false; // 重置暂停状态

    const articleTitle = document.getElementById('articleTitle').textContent;
    const articleContent = document.getElementById('articleContent').textContent;

    console.log('文章标题:', articleTitle);
    console.log('文章内容长度:', articleContent ? articleContent.length : 0);

    if (!articleContent || articleContent.trim() === '') {
        alert('请先加载文章！');
        return;
    }

    // 取消正在播放的语音
    window.speechSynthesis.cancel();

    // 创建语音合成
    const utterance = new SpeechSynthesisUtterance(articleTitle + '. ' + articleContent);

    // 设置语音参数
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // 播放速度（0.1-10）
    utterance.pitch = 1;   // 音调（0-2）

    console.log('准备播放，rate:', utterance.rate, 'pitch:', utterance.pitch);

    // 更新按钮状态
    const playBtn = document.getElementById('playArticleBtn');
    const pauseBtn = document.getElementById('pauseArticleBtn');
    if (playBtn && pauseBtn) {
        playBtn.textContent = '🔊 播放中...';
        playBtn.disabled = true;
        pauseBtn.disabled = false;
    }

    // 播放开始事件
    utterance.onstart = () => {
        console.log('语音播放开始');
    };

    // 播放结束
    utterance.onend = () => {
        console.log('语音播放结束');
        isArticlePaused = false; // 重置暂停状态
        if (playBtn && pauseBtn) {
            playBtn.textContent = '🔊 播放原文';
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    };

    // 播放出错
    utterance.onerror = (event) => {
        console.error('语音播放错误:', event);
        console.error('错误类型:', event.error);
        // 不重置按钮状态，让新的播放可以继续
        // 只有在真正出错时才提示，避免 canceled、interrupted 等正常情况被误判
        if (event.error !== 'canceled' && event.error !== 'interrupted') {
            console.error('真正的播放错误，重置按钮状态');
            if (playBtn && pauseBtn) {
                playBtn.textContent = '🔊 播放原文';
                playBtn.disabled = false;
                pauseBtn.disabled = true;
            }
            alert('播放失败，请重试\n错误信息: ' + event.error);
        } else {
            console.log('正常的中断错误（canceled 或 interrupted），不重置状态');
        }
    };

    // 播放
    console.log('调用 speechSynthesis.speak');
    window.speechSynthesis.speak(utterance);
    console.log('speak 调用完成');
}

// 暂停播放
function pauseArticle() {
    console.log('pauseArticle 被调用');
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            isArticlePaused = true; // 标记为暂停状态

            const playBtn = document.getElementById('playArticleBtn');
            const pauseBtn = document.getElementById('pauseArticleBtn');

            if (playBtn && pauseBtn) {
                playBtn.textContent = '▶️ 继续播放';
                playBtn.disabled = false;
                pauseBtn.disabled = true;
            }
        }
    }
}

// 生成测试题
function generateQuiz(questions) {
    const container = document.getElementById('quiz-questions');
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <div class="quiz-options">
                ${q.options.map((opt, optIndex) => `
                    <label>
                        <input type="radio" name="q${index}" value="${optIndex}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });
}

// 显示测试
function showQuiz() {
    document.getElementById('reading-quiz').classList.remove('hidden');
}

// 提交测试答案
function submitQuiz() {
    const article = readingData[0];
    let correctCount = 0;
    
    article.questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            correctCount++;
        }
    });
    
    const result = document.getElementById('quiz-result');
    result.className = 'result-feedback show';
    const percentage = (correctCount / article.questions.length) * 100;
    
    if (percentage === 100) {
        result.innerHTML = `<p>🎉 完美！全部正确！</p>`;
        result.classList.add('success');
    } else if (percentage >= 50) {
        result.innerHTML = `<p>👍 不错！正确率: ${percentage}%</p>`;
        result.classList.add('warning');
    } else {
        result.innerHTML = `<p>💪 继续努力！正确率: ${percentage}%</p>`;
        result.classList.add('error');
    }
}

// 切换口语模式
function switchSpeakingMode(mode) {
    appState.speaking.currentMode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(mode)) {
            btn.classList.add('active');
        }
    });
}

// 播放句子
function playSentence() {
    const sentence = document.getElementById('targetSentence').textContent;
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// 切换录音
function toggleRecording() {
    const btn = document.getElementById('recordBtn');
    const status = document.getElementById('recordingStatus');
    
    if (!appState.speaking.isRecording) {
        // 开始录音
        appState.speaking.isRecording = true;
        btn.textContent = '⏹️ 停止录音';
        status.textContent = '正在录音...';
        
        // 使用Web Speech API
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const confidence = event.results[0][0].confidence;
                
                appState.speaking.isRecording = false;
                btn.textContent = '🎤 开始录音';
                status.textContent = '录音完成';
                
                showSpeechFeedback(transcript, confidence);
            };
            
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                appState.speaking.isRecording = false;
                btn.textContent = '🎤 开始录音';
                
                // 根据不同的错误类型给出详细的错误提示
                let errorMsg = '录音失败';
                switch(event.error) {
                    case 'not-allowed':
                        errorMsg = '请允许使用麦克风权限\n\n方法1：浏览器设置\n1. 点击地址栏左侧的 🔒 锁图标\n2. 确保"麦克风"权限设置为"允许"\n3. 刷新页面后重试\n\n方法2：手机系统设置\n1. 打开手机"设置"\n2. 进入"应用管理" → "Chrome"\n3. 点击"权限管理"\n4. 确保"麦克风"权限已开启\n\n注意：语音识别需要HTTPS协议，当前HTTP连接可能无法使用';
                        break;
                    case 'no-speech':
                        errorMsg = '未检测到语音，请再试一次';
                        break;
                    case 'network':
                        errorMsg = '网络错误，请检查网络连接';
                        break;
                    default:
                        errorMsg = '录音失败: ' + event.error;
                }
                
                status.textContent = errorMsg.split('\n')[0];
                alert(errorMsg);
            };
            
            recognition.onend = () => {
                if (appState.speaking.isRecording) {
                    appState.speaking.isRecording = false;
                    btn.textContent = '🎤 开始录音';
                    status.textContent = '录音完成';
                }
            };
            
            recognition.start();
        } else {
            alert('您的浏览器不支持语音识别功能');
            appState.speaking.isRecording = false;
            btn.textContent = '🎤 开始录音';
            status.textContent = '浏览器不支持语音识别';
        }
    } else {
        // 停止录音
        appState.speaking.isRecording = false;
        btn.textContent = '🎤 开始录音';
        status.textContent = '录音已停止';
    }
}

// 显示口语反馈
function showSpeechFeedback(transcript, confidence) {
    const feedback = document.getElementById('speechFeedback');
    const target = document.getElementById('targetSentence').textContent;
    
    const similarity = calculateSimilarity(transcript.toLowerCase(), target.toLowerCase());
    
    let feedbackHTML = `
        <h4>📝 你的发音:</h4>
        <p>"${transcript}"</p>
        <h4>🎯 目标句子:</h4>
        <p>"${target}"</p>
        <h4>📊 相似度:</h4>
        <p class="similarity-score">${(similarity * 100).toFixed(1)}%</p>
    `;
    
    if (similarity >= 0.8) {
        feedbackHTML += `<p class="feedback-message success">✅ 发音很棒！继续保持！</p>`;
    } else if (similarity >= 0.5) {
        feedbackHTML += `<p class="feedback-message warning">⚠️ 不错，但还有提升空间</p>`;
    } else {
        feedbackHTML += `<p class="feedback-message error">❌ 需要多加练习</p>`;
    }
    
    feedback.innerHTML = feedbackHTML;
}

// 加载复习队列
function loadReviewQueue() {
    // 找出需要复习的单词
    const now = Date.now();
    const dueWords = appState.reviewQueue.filter(item => item.nextReview <= now);
    
    document.getElementById('reviewCount').textContent = dueWords.length;
    
    if (dueWords.length === 0) {
        document.getElementById('reviewWord').textContent = '没有需要复习的单词';
        document.getElementById('reviewPhonetic').textContent = '';
        document.querySelector('.card-controls').style.display = 'none';
        document.querySelector('.card-back').classList.add('hidden');
        return;
    }
    
    appState.currentReviewQueue = dueWords;
    appState.currentReviewIndex = 0;
    
    showReviewCard();
}

// 显示复习卡片
function showReviewCard() {
    if (appState.currentReviewIndex >= appState.currentReviewQueue.length) {
        // 复习完成
        document.getElementById('reviewWord').textContent = '复习完成！';
        document.getElementById('reviewPhonetic').textContent = '干得漂亮！';
        document.querySelector('.card-controls').style.display = 'none';
        document.querySelector('.card-back').classList.add('hidden');
        return;
    }
    
    const currentWord = appState.currentReviewQueue[appState.currentReviewIndex];
    const wordData = vocabularyData.find(w => w.word === currentWord.word);
    
    document.getElementById('reviewWord').textContent = wordData.word;
    document.getElementById('reviewPhonetic').textContent = wordData.phonetic;
    document.getElementById('reviewMeaning').textContent = wordData.meaning;
    document.getElementById('reviewExample').textContent = wordData.example;
    
    document.querySelector('.card-controls').style.display = 'block';
    document.querySelector('.card-back').classList.add('hidden');
    
    // 更新进度
    const progress = ((appState.currentReviewIndex) / appState.currentReviewQueue.length) * 100;
    document.getElementById('reviewProgress').style.width = `${progress}%`;
    document.getElementById('reviewProgressText').textContent = 
        `${appState.currentReviewIndex} / ${appState.currentReviewQueue.length}`;
}

// 显示答案
function showAnswer() {
    document.querySelector('.card-back').classList.remove('hidden');
}

// 评价单词记忆
function rateWord(rating) {
    const currentWord = appState.currentReviewQueue[appState.currentReviewIndex];
    const wordIndex = appState.reviewQueue.findIndex(item => item.word === currentWord.word);
    
    if (wordIndex !== -1) {
        // 根据艾宾浩斯遗忘曲线调整复习间隔
        const intervals = [1, 2, 4, 7, 14, 30]; // 天数
        
        if (rating === 1) {
            // 记得很清楚 - 增加间隔
            const currentInterval = appState.reviewQueue[wordIndex].interval;
            const nextInterval = intervals[Math.min(currentInterval, intervals.length - 1)] || currentInterval * 2;
            appState.reviewQueue[wordIndex].interval = nextInterval;
        } else if (rating === 0) {
            // 有点模糊 - 保持当前间隔
            const currentInterval = appState.reviewQueue[wordIndex].interval;
            appState.reviewQueue[wordIndex].interval = Math.max(1, Math.floor(currentInterval / 2));
        } else {
            // 完全忘记 - 重置间隔
            appState.reviewQueue[wordIndex].interval = 1;
        }
        
        appState.reviewQueue[wordIndex].lastReview = Date.now();
        appState.reviewQueue[wordIndex].nextReview = 
            Date.now() + appState.reviewQueue[wordIndex].interval * 24 * 60 * 60 * 1000;
    }
    
    saveUserData();
    
    // 移动到下一个单词
    appState.currentReviewIndex++;
    showReviewCard();
}

// 切换复习模式
function switchReviewMode(mode) {
    document.querySelectorAll('.review-mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
    
    loadReviewQueue();
}

// 加载统计数据
function loadStats() {
    document.getElementById('totalWords').textContent = appState.progress.totalWords;
    document.getElementById('totalHours').textContent = (appState.progress.totalHours).toFixed(1);
    document.getElementById('accuracy').textContent = '75%'; // 示例数据
    document.getElementById('longestStreak').textContent = appState.progress.longestStreak;
    
    loadAchievements();
}

// 加载成就
function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    
    achievements.forEach(achievement => {
        let isUnlocked = false;
        
        switch(achievement.type) {
            case 'words':
                isUnlocked = appState.progress.totalWords >= achievement.requirement;
                break;
            case 'streak':
                isUnlocked = appState.progress.streakDays >= achievement.requirement;
                break;
            case 'listening':
                isUnlocked = appState.progress.totalHours >= achievement.requirement;
                break;
        }
        
        const div = document.createElement('div');
        div.className = `achievement ${isUnlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.desc}</div>
        `;
        grid.appendChild(div);
    });
}

// 更新成就
function updateAchievements() {
    const justUnlocked = [];
    
    achievements.forEach(achievement => {
        let isUnlocked = false;
        let wasUnlocked = localStorage.getItem(`achievement_${achievement.id}`);
        
        switch(achievement.type) {
            case 'words':
                isUnlocked = appState.progress.totalWords >= achievement.requirement;
                break;
            case 'streak':
                isUnlocked = appState.progress.streakDays >= achievement.requirement;
                break;
            case 'listening':
                isUnlocked = (appState.progress.listeningCount || 0) >= achievement.requirement;
                break;
            case 'grammar':
                isUnlocked = (appState.progress.grammarCount || 0) >= achievement.requirement;
                break;
        }
        
        if (isUnlocked && !wasUnlocked) {
            justUnlocked.push(achievement);
            localStorage.setItem(`achievement_${achievement.id}`, 'true');
        }
    });
    
    // 显示新解锁的成就
    if (justUnlocked.length > 0) {
        const names = justUnlocked.map(a => a.name).join('、');
        alert(`🎉 恭喜解锁新成就：${names}！`);
    }
}

// 生成学习日历
function generateCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // 获取当月第一天和最后一天
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // 添加星期标题
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.style.fontWeight = 'bold';
        dayDiv.textContent = day;
        grid.appendChild(dayDiv);
    });
    
    // 添加空白天数
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-day';
        emptyDiv.style.background = '#f5f5f5';
        grid.appendChild(emptyDiv);
    }
    
    // 添加当月天数
    const studyDates = JSON.parse(localStorage.getItem('studyDates') || '[]');
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;
        
        const dateStr = new Date(currentYear, currentMonth, day).toDateString();
        
        if (dateStr === today.toDateString()) {
            dayDiv.classList.add('today');
        }
        
        if (studyDates.includes(dateStr)) {
            dayDiv.classList.add('studied');
        }
        
        grid.appendChild(dayDiv);
    }
    
    // 记录今天的学习
    const todayStr = today.toDateString();
    if (!studyDates.includes(todayStr)) {
        studyDates.push(todayStr);
        localStorage.setItem('studyDates', JSON.stringify(studyDates));
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp);

// ========== 语法学习模块 ==========

// 语法知识库
const grammarData = {
    be: {
        title: 'be动词用法',
        content: `
            <h3>be动词的三种形式</h3>
            <p><strong>am</strong> - 第一人称单数（I）</p>
            <p>例子：I am happy.（我很开心）</p>
            
            <p><strong>is</strong> - 第三人称单数（he/she/it/单数名词）</p>
            <p>例子：He is a teacher.（他是老师）</p>
            <p>例子：She is my sister.（她是我的妹妹）</p>
            <p>例子：It is a dog.（它是一只狗）</p>
            
            <p><strong>are</strong> - 复数（you/we/they/复数名词）</p>
            <p>例子：You are my friend.（你是我的朋友）</p>
            <p>例子：We are students.（我们是学生）</p>
            <p>例子：They are good.（他们很好）</p>
            
            <h3>缩写形式（口语常用）</h3>
            <p>I am → I'm / I am</p>
            <p>He is → He's</p>
            <p>She is → She's</p>
            <p>It is → It's</p>
            <p>You are → You're</p>
            <p>We are → We're</p>
            <p>They are → They're</p>
            
            <h3>否定形式（在be后加not）</h3>
            <p>I am not = I'm not</p>
            <p>He is not = He isn't / He's not</p>
            <p>She is not = She isn't</p>
            <p>It is not = It isn't</p>
            <p>You are not = You aren't / You're not</p>
            <p>We are not = We aren't</p>
            <p>They are not = They aren't</p>
        `,
        exercises: [
            {
                question: '___ a student.',
                options: ['am', 'is', 'are'],
                correct: 0,
                hint: '主语是I（我）'
            },
            {
                question: 'She ___ a doctor.',
                options: ['am', 'is', 'are'],
                correct: 1,
                hint: '主语是She（她）'
            },
            {
                question: 'They ___ my friends.',
                options: ['am', 'is', 'are'],
                correct: 2,
                hint: '主语是They（他们）'
            }
        ]
    },
    pronouns: {
        title: '人称代词',
        content: `
            <h3>主格代词（做主语）</h3>
            <table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">
                <tr style="background: #f0f0f0;">
                    <th style="padding: 8px;">汉语</th>
                    <th style="padding: 8px;">英语</th>
                    <th style="padding: 8px;">例子</th>
                </tr>
                <tr>
                    <td style="padding: 8px;">我</td>
                    <td style="padding: 8px; font-weight: bold;">I</td>
                    <td style="padding: 8px;">I am here.</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">你</td>
                    <td style="padding: 8px; font-weight: bold;">you</td>
                    <td style="padding: 8px;">You are good.</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">他</td>
                    <td style="padding: 8px; font-weight: bold;">he</td>
                    <td style="padding: 8px;">He is tall.</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">她</td>
                    <td style="padding: 8px; font-weight: bold;">she</td>
                    <td style="padding: 8px;">She is pretty.</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">它</td>
                    <td style="padding: 8px; font-weight: bold;">it</td>
                    <td style="padding: 8px;">It is a cat.</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">我们</td>
                    <td style="padding: 8px; font-weight: bold;">we</td>
                    <td style="padding: 8px;">We are friends.</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">他们</td>
                    <td style="padding: 8px; font-weight: bold;">they</td>
                    <td style="padding: 8px;">They are nice.</td>
                </tr>
            </table>
            
            <h3>所有格代词（表示"谁的"）</h3>
            <p>my（我的）your（你的）his（他的）her（她的）its（它的）our（我们的）their（他们的）</p>
            <p>例子：This is <strong>my</strong> book.（这是<strong>我的</strong>书）</p>
            
            <h3>宾格代词（做宾语）</h3>
            <p>me（我）you（你）him（他）her（她）it（它）us（我们）them（他们）</p>
            <p>例子：I love <strong>her</strong>.（我爱<strong>她</strong>）</p>
        `,
        exercises: [
            {
                question: '___ am a student.',
                options: ['I', 'He', 'She'],
                correct: 0,
                hint: '意思是"我"'
            },
            {
                question: 'This is ___ book.',
                options: ['I', 'my', 'me'],
                correct: 1,
                hint: '意思是"我的"'
            }
        ]
    },
    present: {
        title: '一般现在时',
        content: `
            <h3>一般现在时的用法</h3>
            <p>用于表示：</p>
            <ul>
                <li>经常发生的动作或状态</li>
                <li>客观事实</li>
                <li>习惯性动作</li>
            </ul>
            
            <h3>句型结构</h3>
            <p><strong>肯定句：</strong>主语 + 动词</p>
            <p>例子：I work every day.（我每天都工作）</p>
            
            <p><strong>否定句：</strong>主语 + don't/doesn't + 动词</p>
            <p>例子：I don't like coffee.（我不喜欢咖啡）</p>
            <p>例子：He doesn't like coffee.（他不喜欢咖啡）</p>
            
            <p><strong>疑问句：</strong>Do/Does + 主语 + 动词?</p>
            <p>例子：Do you like coffee?（你喜欢咖啡吗？）</p>
            <p>例子：Does he like coffee?（他喜欢咖啡吗？）</p>
            
            <h3>第三人称单数的变化</h3>
            <p>当主语是第三人称单数（he/she/it/单数名词）时，动词要加-s或-es</p>
            <p>work → works / play → plays / go → goes</p>
            <p>例子：He <strong>works</strong> every day.（他每天都工作）</p>
        `,
        exercises: [
            {
                question: 'I ___ to work every day.',
                options: ['go', 'goes', 'going'],
                correct: 0,
                hint: '主语是I，动词不用变化'
            },
            {
                question: 'She ___ to work every day.',
                options: ['go', 'goes', 'going'],
                correct: 1,
                hint: '主语是She（第三人称单数），动词要加es'
            }
        ]
    },
    questions: {
        title: '疑问句',
        content: `
            <h3>一般疑问句（用Yes/No回答）</h3>
            <p><strong>be动词开头：</strong>Am/Is/Are + 主语 + ...?</p>
            <p>例子：Are you a student?（你是学生吗？）</p>
            <p>回答：Yes, I am. / No, I am not.</p>
            
            <p><strong>Do/Does开头：</strong>Do/Does + 主语 + 动词原形?</p>
            <p>例子：Do you like coffee?（你喜欢咖啡吗？）</p>
            <p>回答：Yes, I do. / No, I don't.</p>
            
            <h3>特殊疑问句（用Wh-词开头）</h3>
            <table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">
                <tr style="background: #f0f0f0;">
                    <th style="padding: 8px;">疑问词</th>
                    <th style="padding: 8px;">意思</th>
                    <th style="padding: 8px;">用法</th>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>What</strong></td>
                    <td style="padding: 8px;">什么</td>
                    <td style="padding: 8px;">问事物或动作</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Who</strong></td>
                    <td style="padding: 8px;">谁</td>
                    <td style="padding: 8px;">问人</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Where</strong></td>
                    <td style="padding: 8px;">哪里</td>
                    <td style="padding: 8px;">问地点</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>When</strong></td>
                    <td style="padding: 8px;">什么时候</td>
                    <td style="padding: 8px;">问时间</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Why</strong></td>
                    <td style="padding: 8px;">为什么</td>
                    <td style="padding: 8px;">问原因</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>How</strong></td>
                    <td style="padding: 8px;">怎么样</td>
                    <td style="padding: 8px;">问方式或程度</td>
                </tr>
            </table>
            
            <h3>例句</h3>
            <p><strong>What</strong> is your name?（你叫什么名字？）</p>
            <p><strong>Who</strong> is that?（那是谁？）</p>
            <p><strong>Where</strong> do you live?（你住在哪里？）</p>
            <p><strong>When</strong> do you get up?（你什么时候起床？）</p>
            <p><strong>Why</strong> are you late?（你为什么迟到？）</p>
            <p><strong>How</strong> are you?（你好吗？）</p>
        `,
        exercises: [
            {
                question: '___ is your name?',
                options: ['What', 'Where', 'When'],
                correct: 0,
                hint: '问名字用What'
            },
            {
                question: '___ do you live?',
                options: ['What', 'Where', 'Who'],
                correct: 1,
                hint: '问地点用Where'
            }
        ]
    },
    sentences: {
        title: '基本句型',
        content: `
            <h3>英语五大基本句型</h3>
            
            <h4>1. 主语 + 谓语（S+V）</h4>
            <p>例子：Birds fly.（鸟飞。）</p>
            <p>例子：He runs.（他跑。）</p>
            
            <h4>2. 主语 + 谓语 + 宾语（S+V+O）</h4>
            <p>例子：I love you.（我爱你。）</p>
            <p>例子：He reads books.（他读书。）</p>
            
            <h4>3. 主语 + 谓语 + 表语（S+V+P）</h4>
            <p>例子：I am a teacher.（我是老师。）</p>
            <p>例子：She is happy.（她很开心。）</p>
            <p>注：这类句子常用be动词或系动词</p>
            
            <h4>4. 主语 + 谓语 + 间接宾语 + 直接宾语（S+V+IO+DO）</h4>
            <p>例子：I give you a book.（我给你一本书。）</p>
            <p>例子：He tells me a story.（他给我讲一个故事。）</p>
            
            <h4>5. 主语 + 谓语 + 宾语 + 宾语补足语（S+V+O+OC）</h4>
            <p>例子：You make me happy.（你让我开心。）</p>
            <p>例子：We call him Tom.（我们叫他汤姆。）</p>
            
            <h3>最常用的三种句型（建议先掌握）</h3>
            <p>1. I am...（我是...）- S+V+P</p>
            <p>2. I have...（我有...）- S+V+O</p>
            <p>3. I do...（我做...）- S+V+O</p>
        `,
        exercises: [
            {
                question: 'I ___ a student.（我是学生）',
                options: ['am', 'have', 'do'],
                correct: 0,
                hint: '主语+be动词+表语'
            },
            {
                question: 'I ___ a car.（我有一辆车）',
                options: ['am', 'have', 'do'],
                correct: 1,
                hint: '主语+动词+宾语，表示"有"'
            }
        ]
    }
};

let currentGrammarTopic = 'be';
let currentGrammarExerciseIndex = 0;

// 显示语法主题
function showGrammarTopic(topic) {
    currentGrammarTopic = topic;
    currentGrammarExerciseIndex = 0;
    
    // 更新按钮状态
    document.querySelectorAll('.grammar-category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.onclick.toString().includes(topic)) {
            btn.classList.add('active');
        }
    });
    
    // 显示语法内容
    const content = grammarData[topic];
    const grammarContent = document.getElementById('grammar-content');
    grammarContent.innerHTML = `
        <h3>${content.title}</h3>
        ${content.content}
    `;
    
    // 显示练习题
    loadGrammarExercise();
    
    // 记录语法学习（用于成就）
    if (!appState.grammarLearned) {
        appState.grammarLearned = [];
    }
    if (!appState.grammarLearned.includes(topic)) {
        appState.grammarLearned.push(topic);
        appState.progress.grammarCount = (appState.progress.grammarCount || 0) + 1;
        saveUserData();
        updateAchievements();
    }
}

// 加载语法练习题
function loadGrammarExercise() {
    const content = grammarData[currentGrammarTopic];
    const exercise = content.exercises[currentGrammarExerciseIndex];
    
    const exerciseContainer = document.getElementById('grammar-exercise');
    exerciseContainer.innerHTML = `
        <div class="exercise-question">
            <p><strong>练习 ${currentGrammarExerciseIndex + 1}:</strong></p>
            <p style="font-size: 1.2rem; margin: 10px 0;">${exercise.question}</p>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">💡 提示：${exercise.hint}</p>
        </div>
        <div class="exercise-options">
            ${exercise.options.map((opt, index) => `
                <button class="exercise-option-btn" onclick="selectGrammarOption(${index})">${opt}</button>
            `).join('')}
        </div>
        <div id="selectedAnswer" style="margin-top: 10px;"></div>
    `;
    
    // 清空结果
    document.getElementById('grammar-result').innerHTML = '';
    document.getElementById('grammar-result').className = 'result-feedback';
}

let selectedGrammarAnswer = null;

// 选择答案
function selectGrammarOption(index) {
    selectedGrammarAnswer = index;
    
    // 更新按钮样式
    document.querySelectorAll('.exercise-option-btn').forEach((btn, i) => {
        btn.classList.remove('selected');
        if (i === index) {
            btn.classList.add('selected');
        }
    });
    
    document.getElementById('selectedAnswer').innerHTML = 
        `<p style="color: var(--primary-color); font-weight: bold;">已选择：${grammarData[currentGrammarTopic].exercises[currentGrammarExerciseIndex].options[index]}</p>`;
}

// 检查语法答案
function checkGrammarAnswer() {
    if (selectedGrammarAnswer === null) {
        alert('请先选择一个答案！');
        return;
    }
    
    const content = grammarData[currentGrammarTopic];
    const exercise = content.exercises[currentGrammarExerciseIndex];
    const result = document.getElementById('grammar-result');
    result.className = 'result-feedback show';
    
    if (selectedGrammarAnswer === exercise.correct) {
        result.innerHTML = `<p>✅ 正确！答案：${exercise.options[exercise.correct]}</p>`;
        result.classList.add('success');
        
        // 延迟显示下一题
        setTimeout(() => {
            currentGrammarExerciseIndex++;
            if (currentGrammarExerciseIndex < content.exercises.length) {
                selectedGrammarAnswer = null;
                loadGrammarExercise();
            } else {
                result.innerHTML += `<p style="margin-top: 10px;">🎉 恭喜！这个主题的练习全部完成！</p>`;
            }
        }, 1500);
    } else {
        result.innerHTML = `<p>❌ 不对，再想想。提示：${exercise.hint}</p>`;
        result.classList.add('error');
    }
}

// 保存学习时长（每分钟）
setInterval(() => {
    if (document.visibilityState === 'visible') {
        appState.progress.todayTime++;
        appState.progress.totalHours += 1/60;
        saveUserData();
        updateUI();
    }
}, 60000);