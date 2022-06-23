document.addEventListener("DOMContentLoaded", function(){
    //querySelector() を使って body 要素を取得
    document.querySelector('body').setAttribute('ontouchstart', '');

    //引用テキスト
    const quoteText = document.querySelectorAll(".quoteText");
    var quoteTextNum = quoteText.length;
    const rewriteText = document.querySelectorAll(".rewriteText");
    
    //テキストの変換
    function translateQuote(targetText, targetBox) {
        var targetTextContent = targetText.textContent;
        // var targetTextContent = targetText.slice(0,10);
        var insertText = "";
        //一文字ずつ分解＆<span>タグの挿入
        for(const character of targetTextContent) {
            insertText += `<span>${character}</span>`;
        }
        //<p class="rewriteText">内に挿入
        targetBox.innerHTML = insertText;
    }
        //全テキストの変換
        for (let i=0; i<quoteTextNum; i++) {
            translateQuote(quoteText[i],rewriteText[i]);
        }
    //mediaQuery
    var windowWidth = window.innerWidth;
    const mediaQuery450 = window.matchMedia("(min-width: 450px)");
    const mediaQuery850 = window.matchMedia("(min-width: 850px)");

    function handleMediaQuery(mediaQuery) {
        if (mediaQuery.matches) {
            //larger
             return true;
        } else {
            return false;
        }
    }

    mediaQuery450.addListener(handleMediaQuery);
    mediaQuery850.addListener(handleMediaQuery);
    handleMediaQuery(mediaQuery450);
    handleMediaQuery(mediaQuery850);
    // console.log(handleMediaQuery(mediaQuery450));
    // console.log(handleMediaQuery(mediaQuery850));


    //hover,quoteBox
    const hover = document.querySelectorAll(".hover");
    const quoteBox = document.querySelectorAll(".quote");
    const main = document.querySelector("main");
    var dist;
    var mainRight = main.getBoundingClientRect().right;

    
    function mainHeightReplace() {
        //grid size
        var gridComputedStyle = getComputedStyle(grid);
        var gridRowsCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
        // var gridInterval = quoteBox[1].getBoundingClientRect().left- quoteBox[0].getBoundingClientRect().right;
        var gridGap;
            if (handleMediaQuery(mediaQuery450) == false && handleMediaQuery(mediaQuery850) == false) {
                //450以下
                dist = 10;
                gridGap = 25;
                windowWidth = window.innerWidth;
            } else if (handleMediaQuery(mediaQuery450) == true && handleMediaQuery(mediaQuery850) == false) {
                //850以下
                dist = 20;
                gridGap = 50;
                windowWidth = window.innerWidth;
            } else {
                dist = 30;
                gridGap = 75;
                windowWidth = window.innerWidth;
            }
        var mainHeight = quoteBox[0].offsetHeight * gridRowsCount + gridGap * (gridRowsCount - 1);
        var mainMargin = quoteBox[0].getBoundingClientRect().left;
        
        main.style.height = mainHeight + "px";
        main.style.marginBottom = mainMargin + "px";
        
        // console.log(gridRowsCount);
        // console.log(gridGap);
        // console.log(quoteBox[0].offsetHeight);
        }

        mainHeightReplace();
    
    function hoverPosition(hoverTarget, quoteBoxTarget) {
        //横座標用
        var hoverTargetWidth = hoverTarget.getBoundingClientRect().width;
        var quoteBoxTargetWidth = quoteBoxTarget.getBoundingClientRect().width;
        var hoverLeft = (hoverTargetWidth - quoteBoxTargetWidth) / 2;
        var quoteBoxTargetLeft = quoteBoxTarget.getBoundingClientRect().left;
        var quoteBoxTargetRight = quoteBoxTarget.getBoundingClientRect().right;
        
        //縦座標用
        var hoverTargetHeight = hoverTarget.getBoundingClientRect().height;
        var quoteBoxTargetTop = quoteBoxTarget.getBoundingClientRect().top;
        var quoteBoxTargetHeight = quoteBoxTarget.getBoundingClientRect().height;
        var hoverTop = hoverTargetHeight + dist;
        
        //hover時の横座標計算：場合分け
        if (handleMediaQuery(mediaQuery450) == false) {
            hoverTarget.style.left = -quoteBoxTargetLeft + (windowWidth - hoverTargetWidth)/2 + "px";
        } else {
            if (quoteBoxTargetLeft <= hoverLeft) {
                hoverTarget.style.left = -dist + "px";
            } else if ((mainRight - quoteBoxTargetRight) <= hoverLeft) {
                hoverTarget.style.left =  quoteBoxTargetWidth- hoverTargetWidth  +dist + "px";
            } else {
                hoverTarget.style.left = -hoverLeft + "px";
            }
        }
        
        //hover時の縦座標計算：場合分け
        if (quoteBoxTargetTop <= hoverTop) {
            hoverTarget.style.top = quoteBoxTargetHeight + dist + "px";
        } else {
            hoverTarget.style.top = -hoverTop + "px";
        }        
    }
    window.addEventListener('resize', function(){
        mainHeightReplace();
      });

    for (let i=0; i<quoteTextNum; i++) {
        quoteBox[i].addEventListener("mouseover", function( event ) {
            hoverPosition(hover[i], quoteBox[i]);
          }, false);
    }
}, false);