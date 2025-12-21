const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');

// 🎯 ACTIONS ULTRA COMPLÈTES
const defis = {
    facile: [
        "Envoie un vocal en chantant 'Joyeux anniversaire' 🎤",
        "Change ta photo de profil en selfie bizarre pendant 1h 📸",
        "Envoie 'Je t'aime' à 3 contacts random et screenshot ❤️",
        "Raconte ta pire blague au groupe 😂",
        "Fais 20 pompes et filme-toi 💪",
        "Imite un animal pendant 30 secondes en vocal 🐶",
        "Parle en verlan pendant les 5 prochains messages",
        "Envoie un compliment unique à chaque membre du groupe 💝",
        "Danse pendant 1 minute et partage la vidéo 🕺",
        "Fais 30 squats sans pause 🏋️",
        "Selfie avec la grimace la plus laide possible",
        "Chante une chanson en inventant les paroles",
        "Parle avec un accent bizarre pendant 10 minutes",
        "Envoie une photo de ton écran d'accueil",
        "Raconte un mensonge et on doit deviner si c'est vrai ou faux"
    ],
    moyen: [
        "Appelle ton crush et dis 'Je pense fort à toi' puis raccroche 📞",
        "Poste une story Instagram embarrassante pendant 2h 📱",
        "Envoie 'Tu me manques énormément' à ton ex 💔",
        "Karaoké sur une chanson random et envoie la vidéo 🎤",
        "Mange une cuillère de quelque chose de dégueu (moutarde, sauce piquante...) 🥵",
        "Laisse quelqu'un du groupe écrire ton statut WhatsApp pour 24h",
        "Envoie un vocal de 2 minutes en accent étranger 🗣️",
        "Fais le poirier contre un mur pendant 1 minute 🤸",
        "Supprime ton app préférée pour 24h 📵",
        "Parle sans utiliser la lettre 'E' pendant 15 minutes",
        "Envoie 'On doit parler sérieusement' à 5 contacts sans expliquer 😰",
        "Appelle quelqu'un et parle comme un robot pendant 3 minutes 🤖",
        "Change ton nom WhatsApp en ce que le groupe décide pour 2 jours",
        "Envoie un vocal où tu racontes ton rêve le plus bizarre",
        "Fais 50 jumping jacks et filme les 20 derniers"
    ],
    hard: [
        "Appelle tes parents et dis que tu as fait un tatouage énorme 😱",
        "Publie la photo la plus moche de toi sur tous tes réseaux pendant 24h",
        "Fais une déclaration d'amour vocale de 1 min à un membre random du groupe 💕",
        "Mange un truc bizarre que le groupe choisit (combinaison dégueu) 🤢",
        "Lis tes 15 derniers messages avec ton crush au groupe entier 👀",
        "Fais une vidéo TikTok embarrassante en PUBLIC et partage 📹",
        "Bloque ton meilleur ami pendant 2h sans prévenir",
        "Appelle ton crush et chante-lui une chanson d'amour complète 🎵",
        "Poste 'Je suis célibataire et je cherche l'amour' en story même si c'est faux",
        "Envoie un vocal de 3 minutes où tu avoues tes 3 plus gros secrets 🤫",
        "Laisse quelqu'un poster ce qu'il veut sur ton compte Insta pendant 15 min",
        "Appelle ton crush et mets le haut-parleur devant tout le groupe",
        "Fais une story 'À la recherche de l'amour' avec ton numéro visible",
        "Envoie 'Je t'aime depuis longtemps' à quelqu'un et screenshot la réponse",
        "Révèle qui dans ce groupe tu trouves le/la plus attirant(e)"
    ],
    extreme: [
        "Donne ton téléphone à quelqu'un du groupe pendant 10 minutes 📱",
        "Appelle ton ex et dis que tu veux le/la revoir",
        "Poste une vidéo de toi en train de pleurer sur tous tes réseaux",
        "Laisse le groupe lire TOUS tes messages de la journée",
        "Fais une déclaration publique à ton crush sur les réseaux sociaux",
        "Envoie un message vocal à tous tes contacts 'Je vous aime tous'",
        "Change ta bio sur tous les réseaux en ce que le groupe décide pour 1 semaine"
    ]
};

const verites = {
    facile: [
        "C'est qui ton plus gros crush en ce moment ? 😍",
        "C'est quand la dernière fois que tu as vraiment menti ? 🤥",
        "Qui est la personne la plus belle/beau du groupe selon toi ? 👑",
        "C'est quoi ton rêve le plus fou que tu veux réaliser ? 💭",
        "Qui stalkes-tu le plus sur les réseaux sociaux ? 👀",
        "Quelle est ta plus grande peur secrète ? 😨",
        "Quel est ton film ou série préféré ? 🎬",
        "As-tu déjà triché pendant un examen ? 📝",
        "C'est quoi le truc le plus embarrassant dans ta chambre ? 😳",
        "Quel est le contact le plus bizarre de ton téléphone ?",
        "As-tu déjà fait semblant d'être malade pour sécher ? 🤒",
        "C'est quoi le dernier mensonge que tu as dit aujourd'hui ?",
        "Quelle est ta chanson guilty pleasure ? 🎵",
        "As-tu déjà pleuré devant un film ? Lequel ? 😢",
        "C'est quoi le snack bizarre que tu aimes mais que personne comprend ? 🍕"
    ],
    moyen: [
        "As-tu déjà embrassé quelqu'un de ce groupe ? Qui ? 💋",
        "Quel est ton plus gros secret que tu n'as jamais dit à personne ? 🤐",
        "As-tu déjà été secrètement amoureux de quelqu'un ici ? 💘",
        "Quelle est la pire chose que tu aies faite dans ta vie ? 😈",
        "Montre ta galerie photo, scrolle les yeux fermés et montre où tu tombes 📱",
        "As-tu déjà trompé quelqu'un dans une relation ? 💔",
        "Quel est le plus gros mensonge que tu as dit à tes parents ? 👨‍👩‍👦",
        "As-tu déjà espionné le téléphone de quelqu'un ? 🕵️",
        "Quelle est ta recherche Google la plus bizarre récemment ? 🔍",
        "Si tu devais sortir avec quelqu'un du groupe, qui ce serait ? 💑",
        "As-tu déjà envoyé un message à la mauvaise personne ? Raconte 📨",
        "C'est qui ton crush secret dans une autre classe/groupe ?",
        "As-tu déjà menti sur ton âge ? Dans quel contexte ? 🎂",
        "Quelle est la chose la plus gênante dans ton historique de navigation ?",
        "As-tu déjà fait semblant d'aimer quelqu'un ? Pourquoi ?"
    ],
    hard: [
        "Lis ton dernier échange complet avec ton crush au groupe 💬",
        "Montre les 10 dernières photos de ta galerie sans exception 📸",
        "As-tu déjà fait quelque chose d'illégal ? Raconte tout 👮",
        "Quel est ton fantasme le plus secret et bizarre ? 🙈",
        "As-tu déjà eu des sentiments pour 2 personnes en même temps ? Qui ? 💔💔",
        "Quelle est la chose la plus gênante que tes parents ont découverte ? 😱",
        "Raconte ton pire date/rendez-vous avec TOUS les détails 💀",
        "Quel est ton secret le plus dark que tu n'as jamais dit ? 🌑",
        "Montre ton historique de recherche complet d'aujourd'hui 📱",
        "As-tu déjà stalké ton ex ? Pendant combien de temps ? 👀",
        "Révèle le message le plus embarrassant que tu as envoyé récemment",
        "As-tu déjà menti dans CE jeu ? Sur quelle question exactement ? 🎭",
        "Qui est la personne du groupe que tu évites et pourquoi vraiment ?",
        "As-tu déjà eu des pensées bizarres sur quelqu'un d'interdit ? 🚫",
        "Quel secret de quelqu'un d'autre tu connais et tu ne devrais pas ? 🤫"
    ],
    extreme: [
        "Donne ton téléphone déverrouillé à quelqu'un pendant 5 minutes",
        "Lis tous tes messages d'aujourd'hui à haute voix",
        "Révèle ton plus gros secret sexuel",
        "Raconte la chose la plus illégale que tu aies faite",
        "Qui dans ce groupe tu as déjà fantasmé sur ?",
        "Montre ton historique de navigation des 7 derniers jours"
    ]
};

// 👥 DÉFIS DE GROUPE ÉPIQUES
const defisGroupe = [
    "📸 MAINTENANT : Tout le monde envoie une photo de son écran d'accueil",
    "🗳️ VOTE ANONYME : Qui est le/la plus drôle ? (DM au bot)",
    "🔄 SYNCHRONISATION : Changez tous vos photos de profil en même temps",
    "💬 CHAÎNE DE COMPLIMENTS : Chacun complimente la personne suivante",
    "⚡ SPEED QUESTIONS : Chacun pose UNE question embarrassante à son voisin",
    "🎭 LE ROI : Le bot choisit quelqu'un qui devient roi pour 10 minutes",
    "😂 BATTLE DE BLAGUES : Chacun envoie sa meilleure blague, on vote",
    "🎲 SECRETS : Chacun écrit un secret anonyme au bot qui en révèle un",
    "📱 SCREENSHOTS : Tout le monde envoie son dernier screenshot SANS TRICHE",
    "🎤 KARAOKÉ GÉANT : Tout le monde envoie un vocal qui chante",
    "🎯 DÉFIS EN CASCADE : Facile → Moyen → Hard (3 personnes tirées)",
    "💭 CONFESSIONS : Écrivez un secret au bot, il le partage anonymement",
    "🔥 HOT SEAT : Une personne random répond à 5 questions du groupe",
    "🎬 IMITATIONS : Chacun imite un autre membre (vocal ou vidéo)",
    "🏃 MARATHON : Tout le monde fait 30 squats et filme les 10 derniers"
];

// 🎯 MINI-JEUX BONUS
const miniJeux = [
    "🎲 Dé : Lance le dé ! (tape un chiffre 1-6, si c'est le bon tu gagnes)",
    "🃏 Carte : Devine la couleur (Rouge ou Noir)",
    "🎰 Jackpot : 3 emojis identiques = Tu gagnes !",
    "🔮 Voyance : Pose une question, le bot prédit ton avenir",
    "💣 Bombe : Passe la bombe ! Qui l'a quand elle explose perd",
    "🎯 Cible : Vise entre 1-100, le plus proche gagne"
];

// 💬 ROASTS & COMPLIMENTS AMÉLIORÉS
const roasts = [
    "T'es tellement fauché que tu regardes les pubs YouTube jusqu'au bout pour économiser l'électricité 😂",
    "Tu ressembles à une capture d'écran prise avec un Nokia 3310",
    "T'es la raison pour laquelle les shampooings ont des instructions 📖",
    "Si les excuses étaient des personnes, tu serais une conférence de 3 heures 🎤",
    "T'es le genre de personne qui perd contre l'ordinateur à Pierre-Papier-Ciseaux ✊",
    "Même Siri te met en silencieux quand tu parles 🔇",
    "Tu mets 'Vu' et tu réponds 3 semaines après avec 'Mdr' 💀",
    "T'es la pub de 30 secondes non-skippable de la vraie vie",
    "Tu cours comme si tu charges une page Internet en 2005 avec 56k 🐌",
    "T'es le contact 'Peut-être' dans le téléphone de TOUT LE MONDE",
    "Tu danses comme si le WiFi lag en temps réel 📶",
    "T'es tellement en retard que tu pourrais organiser ta propre fête d'anniversaire en janvier"
];

const compliments = [
    "T'es incroyable ! Même ton ombre refuse de te quitter tellement t'es génial(e) ☀️",
    "Si t'étais un Pokemon, t'aurais toutes les évolutions parfaites et tu serais shiny ⚡",
    "T'es le genre de personne que même les chiens abandonnent leur maître pour venir te voir 🐕",
    "T'as un sourire qui pourrait résoudre tous les problèmes d'électricité du pays 😊",
    "T'es tellement cool que la glace te demande des conseils de style 🧊",
    "Si la gentillesse était un crime, tu serais en prison à perpétuité ❤️",
    "T'es la notification que tout le monde est heureux de recevoir 📱",
    "Ton énergie positive est plus contagieuse que tous les virus du monde 🌟",
    "T'es le genre de personne qui rend les lundis matins supportables 📅",
    "Si t'étais une chanson, tout le monde t'ajouterait en premier dans leur playlist 🎵",
    "T'es comme le WiFi gratuit : tout le monde t'adore instantanément 📶",
    "Ton rire est la meilleure musique qui existe au monde 🔔"
];

// 🔮 RÉPONSES 8BALL ÉTENDUES
const ball8 = [
    "Oui, absolument et sans aucun doute ! ✅",
    "C'est certain à 100%, je le garantis 💯",
    "Sans l'ombre d'une hésitation, OUI !",
    "Les étoiles et les signes disent que oui 🔮",
    "Très très probable, presque sûr 🤔",
    "Peut-être bien, peut-être pas... 🤷",
    "Concentre-toi mieux et redemande dans 5 minutes ⏳",
    "Je peux pas te dire maintenant, c'est compliqué 🤐",
    "Mieux vaut pas trop compter dessus mon ami(e) 😬",
    "Mes sources magiques disent clairement NON 🚫",
    "Peu probable, désolé de te décevoir 📉",
    "Non franchement, laisse tomber 😕",
    "Absolument PAS, n'y pense même plus ! ❌",
    "Dans tes rêves peut-être, mais pas dans la réalité 💭",
    "Demande plutôt à ta mère, elle saura mieux que moi 👩"
];

// 💾 SYSTÈME DE DONNÉES
let data = {leaderboard: {}, stats: {}, sessions: new Map()};

function loadData() {
    if(fs.existsSync('gamedata.json')) {
        const loaded = JSON.parse(fs.readFileSync('gamedata.json'));
        data.leaderboard = loaded.leaderboard || {};
        data.stats = loaded.stats || {};
    }
}

function saveData() {
    fs.writeFileSync('gamedata.json', JSON.stringify({
        leaderboard: data.leaderboard,
        stats: data.stats
    }, null, 2));
}

function addPoints(userId, userName, points) {
    if(!data.leaderboard[userId]) {
        data.leaderboard[userId] = {name: userName, points: 0, defis: 0};
    }
    data.leaderboard[userId].points += points;
    data.leaderboard[userId].defis++;
    saveData();
}

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

// 🤖 DÉMARRAGE DU BOT
async function startBot() {
    loadData();
    
    const { state, saveCreds } = await useMultiFileAuthState('auth_session');
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: ['Bot Action Vérité', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        
        if(connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('⚠️ Connexion fermée. Reconnexion:', shouldReconnect);
            if(shouldReconnect) {
                setTimeout(() => startBot(), 3000);
            }
        } else if(connection === 'open') {
            console.log('✅ BOT CONNECTÉ ET PRÊT ! 🎮');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        try {
            const m = messages[0];
            if(!m.message || m.key.fromMe) return;
            
            const chat = m.key.remoteJid;
            const txt = (m.message.conversation || m.message.extendedTextMessage?.text || '').trim();
            const from = m.key.participant || m.key.remoteJid;
            const isGrp = chat.endsWith('@g.us');
            const name = m.pushName || from.split('@')[0];
            
            if(!data.stats[chat]) {
                data.stats[chat] = {games: 0, actions: 0, verites: 0, lastPlayed: Date.now()};
            }

            const reply = async (text, mentions) => {
                return await sock.sendMessage(chat, { text, mentions: mentions || [] });
            };

            // 📖 MENU PRINCIPAL
            if(['!menu', '!aide', '!help', '!start', '!commandes'].includes(txt)) {
                return reply(
                    '╔══════════════════════╗\n' +
                    '║ 🎮 *ACTION OU VÉRITÉ* ║\n' +
                    '╚══════════════════════╝\n\n' +
                    '⚡ *COMMANDES BASE*\n' +
                    '├ !jouer → Démarrer\n' +
                    '├ !action → Défi random\n' +
                    '├ !verite → Question\n' +
                    '├ !random → Surprise\n' +
                    '└ !stop → Arrêter\n\n' +
                    '🎚️ *PAR NIVEAU*\n' +
                    '├ !facile → Soft 🟢\n' +
                    '├ !moyen → Medium 🟡\n' +
                    '├ !hard → Intense 🔴\n' +
                    '└ !extreme → EXTRÊME 💀\n\n' +
                    '👥 *SPÉCIAL GROUPE*\n' +
                    '├ !groupe → Défi collectif\n' +
                    '├ !duo → 2 joueurs random\n' +
                    '├ !trio → 3 joueurs random\n' +
                    '├ !roulette → 1 perdant\n' +
                    '└ !qui [?] → Désigne qqn\n\n' +
                    '🏆 *SCORES & STATS*\n' +
                    '├ !fait → Valider (+10)\n' +
                    '├ !score → Ton score\n' +
                    '├ !top → Top 10\n' +
                    '└ !stats → Stats groupe\n\n' +
                    '🎉 *FUN & BONUS*\n' +
                    '├ !roast → Se faire roaster 🔥\n' +
                    '├ !compliment → Gentillesse 💝\n' +
                    '├ !8ball [?] → Boule magique 🔮\n' +
                    '├ !hasard → Question qui...\n' +
                    '└ !minijeu → Mini-jeux\n\n' +
                    '_Créé avec 🔥 - Version 2.0_'
                );
            }

            // 🎮 DÉMARRER LE JEU
            if(txt === '!jouer') {
                data.sessions.set(chat, {active: true, startTime: Date.now()});
                data.stats[chat].games++;
                data.stats[chat].lastPlayed = Date.now();
                saveData();
                
                return reply(
                    `🎉 *GAME ON !* 🎉\n\n` +
                    `Bienvenue ${name} ! 🎮\n\n` +
                    `🎯 !action → Défi\n` +
                    `❓ !verite → Question\n` +
                    `🎲 !random → Surprise\n` +
                    `🎚️ !facile/!moyen/!hard/!extreme\n` +
                    `📖 !menu → Toutes les commandes\n\n` +
                    `_Chaque défi validé = +10 points_ 🏆\n\n` +
                    `Que les jeux commencent ! 😈🔥`
                );
            }

            // 🔒 VÉRIF SESSION
            const s = data.sessions.get(chat);
            if(!s && txt.startsWith('!') && !['!menu','!aide','!help','!start','!commandes'].includes(txt)) {
                return reply('⚠️ *Lance le jeu avec !jouer d\'abord !* 🎮');
            }

            // 🎯 ACTIONS PAR NIVEAU
            if(txt === '!facile') {
                data.stats[chat].actions++;
                saveData();
                return reply(
                    `🟢 *ACTION FACILE* 🟢\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis.facile)}\n\n` +
                    `✅ Tape !fait quand c'est fait\n` +
                    `_Récompense: +5 points_ 🏆`,
                    [from]
                );
            }

            if(txt === '!moyen') {
                data.stats[chat].actions++;
                saveData();
                return reply(
                    `🟡 *ACTION MOYENNE* 🟡\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis.moyen)}\n\n` +
                    `✅ Tape !fait quand c'est fait\n` +
                    `_Récompense: +10 points_ 🏆`,
                    [from]
                );
            }

            if(txt === '!hard') {
                data.stats[chat].actions++;
                saveData();
                return reply(
                    `🔴 *ACTION HARD* 🔴\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis.hard)}\n\n` +
                    `✅ Tape !fait quand c'est fait\n` +
                    `_Récompense: +20 points_ 🏆🔥`,
                    [from]
                );
            }

            if(txt === '!extreme') {
                data.stats[chat].actions++;
                saveData();
                return reply(
                    `💀 *ACTION EXTRÊME* 💀\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `⚠️ ATTENTION : NIVEAU DANGEREUX !\n\n` +
                    `${rand(defis.extreme)}\n\n` +
                    `✅ Tape !fait quand c'est fait\n` +
                    `_Récompense: +50 points_ 🏆💀`,
                    [from]
                );
            }

            // ❓ VÉRITÉS
            if(txt.includes('!verite')) {
                let niveau = 'moyen';
                if(txt.includes('facile')) niveau = 'facile';
                if(txt.includes('hard')) niveau = 'hard';
                if(txt.includes('extreme')) niveau = 'extreme';
                
                data.stats[chat].verites++;
                saveData();
                
                const colors = {facile: '🟢', moyen: '🟡', hard: '🔴', extreme: '💀'};
                return reply(
                    `${colors[niveau]} *VÉRITÉ ${niveau.toUpperCase()}* ${colors[niveau]}\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(verites[niveau])}\n\n` +
                    `💬 Réponds honnêtement !`,
                    [from]
                );
            }

            // 🎯 ACTION ALÉATOIRE
            if(txt === '!action') {
                const niveaux = ['facile', 'moyen', 'hard'];
                const niveau = rand(niveaux);
                data.stats[chat].actions++;
                saveData();
                
                const colors = {facile: '🟢', moyen: '🟡', hard: '🔴'};
                const points = {facile: 5, moyen: 10, hard: 20};
                
                return reply(
                    `${colors[niveau]} *ACTION ${niveau.toUpperCase()}* ${colors[niveau]}\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis[niveau])}\n\n` +
                    `✅ !fait → +${points[niveau]} points 🏆`,
                    [from]
                );
            }

            // 🎲 RANDOM
            if(txt === '!random') {
                const isAction = Math.random() < 0.5;
                const niveaux = ['facile', 'moyen', 'hard'];
                const niveau = rand(niveaux);
                const colors = {facile: '🟢', moyen: '🟡', hard: '🔴'};
                
                if(isAction) {
                    data.stats[chat].actions++;
                    saveData();
                    return reply(
                        `🎲 *RANDOM : ACTION* ${colors[niveau]}\n\n` +
                        `@${from.split('@')[0]}\n\n` +
                        `${rand(defis[niveau])}\n\n` +
                        `✅ !fait pour valider 🏆`,
                        [from]
                    );
                } else {
                    data.stats[chat].verites++;
                    saveData();
                    return reply(
                        `🎲 *RANDOM : VÉRITÉ* ${colors[niveau]}\n\n` +
                        `@${from.split('@')[0]}\n\n` +
                        `${rand(verites[niveau])}\n\n` +
                        `💬 Réponds !`,
                        [from]
                    );
                }
            }

            // 👥 DÉFI DE GROUPE
            if(txt === '!groupe' && isGrp) {
                return reply(
                    `👥 *DÉFI DE GROUPE* 👥\n\n` +
                    `${rand(defisGroupe)}\n\n` +
                    `🎉 Tout le monde participe ! GO !`
                );
            }

            // 👫 DUO
            if((txt === '!duo' || txt === '!random2') && isGrp) {
                try {
                    const groupMeta = await sock.groupMetadata(chat);
                    const participants = groupMeta.participants.map(p => p.id);
                    
                    if(participants.length < 2) {
                        return reply('⚠️ Pas assez de membres dans le groupe !');
                    }
                    
                    const chosen = [];
                    while(chosen.length < 2) {
                        const random = rand(participants);
                        if(!chosen.includes(random)) chosen.push(random);
                    }
                    
                    const defi = rand(defis.moyen);
                    
                    return reply(
                        `🎲 *DUO ALÉATOIRE* 🎲\n\n` +
                        `@${chosen[0].split('@')[0]} ❤️ @${chosen[1].split('@')[0]}\n\n` +
                        `${defi}\n\n` +
                        `💑 Vous devez le faire ensemble !`,
                        chosen
                    );
                } catch(e) {
                    return reply('❌ Erreur lors de la récupération des membres');
                }
            }

            // 👨‍👩‍👦 TRIO
            if((txt === '!trio' || txt === '!random3') && isGrp) {
                try {
                    const groupMeta = await sock.groupMetadata(chat);
                    const participants = groupMeta.participants.map(p => p.id);
                    
                    if(participants.length < 3) {
                        return reply('⚠️ Pas assez de membres (minimum 3) !');
                    }
                    
                    const chosen = [];
                    while(chosen.length < 3) {
                        const random = rand(participants);
                        if(!chosen.includes(random)) chosen.push(random);
                    }
                    
                    const defi = rand(defis.hard);
                    
                    return reply(
                        `🎲 *TRIO ALÉATOIRE* 🎲\n\n` +
                        `@${chosen[0].split('@')[0]}\n` +
                        `@${chosen[1].split('@')[0]}\n` +
                        `@${chosen[2].split('@')[0]}\n\n` +
                        `${defi}\n\n` +
                        `👨‍👩‍👦 Tous les 3 ensemble !`,
                        chosen
                    );
                } catch(e) {
                    return reply('❌ Erreur lors de la récupération des membres');
                }
            }

            // 🎯 ROULETTE RUSSE
            if(txt === '!roulette' && isGrp) {
                try {
                    const groupMeta = await sock.groupMetadata(chat);
                    const participants = groupMeta.participants.map(p => p.id);
                    const loser = rand(participants);
                    const defi = rand(defis.hard);
                    
                    return reply(
                        `🎯 *ROULETTE RUSSE* 🎯\n\n` +
                        `La chance a parlé...\n\n` +
                        `@${loser.split('@')[0]} a perdu ! 💀\n\n` +
                        `🔥 DÉFI HARD :\n${defi}\n\n` +
                        `Pas de pitié ! 😈`,
                        [loser]
                    );
                } catch(e) {
                    return reply('❌ Erreur');
                }
            }

            // ✅ VALIDER DÉFI
            if(txt === '!fait') {
                addPoints(from, name, 10);
                return reply(
                    `✅ *Défi validé !*\n\n` +
                    `🏆 +10 points pour @${from.split('@')[0]} !\n\n` +
                    `Tape !score pour voir ton total 📊`,
                    [from]
                );
            }

            // 📊 SCORE PERSONNEL
            if(txt === '!score') {
                const userStats = data.leaderboard[from] || {points: 0, defis: 0};
                const rank = Object.entries(data.leaderboard)
                    .sort((a,b) => b[1].points - a[1].points)
                    .findIndex(([id]) => id === from) + 1;
                
                return reply(
                    `📊 *TON SCORE* 📊\n\n` +
                    `👤 ${userStats.name || name}\n` +
                    `🏆 Points: ${userStats.points}\n` +
                    `✅ Défis complétés: ${userStats.defis}\n` +
                    `📈 Classement: #${rank || 'N/A'}\n\n` +
                    `Continue comme ça ! 🔥`
                );
            }

            // 🏆 TOP 10
            if(txt === '!top') {
                const sorted = Object.entries(data.leaderboard)
                    .sort((a, b) => b[1].points - a[1].points)
                    .slice(0, 10);
                
                if(sorted.length === 0) {
                    return reply('🏆 *TOP 10* 🏆\n\nAucun score enregistré encore !\n\nTape !jouer pour commencer ! 🎮');
                }
                
                let topMsg = '🏆 *TOP 10 DU GROUPE* 🏆\n\n';
                const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
                
                sorted.forEach(([userId, data], index) => {
                    const displayName = data.name || userId.split('@')[0].slice(-4);
                    topMsg += `${medals[index]} ${displayName}: ${data.points} pts (${data.defis} défis)\n`;
                });
                
                topMsg += `\n_Mis à jour: ${new Date().toLocaleDateString()}_`;
                return reply(topMsg);
            }

            // 📈 STATISTIQUES
            if(txt === '!stats') {
                const groupStats = data.stats[chat];
                const totalPlayers = Object.keys(data.leaderboard).length;
                const totalPoints = Object.values(data.leaderboard).reduce((sum, p) => sum + p.points, 0);
                
                return reply(
                    `📊 *STATISTIQUES DU GROUPE*\n\n` +
                    `🎮 Parties jouées: ${groupStats.games}\n` +
                    `🎯 Actions totales: ${groupStats.actions}\n` +
                    `❓ Vérités totales: ${groupStats.verites}\n` +
                    `👥 Joueurs actifs: ${totalPlayers}\n` +
                    `💰 Points totaux: ${totalPoints}\n` +
                    `📅 Dernière partie: ${new Date(groupStats.lastPlayed).toLocaleDateString()}\n\n` +
                    `Continuez à jouer ! 🔥`
                );
            }

            // 🔥 ROAST
            if(txt === '!roast') {
                return reply(
                    `🔥 *ROAST BRUTAL* 🔥\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(roasts)}\n\n` +
                    `😂 C'était pour rire ! (ou pas...)`,
                    [from]
                );
            }

            // 💝 COMPLIMENT
            if(txt === '!compliment') {
                return reply(
                    `💝 *COMPLIMENT SINCÈRE* 💝\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(compliments)}\n\n` +
                    `Tu le mérites vraiment ! 🥰`,
                    [from]
                );
            }

            // 🔮 BOULE MAGIQUE
            if(txt.startsWith('!8ball ')) {
                const question = txt.slice(7).trim();
                if(!question) {
                    return reply('🔮 Pose une question après !8ball\n\nExemple: !8ball Est-ce que je vais réussir ?');
                }
                
                return reply(
                    `🔮 *BOULE MAGIQUE* 🔮\n\n` +
                    `❓ Question: "${question}"\n\n` +
                    `🎱 Réponse: ${rand(ball8)}`
                );
            }

            // 🎯 QUI...?
            if(txt.startsWith('!qui ') && isGrp) {
                try {
                    const groupMeta = await sock.groupMetadata(chat);
                    const participants = groupMeta.participants.map(p => p.id);
                    const chosen = rand(participants);
                    const question = txt.slice(5).trim();
                    
                    return reply(
                        `🎯 *QUI ${question.toUpperCase()} ?*\n\n` +
                        `C'est @${chosen.split('@')[0]} ! 😂\n\n` +
                        `_Choisi totalement au hasard..._`,
                        [chosen]
                    );
                } catch(e) {
                    return reply('❌ Erreur');
                }
            }

            // 🎲 HASARD (Question qui...)
            if(txt === '!hasard' && isGrp) {
                const questions = [
                    "qui est le/la plus drôle",
                    "qui a le meilleur style",
                    "qui serait célèbre un jour",
                    "qui est le/la plus intelligent(e)",
                    "qui est le/la plus fou/folle",
                    "qui a le meilleur humour",
                    "qui serait le meilleur en couple",
                    "qui parle le plus",
                    "qui est toujours en retard",
                    "qui envoie le plus de memes",
                    "qui survivrait à une apocalypse zombie"
                ];
                
                try {
                    const groupMeta = await sock.groupMetadata(chat);
                    const participants = groupMeta.participants.map(p => p.id);
                    const chosen = rand(participants);
                    const question = rand(questions);
                    
                    return reply(
                        `🎲 *QUESTION HASARD*\n\n` +
                        `${question} ?\n\n` +
                        `➡️ C'est @${chosen.split('@')[0]} ! 👑`,
                        [chosen]
                    );
                } catch(e) {
                    return reply('❌ Erreur');
                }
            }

            // 🎮 MINI-JEUX
            if(txt === '!minijeu') {
                return reply(
                    `🎮 *MINI-JEUX DISPONIBLES*\n\n` +
                    `${miniJeux.join('\n')}\n\n` +
                    `_Plus de jeux à venir !_ 🎯`
                );
            }

            // 🎲 DÉ
            if(txt.startsWith('!de ')) {
                const guess = parseInt(txt.slice(4));
                if(isNaN(guess) || guess < 1 || guess > 6) {
                    return reply('🎲 Tape un chiffre entre 1 et 6 !\n\nExemple: !de 3');
                }
                
                const result = Math.floor(Math.random() * 6) + 1;
                const win = guess === result;
                
                if(win) {
                    addPoints(from, name, 15);
                    return reply(
                        `🎲 *LANCER DE DÉ* 🎲\n\n` +
                        `Ton choix: ${guess}\n` +
                        `Résultat: ${result}\n\n` +
                        `🎉 GAGNÉ ! +15 points ! 🏆`,
                        [from]
                    );
                } else {
                    return reply(
                        `🎲 *LANCER DE DÉ* 🎲\n\n` +
                        `Ton choix: ${guess}\n` +
                        `Résultat: ${result}\n\n` +
                        `😢 Perdu ! Réessaye !`
                    );
                }
            }

            // 🃏 CARTE
            if(txt.startsWith('!carte ')) {
                const guess = txt.slice(7).toLowerCase();
                if(!['rouge', 'noir'].includes(guess)) {
                    return reply('🃏 Choisis "rouge" ou "noir" !\n\nExemple: !carte rouge');
                }
                
                const result = Math.random() < 0.5 ? 'rouge' : 'noir';
                const win = guess === result;
                const emoji = result === 'rouge' ? '♥️' : '♠️';
                
                if(win) {
                    addPoints(from, name, 10);
                    return reply(
                        `🃏 *CARTE MYSTÈRE* 🃏\n\n` +
                        `Ton choix: ${guess}\n` +
                        `Carte tirée: ${result} ${emoji}\n\n` +
                        `🎉 GAGNÉ ! +10 points ! 🏆`,
                        [from]
                    );
                } else {
                    return reply(
                        `🃏 *CARTE MYSTÈRE* 🃏\n\n` +
                        `Ton choix: ${guess}\n` +
                        `Carte tirée: ${result} ${emoji}\n\n` +
                        `😢 Perdu ! Réessaye !`
                    );
                }
            }

            // 🎰 JACKPOT
            if(txt === '!jackpot') {
                const emojis = ['🍒','🍋','🍊','🍇','💎','7️⃣'];
                const slot1 = rand(emojis);
                const slot2 = rand(emojis);
                const slot3 = rand(emojis);
                
                const win = slot1 === slot2 && slot2 === slot3;
                
                if(win) {
                    addPoints(from, name, 50);
                    return reply(
                        `🎰 *JACKPOT* 🎰\n\n` +
                        `[ ${slot1} | ${slot2} | ${slot3} ]\n\n` +
                        `💰 JACKPOT !!! +50 POINTS !!! 🤑\n\n` +
                        `@${from.split('@')[0]} TU ES UN CHAMPION ! 👑`,
                        [from]
                    );
                } else if(slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
                    addPoints(from, name, 5);
                    return reply(
                        `🎰 *JACKPOT* 🎰\n\n` +
                        `[ ${slot1} | ${slot2} | ${slot3} ]\n\n` +
                        `🎉 Deux identiques ! +5 points ! 🏆`
                    );
                } else {
                    return reply(
                        `🎰 *JACKPOT* 🎰\n\n` +
                        `[ ${slot1} | ${slot2} | ${slot3} ]\n\n` +
                        `😢 Perdu ! Réessaye ta chance !`
                    );
                }
            }

            // ❌ STOP
            if(txt === '!stop') {
                data.sessions.delete(chat);
                return reply(
                    `👋 *Jeu terminé !*\n\n` +
                    `Merci d'avoir joué ! 🎮\n\n` +
                    `Tape !jouer pour recommencer\n` +
                    `Tape !stats pour voir les statistiques 📊`
                );
            }

            // 💡 AIDE
            if(txt === '!aide') {
                return reply(
                    `💡 *BESOIN D'AIDE ?*\n\n` +
                    `📖 !menu → Voir toutes les commandes\n` +
                    `🎮 !jouer → Démarrer une partie\n` +
                    `❓ Le bot répond aux commandes avec "!"\n\n` +
                    `🆘 Problème ? Le bot ne répond pas ?\n` +
                    `→ Vérifie que tu as bien tapé !jouer\n` +
                    `→ Les commandes commencent par "!"\n\n` +
                    `Amusez-vous bien ! 🔥`
                );
            }

        } catch(error) {
            console.error('❌ Erreur:', error);
        }
    });

    // 🔔 Notification de groupe
    sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
        try {
            if(action === 'add') {
                const newMember = participants[0];
                await sock.sendMessage(id, {
                    text: `👋 Bienvenue @${newMember.split('@')[0]} !\n\n` +
                          `🎮 Tape !menu pour voir les commandes\n` +
                          `🔥 Tape !jouer pour commencer à jouer !`,
                    mentions: [newMember]
                });
            }
        } catch(e) {
            console.error('Erreur notification:', e);
        }
    });
}

// 🚀 LANCEMENT
console.log('🚀 Démarrage du Bot Action ou Vérité...\n');
startBot().catch(err => console.error('Erreur fatale:', err));