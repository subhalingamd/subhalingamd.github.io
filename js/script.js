(function($) {


    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Hide the menu once clicked if mobile
        if ($('header .menu-btn').is(':checked')) {
            $('header .menu-btn').attr('checked',false);
        }

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - $('header').height()
        }, 750);

        
    });

    // Header modifications while scrolling and opening/closing
    function style_header() {
        if ($(document).scrollTop() > $('#lead-content>h1').offset().top ) {
          $('header').css({"background-color":"#000","border-bottom":"2.5px solid #3498db"});
          $('.logo').css("visibility","visible");
        } 
        else {
          $('header').css({"background-color":"transparent","border":"none"});
          $('header .menu').css({"background-color":"transparent","border":"none"});
          $('.logo').css("visibility","hidden");
          
        }
    }

    function force_style_header(){
        $('header').css({"background-color":"#000","border-bottom":"2.5px solid #3498db"});
        $('header .menu').css('background-color','#121212');
        $('.logo').css("visibility","visible");
    }

    $(document).scroll(function() {
        if (!$('header .menu-btn').is(':checked') || $('header .menu-icon').css('display')=='none'){
            style_header();
        }
      
    })

    $('header .menu-btn').click(function(){
        if ($('header .menu-btn').is(':checked'))
            force_style_header();
        else
            style_header();
    });

    $(window).resize(function(){
        if (!$('header .menu-btn').is(':checked') || $('header .menu-icon').css('display')=='none' )
            style_header();
        else
            force_style_header();
    })



    // Scroll to first element
    $('#lead-down').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance - $('header').height()
        }, 500);
    });


    // Create timeline (Author: Ryan Fitzgerald)
    $('#education-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });


    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });


    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });


    $('[data-url]').each(function() {
        if ($(this).css("display")!="inline-block"){
            var innerText = $(this).html();
            $(this).html("<div style='display:inline-block' data-url='"+$(this).data("url")+"'>"+innerText+"</div>");
            $(this).removeAttr("data-url");
        }
    })

    $('[data-url]').on("click",function() { /*window.location = $(this).data('url');*/ window.open($(this).data('url')); });


    // change current year in footer
    $('.current-year').text(new Date().getFullYear());


    // ---- Typing effect ----
    $("#lead-content h2").html("<div style='display: inline-block; border-right: 3px solid #a0cfee; padding-right: 10px;'></div>")
    
    // List of sentences
    var _CONTENT = ["Senior Undergraduate, IIT Delhi", "Intelligence S/W Intern, Samsung", "NLP and IR Research", "Full-Stack Web Developer"];

    // Current sentence being processed
    var _PART = 0;

    // Character number of the current sentence being processed 
    var _PART_INDEX = 0;

    // Holds the handle returned from setInterval
    var _INTERVAL_VAL;

    // Element that holds the text
    var _ELEMENT = $("#lead-content>h2>div");

    // Implements typing effect
    function Type() { 
        var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
        _ELEMENT.text(text);
        _PART_INDEX++;

        // If full sentence has been displayed then start to delete the sentence after some time
        if(text === _CONTENT[_PART]) {
            clearInterval(_INTERVAL_VAL);
            setTimeout(function() {
                _INTERVAL_VAL = setInterval(Delete, 20);
            }, 1000);
        }
    }

    // Implements deleting effect
    function Delete() {
        var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
        _ELEMENT.text(text);
        _PART_INDEX--;

        // If sentence has been deleted then start to display the next sentence
        if(text === '') {
            clearInterval(_INTERVAL_VAL);

            // If last sentence then display the first one, else move to the next
            if(_PART == (_CONTENT.length - 1))
                _PART = 0;
            else
                _PART++;
            _PART_INDEX = 0;

            // Start to display the next sentence after some time
            setTimeout(function() {
                _INTERVAL_VAL = setInterval(Type, 60);
            }, 150);
        }
    }

    // Start the typing effect on load
    _INTERVAL_VAL = setInterval(Type, 60);



    // ---- AJAX contact form send ----
    window.addEventListener("DOMContentLoaded", function() {

      // get the form elements defined in your form HTML above   
      var form = document.getElementById("contact-form");

      // Success and Error functions for after the form is submitted
      function success() {
        form.reset();
        $("#contact-form>button").html("SEND");       
        successModal.open();
      }

      function error() {
        $("#contact-form>button").html("SEND");
        failModal.open();
      }

      // handle the form submission event
      form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        $("#contact-form>button").html("SENDING...");
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
      });
    });
    
    // helper function for sending an AJAX request
    function ajax(method, url, data, success, error) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          success(xhr.response, xhr.responseType);
        } else {
          error(xhr.status, xhr.response, xhr.responseType);
        }
      };
      xhr.send(data);
    }


    // For Modal Popup

        var $document = $(document);
        var $body  = $('body');
        var $roots = $('html').add($body);
        var cache  = {};

        $.modal = function(settings) {

            function Modal() {
                var modal = this;
                var modalCreated = false;
                modal.isActive = false;

                var config = $.extend({
                    useCache: true, // don't repeat ajax-load every time
                    closeBtn: true, // show x-close-btn
                    layerClose: true, // modal closes when layer is clicked
                    closingSelectors: null, // custom selectors for elements to close modal
                    showOnInit: false, // show modal when created
                    fadeInDuration: 500, // how fast modal fades in
                    fadeOutDuration: 400, // how fast modal fades out
                }, settings);

                var init = function() {
                    if (config.showOnInit) modal.open();
                };

                var createModal = function() {
                    var closingX = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="12" height="12"><polygon fill="currentColor" points="96,14 82,0 48,34 14,0 0,14 34,48 0,82 14,96 48,62 82,96 96,82 62,48 "/></svg>';
                    
                    var modalClass = 'modal ' + config.class;
                    if (config.youtubeId) {
                        modalClass = modalClass + ' modal-youtube';
                    }

                    modal.$wrapper = $('<div>', {
                        class: 'modal-wrapper'
                    });

                    modal.$layer = $('<div>', {
                        class: 'modal-layer'
                    });

                    modal.$modal = $('<div>', {
                        class: modalClass
                    });

                    if (config.closeBtn) {
                        modal.$closeBtn = $('<button>', {
                            class: 'modal-close-btn' 
                        }).html(closingX);

                        modal.$modal.append(modal.$closeBtn);
                    }

                    modal.$content = $('<div>', {
                        class: 'modal-content'
                    }).html(config.content);

                    modal.$modal.append(modal.$content);
                    modal.$wrapper.append(modal.$layer);
                    modal.$wrapper.append(modal.$modal);

                    modal.$wrapper.hide();

                    modalCreated = true;
                };

                modal.open = function() {
                    if (!modalCreated) createModal();

                    appendToBody();
                    enableRootsActive();
                    modal.$wrapper.fadeIn(config.fadeInDuration ,function() {
                        modal.isActive = true;
                    });
                };

                modal.close = function() {
                    if (typeof config.beforeModalClose === 'function') config.beforeModalClose(modal);
                    modal.$wrapper.fadeOut(config.fadeOutDuration, function() {
                        removeFromBody();
                        disableRootsActive();
                        modal.isActive = false;
                        if (typeof config.afterModalClose === 'function') config.afterModalClose(modal);
                    });
                };

                var bindClose = function() {
                    if (config.closeBtn) modal.$closeBtn.click(modal.close);
                    if (config.layerClose) modal.$layer.click(modal.close);
                    if (config.closingSelectors) modal.$modal.on('click', config.closingSelectors.toString(), modal.close);
                };

                var offset = 0;

                var enableRootsActive = function() {
                    offset = $document.scrollTop();
                    $roots.css('top', (-offset) + 'px')
                          .addClass('modal-active');
                };

                var disableRootsActive = function() {
                    $roots.css('top', '')
                          .removeClass('modal-active')
                          .scrollTop(offset);
                };

                var appendToBody = function() {
                    $body.append(modal.$wrapper);
                    bindClose();
                };

                var removeFromBody = function() {
                    modal.$wrapper.remove();
                };

                init();

                return modal;
            }

            return new Modal();
        };

        var successModal = $.modal({
             content: "<h2>Success!</h2><p>Thanks for submitting the form. We will get in touch soon :)</p>",
             class: 'modal',
             closingSelectors: ['.modal-close']
        });

        var failModal = $.modal({
             content: "<h2>Oops! That shouldn't have happened :/</h2><p>There was a problem in submitting the form. Please try again!</p>",
             class: 'modal',
             closingSelectors: ['.modal-close']
        });

})(jQuery);
