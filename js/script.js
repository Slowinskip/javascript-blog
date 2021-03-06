{
  'use strict';
  
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),  };
  
  const opts = {
    articleSelector:  '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post .post-author',
    tagsListSelector: '.tags.list',
    cloudClassCount: '5',
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors.list'
  };

  const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    
    /* [DONE] get 'href' attribute from the clicked link */
    const getHref = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(getHref);

    /* [DONE] add class 'active' to the correct article */

    correctArticle.classList.add('active');
  };


  

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(opts.titleListSelector);
    let html = '';
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    for (let article of articles) {

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    
      /* get the title from the title element */

      /* [DONE] create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);            
      /* insert link into titleList */
      html = html + linkHTML;
    }
        
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
  
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  
  }

  generateTitleLinks();


  // eslint-disable-next-line no-inner-declarations
  function calculateTagsParams (allTags) {
    const params = {
      max: 0, 
      min: 99999
    };
    for(let tag in allTags){
      if(allTags[tag] > params.max){
        params.max = allTags[tag];
      }
      if(allTags[tag] < params.min){
        params.min = allTags[tag];
      }
    }

    return params;
  }
  
  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.CloudClassCount - 1) + 1 );
    return (opts.CloudClassPrefix + classNumber);  

  }

  // eslint-disable-next-line no-inner-declarations 
  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    
    let allTags = {};
    
    /* find all articles */
    const allArticles = document.querySelectorAll(opts.articleSelector);

    /* START LOOP: for every article: */
    for (let article of allArticles) {
      
      /* find tags wrapper */
      const wrapper = article.querySelector(opts.articleTagsSelector);
      
      /* make html variable with empty string */
      let html = '';
      
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsSplit = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsSplit) {
        
        /* generate HTML of the link */
        // const tagsHTML = '<li><a href ="#tag-' + tag + '">' + tag + '</a></li>';
        const linkHTMLData = {id: tag, tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;
        
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        
        
        /* END LOOP: for each tag */
      }
      
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html; 
    
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opts.tagsListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
  
  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const clickedTags = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let clickedTag of clickedTags) {
      /* add class active */
      clickedTag.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  
  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags() {
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let allTagLink of allTagsLinks) {
      /* add tagClickHandler as event listener for that link */
      allTagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  // eslint-disable-next-line no-inner-declarations
  function generateAuthors () {
    let allAuthors = {};
    const allArticle = document.querySelectorAll(opts.articleSelector);

    for (let author of allArticle) {
      const wrapper = author.querySelector(opts.articleAuthorSelector);

      let html = '';
      let by = 'by ';

      const articleAuthors = author.getAttribute('data-author');

      // const authorHTML = '<a href ="#author-' + articleAuthors + '">' + articleAuthors + '</a>';
      const authorHTML = {
        author: articleAuthors,
      };
      const authorLink = templates.authorLink(authorHTML);

      html = html + authorLink;

      wrapper.innerHTML = by + html;      

      if(!allAuthors[articleAuthors]){
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }
    }

    const authorList = document.querySelector(opts.authorsListSelector);
    
    const allAuthorsData = {authors: []};
    
    for (let author in allAuthors) {
      // allAuthorsHTML +='<li><a href="#author-' +author +'"><span>' + author +' (' +allAuthors[author] +')</span></a></li> ';
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
      
    }
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    
  }
  generateAuthors();

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler (event) {
    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    
    const author = href.replace('#author-','');

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    
    for (let activeAuthor of activeAuthors){
      activeAuthor.classList.remove('active');
    }

    const clickedAuthors = document.querySelectorAll('a[href^="#author-' + href + '"]');

    for (let clickedAuthor of clickedAuthors) {
      clickedAuthor.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors () {
    const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
    
    for (let allAuthorLink of allAuthorsLinks) {
      allAuthorLink.addEventListener('click', authorClickHandler);
    }
    const authorLinksList = document.querySelectorAll('.authors.list a');

    for (let authorLinkList of authorLinksList) {
      authorLinkList.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();

}
