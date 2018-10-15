class Api::V1::SearchController < ActionController::Base
  def search
    if params[:q].nil?
      @animes = []
    else
      @animes = Anime.search params[:q]
    end
    render json: @animes
  end
end
