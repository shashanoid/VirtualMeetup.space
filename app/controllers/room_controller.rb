class RoomController < ApplicationController
  before_action :authenticate, except: [:get_room, :get_all_rooms]

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

  def get_room
    @room = Room.find_by(room_id: params[:room_id])
    if !!@room
      render json: @room.to_json
    else
      render json: {status: 401, error: 'Room does not exist. Please create one!'}
    end
  end

  def get_all_rooms
    @user_rooms = Room.where(host_email: current_user.email)
    render json: @user_rooms.to_json
  end


  private 
  def room_params
    params.require(:room).permit(:title, :host, :room_id, :room_type, :host_email)
  end

end
