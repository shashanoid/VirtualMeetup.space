class HomepageController < ApplicationController
  def index
  end

  def get_user
    if current_user 
      render json: current_user
    else
      render json: {status: 401, error: 'You must be logged in to access this functionality.'}
    end
  end

end
