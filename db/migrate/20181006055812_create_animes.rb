class CreateAnimes < ActiveRecord::Migration[5.2]
  def change
    create_table :animes do |t|
      t.string :name
      t.text :info
      t.boolean :status
      t.float :rating
      t.timestamps
    end
  end
end
