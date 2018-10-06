class CreateReviewActions < ActiveRecord::Migration[5.2]
  def change
    create_table :review_actions do |t|
      t.integer :user_id
      t.integer :review_id
      t.integer :type
      t.timestamps
    end
  end
end
