const baseAPI = 'https://hacker-news.firebaseio.com/v0/'
exports.topNews = `${baseAPI}topstories.json?print=pretty`
exports.item = (id) => `${baseAPI}item/${id}.json?print=pretty`
exports.MaxNews = 20
