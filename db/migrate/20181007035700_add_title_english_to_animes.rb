class AddTitleEnglishToAnimes < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :title_english, :string
  end
end
