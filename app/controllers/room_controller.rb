class RoomController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @room = Room.create_room(room_params)
    session[:room_id] = @room.room_id
    render json: @room.to_json
  end

  def get_room
  end


  private 
  def room_params
    params.require(:room).permit(:title, :host, :room_id, :room_type)
  end


end
