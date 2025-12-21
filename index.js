const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// 🎯 80 ACTIONS ÉPIQUES PAR NIVEAU
const defis = {
    facile: [
        "Envoie un vocal en chantant comme une star 🎤",
        "Change ta photo de profil en photo bébé 3h 👶",
        "Envoie 'Je t'aime' à 5 contacts random et screenshot ❤️",
        "Raconte la blague la plus nulle 😂",
        "Fais 25 pompes et filme 💪",
        "Imite 3 animaux en vocal 🐶",
        "Parle en verlan 10 messages",
        "Complimente CHAQUE membre 💝",
        "Danse 1 minute et filme 🕺",
        "Fais 40 squats 🏋️",
        "Selfie grimace horrible 📸",
        "Chante en inventant paroles 🎵",
        "Accent étranger 15min 🗣️",
        "Screenshot écran d'accueil",
        "Raconte mensonge énorme",
        "Poste story bizarre 10min",
        "Vocal en chuchotant 30sec",
        "Compte jusqu'à 50 en vocal rapide",
        "Fais 30 jumping jacks",
        "Envoie emoji aléatoire à 10 personnes",
        "Écris message à l'envers complet",
        "Parle comme un bébé 5 messages",
        "Imite quelqu'un du groupe en vocal",
        "Fais la planche 1 minute",
        "Envoie photo de ton dernier repas",
        "Raconte ton rêve le plus bizarre",
        "Chante l'hymne national en entier",
        "Fais 20 burpees",
        "Vocal en criant pendant 10 secondes",
        "Change statut en phrase ridicule 2h",
        "Envoie meme le plus nul",
        "Parle en rimes pendant 5 messages",
        "Fais la roue et filme",
        "Compte à rebours de 30 en vocal",
        "Envoie photo de tes chaussures",
        "Raconte histoire d'horreur en 1min",
        "Fais 15 pompes en diamant",
        "Vocal en beatbox 20 secondes",
        "Change nom WhatsApp en truc bizarre 1h",
        "Envoie ta citation préférée",
        "Fais des jumping jacks pendant vocal",
        "Raconte blague de papa",
        "Prends photo avec animal/plante",
        "Compte les membres du groupe en chantant",
        "Fais 25 squats avec livre sur la tête",
        "Vocal accent de ta région exagéré",
        "Envoie screenshot notifications",
        "Raconte souvenir embarrassant école",
        "Fais pompes en applaudissant entre",
        "Chante chanson Disney",
        "Envoie photo objet rouge autour de toi",
        "Parle comme un pirate 5 messages",
        "Fais exercice yoga bizarre et filme",
        "Vocal en parlant super lentement",
        "Envoie emoji qui te représente et explique",
        "Raconte comment tu as connu meilleur ami",
        "Fais 30 mountain climbers",
        "Change photo profil en dessin moche 2h",
        "Vocal en rappant",
        "Envoie photo de ton reflet",
        "Compte de 100 à 0 par 7",
        "Fais danse TikTok et filme",
        "Parle en langage soutenu 10 messages",
        "Envoie screenshot musique préférée",
        "Raconte joke en anglais",
        "Fais 20 squats sautés",
        "Vocal en chantant opéra",
        "Envoie photo ciel maintenant",
        "Raconte ton moment le plus gênant",
        "Fais planche latérale 30 sec chaque côté",
        "Change bio en phrase motivante 24h",
        "Vocal en imitant célébrité",
        "Envoie photo première chose à ta gauche",
        "Raconte rêve que tu veux réaliser",
        "Fais 15 triceps dips",
        "Parle comme robot 5 messages",
        "Envoie screenshot dernier film regardé",
        "Compte en espagnol jusqu'à 20",
        "Fais high knees 1 minute",
        "Vocal chanson d'enfance",
        "Envoie photo ton espace de travail"
    ],
    
    moyen: [
        "Appelle ton crush et dis 'je pense à toi' puis raccroche 📞",
        "Poste story embarrassante sur Insta 2h 📱",
        "Envoie 'tu me manques énormément' à ton ex 💔",
        "Karaoké sur chanson random et filme 🎤",
        "Mange cuillère de sauce très piquante 🥵",
        "Laisse quelqu'un écrire ton statut 24h",
        "Vocal 2min en accent étranger 🗣️",
        "Fais poirier contre mur 1min 🤸",
        "Supprime ton app préférée 24h 📵",
        "Parle sans lettre 'E' pendant 15min",
        "Envoie 'on doit parler sérieusement' à 5 contacts 😰",
        "Appelle quelqu'un et parle en robot 3min 🤖",
        "Change nom WhatsApp choisi par groupe 2 jours",
        "Vocal racontant rêve le plus bizarre",
        "Fais 50 jumping jacks et filme derniers 20",
        "Laisse groupe lire tes 5 derniers messages privés",
        "Poste photo moche de toi sur story 3h",
        "Appelle parents et parle en langue inventée 1min",
        "Mange combinaison bizarre choisie par groupe",
        "Envoie message vocal à tous tes contacts 'Salut'",
        "Change toutes tes photos profil réseaux 12h",
        "Appelle ex et dis que tu as rêvé de lui/elle",
        "Fais 100 squats en 5 minutes",
        "Laisse quelqu'un poster sur ton Insta story",
        "Envoie vocal où tu cries pendant 30 sec",
        "Bloque ton crush pendant 1h sans expliquer",
        "Poste 'Je suis célibataire' même si faux",
        "Mange citron entier et filme réaction",
        "Appelle prof/boss et dis bonjour puis raccroche",
        "Change mot de passe tel et donne à quelqu'un 10min",
        "Fais 50 pompes sans pause",
        "Vocal chantant chanson d'amour à quelqu'un",
        "Envoie 'tu es spécial(e)' à 10 contacts",
        "Poste vidéo toi dansant bizarrement",
        "Laisse groupe choisir ta prochaine publication",
        "Appelle quelqu'un et parle que en questions 2min",
        "Mange mélange épices/condiments random",
        "Fais 30 burpees sans pause",
        "Envoie vocal imitant 5 personnes différentes",
        "Change bio tous réseaux en phrase groupe 48h",
        "Appelle numéro inconnu et chante",
        "Fais handstand pushups ou essaie 5 fois",
        "Laisse quelqu'un texte pour toi 30min",
        "Poste photo sans maquillage/filtre",
        "Envoie message gênant à contact random",
        "Fais 200 jumping jacks total",
        "Vocal où tu avoues secret moyen",
        "Change fond d'écran en photo groupe 1 semaine",
        "Appelle et parle en chanson 1min",
        "Mange truc périmé (pas dangereux)",
        "Fais planche 3 minutes total",
        "Laisse groupe voir tes recherches Google récentes",
        "Poste 'Cherche l'amour' sur story",
        "Envoie vocal pleurant faussement",
        "Appelle et raconte blague nulle sérieusement",
        "Fais 75 squats sautés",
        "Change langue téléphone 24h",
        "Laisse quelqu'un répondre à tes messages 15min",
        "Poste throwback embarrassant",
        "Envoie 'Je m'excuse' à 5 personnes sans contexte",
        "Fais wall sit 5 minutes total",
        "Vocal imitant animal 1min",
        "Appelle et parle à l'envers",
        "Mange sandwich bizarre (ex: Nutella+cornichon)",
        "Fais 100 abdos",
        "Laisse groupe voter sur ta story suivante",
        "Envoie compliment exagéré à chaque contact liste",
        "Poste vidéo talent caché",
        "Appelle et chante joyeux anniversaire mauvais jour",
        "Fais yoga pose difficile 2min",
        "Change sonnerie en truc embarrassant 1 semaine",
        "Laisse quelqu'un choisir ta tenue demain",
        "Envoie vocal parlant super vite 1min",
        "Poste photo plus moche de ta galerie",
        "Appelle et fais semblant être célébrité",
        "Fais 50 pompes diamant",
        "Laisse groupe poser 1 question, réponds honnêtement",
        "Envoie 'pense à moi' à 10 contacts",
        "Poste citation inspirante avec ta photo moche",
        "Fais course sur place 5min et filme dernière min"
    ],
    
    hard: [
        "Appelle parents et dis que tu as fait énorme tatouage 😱",
        "Publie photo la plus moche 24h tous réseaux",
        "Déclaration d'amour vocale 2min à membre random 💕",
        "Mange combinaison dégueu choisie groupe 🤢",
        "Lis tes 20 derniers messages avec crush au groupe 👀",
        "TikTok ultra embarrassant en public et poste 📹",
        "Bloque meilleur ami 3h sans prévenir",
        "Appelle crush et chante chanson d'amour complète 🎵",
        "Poste 'Cherche âme sœur + numéro' story 24h",
        "Vocal 5min avouant tes 5 plus gros secrets 🤫",
        "Laisse quelqu'un poster ce qu'il veut ton Insta 30min",
        "Appelle crush haut-parleur devant tout groupe",
        "Envoie 'Je t'aime depuis longtemps' à quelqu'un screenshot",
        "Révèle qui du groupe tu trouves le/la plus attirant(e)",
        "Poste vidéo pleurant sur tous réseaux",
        "Appelle ex et dis veux le/la revoir",
        "Laisse groupe lire TOUS tes messages aujourd'hui",
        "Fais déclaration publique crush sur réseaux",
        "Donne téléphone déverrouillé à quelqu'un 15min",
        "Envoie vocal à TOUS contacts 'vous me manquez'",
        "Change bio tous réseaux groupe décide 1 semaine",
        "Appelle parents avoue secret énorme (faux)",
        "Poste photo galerie au hasard 10 fois story",
        "Vocal avouant crush actuel avec détails",
        "Laisse groupe voir historique navigation 1 semaine",
        "Envoie message love à 20 contacts random",
        "Poste 'Ma vie est un mensonge' et explique",
        "Appelle et parle sentiments vrais à quelqu'un",
        "Laisse quelqu'un lire tous tes messages privés 1 personne",
        "Révèle fantasme le plus secret au groupe",
        "Poste vidéo embarrassante archives sur TikTok",
        "Appelle crush parents et présente toi",
        "Envoie 'on devrait sortir ensemble' à contact random",
        "Laisse groupe poser 10 questions, réponds tout",
        "Poste confession embarrassante Facebook",
        "Vocal détaillant moments les plus gênants vie",
        "Appelle et déclare flamme à quelqu'un groupe choisit",
        "Laisse quelqu'un contrôler ton tel 1h",
        "Révèle secret de quelqu'un que tu connais",
        "Poste 'J'ai fait une énorme erreur' tous réseaux",
        "Envoie message dramatique à tous contacts",
        "Appelle ex meilleur ami et excuse toi exagérément",
        "Laisse groupe créer fake conversation pour toi",
        "Poste liste personnes que tu as aimées",
        "Vocal racontant ton histoire la plus honteuse",
        "Appelle crush et avoue avec témoins",
        "Laisse quelqu'un swiper Tinder pour toi 20min",
        "Révèle pensées sur chaque membre groupe",
        "Poste 'J'ai menti sur...' et invente truc fou",
        "Envoie screenshot conversations privées récentes",
        "Appelle personne que tu détestes et complimente",
        "Laisse groupe lire journal intime si tu as",
        "Poste photo/vidéo la plus embarrassante archives",
        "Vocal avouant toutes tes ex crushes",
        "Appelle parents raconte mensonge énorme puis avoue",
        "Laisse quelqu'un répondre tes messages 2h",
        "Révèle secret sur toi personne sait",
        "Poste 'Je vais tout changer' avec plan détaillé",
        "Envoie message love à personne détestais",
        "Appelle prof/boss et dis quelque chose bizarre",
        "Laisse groupe regarder tes photos cachées",
        "Poste vidéo chantant chanson amoureuse à qqn",
        "Vocal confession quelque chose jamais dit",
        "Appelle numéro parents et parle sentiments",
        "Laisse quelqu'un publier pour toi pendant journée",
        "Révèle fantasme sur quelqu'un connaissez",
        "Poste 'Besoin parler' tous réseaux puis explique",
        "Envoie message dramatique à crush",
        "Appelle et crie 'Je t'aime' puis raccroche",
        "Laisse groupe décider grande décision ta vie",
        "Poste photo avant/après embarrassante",
        "Vocal expliquant moment le plus dark",
        "Appelle ex et demande seconde chance (blague après)",
        "Laisse quelqu'un accéder cloud/photos 10min",
        "Révèle quelque chose fait jamais avoué",
        "Poste vidéo dansant sur chanson gênante public",
        "Envoie 'J'ai réfléchi à nous' 10 contacts",
        "Appelle parents dis changé d'orientation",
        "Laisse groupe poser questions intimes réponse complète",
        "Poste story 'AMA' et réponds TOUT pendant 2h",
        "Vocal révélant ce que penses vraiment chacun"
    ]
};

// ❓ 80 VÉRITÉS INTENSES PAR NIVEAU
const verites = {
    facile: [
        "C'est qui ton crush actuel et pourquoi ? 😍",
        "Dernière fois que tu as menti et sur quoi ? 🤥",
        "Qui est la personne la plus belle du groupe ? 👑",
        "Quel est ton rêve le plus fou à réaliser ? 💭",
        "Qui stalkes-tu le plus sur réseaux sociaux ? 👀",
        "Quelle est ta plus grande peur secrète ? 😨",
        "Film ou série que tu adores mais c'est gênant ? 🎬",
        "As-tu déjà triché à un examen important ? 📝",
        "C'est quoi le truc le plus embarrassant dans ta chambre ? 😳",
        "Quel est le contact le plus bizarre de ton tel ?",
        "As-tu déjà fait semblant d'être malade pour sécher ? 🤒",
        "Quel mensonge as-tu dit aujourd'hui ?",
        "Ta chanson guilty pleasure que tu n'assumes pas ? 🎵",
        "Dernier film qui t'a fait pleurer ? 😢",
        "Snack bizarre que tu aimes mais personne comprend ? 🍕",
        "Quelle célébrité voudrais-tu rencontrer ?",
        "Ton plus grand regret cette année ?",
        "Chose que tu collectionnes secrètement ?",
        "Surnom embarrassant qu'on t'a donné ?",
        "Application que tu utilises le plus ?",
        "Dernier mensonge à tes parents ?",
        "Personne que tu envies secrètement ?",
        "Ton talent caché que peu connaissent ?",
        "Pire cadeau que tu as reçu ?",
        "Chanson qui te fait danser automatiquement ?",
        "Ton phrase/mot que tu dis trop souvent ?",
        "Dernier rêve bizarre dont tu te souviens ?",
        "Chose que tu fais quand tu es seul(e) ?",
        "Plat que tu détestes mais tout monde aime ?",
        "Ton excuse préférée pour éviter qqch ?",
        "Dernier achat inutile que tu as fait ?",
        "Personne avec qui tu parles le plus ?",
        "Ton souvenir d'enfance le plus gênant ?",
        "Chose que tu ne prêtes jamais ?",
        "Ton rituel avant de dormir ?",
        "Film que tu as regardé 10+ fois ?",
        "Chose qui t'énerve chez les gens ?",
        "Ton plat préféré que tu mangerais H24 ?",
        "Dernière fois que tu as eu très peur ?",
        "Célébrité que tu trouves surcotée ?",
        "Ton endroit préféré pour réfléchir ?",
        "Chose que tu veux apprendre ?",
        "Ton parfum de glace préféré ?",
        "Dernier compliment que tu as reçu ?",
        "Chose que tu faisais enfant plus maintenant ?",
        "Ton animal préféré et pourquoi ?",
        "Dernière personne avec qui tu as discuté ?",
        "Ton jeu vidéo préféré si tu joues ?",
        "Chose qui te fait rire à coup sûr ?",
        "Ton défaut que tu voudrais changer ?",
        "Dernière série que tu as bingewatché ?",
        "Personne qui t'inspire le plus ?",
        "Ton souvenir de vacances préféré ?",
        "Chose que tu fais pour te détendre ?",
        "Ton sport préféré à regarder/pratiquer ?",
        "Dernier livre que tu as lu ?",
        "Chose que tu voudrais avoir fait plus jeune ?",
        "Ton emoji que tu utilises le plus ?",
        "Personne à qui tu parles quand triste ?",
        "Ton moment préféré de la journée ?",
        "Chose que tu ne pourrais jamais faire ?",
        "Ton plus grand accomplissement cette année ?",
        "Dernier cadeau que tu as offert ?",
        "Personne que tu n'as pas vue depuis longtemps ?",
        "Ton plat que tu sais cuisiner ?",
        "Chose que tu aimerais changer chez toi ?",
        "Ton acteur/actrice préféré(e) ?",
        "Dernière fois que tu as aidé quelqu'un ?",
        "Chose que tu fais machinalement ?",
        "Ton objectif pour l'année prochaine ?",
        "Personne qui te fait le plus rire ?",
        "Ton style vestimentaire préféré ?",
        "Dernière chose que tu as apprise ?",
        "Chose dont tu es le plus fier/fière ?",
        "Ton parfum/odeur préféré(e) ?",
        "Personne que tu respectes le plus ?",
        "Ton plus beau souvenir récent ?",
        "Chose que tu voudrais dire à quelqu'un ?",
        "Ton rêve pour dans 5 ans ?",
        "Dernière bonne action que tu as faite ?"
    ],
    
    moyen: [
        "As-tu déjà embrassé quelqu'un de ce groupe ? Qui ? 💋",
        "Quel est ton plus gros secret jamais dit ? 🤐",
        "As-tu été secrètement amoureux de quelqu'un ici ? 💘",
        "Quelle est la pire chose que tu aies jamais faite ? 😈",
        "Montre galerie, scrolle yeux fermés, montre résultat 📱",
        "As-tu déjà trompé quelqu'un ? Contexte ? 💔",
        "Plus gros mensonge à tes parents ? 👨‍👩‍👦",
        "As-tu déjà espionné le téléphone de quelqu'un ? 🕵️",
        "Ta recherche Google la plus bizarre récemment ? 🔍",
        "Si devais sortir avec qqn du groupe, qui ? 💑",
        "As-tu envoyé message à mauvaise personne ? Raconte 📨",
        "Ton crush secret dans autre classe/cercle ?",
        "As-tu menti sur ton âge ? Quand et pourquoi ? 🎂",
        "Chose la plus gênante historique navigation ?",
        "As-tu fait semblant d'aimer quelqu'un ? Pourquoi ?",
        "Personne que tu as aimée sans qu'elle sache ?",
        "Ton secret que seulement 1-2 personnes connaissent ?",
        "As-tu déjà volé quelque chose ? Quoi ?",
        "Pire date/rencard que tu as eu ? Détails",
        "As-tu déjà lu messages privés de quelqu'un ?",
        "Chose embarrassante que parents ont découverte ?",
        "As-tu menti dans ce jeu avant ? Sur quoi ?",
        "Personne dont tu étais jaloux(se) et pourquoi ?",
        "Ton moment le plus gênant en public ?",
        "As-tu déjà séché cours/travail pour qqch fun ?",
        "Secret sur quelqu'un que tu ne devrais pas connaître ?",
        "As-tu déjà fait quelque chose juste pour impressionner ?",
        "Personne que tu évites et pourquoi vraiment ?",
        "Ton mensonge le plus élaboré ?",
        "As-tu déjà ressenti quelque chose pour ex de ami(e) ?",
        "Chose que tu as faite sous pression groupe ?",
        "Personne qui te manque mais tu ne contactes pas ?",
        "As-tu déjà fait semblant de ne pas voir quelqu'un ?",
        "Ton comportement dont tu as honte ?",
        "As-tu déjà lu journal intime de quelqu'un ?",
        "Chose que tu ferais si personne ne savait ?",
        "As-tu déjà prétendu être malade pour échapper ?",
        "Personne que tu as blessée et regrettes ?",
        "Ton habitude bizarre que tu caches ?",
        "As-tu déjà menti pour protéger quelqu'un ?",
        "Chose que tu as faite par vengeance ?",
        "Personne dont tu parles en mal mais gentil(le) devant ?",
        "As-tu déjà fait quelque chose illégal mineur ?",
        "Ton plus grand remords relationnel ?",
        "As-tu déjà fait croire que tu étais occupé(e) ?",
        "Chose embarrassante dans tes favoris/signets ?",
        "As-tu déjà bloqué quelqu'un puis regretté ?",
        "Personne que tu ghosté et pourquoi ?",
        "Ton mensonge blanc le plus fréquent ?",
        "As-tu déjà fouillé affaires de quelqu'un ?",
        "Chose que tu as faite pour être populaire ?",
        "As-tu déjà simulé quelque chose pour éviter ?",
        "Personne dont tu as brisé le cœur ?",
        "Ton secret sur ami proche ?",
        "As-tu déjà révélé un secret qu'on t'a confié ?",
        "Chose que tu caches à ta famille ?",
        "As-tu déjà menti pour éviter conflits ?",
        "Personne dont tu as été jaloux du succès ?",
        "Ton comportement toxique dont tu es conscient ?",
        "As-tu déjà gardé rancune longtemps ?",
        "Chose que tu fais différemment devant autres ?",
        "As-tu déjà utilisé quelqu'un ?",
        "Personne à qui tu n'as jamais avoué",
"Raconte chose sexuelle embarrassante de ton passé",
        "Montre dernière personne que tu as stalké + pourquoi",
        "Avoue pensée sombre que tu as eue",
        "Révèle obsession bizarre que tu as",
        "Raconte moment où tu as manipulé quelqu'un",
        "Montre groupe/conversation que tu caches",
        "Avoue chose que tu as faite sous influence",
        "Révèle personne dont tu as brisé cœur exprès",
        "Raconte ton moment le plus lâche",
        "Montre comptes fake/secondaires que tu as",
        "Avoue mensonge que tu maintiens depuis longtemps",
        "Révèle rêve bizarre/inapproprié que tu as eu",
        "Raconte moment où tu as trahi ami proche",
        "Montre liste de personnes bloquées + raisons",
        "Avoue chose illégale que tu ferais si pas de conséquences",
        "Révèle secret sur relation passée jamais dit",
         "Avoue chose immorale que tu as faite",
        "Révèle secret sur ta sexualité jamais dit",
        "Raconte trahison la plus grave que tu as commise",
        "Montre dernier compte que tu as espionné + durée"
    ]
};

// 👥 DÉFIS DE GROUPE CRÉATIFS
const defisGroupe = [
    "📸 MAINTENANT : Tout le monde photo écran d'accueil sans triche",
    "🗳️ VOTE SECRET : Qui est le/la plus drôle ? (DM bot)",
    "🔄 SYNCHRO : Changez TOUS photo profil en même temps exact",
    "💬 CHAÎNE : Chacun complimente personne suivante originalement",
    "⚡ SPEED : Chacun pose question embarrassante à voisin",
    "🎭 ROI : Bot choisit quelqu'un roi/reine 10 minutes",
    "😂 BATTLE BLAGUES : Meilleure blague gagne vote groupe",
    "🎲 SECRETS : Écrivez secret anonyme, bot révèle un random",
    "📱 SCREENSHOT : Dernier screenshot SANS EXCEPTION",
    "🎤 KARAOKÉ GÉANT : Tout monde vocal chantant même chanson",
    "🎯 CASCADE : 3 personnes tirées → Facile/Moyen/Hard",
    "💭 CONFESSIONS : Secret au bot, partage anonymement",
    "🔥 HOT SEAT : Personne random répond 7 questions groupe",
    "🎬 IMITATIONS : Chacun imite autre membre vocal/vidéo",
    "🏃 MARATHON : 50 squats tous ensemble et preuve",
    "🎨 DESSIN : Dessinez membre du groupe, postez, devinez",
    "📝 HISTOIRE : Chacun écrit phrase, créez histoire groupe",
    "🎪 TALENT : Montrez talent caché en 30 secondes",
    "🔮 VOYANCE : Bot prédit avenir de chacun",
    "💥 BOMBE : Passez bombe, qui l'a à 2min perd",
    "🎯 CIBLE : Devinez nombre 1-100, plus proche gagne",
    "🎭 ACTING : Jouez scène ensemble improvisation",
    "📊 SONDAGE : Votez sur question controversée",
    "🎪 CIRCUS : Chacun fait trick physique et filme",
    "🎨 MEME : Créez meme sur membre groupe",
    "📢 ANNONCE : Chacun annonce quelque chose faux dramatique",
    "🎬 SCÉNARIO : Inventez histoire embarrassante membre",
    "🎯 DÉFI MINUTE : Chacun défi en 60 secondes max",
    "💡 IDÉES : Brainstorm projet fou pour groupe",
    "🎪 SHOW : Spectacle groupe 2 minutes improvisé",
    "📸 PHOTO GROUPE : Tous même pose photo profil",
    "🎭 RÔLE : Jouez personnages différents 10 min",
    "🎨 ART : Créez œuvre collective digitale",
    "📝 POÈME : Écrivez poème groupe ligne par ligne",
    "🎪 PERFORMANCE : Danse/chanson synchronisée",
    "🎯 MISSION : Accomplissez mission ensemble 30min",
    "💬 DÉBAT : Débattez sujet random 5min",
    "🎬 VIDÉO : Tournez clip courte ensemble",
    "🎪 CHALLENGE : Relevez défi physique tous",
    "📊 QUIZ : Questions groupe, meilleur score gagne"
];

// 💬 ROASTS NIVEAU LÉGENDE
const roasts = [
    "T'es tellement fauché que tu regardes pubs YouTube comme divertissement 😂",
    "Tu ressembles à une photo prise avec Nokia 3310 sous l'eau",
    "T'es la raison pourquoi shampooings ont mode d'emploi détaillé 📖",
    "Si excuses étaient personnes, tu serais conférence TEDx de 3h 🎤",
    "T'es genre personne qui perd contre elle-même à Pierre-Papier-Ciseaux ✊",
    "Même Siri fait semblant de ne pas t'entendre 🔇",
    "Tu mets 'Vu' et réponds 3 semaines après avec juste 'mdr' 💀",
    "T'es la pub non-skippable de 30 secondes de la vraie vie",
    "Tu cours comme si tu chargeais page Internet avec 56k en 1999 🐌",
    "T'es le contact 'Peut-être' dans téléphone de TOUT LE MONDE",
    "Tu danses comme si WiFi laguait en temps réel 📶",
    "T'es tellement en retard tu pourrais organiser ta propre fête passée",
    "Ta vie amoureuse ressemble à mes notes de maths",
    "Tu prends plus de temps à te préparer que Rome à se construire",
    "T'es la raison pourquoi aliens ne visitent pas Terre",
    "Ton sens de l'orientation est aussi bon que boussole cassée",
    "Tu chantes comme si tu essayais de réveiller morts... pour les re-tuer",
    "T'es tellement lent que escargots te dépassent en riant",
    "Ta cuisine est classée arme de destruction massive",
    "Tu es la preuve vivante que évolution peut aller en arrière",
    "Ton humour est aussi sec que Sahara en pleine canicule",
    "Tu mens tellement mal que Pinocchio semble crédible à côté",
    "T'es tellement distrait que tu oublies ce que tu oublies",
    "Ton style vestimentaire crie au secours silencieusement",
    "Tu es l'équivalent humain d'un lundi matin pluvieux",
    "Ta ponctualité est aussi légendaire que licornes",
    "Tu parles tellement que même perroquets prennent notes",
    "T'es tellement maladroit que gravité te déteste personnellement",
    "Ton talent culinaire ferait pleurer Gordon Ramsay... de désespoir",
    "Tu es la raison pourquoi mode d'emploi existent en 47 langues"
];

// 💝 COMPLIMENTS NIVEAU DIEU
const compliments = [
    "T'es si incroyable que même ton ombre refuse de te quitter ☀️",
    "Si t'étais Pokémon, tu serais shiny légendaire avec stats parfaites ⚡",
    "T'es genre de personne pour qui chiens abandonnent leurs maîtres 🐕",
    "Ton sourire pourrait résoudre crise énergétique mondiale 😊",
    "T'es tellement cool que glace te demande conseils de vie 🧊",
    "Si gentillesse était crime, tu aurais perpétuité sans libération conditionnelle ❤️",
    "T'es la notification que tout monde est heureux de recevoir 📱",
    "Ton énergie positive est plus contagieuse que tous virus réunis 🌟",
    "T'es genre de personne qui rend lundis matins supportables 📅",
    "Si t'étais chanson, tu serais #1 dans toutes les playlists 🎵",
    "T'es comme WiFi gratuit illimité : tout le monde t'adore 📶",
    "Ton rire est meilleure musique jamais composée 🔔",
    "Tu illumines pièce juste en y entrant comme ampoule LED premium 💡",
    "T'es chef-d'œuvre que même Louvre voudrait exposer 🎨",
    "Ta présence améliore n'importe quelle situation instantanément",
    "T'es combo parfait : beauté intérieure + extérieure + personnalité",
    "Tu rends monde meilleur juste en existant dedans 🌍",
    "T'es genre de personne qui restaure foi en humanité",
    "Ton intelligence n'a d'égale que ta gentillesse",
    "T'es l'ami(e) que tout monde rêve d'avoir 👫",
    "Tu as don naturel pour rendre autres heureux",
    "T'es preuve vivante que perfection existe vraiment",
    "Ta loyauté est plus solide que diamant 💎",
    "T'es inspirant(e) sans même essayer de l'être",
    "Ton cœur est grand comme océan Pacifique 💙",
    "T'es genre de personne qui laisse empreinte positive",
    "Tu as cette aura spéciale que peu possèdent ✨",
    "T'es équilibre parfait entre force et douceur",
    "Ton authenticité est rafraîchissante dans monde de faux-semblants",
    "T'es trésor que ceux qui te connaissent chérissent 💰"
];

// 🔮 BOULE MAGIQUE ÉTENDUE
const ball8 = [
    "Oui, absolument et sans moindre doute possible ! ✅",
    "C'est certain à 100%, je te le garantis personnellement 💯",
    "Sans l'ombre d'une hésitation, la réponse est OUI !",
    "Les étoiles, planètes et cosmos disent tous que oui 🔮",
    "Très très probable, presque aussi sûr que soleil se lève 🤔",
    "Peut-être bien, peut-être pas... l'avenir est flou 🤷",
    "Concentre-toi mieux et redemande dans exactement 5 minutes ⏳",
    "Je peux pas te dire maintenant, c'est vraiment compliqué 🤐",
    "Mieux vaut pas trop compter dessus mon ami(e) 😬",
    "Mes sources magiques interdimensionnelles disent clairement NON 🚫",
    "Peu probable malheureusement, désolé de te décevoir 📉",
    "Non franchement, laisse tomber cette idée maintenant 😕",
    "Absolument PAS, n'y pense même plus une seconde ! ❌",
    "Dans tes rêves peut-être, mais jamais dans réalité 💭",
    "Demande plutôt à ta mère, elle saura mieux que moi 👩",
    "Les signes sont mauvais, vraiment très mauvais ⚠️",
    "C'est possible mais improbable statistiquement parlant 📊",
    "Réessaye quand tu seras plus mature mentalement 🧠",
    "La boule magique a crashé en traitant ta question 💥",
    "Réponse trop dangereuse à révéler maintenant 🚨"
];

// 💾 SYSTÈME DONNÉES
let data = {
    leaderboard: {},
    stats: {},
    sessions: new Map()
};

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
        data.leaderboard[userId] = {
            name: userName,
            points: 0,
            defis: 0
        };
    }
    data.leaderboard[userId].points += points;
    data.leaderboard[userId].defis++;
    saveData();
}

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

// 🤖 DÉMARRAGE BOT
async function startBot() {
    loadData();
    
    const { state, saveCreds } = await useMultiFileAuthState('auth_session');
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ['Bot Action Verite', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        // 📱 QR CODE
        if(qr) {
            console.log('\n╔════════════════════════════════╗');
            console.log('║   📱 SCANNE CE QR CODE 📱      ║');
            console.log('╚════════════════════════════════╝\n');
            qrcode.generate(qr, { small: true });
            console.log('\n╔════════════════════════════════╗');
            console.log('║  WhatsApp → Menu → Appareils   ║');
            console.log('║  → Connecter un appareil       ║');
            console.log('╚════════════════════════════════╝\n');
        }
        
        if(connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('⚠️  Connexion fermée. Reconnexion:', shouldReconnect);
            if(shouldReconnect) {
                setTimeout(() => startBot(), 3000);
            }
        } else if(connection === 'open') {
            console.log('\n╔════════════════════════════════╗');
            console.log('║  ✅ BOT CONNECTÉ ET PRÊT ! 🎮  ║');
            console.log('╚════════════════════════════════╝\n');
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
                data.stats[chat] = {
                    games: 0,
                    actions: 0,
                    verites: 0,
                    lastPlayed: Date.now()
                };
            }

            const reply = async (text, mentions) => {
                return await sock.sendMessage(chat, {
                    text,
                    mentions: mentions || []
                });
            };

            // 📖 MENU
            if(['!menu', '!aide', '!help', '!start'].includes(txt)) {
                return reply(
                    '╔══════════════════════╗\n' +
                    '║ 🎮 ACTION OU VÉRITÉ  ║\n' +
                    '╚══════════════════════╝\n\n' +
                    '⚡ *COMMANDES*\n' +
                    '!jouer → Démarrer 🎮\n' +
                    '!action → Défi random 🎯\n' +
                    '!verite → Question ❓\n' +
                    '!random → Surprise 🎲\n' +
                    '!stop → Arrêter ❌\n\n' +
                    '🎚️ *NIVEAUX*\n' +
                    '!facile → Soft 🟢\n' +
                    '!moyen → Medium 🟡\n' +
                    '!hard → Intense 🔴\n\n' +
                    '👥 *GROUPE*\n' +
                    '!groupe → Tous 👨‍👩‍👦\n' +
                    '!duo → 2 joueurs 👫\n' +
                    '!roulette → 1 perdant 🎯\n' +
                    '!qui [?] → Désigne 🎲\n\n' +
                    '🏆 *SCORES*\n' +
                    '!fait → +10 pts ✅\n' +
                    '!score → Ton score 📊\n' +
                    '!top → Top 10 🏆\n' +
                    '!stats → Stats 📈\n\n' +
                    '🎉 *FUN*\n' +
                    '!roast → Roast 🔥\n' +
                    '!compliment → ❤️\n' +
                    '!8ball [?] → Magie 🔮\n\n' +
                    '_80 actions/vérités par niveau !_'
                );
            }

            // 🎮 JOUER
            if(txt === '!jouer') {
                data.sessions.set(chat, { active: true, startTime: Date.now() });
                data.stats[chat].games++;
                data.stats[chat].lastPlayed = Date.now();
                saveData();
                
                return reply(
                    `🎉 *GAME ON !* 🎉\n\n` +
                    `Bienvenue ${name} ! 🎮\n\n` +
                    `🎯 !action → Défi\n` +
                    `❓ !verite → Question\n` +
                    `🎲 !random → Surprise\n` +
                    `🎚️ !facile/!moyen/!hard\n` +
                    `📖 !menu → Toutes commandes\n\n` +
                    `_+10 pts par défi validé_ 🏆\n\n` +
                    `C'est parti ! 😈🔥`
                );
            }

            // 🔒 VÉRIF
            const s = data.sessions.get(chat);
            if(!s && txt.startsWith('!') && !['!menu','!aide','!help','!start'].includes(txt)) {
                return reply('⚠️ *Lance avec !jouer d\'abord !* 🎮');
            }

            // 🎯 FACILE
            if(txt === '!facile') {
                data.stats[chat].actions++;
                saveData();
                return reply(
                    `🟢 *ACTION FACILE* 🟢\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis.facile)}\n\n` +
                    `✅ !fait → +5 pts 🏆`,
                    [from]
                );
            }

            // 🟡 MOYEN
            if(txt === '!moyen') {
                data.stats[chat].actions++;
                saveData();
                return reply(
                    `🟡 *ACTION MOYENNE* 🟡\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis.moyen)}\n\n` +
                    `✅ !fait → +10 pts 🏆`,
                    [from]
                );
            }

            // 🔴 HARD
            if(txt === '!hard') {
                data.stats[chat].actions++;
                saveData();
                return reply(
                    `🔴 *ACTION HARD* 🔴\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis.hard)}\n\n` +
                    `✅ !fait → +20 pts 🏆🔥`,
                    [from]
                );
            }

            // ❓ VÉRITÉ
            if(txt.includes('!verite')) {
                let niveau = 'moyen';
                if(txt.includes('facile')) niveau = 'facile';
                if(txt.includes('hard')) niveau = 'hard';
                
                data.stats[chat].verites++;
                saveData();
                
                const colors = { facile: '🟢', moyen: '🟡', hard: '🔴' };
                return reply(
                    `${colors[niveau]} *VÉRITÉ* ${colors[niveau]}\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(verites[niveau])}\n\n` +
                    `💬 Réponds honnêtement !`,
                    [from]
                );
            }

            // 🎯 ACTION
            if(txt === '!action') {
                const niveaux = ['facile', 'moyen', 'hard'];
                const niveau = rand(niveaux);
                data.stats[chat].actions++;
                saveData();
                
                const colors = { facile: '🟢', moyen: '🟡', hard: '🔴' };
                const points = { facile: 5, moyen: 10, hard: 20 };
                
                return reply(
                    `${colors[niveau]} *ACTION* ${colors[niveau]}\n\n` +
                    `@${from.split('@')[0]}\n\n` +
                    `${rand(defis[niveau])}\n\n` +
                    `✅ !fait → +${points[niveau]} pts 🏆`,
                    [from]
                );
            }

            // 🎲 RANDOM
            if(txt === '!random') {
                const isAction = Math.random() < 0.5;
                const niveaux = ['facile', 'moyen', 'hard'];
                const niveau = rand(niveaux);
                const colors = { facile: '🟢', moyen: '🟡', hard: '🔴' };
                
                if(isAction) {
                    data.stats[chat].actions++;
                    saveData();
                    return reply(
                        `🎲 *RANDOM : ACTION* ${colors[niveau]}\n\n` +
                        `@${from.split('@')[0]}\n\n` +
                        `${rand(defis[niveau])}\n\n` +
                        `✅ !fait 🏆`,
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