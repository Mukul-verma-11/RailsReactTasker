class CreateTasksUsersJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :tasks , :users
  end
end
