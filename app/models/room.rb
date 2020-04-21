class Room < ApplicationRecord
    def self.create_room(room)
        room = Room.create(room)
    end

end
