class Api::V1::AnimesController < ApplicationController
  before_action :find_anime, only: [:show, :update, :destroy]
  before_action :page_params, only: [:index, :top_animes, :search_by_genre, :recent_reviewed]
  before_action :find_genre, only: [:search_by_genre]
  before_action :order_param, only: [:search_by_genre]

  def index
    @total = Anime.count
    keyword = params[:keyword]
    if keyword
      @animes = Anime.where("name like ?", "%#{params[:keyword]}%").page(@page).per(@per_page)
    else
      @animes = Anime.all.page(@page).per(@per_page)
    end
  end

  def show; end

  def create
    @anime = Anime.create(anime_params)
    @anime.seed = false
    if @anime.save
      @anime.genre_ids = params[:genres] if params[:genres]
      render status: 200
    else
      render json: {
          message: "Something went wrong.."
      }, status: 400
    end
  end

  def update
    if @anime.update_attributes(anime_params)
      @anime.genre_ids = params[:genres] if params[:genres]
      render status: 200
    else
      render json: {
          message: "Something went wrong.."
      }, status: 400
    end
  end

  def destroy
    if @anime.destroy
      render json: {
          message: "Anime deleted"
      }, status: 200
    else
      render json: {
          message: "Something went wrong ..."
      }, status: 400
    end
  end

  def top_animes
    @top_animes = Anime.order(rating: :desc).page(@page).per(@per_page)
  end

  def search_by_genre
    if @order == "latest"
      @animes_by_genre = @genre_to_find.animes.order(id: :desc).page(@page).per(@per_page)
    elsif @order == "popular"
      @animes_by_genre = @genre_to_find.animes.order(rating: :desc).page(@page).per(@per_page)
    else
      @animes_by_genre = @genre_to_find.animes.page(@page).per(@per_page)
    end
  end

  def recent_reviewed
    @animes = Anime.includes(:reviews).order("reviews.created_at desc").page(@page).per(@per_page)
  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def find_anime
    @anime = Anime.friendly.find(params[:id])
  end

  def find_genre
    @genre_to_find = Genre.find(params[:id])
  end

  def order_param
    @order = params[:order]
  end

  def anime_params
    params.permit(:name, :info, :status, :title_native, :banner, :cover_large, :cover_medium)
  end
end
