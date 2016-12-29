import { CLITest131216Page } from './app.po';

describe('clitest13-12-16 App', function() {
  let page: CLITest131216Page;

  beforeEach(() => {
    page = new CLITest131216Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
