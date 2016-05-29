const baseAPI = 'https://hacker-news.firebaseio.com/v0/'
export const topNews = `${baseAPI}topstories.json?print=pretty`
export const item = (id) => `${baseAPI}item/${id}.json?print=pretty`
export const MaxNews = 20
