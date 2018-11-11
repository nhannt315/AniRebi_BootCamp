require "elasticsearch/model"
class Anime < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  mount_uploader :banner, AnimeUploader
  mount_uploader :cover_large, AnimeUploader
  mount_uploader :cover_medium, AnimeUploader
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
