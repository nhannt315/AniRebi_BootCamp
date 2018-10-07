class AddImageToAnimes < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :banner, :string
    add_column :animes, :cover_large, :string
    add_column :animes, :cover_medium, :string
  end
end
