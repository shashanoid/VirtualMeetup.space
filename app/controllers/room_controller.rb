class RoomController < ApplicationController
  before_action :authenticate
  skip_before_action :verify_authenticity_token

  def create
    if room_already_exists?
      render json: @room.to_json
    else
      @room = Room.create_room(room_params)
      render json: @room.to_json
    end
    
  end

  def room_already_exists?
    @room = Room.find_by(room_id: room_params[:room_id])
    !!@room
  end


  private 
  def room_params
    params.require(:room).permit(:title, :host, :room_id, :room_type)
  end

end
