const iconBtn = document.querySelector('.icon-btn span')
const settingsContent = document.querySelector('.settings-content')
const colorLis = document.querySelectorAll('.settings-container .box li')
const yesNoBtn = document.querySelectorAll('.random-bg span')
const aboutImg = document.querySelector('.about-us .about-img')
const skillsDiv = document.querySelector('.skills')
const allBollets = document.querySelectorAll('.bullets-nav .bullet')
const mainHeadLinks = document.querySelectorAll('.main-head ul a')
const rightBullets = document.querySelector('.bullets-nav')
const handleBulletSpan = document.querySelectorAll('.option-box .bullets-handle span')



// change active  class on click 
function addActiveClass(el){
    el.target.parentElement.querySelectorAll('.active').forEach(li=>{
        li.classList.remove('active')
    })
    el.target.classList.add('active')
}

// icon button on click function
iconBtn.onclick = function(){
    // toggle open class in main settings container
    settingsContent.classList.toggle('open')
    // add animation in icon button using rotate
    iconBtn.classList.toggle('rotate')
}


// change main theme color
if(localStorage.getItem('themeColor')){
    document.documentElement.style.setProperty('--main-color',localStorage.getItem('themeColor'))
    colorLis.forEach(li=>{
        li.classList.remove('active')
        li.dataset.color == localStorage.getItem('themeColor')? li.classList.add('active'):''
    })
}
colorLis.forEach(li=>{
    li.onclick = function(e){
        document.documentElement.style.setProperty('--main-color',this.dataset.color)
        localStorage.setItem("themeColor", this.dataset.color);
        addActiveClass(e)
    }
})

let randomSwitch = true
if(localStorage.getItem('randomSwitch') != null){
    randomSwitch = JSON.parse(localStorage.getItem('randomSwitch'))
    if(!randomSwitch){
        document.querySelector('.no').classList.add('active')
        document.querySelector('.yes').classList.remove('active')
    }
}
let randomInt

yesNoBtn.forEach(b=>{
    b.addEventListener('click',function(event){
        b.parentElement.querySelector('.active').classList.remove('active')
        event.target.classList.add('active')
        if(this.classList.contains('no')){
            clearInterval(randomInt)
            randomSwitch = false
            localStorage.setItem('randomSwitch',false)
        }else if(this.classList.contains('yes')){
            clearInterval(randomInt)
            randomSwitch = true
            localStorage.setItem('randomSwitch',true)
        }
        randomIntFunction()
    })
})


function randomIntFunction(){
    if(randomSwitch == true){
        randomInt = setInterval(()=>{
            let rand = Math.ceil(Math.random() * 4)
            document.querySelector('.landing-page').
            style.backgroundImage = `url(images/${rand}.jpg)`
        },10000)    
    }
}
randomIntFunction()

let countImg = 0
setInterval(()=>{
    countImg == 12 ?countImg = 1:countImg
    aboutImg.style.opacity = '0'
    setTimeout(() => {
        aboutImg.setAttribute('src','images/ab'+countImg+'.png')
        // setTimeout(()=> aboutImg.style.opacity = '1' ,100)
        aboutImg.onload = ()=> aboutImg.style.opacity = '1'
    }, 500);
    countImg++
},2000)


window.onscroll = function(){
    document.querySelectorAll('.skill-line span').forEach(span=>{
        if(this.pageYOffset > (skillsDiv.offsetTop + skillsDiv.offsetHeight - window.innerHeight)){
            span.style.width = span.dataset.width
        }else{
            span.style.width = 0
        }
    })

}


const galleryImgs = document.querySelectorAll('.gallery .box img')

galleryImgs.forEach(img => {
    img.addEventListener('click',function(){
        createPopup(img)
    })
})

function createPopup(img)
{
    // overley
    const overly = document.createElement('div');
    overly.classList.add('overly')
    document.body.appendChild(overly)
    // popup
    const popup = document.createElement('div');
    popup.classList.add('popup-gallery')
    document.body.appendChild(popup)
    // create img title
    let title = document.createElement('h3')
    let text = img.alt || 'Title Null' 
    title.textContent = text;
    popup.appendChild(title)
    // create Image
    const imgN = document.createElement('img')
    imgN.src = img.src
    popup.appendChild(imgN)
    // create close btn
    let span = document.createElement('span')
    span.textContent = 'x'
    span.classList.add("close-img")
    popup.appendChild(span)
}

document.addEventListener('click',e=>{
    if (e.target.classList.contains('close-img')) {
        document.querySelector('.popup-gallery').remove()
        document.querySelector('.overly').remove()
    }
})

// bullet scroll
function scrollLink(links){
    links.forEach(link=>{
        link.addEventListener('click', (ev) => {
            ev.preventDefault()
            document.querySelector(ev.target.dataset.section).scrollIntoView({
                behavior:"smooth"
            })
        })
    })
}
scrollLink(allBollets)
scrollLink(mainHeadLinks)


// show and hade right bullets
let storageBullet = localStorage.getItem('showRightBullets')
if(storageBullet != null){
    handleBulletSpan.forEach(span=>{
        span.classList.remove('active')
    })
    if (storageBullet == 'block') {
        rightBullets.style.display = 'block';
        document.querySelector('.option-box .bullets-handle span.yes').classList.add('active')
    }else{
        rightBullets.style.display = 'none';
        document.querySelector('.option-box .bullets-handle span.no').classList.add('active')
    }
} 
handleBulletSpan.forEach(span=>{
    span.addEventListener('click',function(e){
        if(e.target.dataset.display === 'show'){
            rightBullets.style.display = 'block';
            localStorage.setItem('showRightBullets','block')
        }else{
            rightBullets.style.display = 'none'
            localStorage.setItem('showRightBullets','none')
        }
        addActiveClass(e)
    })
})


// reset options
document.querySelector('.reset-option').onclick = function(){
    localStorage.removeItem('themeColor')
    localStorage.removeItem('showRightBullets')
    localStorage.removeItem('randomSwitch')
    // reload
    window.location.reload()
}

// toggle menu 
document.querySelector('.button').onclick = function(e){
    e.stopPropagation()

    this.classList.toggle("active")
    document.querySelector('.links-contant > ul').classList.toggle("open")
}

document.querySelector('.links-contant > ul').onclick = (e)=> e.stopPropagation()

document.addEventListener('click',(ev)=>{
    if(ev.target !== document.querySelector('.links-contant > ul') && ev.target !== document.querySelector('.button')){
        document.querySelector('.button').classList.remove("active")
        document.querySelector('.links-contant > ul').classList.remove("open")
    }
})