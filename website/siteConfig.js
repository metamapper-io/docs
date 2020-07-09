/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const repoUrl = 'https://github.com/getmetamapper/metamapper'

const siteConfig = {
  title: 'Metamapper', // Title for your website.
  tagline: 'The modern toolkit for data teams',
  url: 'https://www.metamapper.io', // Your website URL
  baseUrl: '/', // Base URL for your project */

  algolia: {
    apiKey: 'f9c9d9ae74b48def75d41abe3997200e',
    indexName: 'metamapper',
    algoliaOptions: {} // Optional, if provided by Algolia
  },

  // Used for publishing and more
  projectName: 'documentation',

  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  organizationName: 'getmetamapper',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { search: true },
    {
      doc: 'metadata-management',
      href: '/docs',
      label: 'Documentation',
    },
    {
      href: 'http://discuss.metamapper.io',
      label: 'Discussion',
    },
    {
      blog: true,
      label: 'Blog',
    },
    {
      href: repoUrl,
      label: 'Github',
    },
  ],

  // If you have users set above, you add it here:
  // users,

  headerIcon: 'img/brand/logo.png',

  footerIcon: 'img/brand/logo-white.png',

  favicon: 'img/favicon.ico',

  disableHeaderTitle: true,

  /* Colors for website */
  colors: {
    primaryColor: '#f7777b',
    secondaryColor: '#f7777b',
  },

  /* Custom fonts for website */

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
  ],

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Scott Cruwys`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',

  // No .html extensions for paths.
  cleanUrl: true,

  gaTrackingId: 'UA-171539836-1',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: repoUrl,
};

module.exports = siteConfig;
