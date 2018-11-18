class AddAnimeNameToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :anime_name, :string
  end
end
