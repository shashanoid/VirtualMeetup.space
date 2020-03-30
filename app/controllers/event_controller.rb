class EventController < ApplicationController

  def create(title, start_time, end_time, category, tags)
    @event = Event.create(title: title, start_time: start_time, end_time: end_time, category: category, tags: tags)
    @event.save
   end

  def create_event
  end

end
