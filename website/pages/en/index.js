/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const classNames = require('classnames');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;

class GridBlock extends React.Component {
  renderBlock(origBlock) {
    const blockDefaults = {
      imageAlign: 'left',
    };

    const block = Object.assign(blockDefaults, origBlock);

    const blockClasses = classNames('blockElement', this.props.className, {
      alignCenter: this.props.align === 'center',
      alignRight: this.props.align === 'right',
      fourByGridBlock: this.props.layout === 'fourColumn',
      imageAlignSide:
        block.image &&
        (block.imageAlign === 'left' || block.imageAlign === 'right'),
      imageAlignTop: block.image && block.imageAlign === 'top',
      imageAlignRight: block.image && block.imageAlign === 'right',
      imageAlignBottom: block.image && block.imageAlign === 'bottom',
      imageAlignLeft: block.image && block.imageAlign === 'left',
      threeByGridBlock: this.props.layout === 'threeColumn',
      twoByGridBlock: this.props.layout === 'twoColumn',
    });

    const topLeftImage =
      (block.imageAlign === 'top' || block.imageAlign === 'left') &&
      this.renderBlockImage(block.image, block.imageLink, block.imageAlt);

    const bottomRightImage =
      (block.imageAlign === 'bottom' || block.imageAlign === 'right') &&
      this.renderBlockImage(block.image, block.imageLink, block.imageAlt);

    return (
      <div className={blockClasses} key={block.title}>
        {topLeftImage}
        <div className="blockContent">
          <div className="projectCaption">
            {block.caption}
          </div>
          {this.renderBlockTitle(block.title)}
          {block.content}
        </div>
        {bottomRightImage}
      </div>
    );
  }

  renderBlockImage(image, imageLink, imageAlt) {
    if (!image) {
      return null;
    }

    return (
      <div className="blockImage">
        {imageLink ? (
          <a href={imageLink}>
            <img src={image} alt={imageAlt} />
          </a>
        ) : (
          <img src={image} alt={imageAlt} />
        )}
      </div>
    );
  }

  renderBlockTitle(title) {
    if (!title) {
      return null;
    }

    return (
      <h2>
        <MarkdownBlock>{title}</MarkdownBlock>
      </h2>
    );
  }

  render() {
    return (
      <div className="gridBlock">
        {this.props.contents.map(this.renderBlock, this)}
      </div>
    );
  }
}

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            {props.children}
          </div>
        </div>
      </div>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTagline = props => (
      <div className="projectTagline">
        {props.tagline}
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <div className="row">
            <div className="column">
              <div className="projectDetails">
                <ProjectTagline tagline={siteConfig.tagline} />
                <div className="projectDescription">
                  Metamapper is a free &amp; open-source metadata management platform
                  that aims to make it easier to share data and its context
                  across your organization.
                </div>
                <PromoSection>
                  <Button href="/docs/metadata-management">Documentation</Button>
                  <Button href={siteConfig.repoUrl}>Metamapper on Github</Button>
                </PromoSection>
                <div className="github-buttons">
                  <a
                    className="github-button"
                    href="https://github.com/getmetamapper/metamapper"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star getmetamapper/metamapper on GitHub"
                  >
                    Star
                  </a>
                  <a
                    className="github-button"
                    href="https://github.com/getmetamapper/metamapper/subscription"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Watch getmetamapper/metamapper on GitHub"
                  >
                    Watch
                  </a>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="projectImage">
                <img src="/img/splash.png" />
              </div>
            </div>
          </div>
        </div>
      </SplashContainer>
    );
  }
}

// A toolkit to document your data systems

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const pageUrl = page => baseUrl + (language ? `${language}/` : '') + `docs/${page}`;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Datastores = () => {
      const datastores = [
        {
          alt: 'SQL Server',
          image: '/img/datastores/sqlserver.png',
          infoLink: 'https://www.microsoft.com/en-us/sql-server/',
        },
        {
          alt: 'Oracle',
          image: '/img/datastores/oracle.png',
          infoLink: 'https://www.oracle.com/database/',
        },
        {
          alt: 'MySQL',
          image: '/img/datastores/mysql.png',
          infoLink: 'https://www.mysql.com/',
        },
        {
          alt: 'AWS Redshift',
          image: '/img/datastores/redshift.png',
          infoLink: 'https://aws.amazon.com/redshift/',
        },
        {
          alt: 'Snowflake',
          image: '/img/datastores/snowflake.png',
          infoLink: 'https://www.snowflake.com/',
        },
        {
          alt: 'PostgreSQL',
          image: '/img/datastores/postgresql.png',
          infoLink: 'https://www.postgresql.org/',
        },
      ]

      const showcase = datastores
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.alt} title={user.alt} />
          </a>
        ));

      return (
        <div className="productShowcaseSection paddingBottom">
          <div className="productShowcaseInner">
            <h2>Supported Datastores</h2>
            <p>
              Metamapper <a href={pageUrl('metadata-management--supported-datastores')}>supports these datastores</a> and is constantly adding more.
            </p>
            <div className="logos">{showcase}</div>
          </div>
        </div>
      );
    };

    const DataCatalogFeature = () => (
      <Block id="feature-catalog">
        {[
          {
            caption: 'Data Democratization',
            title: 'Automatic data cataloging',
            content: (
              <span>
                <p>
                  Metamapper <a href={pageUrl('metadata-management--schema-inspection')}>crawls and compiles</a> your
                  assets into a single comprehensive data catalog. Track data stewardship, governance, and much more.
                </p>
                <p>Goodbye, spreadsheets!</p>
              </span>
            ),
            image: `${baseUrl}img/features/feature-1.png`,
            imageAlign: 'right',
          },
        ]}
      </Block>
    );

    const SearchFeature = () => (
      <Block id="feature-search">
        {[
          {
            caption: 'Data Discovery',
            title: 'Supercharged search',
            content: (
              <span>
                <p>
                  Use <a href={pageUrl('metadata-management--search')}>full-text search</a> to discover
                  data assets across all of your connected datastores in nanoseconds.
                </p>
                <p>It's like Google, but for your data.</p>
              </span>
            ),
            image: `${baseUrl}img/features/feature-2.png`,
            imageAlign: 'left',
          },
        ]}
      </Block>
    );

    const KnowledgeFeature = () => (
      <Block id="feature-knowledge">
        {[
          {
            caption: 'Data curation',
            title: 'Crowdsource your documentation',
            content: (
              <span>
                <p>
                  Attach notes and <a href={pageUrl('metadata-management--custom-fields')}>custom properties</a> to
                  any data asset. Business users can explore the catalog, ask questions, and get answers.
                </p>
                <p>Metamapper is a living document of your data.</p>
              </span>
            ),
            image: `${baseUrl}img/features/feature-3.png`,
            imageAlign: 'right',
          },
        ]}
      </Block>
    );

    return (
      <div className="home">
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <DataCatalogFeature />
          <SearchFeature />
          <KnowledgeFeature />
          <Datastores />
        </div>
      </div>
    );
  }
}

Index.description = 'Metamapper is a free & open-source metadata management platform and data catalog ' +
                    'that aims to make it easier to share data and its context across your organization.';

module.exports = Index;
