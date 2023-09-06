const MAX_RATING: number = 3300;

export const normalizeRating = (rating: number) => {
  if (rating > MAX_RATING) {
    return MAX_RATING;
  }
  return rating;
};
