class AddColumnDeadlineToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :deadline, :datetime
  end
end
