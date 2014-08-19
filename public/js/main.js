$(function() {
    var scrollToLoad = function() {
        var topToTop   = $(window).scrollTop();
        if (topToTop > 91 && $('.rss-nav-fixed').hasClass('hidden')) $('.rss-nav-fixed').removeClass('hidden');
        else if (topToTop < 91 && !$('.rss-nav-fixed').hasClass('hidden')) $('.rss-nav-fixed').addClass('hidden');

        if (!$('.feeds')) return false;

        var loadingEl  = $('.loading');
        var domHeight  = $(document).height();
        var viewHeight = $(window).height();
        var loadOffset = 200;

        if(!loadingEl.hasClass('hidden')) return;
        if(domHeight - loadOffset > topToTop + viewHeight) return;

        var scope = angular.element($(".feeds")).scope();

        loadingEl.removeClass('hidden');

        var addDisplay = function(){
            $('.loading').addClass('hidden');
        };

        var doAddFeed = function(){
          scope.add(addDisplay);
        };

        scope.$apply(doAddFeed);
    };

    $(window).scroll(scrollToLoad);


    function hotkey() {
        var key = window.event.keyCode; 
        if (key === 74) {
            var target = $('.active').next();
            if (target && target[0]) unselectAdapter(target[0]);
        }
        else if (key === 75) {
            var target = $('.active').prev();
            if (target && target[0]) unselectAdapter(target[0]);
        }
    }

    document.onkeydown = hotkey;

    var getUnselect = function(target) {
        target = target.parentNode;
        if (!target) return false;
        var classStr = target.className;
        var classArray = classStr.split(' ');
        if (classArray.indexOf('feed') > -1) return target;
        return getUnselect(target);
    }

    $('body').on('click', '.feed', function(e) { 
        e.preventDefault();
        var target = getUnselect(e.target);
        if (!target) return false;
        unselectAdapter(target); 
    });

    var unselectAdapter = function(target) {
        var classStr = target.className;
        var classArray = classStr.split(' ');
        if (classArray.indexOf('unselect') === -1) {
            target.className = target.className.replace(/\bactive\b/,'');
            return target.className = target.className + ' unselect';
        }
        $('.feed').addClass('unselect');
        $('.active').removeClass('active');
        target.className = target.className.replace(/\bunselect\b/,'');
        target.className = target.className + ' active'; 
        $('body').animate({scrollTop:target.offsetTop - 50},0);
    }
    $('body').on('click', '.feed a', function(e) { 
        e.preventDefault();
        var win = window.open(e.target.parentNode.href, '_blank');
        win.focus();
    });
});
