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
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks() {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    let html = '';
    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);

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

  function generateTags() {
    /* find all articles */
    const allArticles = document.querySelectorAll('article');
    console.log(allArticles);

    /* START LOOP: for every article: */
    for (let article of allArticles) {
      
      /* find tags wrapper */
      const wrapper = document.querySelector(optArticleTagsSelector);
      console.log(wrapper);
      
      /* make html variable with empty string */
      let html = '';
      wrapper.innerHTML = '';
      
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      
      /* split tags into array */
      const articleTagsSplit = articleTags.split(' ');
      console.log(articleTagsSplit);
      
      /* START LOOP: for each tag */
      for (let tag of articleTagsSplit) {
        console.log(tag);  
        
        /* generate HTML of the link */
        const tagsHTML = '<li><a href="' + tag + '">cat</a></li>'
        console.log(tagsHTML);
        
        /* add generated code to html variable */
        html = html + tagsHTML;
        
      
        /* END LOOP: for each tag */
      }
      
      /* insert HTML of all the links into the tags wrapper */
      optArticleTagsSelector.innerHTML = html;
    
      /* END LOOP: for every article: */
    }
  }
  
  generateTags();

  function tagClickHandler(event){
    
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
  
    /* find all tag links with class active */
  
    /* START LOOP: for each active tag link */
  
      /* remove class active */
  
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    /* START LOOP: for each found tag link */
  
      /* add class active */
  
    /* END LOOP: for each found tag link */
  
    /* execute function "generateTitleLinks" with article selector as argument */
  }

  
  function addClickListenersToTags() {
    /* find all links to tags */
  
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();

}
