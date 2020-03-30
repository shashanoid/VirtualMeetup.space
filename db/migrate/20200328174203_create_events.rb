class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string    :title
      t.datetime  :start_time
      t.datetime  :end_time
      t.string    :category
      t.jsonb     :tags
    end
  end
  
end
