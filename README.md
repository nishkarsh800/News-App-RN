# 📰 News App - React Native

A modern, feature-rich news application built with React Native and Expo. Stay updated with the latest news from around the world with an intuitive and beautiful user interface.


## Features  
- **Home**: Breaking news carousel, quick search, category tabs, and latest articles 
- **Discover**: Advanced search with category and country filters 
- **Saved**: Bookmarked articles with offline access 
- **Article View**: Full article content with bookmark and share options 
- **Search Results**: Filtered news with real-time search  

## Key Functionalities  
- Real-time news from NewsData.io API 
- Category filtering (Politics, Science, Entertainment, Sports, Technology, Business) 
- Country-specific news 
- Bookmark system with AsyncStorage 
- Offline support for saved articles

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Home screen with breaking news
│   ├── discover.tsx       # Advanced search and filters
│   └── saved.tsx          # Saved articles
├── news/
│   ├── [id].tsx          # Individual article view
│   └── search.tsx        # Search results
├── hooks/
│   ├── useNewsCategories.tsx
│   └── useNewsCountry.tsx
└── _layout.tsx           # Root layout

components/
├── BreakingNews.tsx      # Breaking news carousel
├── Categories.tsx        # Category filter component
├── NewsItem.tsx          # Individual news item
├── NewsList.tsx          # News list container
├── SearchBar.tsx         # Search input component
└── ...                   # Other UI components

constants/
├── Categories.ts         # News categories
├── Colors.ts            # App color scheme
├── CountryList.ts       # Available countries
└── Icons.tsx            # Icon definitions
```




