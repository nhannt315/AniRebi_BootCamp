class Api::V1::SearchController < ApplicationController
  before_action :search_anime, only: [:search]
  before_action :page_params, only: [:search]

  def search
    if params[:arr].nil?
      @animes = @elasticsearch_animes
    else
      @arr = Array(params[:arr])
      @animes = Genre.find(@arr[0]).animes.all
      for i in 1..(@arr.length - 1)
        @animes &= Genre.find(@arr[i]).animes.all
      end
      @animes &= @elasticsearch_animes
    end
    @animes = @animes.page(@page).per(@per_page)
  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def search_anime
    @elasticsearch_animes = if params[:q].nil?
                              []
                            else
                              (Anime.search params[:q]).records
                            end
  end
end
