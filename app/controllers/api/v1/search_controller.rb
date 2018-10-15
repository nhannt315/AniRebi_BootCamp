class Api::V1::SearchController < ActionController::Base
  before_action :search_anime, only: [:search]
  before_action :page_params, only: [:search]

  def search
    render json: @animes.page(@page).per(@per_page)
  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def search_anime
    if params[:q].nil?
      @animes = []
    else
      @animes = Anime.search params[:q]
    end
  end
end
