const chai = require('chai');
const HelperApi = require('../app/helper/api');

chai.should();
const api = new HelperApi()

describe('News API Helper', () => {
  it('should return news', (done) => {
    api.getTopNews().then((topNewsList) => {
      done()
    })
  })
})
