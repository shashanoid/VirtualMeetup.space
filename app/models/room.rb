class Room < ApplicationRecord
    def self.create_room(room)
        room = Room.create(title: room[:title], host: room[:host], room_id: room[:room_id], room_type: room[:room_type])
    end

end
