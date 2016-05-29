import request from 'request'
import * as config from '../config'
import CacheLite from 'cache-lite'

export class Api {

  /**
   * Constructor
   */
  constructor() {
    this.cache = new CacheLite()
    this.topNewsList = []
  }

  /**
   * Get the Top News List
   * @return Top News List
   */
  get getTopNewsList() {
    return this.topNewsList
  }

  /**
   * Make HTTP request
   * @param {string} url - Hacker Newa API url
   * @return Promise
   */
  makeRequest(urlApi) {
    return new Promise((resolve, reject) => {
      request(urlApi, (err, res, body) => {
        if (err) {
          return reject(err)
        } else if (res.statusCode !== 200) {
          const error = new Error(`Unexpected status code: ${res.statusCode}`)
          error.res = res
          return reject(error)
        }
        return resolve(JSON.parse(body))
      })
    })
  }

  /**
   * Get News Detail (url, comment, point ...)
   * @param {number} id - News ID
   * @param {number} index - Index
   * @return Promise
   */
  getNewsDetail(id, index) {
    return new Promise((resolveNews, reject) => {
      this.cache.get(id).then((news) => {
        this.topNewsList.push(news)
        return resolveNews()
      }).catch(() => {
        this.makeRequest(config.item(id)).then(news => {
          const tempNews = news
          tempNews.order = index + 1
          this.cache.set(id, tempNews, 60000).then(() => {
            this.topNewsList.push(tempNews)
            return resolveNews()
          })
        }).catch((err) => reject(err))
      })
    })
  }

  /**
   * Get top News from Hacker News
   * @return Promise
   */
  getTopNews() {
    return new Promise((resolve, reject) => {
      this.topNewsList = []
      this.makeRequest(config.topNews).then(ids => {
        const promiseArray = []
        ids.slice(0, config.MaxNews).forEach((id, index) => {
          promiseArray.push(this.getNewsDetail(id, index))
        })
        Promise.all(promiseArray).then(() => {
          resolve(this.topNewsList)
        })
      }).catch((err) => reject(err))
    })
  }

}
