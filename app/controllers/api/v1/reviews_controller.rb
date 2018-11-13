class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy, :update, :like, :dislike]
  before_action :page_params, only: [:index, :get_by_anime, :recent]
  before_action :find_review, only: [:show, :destroy, :update, :like, :dislike]
  after_action :update_like, only: [:like, :dislike]
  after_action :update_rating, only: [:create, :update, :destroy]

  def index
    @reviews = Review.all.page(@page).per(@per_page)
    render json: @reviews
  end

  def show
    render json: @review
  end

  def create
    @review = current_user.reviews.build(review_params)
    @review.user_name = current_user.name
    if @review.save
      @anime = @review.anime
      @anime.reviews_count += 1
      @anime.save
      render json: {
          review: @review
      }, status: 200
    else
      render json: {
          error: "Something went wrong ..."
      }, status: 400
    end
  end

  def destroy
    if @review.user == current_user
      if @review.destroy
        @anime.reviews_count -= 1
        @anime.save
        render json: {
            message: "Review deleted"
        }, status: 200
      else
        render json: {
            message: "Something went wrong ..."
        }, status: 400
      end
    else
      render json: {
          message: "Unauthorized"
      }, status: 401
    end
  end

  def update
    if @review.user == current_user
      if @review.update_attributes(review_params)
        render json: {
            review: @review,
            message: "Review updated"
        }, status: 200
      else
        render json: {
            message: "Something went wrong ..."
        }, status: 400
      end
    else
      render json: {
          message: "Unauthorized"
      }, status: 401
    end
  end

  # gem "acts_as_votable"
  # su dung @review.get_upvotes(downvotes).size de lay gia tri

  def like
    if current_user.voted_up_on? @review
      @review.unliked_by current_user
      render json: {
          message: "Unliked"
      }, status: 200
    else
      @review.liked_by current_user
      render json: {
          message: "Liked"
      }, status: 200
    end
  end

  def dislike
    if current_user.voted_down_on? @review
      @review.undisliked_by current_user
      render json: {
          message: "Undisliked"
      }, status: 200
    else
      @review.disliked_by current_user
      render json: {
          message: "Disliked"
      }, status: 200
    end
  end

  def get_by_anime
    @reviews = Anime.find(params[:id]).reviews.order(created_at: :desc).page(@page).per(@per_page)
    render json: @reviews, include: [votes_for: {only: [:voter_id, :vote_flag]}]
  end

  def recent
    render json: Review.order(created_at: :desc).page(@page).per(@per_page)
  end

  private

  def review_params
    params.require(:review).permit(:anime_id, :title, :content, :rating)
  end

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def find_review
    @review = Review.find(params[:id])
    @anime = @review.anime
  end

  def update_like
    @review.like = @review.get_upvotes.size
    @review.dislike = @review.get_downvotes.size
    @review.save
  end

  def update_rating
    rating = @anime.reviews.average(:rating) || 0
    @anime.rating = (rating * 2).round / 2.0
    @anime.save
  end
end
