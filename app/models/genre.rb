class Genre < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :anime_genres
  has_many :animes, through: :anime_genres
end
