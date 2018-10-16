class AddFriendlyId < ActiveRecord::Migration[5.2]
  def change
    User.find_each(&:save)
    Anime.find_each(&:save)
    Genre.find_each(&:save)
  end
end
