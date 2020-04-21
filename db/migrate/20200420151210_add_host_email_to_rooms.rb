class AddHostEmailToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :host_email, :string
  end
end
