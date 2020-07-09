const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('http://www.metamapper.io', {
  stripQuerystring: false,
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
});

generator.on('error', (error) => {
  console.log(error);
});

// start the crawler
generator.start();
