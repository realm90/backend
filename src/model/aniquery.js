export const SearchQ = () =>
  `query ($page: Int = 1, $id: Int, $type: MediaType, $nsfw: Boolean, $search: String, $format: [MediaFormat], $status: MediaStatus, $size: Int, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $seasonYear: Int, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [String], $isLicensed: Boolean, $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
    Page(page: $page, perPage: $size) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, seasonYear: $seasonYear, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedBy_in: $licensedBy, isLicensed: $isLicensed, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $nsfw) {
        id
        idMal
        status(version: 2)
        title {
          userPreferred
          romaji
          english
          native
        }
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
        episodes
        season
        format
        seasonYear
        averageScore
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`;

export const InfoQuery = (id) => `
query Query {
  Media (id: ${id}, type: ANIME) {
    id
    idMal
    title {
      romaji
      english
      native
      userPreferred
    }
    description
    coverImage {
      large
      medium
      color
    }
    bannerImage
    genres
    format
    status
    episodes
    duration
    averageScore
    popularity
    season
    seasonYear
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    siteUrl
    trailer {
      id
      site
      thumbnail
    }
    studios {
      nodes {
        name
      }
    }
  }
}
`;

export const RecommendationsQuery = (id, page, limit) => `
query Query {
  Media(id: ${id}, type: ANIME) {
    id
    idMal
    title {
      romaji
      english
      native
      userPreferred
    }
    recommendations(page: ${page}, perPage: ${limit}) {
      nodes {
        mediaRecommendation {
          id
          idMal
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            large
            medium
            color
          }
          bannerImage
          type
          format
          status
          episodes
          duration
          averageScore
        }
      }
    }
  }
}`;

export const airingScheduleQuery = (
  page = 1,
  perPage = 20,
  weekStart,
  weekEnd,
  notYetAired
) =>
  `query { 
    Page(
      page: ${page}, 
      perPage: ${perPage}) 
      { pageInfo 
        { total perPage currentPage lastPage hasNextPage } 
        airingSchedules( notYetAired: ${notYetAired}, airingAt_greater: ${weekStart}, airingAt_lesser: ${weekEnd}) { airingAt episode media { id description idMal title { romaji english userPreferred native } countryOfOrigin description popularity bannerImage coverImage { extraLarge large medium color } genres averageScore seasonYear format } } } }`;
