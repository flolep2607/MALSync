import { pageInterface } from '../pageInterface';

export const Vostfree: pageInterface = {
  name: 'vostfree',
  domain: ['https://vostfree.tv/','https://vostfree.com/'],
  database: 'vostfree',
  languages: ['French'],
  type: 'anime',
  isSyncPage(url) {
    return true;
  },
  sync: {
    getTitle(url) {
      return j.$('h1').text();
    },
    getIdentifier(url) {
      url = utils.urlPart(url, 3).split("-")[0];
      return url;
    },
    getOverviewUrl(url) {
      return url;
    },
    getEpisode(url) {
      return parseInt(j.$("div.jq-selectbox__select-text").text().toLowerCase().replace("episode","").trim()!);
    },
    nextEpUrl(url) {
      return url;
    },
    uiSelector(selector) {
      j.$('div.jq-selectbox__dropdown > ul').after(j.html(`<section>${selector}</section>`));
    },
  },
  overview: {
    getTitle(url) {
      return '';
    },
    getIdentifier(url) {
      return '';
    },
    uiSelector(selector) {
      // no Ui
    },
    list: {
      offsetHandler: false,
      elementsSelector() {
        return j.$('div.jq-selectbox__dropdown ul li');
      },
      elementUrl(selector) {
        return document.URL;
      },
      elementEp(selector) {
        return Number(selector.text().toLowerCase().replace("episode","").trim());
      },
    },
  },
  init(page) {
    api.storage.addStyle(require('!to-string-loader!css-loader!less-loader!./style.less').toString());
    utils.waitUntilTrue(
      function() {
        return j.$('div.jq-selectbox__dropdown').length;
      },
      function() {
        con.info('Start check');
        page.handlePage();
        utils.urlChangeDetect(function() {
          con.info('Check');
          page.handlePage();
        });
      },
    );
  },
};
