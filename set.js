const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkgxTGVJc001V2VCR29BTVZvRFk2Nk5uek9GcGZtOEpQSHRwY1l4bkhVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2xFSGlzRzgrWXVoK3BCSER3QmE5c3U5MlRseFlkaW92NUdrcTNaL3hYWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRHNndVptQk5pMjZLR3BESTR1R3lWd1VjeldKTzV0TWwwV3IzQVI5RVU0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaVHlucDBmamFsSHg1cmZEdE5VTUxHSFN4ejlNRnRibG9nTG9sK2MwQXlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktESE5QR2hjNGsxWXVlRmVJcm1LVDBXYTRWMXRQc1Y2S1U5TVVwUzcrM0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFVUjZLRitmSENLZ2FjdFgyb0t2ZjV5RHgwL01XZDArMzU3NWRiZTVLUWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUVuVUNJcVd4ZE8xN1h6cGlrUURnRFU0SUtZZjdtelJIaVZNOGVyb3htbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5IOHhwSXRUaFlJd3JnandiK0pvZmUzUW5tKzAraDBWdjl3dkFCZGFoOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjUwd0xhQktkT1NscWlJVEVjYjhCUENvYXFGTkJhWml5RHF1VEJwaXVFdVFYdmkvejNOaTh3QWc5RW1zT2JVaW5OaTN5TTI2YVd2K01wK1dQUkdNaGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE1LCJhZHZTZWNyZXRLZXkiOiJCU0FwaHpVWXQwU2pRSFJJdGVnUzZjeGR1b2w4bm1uUkpyYU1Pb3lBaTl3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiItcnFVeEVUeVRJT0J0WHptSkNqZ0ZRIiwicGhvbmVJZCI6ImVhNzYxNzFjLTFmMzEtNGMwYy1iM2JmLWE5ZjA3M2Q0MTA4YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMMTZ0b0phTHNMSHBIVzArRjR3aHkxclVYcjQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2JOb1VXck9vNHp5cit6TWk0MjZrYUhXYzZnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZQQkoxQkozIiwibWUiOnsiaWQiOiIyNTQ3MDIzNTE2NTc6OTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BLY3JvVUJFTCtNdHIwR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImkvQWs1RTVTMXZNNllRTHNVQTdQUzVIMHNxTUg3QnJGeURVc3oyaHFwVFk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlN3NG5QYnhOQ3AwVktoYlZQRWN2T1U0VTQ4ZFFlS0wwbUFuNjVFSnFzUHRHY3NDeWc1ekNtalVsRUwrYjc0aEdUS0t2MHhCcW9RR3B2QTArK0ZhS0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXaVJjR2hvRjVGVHp3K1N5amRYbU5SYWlWN2RtRWJxZC9mMG9STnM5dFZsTnRDZ3NzWHMwLzdCL2s5TGttZmNnSUdKQzkvWGttMjJPcnlMSzZ3dlBpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwMjM1MTY1Nzo5NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZdndKT1JPVXRiek9tRUM3RkFPejB1UjlMS2pCK3dheGNnMUxNOW9hcVUyIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5NDI1MzU2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhLSyJ9',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Alviin21🗿🗿",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254702351657",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
