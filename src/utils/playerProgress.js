export const PLAYER_PROFILE_KEY = "playerProfile";
const LEGACY_TOTAL_POINTS_KEY = "totalPoints";
const STAR_KEYS = Array.from({ length: 10 }, (_, index) => `stars_${index + 1}`);
const PHASE_LIST_KEYS = ["aditionphasesList", "subtractionphasesList"];

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readJson(storage, key) {
  try {
    const rawValue = storage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch (error) {
    return null;
  }
}

function getLegacyTotalXp(storage) {
  return Math.max(0, toNumber(storage.getItem(LEGACY_TOTAL_POINTS_KEY), 0));
}

function getLegacyStars(storage) {
  return STAR_KEYS.reduce((totalStars, key) => {
    return totalStars + Math.max(0, toNumber(storage.getItem(key), 0));
  }, 0);
}

function getLegacyCompletedPhases(storage) {
  return PHASE_LIST_KEYS.reduce((completedPhases, key) => {
    const savedPhaseList = readJson(storage, key);

    if (!Array.isArray(savedPhaseList)) {
      return completedPhases;
    }

    return (
      completedPhases +
      savedPhaseList.filter((phase) => phase?.wasComplete).length
    );
  }, 0);
}

export function calculateLevelFromXp(totalXp) {
  return Math.floor(Math.max(0, toNumber(totalXp, 0)) / 1000);
}

export function createDefaultPlayerProfile(storage) {
  return {
    version: 1,
    totalXp: getLegacyTotalXp(storage),
    coins: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalAnswers: 0,
    totalCorrect: 0,
    totalWrong: 0,
    starsCollected: getLegacyStars(storage),
    phasesCompleted: getLegacyCompletedPhases(storage),
    gamesPlayed: 0,
    lastMode: "",
    lastPlayedAt: null,
  };
}

export function getPlayerProfile(storage) {
  const baseProfile = createDefaultPlayerProfile(storage);
  const savedProfile = readJson(storage, PLAYER_PROFILE_KEY);

  if (!savedProfile) {
    return baseProfile;
  }

  return {
    ...baseProfile,
    ...savedProfile,
    totalXp: Math.max(toNumber(savedProfile.totalXp, 0), baseProfile.totalXp),
    coins: Math.max(0, toNumber(savedProfile.coins, 0)),
    currentStreak: Math.max(0, toNumber(savedProfile.currentStreak, 0)),
    bestStreak: Math.max(0, toNumber(savedProfile.bestStreak, 0)),
    totalAnswers: Math.max(0, toNumber(savedProfile.totalAnswers, 0)),
    totalCorrect: Math.max(0, toNumber(savedProfile.totalCorrect, 0)),
    totalWrong: Math.max(0, toNumber(savedProfile.totalWrong, 0)),
    starsCollected: Math.max(
      toNumber(savedProfile.starsCollected, 0),
      baseProfile.starsCollected
    ),
    phasesCompleted: Math.max(
      toNumber(savedProfile.phasesCompleted, 0),
      baseProfile.phasesCompleted
    ),
    gamesPlayed: Math.max(0, toNumber(savedProfile.gamesPlayed, 0)),
  };
}

export function savePlayerProfile(storage, profile) {
  const normalizedProfile = {
    ...profile,
    totalXp: Math.max(0, toNumber(profile.totalXp, 0)),
    coins: Math.max(0, toNumber(profile.coins, 0)),
    currentStreak: Math.max(0, toNumber(profile.currentStreak, 0)),
    bestStreak: Math.max(0, toNumber(profile.bestStreak, 0)),
    totalAnswers: Math.max(0, toNumber(profile.totalAnswers, 0)),
    totalCorrect: Math.max(0, toNumber(profile.totalCorrect, 0)),
    totalWrong: Math.max(0, toNumber(profile.totalWrong, 0)),
    starsCollected: Math.max(0, toNumber(profile.starsCollected, 0)),
    phasesCompleted: Math.max(0, toNumber(profile.phasesCompleted, 0)),
    gamesPlayed: Math.max(0, toNumber(profile.gamesPlayed, 0)),
  };

  storage.setItem(PLAYER_PROFILE_KEY, JSON.stringify(normalizedProfile));
  storage.setItem(LEGACY_TOTAL_POINTS_KEY, String(normalizedProfile.totalXp));

  return normalizedProfile;
}

function buildRewardMessage({
  isCorrect,
  xpDelta,
  coinDelta,
  streak,
  streakReset,
  levelUp,
  label,
}) {
  const messageParts = [];

  if (label) {
    messageParts.push(label);
  }

  if (xpDelta > 0) {
    messageParts.push(`+${xpDelta} XP`);
  } else if (xpDelta < 0) {
    messageParts.push(`${xpDelta} XP`);
  }

  if (coinDelta > 0) {
    messageParts.push(`+${coinDelta} moedas`);
  }

  if (isCorrect && streak >= 2) {
    messageParts.push(`Combo x${streak}`);
  }

  if (!isCorrect && streakReset) {
    messageParts.push("Combo reiniciado");
  }

  if (levelUp) {
    messageParts.push("Nivel acima");
  }

  return messageParts.join(" • ");
}

export function applyAnswerReward(profile, options = {}) {
  const {
    mode = "game",
    isCorrect,
    baseXp = 10,
    baseCoins = 2,
    wrongPenaltyXp = 2,
    wrongPenaltyCoins = 0,
    streakStep = 5,
    streakXpBonus = 4,
    streakCoinBonus = 1,
  } = options;

  const previousLevel = calculateLevelFromXp(profile.totalXp);
  const nextProfile = {
    ...profile,
    totalAnswers: profile.totalAnswers + 1,
    lastMode: mode,
    lastPlayedAt: Date.now(),
  };

  let xpDelta = 0;
  let coinDelta = 0;
  let streakReset = false;

  if (isCorrect) {
    nextProfile.totalCorrect += 1;
    nextProfile.currentStreak += 1;
    nextProfile.bestStreak = Math.max(
      nextProfile.bestStreak,
      nextProfile.currentStreak
    );

    const comboTier = Math.floor(nextProfile.currentStreak / streakStep);
    xpDelta = baseXp + comboTier * streakXpBonus;
    coinDelta = baseCoins + comboTier * streakCoinBonus;
  } else {
    nextProfile.totalWrong += 1;
    streakReset = nextProfile.currentStreak >= 2;
    nextProfile.currentStreak = 0;
    xpDelta = -Math.min(wrongPenaltyXp, nextProfile.totalXp);
    coinDelta = -Math.min(wrongPenaltyCoins, nextProfile.coins);
  }

  nextProfile.totalXp = Math.max(0, nextProfile.totalXp + xpDelta);
  nextProfile.coins = Math.max(0, nextProfile.coins + coinDelta);

  const levelUp = calculateLevelFromXp(nextProfile.totalXp) > previousLevel;

  return {
    profile: nextProfile,
    xpDelta,
    coinDelta,
    streak: nextProfile.currentStreak,
    levelUp,
    message: buildRewardMessage({
      isCorrect,
      xpDelta,
      coinDelta,
      streak: nextProfile.currentStreak,
      streakReset,
      levelUp,
    }),
  };
}

export function applyMilestoneReward(profile, options = {}) {
  const {
    mode = "milestone",
    xp = 0,
    coins = 0,
    stars = 0,
    phases = 0,
    games = 0,
    label = "Missao concluida",
  } = options;

  const previousLevel = calculateLevelFromXp(profile.totalXp);
  const nextProfile = {
    ...profile,
    totalXp: profile.totalXp + Math.max(0, toNumber(xp, 0)),
    coins: profile.coins + Math.max(0, toNumber(coins, 0)),
    starsCollected: profile.starsCollected + Math.max(0, toNumber(stars, 0)),
    phasesCompleted:
      profile.phasesCompleted + Math.max(0, toNumber(phases, 0)),
    gamesPlayed: profile.gamesPlayed + Math.max(0, toNumber(games, 0)),
    lastMode: mode,
    lastPlayedAt: Date.now(),
  };

  const levelUp = calculateLevelFromXp(nextProfile.totalXp) > previousLevel;

  return {
    profile: nextProfile,
    xpDelta: Math.max(0, toNumber(xp, 0)),
    coinDelta: Math.max(0, toNumber(coins, 0)),
    levelUp,
    message: buildRewardMessage({
      isCorrect: true,
      xpDelta: Math.max(0, toNumber(xp, 0)),
      coinDelta: Math.max(0, toNumber(coins, 0)),
      streak: nextProfile.currentStreak,
      streakReset: false,
      levelUp,
      label,
    }),
  };
}
