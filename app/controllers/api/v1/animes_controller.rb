require 'will_paginate/array'

class Api::V1::AnimesController < ActionController::Base
  before_action :find_anime, only: [:show]
  before_action :page_params, only: [:index, :top_animes, :search_by_genre, :filter]
  before_action :find_genre, only: [:search_by_genre]
  before_action :order_param, only: [:search_by_genre]

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

  def search_by_genre
    if @order == 'latest'
      @animes_by_genre = @genre_to_find.animes.order(id: :desc).page(@page).per(@per_page)
    elsif @order == 'popular'
      @animes_by_genre = @genre_to_find.animes.order(rating: :desc).page(@page).per(@per_page)
    else
      @animes_by_genre = @genre_to_find.animes.page(@page).per(@per_page)
    end
    render json: @animes_by_genre
  end

  def filter
    @arr = Array(params[:arr])
    @anime = Genre.find(@arr[0]).animes.all
    for i in 1..(@arr.length-1)
      @anime = @anime & Genre.find(@arr[i]).animes.all
    end
    render json: @anime.paginate(page: @page, per_page: @per_page)
  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def find_anime
    @anime = Anime.find_by id: params[:id]
  end

  def find_genre
    @genre_to_find = Genre.find( params[:id] )
  end

  def order_param
    @order = params[:order]
  end
end
