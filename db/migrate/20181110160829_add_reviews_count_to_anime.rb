class AddReviewsCountToAnime < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :reviews_count, :integer, default: 0
  end
end
