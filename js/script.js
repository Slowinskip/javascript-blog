{
  'use strict';

  const titleClickHandler = function (event) {
    console.log('Link was clicked!');
    const clickedElement = this;
    event.preventDefault();

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    
    /* [DONE] get 'href' attribute from the clicked link */
    const getHref = clickedElement.getAttribute('href');
    console.log('Href: ' + getHref);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(getHref);
    console.log(correctArticle);

    /* [DONE] add class 'active' to the correct article */

    correctArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);

    titleList.innerHTML = '';

    let html = '';
    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    for (let article of articles) {

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('ArticleId: ' + articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);
    
      /* get the title from the title element */

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
            
      /* insert link into titleList */
      html = html + linkHTML;
    }
        
    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}
