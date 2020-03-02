(function($) {
    $.fn.SeolynSlider = function(options) {

        var defaults = {
            el: ".slider",
            duration: 300,
            delay: 3000,
            is_play: true,
            fade: false,
            item: '.item',
            prev_btn: '.prev_btn',
            next_btn: '.next_btn',
            play_btn: '.play_btn',
            stop_btn: '.stop_btn',
            pager: '.pager'
        }

        var self = $.extend(this, defaults, options || {});

        var el = this;

        var item = el.find(self.item);

        var index = 0;

        var current = 0;

        var prev_btn = el.find(self.prev_btn);

        var next_btn = el.find(self.next_btn);

        var play_btn = el.find(self.play_btn);

        var stop_btn = el.find(self.stop_btn);

        var pager = el.find(self.pager);

        var interval;

        var is_play = self.is_play;

        var duration = self.duration;

        var delay = self.delay;

        var fade = self.fade;


        if (fade) {

            item.eq(index).css({
                top: 0,
                left: 0
            });

        } else {

            item.eq(index).css({
                top: 0,
                left: 0
            });

        }

        play_btn.on('click', function() {

            is_play = true;

            self.auto();

            play_btn.hide();
            stop_btn.show().focus();
        });

        stop_btn.on('click', function() {

            is_play = false;

            self.stop();

            stop_btn.hide();
            play_btn.show().focus();
        });

        prev_btn.on('click', function() {
            if (!item.is(':animated')) {
                self.move(-1);
            }
        });

        next_btn.on('click', function() {
            if (!item.is(':animated')) {
                self.move(1);
            }
        });

        pager.on('click', function() {
            var pagerIndex = $(this).index();
            self.moveIndex(pagerIndex);
        });

        item.find('a').on('focus', function() {

            is_play = false;

            var pagerIndex = $(this).parents('li').index();
            self.moveIndex(pagerIndex);
        });

        self.moveIndex = function(pagerIndex) {
            if (!item.is(':animated')) {
                if (pagerIndex > current) {
                    self.moveNext(pagerIndex);
                } else if (pagerIndex < current) {
                    self.movePrev(pagerIndex);
                }

                self.activePagerItem(pagerIndex);
            }
        }

        self.movePrev = function(moveIndex) {

            self.stop();

            item.eq(current).animate({
                left: '100%'
            }, duration);
            item.eq(moveIndex).css({
                left: '-100%'
            }).animate({
                left: '0'
            }, duration, function() {
                if (is_play) {
                    self.auto();
                }
            });
        }

        self.moveNext = function(moveIndex) {

            self.stop();

            item.eq(current).animate({
                left: '-100%'
            }, duration);
            item.eq(moveIndex).css({
                left: '100%'
            }).animate({
                left: '0'
            }, duration, function() {
                if (is_play) {
                    self.auto();
                }
            });
        }

        self.activePagerItem = function(activeIndex) {
            pager.eq(activeIndex).addClass('active').siblings().removeClass('active');
            item.eq(activeIndex).addClass('active').siblings().removeClass('active');
            current = activeIndex;
        }

        self.move = function(dir) {

            index = current + dir;

            if (0 > index) {
                index = item.length - 1;
            }

            if (index > item.length - 1) {
                index = 0;
            }

            if (dir == -1) {
                self.movePrev(index);
            } else {
                self.moveNext(index);
            }

            self.activePagerItem(index);
        }

        self.auto = function() {
            interval = setInterval(function() {
                self.move(1);
            }, delay);
        }

        self.stop = function() {
            clearInterval(interval);
        }

        if (is_play) {
            play_btn.hide();
            self.auto();
        } else {
            stop_btn.hide();
            self.stop();
        }

        return this;

    };
})(jQuery);
