window.onload = addNavLinks;

function addNavLinks(){
    var links = [
        { text:"Home", href: "index.html"},
        { text: "About us", href:"aboutUs.html"},
        { text:"Offers", href:"offers.html"},
        { text:"Cart", href:"shopingCart.html"}
    ];
    
    let firstChild = document.body.firstChild

    let div = document.createElement('div')
    div.id="navDiv"
    document.body.insertBefore(div, firstChild)

    let navbar = document.createElement('nav')
    navbar.id = "navbar"

    let line = document.createElement('hr')


    
    div.appendChild(navbar)
    div.appendChild(line)

    
    links.forEach(function(link){
        var a = document.createElement('a');
        a.appendChild(document.createTextNode(link.text));
        a.href = link.href;
        navbar.appendChild(a);
    });

    let shadowOverlay = document.createElement('div')
    shadowOverlay.id = 'shadowOverlay'
    document.body.appendChild(shadowOverlay)
}

