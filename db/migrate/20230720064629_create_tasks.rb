class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name 
      t.text :description 
      t.string :status , default: 'pending'
      t.datetime :deadline ,
      #Ex:- :null => false
      t.timestamps
    end
  end
end
