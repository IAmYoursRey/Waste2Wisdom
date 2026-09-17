import { InnovationItem, ReviewItem, MatchmakingItem } from '../types';
import { initialInnovationData } from '../data/innovationCatalog';
import { initialReviewsData } from '../data/reviewsData';
import { initialMatchmakingData } from '../data/matchmakingData';

const INNOVATIONS_KEY = 'w2w_innovations_v1';
const REVIEWS_KEY = 'w2w_reviews_v1';
const MATCHMAKING_KEY = 'w2w_matchmaking_v1';

export const getStoredInnovations = (): InnovationItem[] => {
  try {
    const raw = localStorage.getItem(INNOVATIONS_KEY);
    if (!raw) {
      localStorage.setItem(INNOVATIONS_KEY, JSON.stringify(initialInnovationData));
      return initialInnovationData;
    }
    return JSON.parse(raw);
  } catch {
    return initialInnovationData;
  }
};

export const saveInnovations = (items: InnovationItem[]) => {
  try {
    localStorage.setItem(INNOVATIONS_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving innovations', err);
  }
};

export const getStoredReviews = (): ReviewItem[] => {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(initialReviewsData));
      return initialReviewsData;
    }
    return JSON.parse(raw);
  } catch {
    return initialReviewsData;
  }
};

export const saveReviews = (reviews: ReviewItem[]) => {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Error saving reviews', err);
  }
};

export const getStoredMatchmaking = (): MatchmakingItem[] => {
  try {
    const raw = localStorage.getItem(MATCHMAKING_KEY);
    if (!raw) {
      localStorage.setItem(MATCHMAKING_KEY, JSON.stringify(initialMatchmakingData));
      return initialMatchmakingData;
    }
    return JSON.parse(raw);
  } catch {
    return initialMatchmakingData;
  }
};

export const saveMatchmaking = (items: MatchmakingItem[]) => {
  try {
    localStorage.setItem(MATCHMAKING_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving matchmaking', err);
  }
};
