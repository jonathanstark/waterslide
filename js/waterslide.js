(function($){
    $.fn.waterslide = function(options){
        var foo
            , curr
            , defaults
            , images
            , next
            , prev
            , settings
            , slides
            , target
        ;

        // Define sensible defaults
        defaults = {
            noJsClass: 'no-js',
            yesJsClass: 'yes-js',
            initialSlideNumber: 1
        };

        // Merge incoming options with defaults to determine settings
        settings = $.extend(defaults, options);

        // Store a reference to the jQuery object that this function was called on
        target = this;

        // Remove css rules for non-javascript environment fallbacks (progressive enhancement FTW!)
        target.removeClass(settings.noJsClass);

        // Cache a reference to the slides
        slides = target.find('li');

        // Cache a reference to the images
        images = target.find('.image img');

        // Apply css rules required for plugin operation
        target.addClass('waterslide');

        // Apply any user defined css rules
        target.addClass(settings.yesJsClass);

        // Set background images on LIs
        for (var i = 0, max = images.length; i < max; i++) {
            var slide = slides[i];
            var image = images[i];
            $(slide).css('background-image', 'url('+image.src+')');
        }

        // Add thumbnails
        var html = '<div class="thumbnails">';
        for (var i = 0, max = images.length; i < max; i++) {
            var image = images[i];
            var src = ($(image).data('thumb')) ? $(image).data('thumb') : image.src;
            html+='<a class="thumbnail" data-index='+i+' href="#"><img src="'+src+'" /></a>';
        }
        html+='</div>';
        target.append(html);

        // Cache a reference to the thumbnails
        thumbnails = target.find('.thumbnails a');

        // Add controls
        target.append('<div class="controls"><a class="prev" href="#">Previous</a><a class="next" href="#">Next</a><a class="exit" href="#">Exit</a></div>');

        // Attach listeners
        target.find('a.exit').on('click', handleExitClick);
        target.find('a.next').on('click', goToNextSlide);
        target.find('a.prev').on('click', goToPreviousSlide);
        target.find('a.thumbnail').on('click', handleThumbnailClick);
        target.find('li').on('click', handleSlideClick);

        // Show first slide
        goToSlide(0);

        // FUNCTIONS

        function goToNextSlide(e) {
            e.preventDefault();
            var next = (curr == slides.length-1) ? 0 : curr+1;
            goToSlide(next);
        }

        function goToPreviousSlide(e) {
            e.preventDefault();
            var prev = (curr == 0) ? slides.length-1 : curr-1;
            goToSlide(prev, 'back');
        }

        function goToSlide(slideIndex, direction) {
            var direction = direction || 'forward';
            curr = slideIndex;
            prev = (curr == 0) ? slides.length-1 : curr-1;
            next = (curr == slides.length-1) ? 0 : curr+1;

            // Set/unset active classes
            target.find('.active').removeClass('active');
            $(slides[curr]).addClass('active');
            $(thumbnails[curr]).addClass('active');
        }

        function handleExitClick(e) {
            e.preventDefault();
            target.removeClass('fullscreen hide-chrome');
        }

        function handleSlideClick(e) {
            e.preventDefault();
            if (target.hasClass('fullscreen')) {
                target.toggleClass('hide-chrome');
            } else {
                target.addClass('fullscreen');
            }
        }

        function handleThumbnailClick(e) {
            e.preventDefault();
            targetIndex = $(this).data('index');
            if (targetIndex != curr) {
                if (targetIndex > curr) {
                    goToSlide(targetIndex);
                } else {
                    goToSlide(targetIndex, 'back');
                }
            }
        }

    }
}(jQuery));
