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
        @animes = Anime.where(id: @animes.map(&:id))
      end
      if params[:start] && params[:end]
        @time_start = params[:start].to_datetime
        @time_end = params[:end].to_datetime
        @animes = @animes.where( created_at: @time_start..@time_end)
      else
        if params[:start]
          @time_start = params[:start].to_datetime
          @animes = @animes.where('created_at > ?', @time_start)
        end
        if params[:end]
          @time_end = params[:end].to_datetime
          @animes = @animes.where('created_at < ?', @time_end)
        end
      end
      if params[:status]
        @status = params[:status]
        @animes = @animes.where('lower(status) = ?', @status.downcase)
      end
    end
    @animes = @animes.order(created_at: :desc).page(@page).per(@per_page)
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
