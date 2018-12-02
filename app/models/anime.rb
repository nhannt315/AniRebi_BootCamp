class Anime < ApplicationRecord
  include PgSearch
  pg_search_scope :search,
                  against: [:name, :title_english, :title_native, :info],
                  using: {
                      tsearch: {prefix: true}
                  }

  extend FriendlyId
  friendly_id :name, use: :slugged
  mount_uploader :banner, AnimeUploader
  mount_uploader :cover_large, AnimeUploader
  mount_uploader :cover_medium, AnimeUploader
  has_many :reviews, dependent: :destroy
  has_many :anime_genres
  has_many :genres, through: :anime_genres

end
