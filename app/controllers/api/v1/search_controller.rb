class Api::V1::SearchController < ApplicationController
  before_action :search_anime, only: [:search]
  before_action :page_params, only: [:search]

  def search
    @animes = []
    if params[:q]
      if params[:arr].nil?
        @animes = @pgsearch_animes
      else
        @arr = Array(params[:arr])
        @animes = Genre.find(@arr[0]).animes.all
        for i in 1..(@arr.length - 1)
          @animes &= Genre.find(@arr[i]).animes.all
        end
        @animes &= @pgsearch_animes
      end
      Anime.where(id: @animes.map(&:id)).page(@page).per(@per_page)
    end
  end

  private

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def search_anime
    @pgsearch_animes = if params[:q].nil?
                         []
                       else
                         Anime.search params[:q]
                       end
  end
end
