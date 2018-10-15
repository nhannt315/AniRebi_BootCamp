class AddSlugToAnime < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :slug, :string
  end
end
