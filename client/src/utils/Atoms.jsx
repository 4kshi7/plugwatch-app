// Atoms.jsx
import { atom } from "recoil";

export const wallpaperState = atom({
  key: "wallpaperState",
  default: null,
});

export const trendingState = atom({
  key: "trendingState",
  default: [],
});

export const popularState = atom({
  key: "popularState",
  default: [],
});

export const movieState = atom({
  key: "movieState",
  default: [],
});

export const pageState = atom({
  key: "pageState",
  default: 1,
});

export const hasMoreState = atom({
  key: "hasMoreState",
  default: true,
});

export const categoryState = atom({
  key: "categoryState",
  default: "movie",
});

export const durationState = atom({
  key: "durationState",
  default: "day",
});

export const tvShowState = atom({
  key: "tvShowState",
  default: [],
});

export const tvShowPageState = atom({
  key: "tvShowPageState",
  default: 1,
});

export const tvShowHasMoreState = atom({
  key: "tvShowHasMoreState",
  default: true,
});

export const tvShowCategoryState = atom({
  key: "tvShowCategoryState",
  default: "top_rated",
});

export const personState = atom({
  key: "personState",
  default: [],
});

export const personPageState = atom({
  key: "personPageState",
  default: 1,
});

export const personHasMoreState = atom({
  key: "personHasMoreState",
  default: true,
});

export const personCategoryState = atom({
  key: "personCategoryState",
  default: "popular",
});

export const ultimateDetailsState = atom({
  key: "ultimateDetailsState",
  default: null,
});

export const isLoadingState = atom({
  key: "isLoadingState",
  default: true,
});

export const errorState = atom({
  key: "errorState",
  default: null,
});

export const ultimateTvDetailsState = atom({
  key: "ultimateTvDetailsState",
  default: [],
});

export const isTvLoadingState = atom({
  key: "isTvLoadingState",
  default: true,
});

export const tvErrorState = atom({
  key: "tvErrorState",
  default: null,
});

export const personDetailsState = atom({
  key: "personDetailsState",
  default: null,
});

export const personMoviesState = atom({
  key: "personMoviesState",
  default: null,
});

export const personSocialsState = atom({
  key: "personSocialsState",
  default: null,
});

export const isPersonLoadingState = atom({
  key: "isPersonLoadingState",
  default: true,
});

export const personErrorState = atom({
  key: "personErrorState",
  default: null,
});
