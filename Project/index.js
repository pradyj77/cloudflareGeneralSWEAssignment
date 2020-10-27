addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */


const myUrl = "https://static-links-page.signalnerve.workers.dev"

var linkObj1 = {name: "USC", URL: "https://www.usc.edu/"};
var mylinkObj1 = JSON.stringify(linkObj1);
var linkObj2 = {name: "USCard Services", URL: "https://mycard.usc.edu/"};
var mylinkObj2 = JSON.stringify(linkObj2);
var linkObj3 = {name: "Cloudflare", URL:"https://www.cloudflare.com/"};
var mylinkObj3 = JSON.stringify(linkObj3);
var linkObj4 = {name: "Cloudflare Careers", URL:"https://www.cloudflare.com/careers/"};
var mylinkObj4 = JSON.stringify(linkObj4);

var myLinksArray = [mylinkObj1, mylinkObj2, mylinkObj3, mylinkObj4];

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    // Your code
    var i;
    
    for (i = 0; i < this.links.length; i++) {
      element.append(`<a href=${JSON.parse(this.links[i]).URL}>${JSON.parse(this.links[i]).name}</a>`, { html: true })
    }  
    }
}

class removeDisplay {
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  
  async element(element) {
    // Your code
    element.setAttribute(this.attributeName, this.attributeName.display === 'none' ? '' : '')

    }
}

class addAvatar{
  constructor(src){
    this.src = src
  }

  async element(element){
      //code
      element.setAttribute(this.src, "https://workhound.com/wp-content/uploads/2017/05/placeholder-profile-pic.png")
  }
}


class addUserName{
  constructor(temp){
    this.temp = temp
  }
  async element(element){
    element.append("PradeepJagtap")
  }
}



class extraCreditSocial{
    constructor(attributeName){
      this.attributeName = attributeName
    }

    async element(element){
      element.setAttribute(this.attributeName, this.attributeName.display === 'none' ? '' : '')

      element.append(`<a href="https://twitter.com/Jagtap_Prady"><svg><image href="https://simpleicons.org/icons/twitter.svg" width="50" height="50"/></svg></a>`, { html: true })
      element.append(`<a href="https://www.facebook.com/pradeep.jagtap.71/"><svg><image href="https://simpleicons.org/icons/facebook.svg" width="50" height="50"/></svg></a>`, { html: true })
      element.append(`<a href="www.linkedin.com/in/pradeep-jagtap"><svg><image href="https://simpleicons.org/icons/linkedin.svg" width="50" height="50"/></svg></a>`, { html: true })
       

    }
}

class TitleChanger {
  constructor(attributeName) {
    this.attributeName = attributeName;
  }

  element(element) {
    element.setInnerContent("Pradeep Balasaheb Jagtap");
  }
}

class changeBackGround {
  constructor(attributeName) {
    this.attributeName = attributeName
  }

  element(element) {
    element.setAttribute(this.attributeName, 'background-color: #807977;')
  }
}



async function handleRequest(request) {

var url_array = request.url.split("/")
if (url_array[url_array.length - 1] == "links"){
  return new Response(myLinksArray, {
    headers: { 'content-type': 'application/json;charset=UTF-8' },
  })
}	else {

  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }
  const res = await fetch(myUrl, init);
  
  const myRewriter = new HTMLRewriter()
            .on('div#links', new LinksTransformer(myLinksArray))
            .on('div#profile', new removeDisplay('style'))
            .on('img#avatar', new addAvatar('src'))
            .on('h1#name', new addUserName('h1#name'))
            .on('div#social', new extraCreditSocial('style'))
            .on('title', new TitleChanger('title'))
            .on('body', new changeBackGround('style'))

  return myRewriter.transform(res)
}

}
