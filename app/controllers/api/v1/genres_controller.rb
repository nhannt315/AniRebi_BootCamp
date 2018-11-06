class Api::V1::GenresController < ApplicationController
  before_action :find_genre, only: [:show, :anime_list]
  before_action :page_params, only: [:index, :show, :anime_list]

  def index
    @total = Genre.count
    if params[:keyword]
      @genres = Genre.where("name like ?", "%#{params[:keyword]}%").page(@page).per(@per_page)
    else
      @genres = Genre.all.page(@page).per(@per_page)
    end
  end

  def create
    @genre = Genre.new(name: params[:name])
    if @genre.save
      render json: {
          message: "Ok"
      }, status: 200
    else
      render json: {
          message: "Something went wrong.."
      }, status: 400
    end
  end

  def show
    @per_page = params[:item_per_page] || 6
    @animes = @genre.animes.order(rating: :desc).page(@page).per(@per_page)
  end

  def anime_list
    @per_page = params[:item_per_page] || 6
    @animes = @genre.animes.page(@page).per(@per_page)
    @count = @genre.animes.count
  end

  def all_genres
    render json: Genre.all
  end

  def top_genres
    @top_genres = AnimeGenre.group("genre_id").order("COUNT(anime_id) DESC").limit(5)
    render json: @top_genres
  end

  def destroy
    @genre = Genre.find_by id: params[:id]
    if @genre.destroy
      render json: {
          message: 'Review deleted'
      }, status: 200
    else
      render json: {
          message: 'Something went wrong ...'
      }, status: 400
    end
  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
    @ani_limit = params[:limit] || 6
  end

  def genre_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def find_genre
    @genre = Genre.friendly.find(params[:id])
  end
end
