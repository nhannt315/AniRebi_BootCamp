class AddSeedToAnime < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :seed, :boolean
  end
end
