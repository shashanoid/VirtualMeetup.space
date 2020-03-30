class Event < ApplicationRecord
    #[TODO] -- Add validation for time and category
    validates :title, presence: true

end
