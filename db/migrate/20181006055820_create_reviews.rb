class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :user_id
      t.integer :anime_id
      t.string :title
      t.text :content
      t.float :rating
      t.timestamps
    end
  end
end
