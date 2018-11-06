class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update]

  def show
    @user = User.find_by id: params[:id]
    if @user.present?
      reviewsData = @user.reviews.map{|item| 
        {
          review: item, 
          anime: {cover: item.anime.cover_medium}
        }
      }
      render json: {
          id: @user.id,
          uid: @user.uid,
          name: @user.name,
          nickname: @user.nickname,
          email: @user.email,
          birthday: @user.birthday,
          slug: @user.slug,
          success: true,
          reviews: reviewsData}.to_json
    else
      render json: {errors: "Can't find this user !",
                    success: false}.to_json
    end
  end

  def update
    @user = current_user
    if @user.update_attributes update_user_params
      reviewsData = @user.reviews.map{|item| 
        {
          review: item,
          anime: {cover: item.anime.cover_medium}
        }
      }
      render json: {
          id: @user.id,
          uid: @user.uid,
          name: @user.name,
          nickname: @user.nickname,
          email: @user.email,
          birthday: @user.birthday,
          slug: @user.slug,
          success: true,
          reviews: reviewsData}.to_json
    else
      render json: {errors: "Can't update this user !",
                    success: false}.to_json
    end
  end

  private
  def update_user_params
    params.require(:user)
          .permit :name, :email
  end
end
