class Api::V1::AnimesController < ActionController::Base
  before_action :find_anime, only: [:show]
  before_action :page_params, only: [:index, :top_animes]

  def index
    @animes = Anime.all.page(@page).per(@per_page)
    render json: @animes
  end

  def show
    render json: @anime
  end

  def top_animes
    @top_animes = Anime.order(rating: :desc).page(@page).per(@per_page)
    render json: @top_animes
  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = param[:page] || 1
  end

  def find_anime
    @anime = Anime.find_by id: params[:id]
    render json: @anime
  end
end
