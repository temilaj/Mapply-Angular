import { MapplyAngularPage } from './app.po';

describe('mapply-angular App', () => {
  let page: MapplyAngularPage;

  beforeEach(() => {
    page = new MapplyAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
