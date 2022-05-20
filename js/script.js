{
  'use strict';

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


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    let html = '';
    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
      /* get the title from the title element */

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            
      /* insert link into titleList */
      html = html + linkHTML;
    }
        
    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    /* find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of allArticles) {
      
      /* find tags wrapper */
      const wrapper = article.querySelector(optArticleTagsSelector);
      
      /* make html variable with empty string */
      let html = '';
      
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      
      /* split tags into array */
      const articleTagsSplit = articleTags.split(' ');
      
      /* START LOOP: for each tag */
      for (let tag of articleTagsSplit) {
        
        /* generate HTML of the link */
        const tagsHTML = '<li><a href ="#tag-' + tag + '">' + tag + '</a></li>';
        
        /* add generated code to html variable */
        html = html + tagsHTML;
        
      
        /* END LOOP: for each tag */
      }
      
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html; 
    
      /* END LOOP: for every article: */
    }
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
    const clickedTags = document.querySelectorAll('a.active[href^="#tag-"]');
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
    const allArticle = document.querySelectorAll(optArticleSelector);

    for (let author of allArticle) {
      const wrapper = author.querySelector(optArticleAuthorSelector);

      let html = '';
      let by = 'by ';

      const articleAuthors = author.getAttribute('data-author');

      const authorHTML = '<a href ="#author-' + articleAuthors + '">' + articleAuthors + '</a>';

      html = html + authorHTML;

      wrapper.innerHTML = by + html;      
    }
  }
  generateAuthors();
}