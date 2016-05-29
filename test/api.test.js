import { expect, should } from 'chai'
import { Api } from '../src/helper/api'

should();
const api = new Api()

describe('News API Helper', () => {
  it('should return news', (done) => {
    api.getTopNews().then((topNewsList) => {
      done()
    })
  })
})
