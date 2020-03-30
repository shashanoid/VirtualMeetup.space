class Event < ApplicationRecord
    validates :title, :start_time, :category, presence: true

end
