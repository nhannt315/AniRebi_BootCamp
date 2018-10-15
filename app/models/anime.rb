require 'elasticsearch/model'
class Anime < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  has_many :reviews, dependent: :destroy
  has_many :anime_genres
  has_many :genres, through: :anime_genres

 # Anime.import force: true
  settings do
    mappings dynamic: false do
      indexes :name, type: :text
      indexes :title_english, type: :text
    end
  end
end
