class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :title
      t.string :host
      t.string :room_id
      t.string :room_type

      t.timestamps
    end
  end
end
