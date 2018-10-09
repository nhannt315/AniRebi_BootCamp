class Api::V1::GenresController < ActionController::Base
  def index
    @genres = Genre.all
    render json: @genres
  end

  def top_genres
    @top_genres = AnimeGenre.group("genre_id").order("COUNT(anime_id) DESC").limit(5)
    render json: @top_genres
  end
end
