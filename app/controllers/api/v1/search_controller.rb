require 'will_paginate/array'

class Api::V1::SearchController < ActionController::Base
  before_action :search_anime, only: [:search]
  before_action :page_params, only: [:search]

  def search
    unless params[:arr].nil?
      @arr = Array(params[:arr])
      @animes = Genre.find(@arr[0]).animes.all
      for i in 1..(@arr.length-1)
        @animes = @animes & Genre.find(@arr[i]).animes.all
      end
      @animes = @animes & @elasticsearch_animes
    else
      @animes = @elasticsearch_animes
    end
    render json: @animes.paginate(page: @page, per_page: @per_page)

  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def search_anime
    if params[:q].nil?
      @elasticsearch_animes = []
    else
      @elasticsearch_animes = (Anime.search params[:q]).records
    end
  end
end
