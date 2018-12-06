class AddVideoUrlToAnimes < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :video_url, :string
  end
end
