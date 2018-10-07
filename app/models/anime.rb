class Anime < ApplicationRecord
  has_many :reviews, dependent: :destroy
  has_many :anime_genres
  has_many :genres, through: :anime_genres
end
