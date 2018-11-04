class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy, :update, :like, :dislike]
  before_action :page_params, only: [:index, :get_by_anime]
  before_action :find_review, only: [:show, :destroy, :update, :like, :dislike]

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
      render json: {
          message: 'OK'
      }, status: 200
    else
      render json: {
          error: 'Something went wrong ...'
      }, status: 400
    end
  end

  def destroy
    if @review.user == current_user
      if @review.destroy
        render json: {
            message: 'Review deleted'
        }, status: 200
      else
        render json: {
            message: 'Something went wrong ...'
        }, status: 400
      end
    else
      render json: {
          message: 'Unauthorized'
      }, status: 401
    end
  end

  def update
    if @review.user == current_user
      if @review.update_attributes(review_params)
        render json: {
            message: 'Review updated'
        }, status: 200
      else
        render json: {
            message: 'Something went wrong ...'
        }, status: 400
      end
    else
      render json: {
          message: 'Unauthorized'
      }, status: 401
    end
  end

  # gem "acts_as_votable"
  # su dung @review.get_upvotes(downvotes).size de lay gia tri

  def like
    if current_user.voted_up_on? @review
      @review.unliked_by current_user
      render json: {
          like: @review.get_upvotes.size,
          dislike: @review.get_downvotes.size,
          message: 'Unliked',
      }, status: 200
    else
      @review.liked_by current_user
      render json: {
          like: @review.get_upvotes.size,
          dislike: @review.get_downvotes.size,
          message: 'Liked'
      }, status: 200
    end
  end

  def dislike
    if current_user.voted_down_on? @review
      @review.undisliked_by current_user
      render json: {
          like: @review.get_upvotes.size,
          dislike: @review.get_downvotes.size,
          message: 'Undisliked'
      }, status: 200
    else
      @review.liked_by current_user
      render json: {
          like: @review.get_upvotes.size,
          dislike: @review.get_downvotes.size,
          message: 'Disliked'
      }, status: 200
    end
  end

  def get_by_anime
    render json: Anime.find(params[:id]).reviews.page(@page).per(@per_page)
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
  end
end
