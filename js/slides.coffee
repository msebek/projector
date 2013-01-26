class @SlideSet

  QUEUE_MAX_SIZE = 4
  QUEUE_SIZE = 0

  constructor: ->

    @slides = $('.slide') 
    @slide_count = @slides.length
    @slide_count_initial = @slides.length
    @slides.attr('data-slide-state', 'hidden')

    @current_slide = 0
    @prev_slide = 0
    @jump(@current_slide)

  queue: (message, type='') -> 
    new_slide = $('<div />',{html: message, class:'slide ' + type})
    new_slide.attr('data-slide-state', 'hidden')
    $('#slideSet').append(new_slide)
    @slides = $('.slide')
    @slide_count++

    QUEUE_SIZE++
    if QUEUE_SIZE > QUEUE_MAX_SIZE
      @slides[@slide_count_initial].remove();
      QUEUE_SIZE--

  next: -> @jump(@current_slide + 1)
  
  prev: -> @jump(@current_slide - 1)

  jump: (n = 0) ->
    @prev_slide = @current_slide
    @current_slide = n

    if (@current_slide >= @slide_count)
      @current_slide = 0

    if (@current_slide < 0)
      @current_slide = @slide_count - 1

    @transition_slides()

  transition_slides : ->
    $("[data-slide-state=previous]").attr('data-slide-state', 'hidden')
    @slides[@prev_slide].setAttribute('data-slide-state', 'previous')
    @slides[@current_slide].setAttribute('data-slide-state', 'current')



