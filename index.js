const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// 🎮 BASE DE DONNÉES ENRICHIE
const defis = {
    facile: [
        "Envoie un message vocal en chantant 'Joyeux anniversaire' 🎤",
        "Change ta photo de profil pour une photo de bébé pendant 2 heures 👶",
        "Envoie un emoji ❤️ à 5 contacts aléatoires",
        "Raconte une blague nulle au groupe 😂",
        "Fais 15 pompes et envoie une vidéo 💪",
        "Imite un animal pendant 30 secondes en vocal 🐶",
        "Parle en verlan pendant 5 minutes dans le groupe",
        "Envoie un compliment à chaque membre du groupe 💝",
        "Danse sur une chanson et partage la vidéo 🕺",
        "Fais 20 squats et filme-toi 🏋️",
        "Envoie une photo de toi sans filtre",
        "Écris un poème ridicule pour le groupe",
        "Fais un selfie avec une grimace et partage 📸",
        "Chante une chanson en yaourt (faux mots)",
        "Fais un accent bizarre pendant 3 messages"
    ],
    moyen: [
        "Appelle ton crush et dis 'je pense à toi' puis raccroche 📞",
        "Poste une story embarrassante sur Instagram 📱",
        "Envoie 'tu me manques' à ton ex (ou à quelqu'un de random) 💔",
        "Fais un karaoké et envoie la vidéo au groupe 🎤",
        "Mange une cuillère de moutarde et filme 🥵",
        "Laisse quelqu'un écrire ton statut WhatsApp pour 24h",
        "Envoie un message vocal en accent étranger 🗣️",
        "Fais le poirier pendant 1 minute 🤸",
        "Supprime ton application préférée pendant 24h 📵",
        "Parle sans utiliser la lettre 'e' pendant 10 minutes",
        "Envoie 'on doit parler' à 3 contacts sans expliquer 😰",
        "Laisse le groupe choisir ta prochaine story Instagram",
        "Appelle quelqu'un et parle comme un robot pendant 2 min 🤖",
        "Envoie un vocal où tu racontes ton rêve le plus bizarre",
        "Change ton nom WhatsApp en ce que le bot décide"
    ],
    hard: [
        "Appelle ta mère et dis-lui que tu as un tatouage 😱",
        "Publie une photo moche de toi pendant 24h sur tous tes réseaux",
        "Fais une déclaration d'amour vocale à un membre random du groupe 💕",
        "Mange quelque chose de bizarre que le groupe choisit 🤢",
        "Laisse le groupe lire tes 10 derniers messages avec ton crush 👀",
        "Fais une vidéo TikTok embarrassante en public et partage 📹",
        "Bloque ton meilleur ami pendant 1 heure sans prévenir",
        "Appelle quelqu'un et chante une chanson d'amour complète 🎵",
        "Poste 'Je suis célibataire' en story même si c'est faux",
        "Envoie un vocal où tu avoues ton plus gros secret 🤫",
        "Laisse quelqu'un poster ce qu'il veut sur ton compte pendant 10 min",
        "Appelle ton crush et mets le haut-parleur devant le groupe",
        "Fais une story Instagram 'À la recherche de l'amour' avec ton numéro",
        "Envoie 'Je t'aime' à 5 contacts et screenshot les réponses",
        "Révèle qui dans le groupe tu trouves le plus attirant"
    ]
};

const verites = {
    facile: [
        "Qui est ton plus gros crush actuellement ? 😍",
        "Quelle est la dernière fois que tu as menti et à propos de quoi ? 🤥",
        "Qui est la personne la plus belle du groupe selon toi ? 👑",
        "Quel est ton rêve le plus fou ? 💭",
        "Qui stalkes-tu le plus sur les réseaux sociaux ? 👀",
        "Quelle est ta plus grande peur ? 😨",
        "Quel est ton film ou série préféré ? 🎬",
        "As-tu déjà copié sur quelqu'un en cours ? 📝",
        "Quelle est la chose la plus embarrassante dans ta chambre ? 😳",
        "Quel est le contact le plus bizarre de ton téléphone ?",
        "As-tu déjà fait semblant d'être malade pour sécher ? 🤒",
        "C'est quoi le dernier mensonge que tu as dit aujourd'hui ?",
        "Quelle est ta chanson guilty pleasure ? 🎵",
        "As-tu déjà pleuré devant un film ? Lequel ? 😢",
        "Quel est ton snack préféré que personne ne comprend ? 🍕"
    ],
    moyen: [
        "As-tu déjà embrassé quelqu'un de ce groupe ? 💋",
        "Quel est ton plus gros secret que tu n'as jamais dit ? 🤐",
        "As-tu déjà été amoureux de quelqu'un ici en secret ? 💘",
        "Quelle est la pire chose que tu aies faite ? 😈",
        "Montre ta galerie photo, scrolle les yeux fermés et montre où tu tombes 📱",
        "As-tu déjà triché dans une relation ? 💔",
        "Quel est le dernier gros mensonge à tes parents ? 👨‍👩‍👦",
        "As-tu déjà espionné le téléphone de quelqu'un ? 🕵️",
        "Quelle est ta recherche Google la plus bizarre ? 🔍",
        "Si tu devais sortir avec quelqu'un du groupe, qui ? 💑",
        "As-tu déjà envoyé un message à la mauvaise personne ? Raconte 📨",
        "Quel est ton crush secret dans une autre classe/groupe ?",
        "As-tu déjà menti sur ton âge ? Dans quel contexte ? 🎂",
        "Quelle est la chose la plus gênante dans ton historique de recherche ?",
        "As-tu déjà fait semblant d'aimer quelqu'un ? Pourquoi ?"
    ],
    hard: [
        "Lis ton dernier échange avec ton crush au groupe 💬",
        "Montre les 5 dernières photos de ta galerie sans tricher 📸",
        "As-tu déjà fait quelque chose d'illégal ? Raconte 👮",
        "Quel est ton fantasme le plus secret ? 🙈",
        "As-tu déjà eu des sentiments pour 2 personnes en même temps ? 💔💔",
        "Quelle est la chose la plus gênante que tes parents ont découverte ? 😱",
        "Raconte ton pire date/rendez-vous dans les détails 💀",
        "Quel est le secret le plus dark que tu n'as jamais dit à personne ? 🌑",
        "Montre ton historique de recherche d'aujourd'hui 📱",
        "As-tu déjà stalké ton ex ? Pendant combien de temps ? 👀",
        "Révèle un message embarrassant que tu as envoyé récemment",
        "As-tu déjà menti dans ce jeu ? Sur quelle question ? 🎭",
        "Quelle est la personne du groupe que tu évites et pourquoi ?",
        "As-tu déjà fantasmé sur quelqu'un d'interdit ? 🚫",
        "Quel secret de quelqu'un d'autre connais-tu et ne devrais pas ? 🤫"
    ]
};

const defisGroupe = [
    "📸 Tout le monde envoie une photo de son écran d'accueil MAINTENANT",
    "🗳️ Votez pour la personne la plus drôle du groupe",
    "🔄 Tout le monde change sa photo de profil en même temps",
    "💬 Chaîne de compliments : chacun complimente la personne suivante",
    "⚡ Speed questions : chacun pose UNE question embarrassante à son voisin",
    "🎭 Jeu du roi : le bot choisit quelqu'un qui devient roi pour 10 minutes",
    "😂 Battle de blagues : chacun envoie sa meilleure blague, le groupe vote",
    "🎲 Roulette des secrets : chacun écrit un secret, le bot en révèle un au hasard",
    "📱 Tout le monde envoie son dernier screenshot (pas de triche !)",
    "🎤 Karaoké de groupe : tout le monde envoie un vocal qui chante"
];

const roasts = [
    "T'es tellement fauché que tu regardes les pubs YouTube en entier 😂",
    "Tu ressembles à une capture d'écran floue",
    "T'es la raison pourquoi on doit lire les instructions 📖",
    "Si les excuses étaient des personnes, tu serais une conférence 🎤",
    "T'es le genre de personne qui perd à Candy Crush niveau 1 🍬",
    "Même Siri te met en silencieux 🔇",
    "Tu mets 'Vu' et tu réponds 3 jours après 💀",
    "T'es la pub de 30 secondes non-skippable de la vie"
];

const compliments = [
    "T'es incroyable ! Même ton ombre veut rester avec toi ☀️",
    "Si t'étais un Pokemon, t'aurais toutes les évolutions parfaites ⚡",
    "T'es le genre de personne que même les chiens veulent câliner 🐕",
    "T'as un sourire qui pourrait éclairer tout le pays 😊",
    "T'es tellement cool que la glace te demande des conseils 🧊",
    "Si la gentillesse était un crime, tu serais en prison à vie ❤️",
    "T'es la notification que tout le monde aime recevoir 📱"
];

const ball8responses = [
    "Oui, absolument ! ✅",
    "C'est certain à 100% 💯",
    "Sans aucun doute !",
    "Les signes disent que oui 🔮",
    "Très probable 🤔",
    "Peut-être bien... 🤷",
    "Concentre-toi et redemande ⏳",
    "Je peux pas te dire maintenant 🤐",
    "Mieux vaut pas compter dessus 😬",
    "Mes sources disent non 🚫",
    "Peu probable 📉",
    "Non, désolé 😕"
];

let leaderboard = {};
let stats = {};

if (fs.existsSync('leaderboard.json')) {
    leaderboard = JSON.parse(fs.readFileSync('leaderboard.json'));
}
if (fs.existsSync('stats.json')) {
    stats = JSON.parse(fs.readFileSync('stats.json'));
}

function saveData() {
    fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard, null, 2));
    fs.writeFileSync('stats.json', JSON.stringify(stats, null, 2));
}

function addPoints(userId, userName, points) {
    if (!leaderboard[userId]) {
        leaderboard[userId] = { 
            name: userName,
            points: 0, 
            defisCompletes: 0
        };
    }
    leaderboard[userId].points += points;
    leaderboard[userId].defisCompletes++;
    saveData();
}

const sessions = new Map();

client.on('qr', (qr) => {
    console.log('📱 SCANNEZ CE QR CODE AVEC WHATSAPP :');
    qrcode.generate(qr, { small: true });
    console.log('\n✅ Utilisez WhatsApp Business de préférence !');
});

client.on('ready', () => {
    console.log('✅ BOT ACTION OU VÉRITÉ CONNECTÉ !');
    console.log('🎮 Le bot est prêt à jouer !');
});

client.on('message', async (msg) => {
    const chatId = msg.from;
    const text = msg.body.trim();
    const isGroup = msg.from.endsWith('@g.us');
    const sender = msg.author || msg.from;
    
    let senderName = 'Joueur';
    try {
        const contact = await msg.getContact();
        senderName = contact.pushname || contact.name || sender.split('@')[0];
    } catch (e) {
        senderName = sender.split('@')[0];
    }

    if (!stats[chatId]) {
        stats[chatId] = { 
            gamesPlayed: 0, 
            actionsTotal: 0, 
            veritesTotal: 0
        };
    }

    // MENU
    if (text === '!menu' || text === '!aide' || text === '!help' || text === '!start') {
        await msg.reply(
            '╔═══════════════════════╗\n' +
            '║  🎮 ACTION OU VÉRITÉ  ║\n' +
            '╚═══════════════════════╝\n\n' +
            '⚡ *COMMANDES DE BASE*\n' +
            '├ !jouer → Démarrer\n' +
            '├ !action → Défi 🎯\n' +
            '├ !verite → Question 💬\n' +
            '├ !random → Surprise 🎲\n' +
            '└ !stop → Arrêter\n\n' +
            '🎚️ *PAR NIVEAU*\n' +
            '├ !facile → Soft 🟢\n' +
            '├ !moyen → Medium 🟡\n' +
            '└ !hard → Extrême 🔴\n\n' +
            '👥 *GROUPE*\n' +
            '├ !groupe → Défi collectif\n' +
            '├ !duo → 2 joueurs random\n' +
            '├ !roulette → 1 perdant\n' +
            '└ !qui [question] → Désigne\n\n' +
            '🏆 *SCORES*\n' +
            '├ !fait → Valider (+10)\n' +
            '├ !score → Ton score\n' +
            '├ !top → Classement\n' +
            '└ !stats → Stats groupe\n\n' +
            '🎉 *FUN*\n' +
            '├ !roast → Roast 🔥\n' +
            '├ !compliment → Gentillesse 💝\n' +
            '└ !8ball [?] → Boule magique 🔮'
        );
        return;
    }

    // JOUER
    if (text === '!jouer') {
        sessions.set(chatId, { active: true });
        stats[chatId].gamesPlayed++;
        saveData();
        
        await msg.reply(
            '🎉 *GAME ON !* 🎉\n\n' +
            `Bienvenue ${senderName} !\n\n` +
            '🎯 !action → Défi\n' +
            '❓ !verite → Question\n' +
            '🎲 !random → Surprise\n' +
            '📖 !menu → Commandes\n\n' +
            '_Chaque défi = +10 points_ 🏆\n\n' +
            'C\'est parti ! 😈🔥'
        );
        return;
    }

    const session = sessions.get(chatId);
    if (!session && text.startsWith('!') && !['!menu', '!aide', '!help', '!start'].includes(text)) {
        await msg.reply('⚠️ *Lance le jeu avec !jouer* 🎮');
        return;
    }

    // FACILE
    if (text === '!facile') {
        const defi = defis.facile[Math.floor(Math.random() * defis.facile.length)];
        stats[chatId].actionsTotal++;
        saveData();
        await msg.reply(
            `🟢 *ACTION FACILE* 🟢\n\n` +
            `@${sender.split('@')[0]}\n\n` +
            `${defi}\n\n` +
            `✅ !fait quand c'est fait\n` +
            `_+5 points_ 🏆`,
            chatId,
            { mentions: [sender] }
        );
    }
    
    // MOYEN
    else if (text === '!moyen') {
        const defi = defis.moyen[Math.floor(Math.random() * defis.moyen.length)];
        stats[chatId].actionsTotal++;
        saveData();
        await msg.reply(
            `🟡 *ACTION MOYENNE* 🟡\n\n` +
            `@${sender.split('@')[0]}\n\n` +
            `${defi}\n\n` +
            `✅ !fait quand c'est fait\n` +
            `_+10 points_ 🏆`,
            chatId,
            { mentions: [sender] }
        );
    }
    
    // HARD
    else if (text === '!hard') {
        const defi = defis.hard[Math.floor(Math.random() * defis.hard.length)];
        stats[chatId].actionsTotal++;
        saveData();
        await msg.reply(
            `🔴 *ACTION HARD* 🔴\n\n` +
            `@${sender.split('@')[0]}\n\n` +
            `${defi}\n\n` +
            `✅ !fait quand c'est fait\n` +
            `_+20 points_ 🏆🔥`,
            chatId,
            { mentions: [sender] }
        );
    }

    // VERITE
    else if (text.includes('!verite')) {
        let niveau = 'moyen';
        if (text.includes('facile')) niveau = 'facile';
        if (text.includes('hard')) niveau = 'hard';
        
        const question = verites[niveau][Math.floor(Math.random() * verites[niveau].length)];
        stats[chatId].veritesTotal++;
        saveData();
        
        const colors = { facile: '🟢', moyen: '🟡', hard: '🔴' };
        await msg.reply(
            `${colors[niveau]} *VÉRITÉ ${niveau.toUpperCase()}* ${colors[niveau]}\n\n` +
            `@${sender.split('@')[0]}\n\n` +
            `${question}\n\n` +
            `💬 Réponds !`,
            chatId,
            { mentions: [sender] }
        );
    }

    // ACTION
    else if (text === '!action') {
        const niveaux = ['facile', 'moyen', 'hard'];
        const niveau = niveaux[Math.floor(Math.random() * niveaux.length)];
        const defi = defis[niveau][Math.floor(Math.random() * defis[niveau].length)];
        stats[chatId].actionsTotal++;
        saveData();
        
        const colors = { facile: '🟢', moyen: '🟡', hard: '🔴' };
        const points = { facile: 5, moyen: 10, hard: 20 };
        
        await msg.reply(
            `${colors[niveau]} *ACTION ${niveau.toUpperCase()}* ${colors[niveau]}\n\n` +
            `@${sender.split('@')[0]}\n\n` +
            `${defi}\n\n` +
            `✅ !fait → +${points[niveau]} pts 🏆`,
            chatId,
            { mentions: [sender] }
        );
    }

    // RANDOM
    else if (text === '!random') {
        const isAction = Math.random() < 0.5;
        const niveaux = ['facile', 'moyen', 'hard'];
        const niveau = niveaux[Math.floor(Math.random() * niveaux.length)];
        const colors = { facile: '🟢', moyen: '🟡', hard: '🔴' };
        
        if (isAction) {
            const defi = defis[niveau][Math.floor(Math.random() * defis[niveau].length)];
            stats[chatId].actionsTotal++;
            await msg.reply(
                `🎲 *RANDOM : ACTION* ${colors[niveau]}\n\n` +
                `@${sender.split('@')[0]}\n\n` +
                `${defi}\n\n` +
                `✅ !fait 🏆`,
                chatId,
                { mentions: [sender] }
            );
        } else {
            const question = verites[niveau][Math.floor(Math.random() * verites[niveau].length)];
            stats[chatId].veritesTotal++;
            await msg.reply(
                `🎲 *RANDOM : VÉRITÉ* ${colors[niveau]}\n\n` +
                `@${sender.split('@')[0]}\n\n` +
                `${question}\n\n` +
                `💬 Réponds !`,
                chatId,
                { mentions: [sender] }
            );
        }
        saveData();
    }

    // GROUPE
    else if (text === '!groupe' && isGroup) {
        const defi = defisGroupe[Math.floor(Math.random() * defisGroupe.length)];
        await msg.reply(
            `👥 *DÉFI DE GROUPE* 👥\n\n` +
            `${defi}\n\n` +
            `🎉 Tout le monde participe !`
        );
    }

    // DUO
    else if ((text === '!duo' || text === '!random2') && isGroup) {
        try {
            const chat = await msg.getChat();
            const participants = chat.participants.map(p => p.id._serialized);
            
            if (participants.length < 2) {
                await msg.reply('⚠️ Pas assez de membres !');
                return;
            }
            
            const chosen = [];
            while (chosen.length < 2) {
                const random = participants[Math.floor(Math.random() * participants.length)];
                if (!chosen.includes(random)) chosen.push(random);
            }
            
            const defi = defis.moyen[Math.floor(Math.random() * defis.moyen.length)];
            
            await msg.reply(
                `🎲 *DUO ALÉATOIRE* 🎲\n\n` +
                `@${chosen[0].split('@')[0]} ❤️ @${chosen[1].split('@')[0]}\n\n` +
                `${defi}\n\n` +
                `💑 Ensemble !`,
                chatId,
                { mentions: chosen }
            );
        } catch (error) {
            await msg.reply('❌ Erreur membres');
        }
    }

    // ROULETTE
    else if (text === '!roulette' && isGroup) {
        try {
            const chat = await msg.getChat();
            const participants = chat.participants.map(p => p.id._serialized);
            const loser = participants[Math.floor(Math.random() * participants.length)];
            const defi = defis.hard[Math.floor(Math.random() * defis.hard.length)];
            
            await msg.reply(
                `🎯 *ROULETTE RUSSE* 🎯\n\n` +
                `@${loser.split('@')[0]} a perdu !\n\n` +
                `🔥 ${defi}`,
                chatId,
                { mentions: [loser] }
            );
        } catch (error) {
            await msg.reply('❌ Erreur');
        }
    }

    // FAIT
    else if (text === '!fait') {
        addPoints(sender, senderName, 10);
        await msg.reply('✅ *Validé !*\n\n+10 points 🏆\n\n!score pour voir');
    }
    
    // SCORE
    else if (text === '!score') {
        const userStats = leaderboard[sender] || { points: 0, defisCompletes: 0 };
        await msg.reply(
            `📊 *TON SCORE*\n\n` +
            `🏆 Points: ${userStats.points}\n` +
            `✅ Défis: ${userStats.defisCompletes}\n\n` +
            `Continue ! 🔥`
        );
    }
    
    // TOP
    else if (text === '!top') {
        const sorted = Object.entries(leaderboard)
            .sort((a, b) => b[1].points - a[1].points)
            .slice(0, 5);
        
        let topMsg = '🏆 *TOP 5* 🏆\n\n';
        sorted.forEach(([userId, data], index) => {
            const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
            const name = data.name || userId.split('@')[0].slice(-4);
            topMsg += `${medals[index]} ${name}: ${data.points} pts\n`;
        });
        
        await msg.reply(topMsg || '🏆 *TOP 5* 🏆\n\nAucun score encore !');
    }
    
    // STATS
    else if (text === '!stats') {
        const groupStats = stats[chatId];
        await msg.reply(
            `📊 *STATS GROUPE*\n\n` +
            `🎮 Parties: ${groupStats.gamesPlayed}\n` +
            `🎯 Actions: ${groupStats.actionsTotal}\n` +
            `❓ Vérités: ${groupStats.veritesTotal}\n\n` +
            `Continuez ! 🔥`
        );
    }

    // ROAST
    else if (text === '!roast') {
        const roast = roasts[Math.floor(Math.random() * roasts.length)];
        await msg.reply(`🔥 *ROAST* 🔥\n\n${roast}`);
    }
    
    // COMPLIMENT
    else if (text === '!compliment') {
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        await msg.reply(`💝 *COMPLIMENT* 💝\n\n${compliment}`);
    }
    
    // 8BALL
    else if (text.startsWith('!8ball ')) {
        const response = ball8responses[Math.floor(Math.random() * ball8responses.length)];
        await msg.reply(`🔮 *BOULE MAGIQUE* 🔮\n\n${response}`);
    }
    
    // QUI
    else if (text.startsWith('!qui ') && isGroup) {
        try {
            const chat = await msg.getChat();
            const participants = chat.participants.map(p => p.id._serialized);
            const chosen = participants[Math.floor(Math.random() * participants.length)];
            await msg.reply(
                `🎯 C'est @${chosen.split('@')[0]} ! 😂`,
                chatId,
                { mentions: [chosen] }
            );
        } catch (error) {
            await msg.reply('❌ Erreur');
        }
    }

    // STOP
    else if (text === '!stop') {
        sessions.delete(chatId);
        await msg.reply('👋 *Jeu terminé !*\n\n!jouer pour recommencer');
    }
});

client.on('auth_failure', () => {
    console.error('❌ Échec authentification');
});

client.on('disconnected', () => {
    console.log('⚠️ Bot déconnecté');
});

client.initialize();
console.log('🚀 Démarrage du bot...');