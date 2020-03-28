class EventController < ApplicationController

  def create(event_params)
    @event = Event.create(payload: event_params)
    @event.save

    redirect_to @event
  end

  def create_event
  end

end
