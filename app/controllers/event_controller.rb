class EventController < ApplicationController

  def create
    @event = Event.new(event_params)
    @event.save
   end

  def create_event
  end


  private
  def event_params
    params.require(:event).permit(:title, :start_time, :end_time, :category, :tags)
  end

end
