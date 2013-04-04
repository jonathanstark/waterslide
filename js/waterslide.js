(function($){
    $.fn.waterslide = function(options){
        var foo
        ,   curr
        ,   defaults
        ,   next
        ,   prev
        ,   settings
        ,   slides
        ,   target
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

        // Cache a reference to the slides
        slides = target.find('li');

        // Remove css rules for non-javascript environment fallbacks (progressive enhancement FTW!)
        target.removeClass(settings.noJsClass);

        // TODO: Check for waterslide class in HTML source

        // Apply css rules required for plugin operation
        target.addClass('waterslide');

        // Apply user defined css rules
        target.addClass(settings.yesJsClass);

        // Init vars
        curr = settings.initialSlideNumber-1;
        prev = (curr == 0) ? slides.length-1 : curr-1;
        next = (curr == slides.length-1) ? 0 : curr+1;

        // Add controls
        target.append('<a class="controls prev" href="#">Prev</a>');
        target.append('<a class="controls next" href="#">Next</a>');

        // Show first slide
        $(slides[curr]).show();

    }
}(jQuery));
