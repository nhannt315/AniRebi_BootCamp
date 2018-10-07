class AddTitleNativeToAnimes < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :title_native, :string
  end
end
