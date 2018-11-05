class AddLikeToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :like, :integer, default: 0
    add_column :reviews, :dislike, :integer, default: 0
  end
end
