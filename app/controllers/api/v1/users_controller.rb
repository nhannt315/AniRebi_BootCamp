class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update, :is_admin]

  def show
    @user = User.find_by id: params[:id]
    if @user.present?
      reviewsData = @user.reviews.map do |item|
        {
          review: item,
          anime: {cover: item.anime.cover_medium}
        }
      end
      render json: {
        id: @user.id,
        uid: @user.uid,
        name: @user.name,
        nickname: @user.nickname,
        email: @user.email,
        birthday: @user.birthday,
        slug: @user.slug,
        success: true,
        admin: @user.admin,
        reviews: reviewsData
      }.to_json
    else
      render json: {
        errors: "Can't find this user !",
        success: false}.to_json
    end
  end

  def update
    @user = current_user
    if @user.update_attributes update_user_params
      reviewsData = @user.reviews.map do |item|
        {
          review: item,
          anime: {cover: item.anime.cover_medium}
        }
      end
      render json: {
        id: @user.id,
        uid: @user.uid,
        name: @user.name,
        nickname: @user.nickname,
        email: @user.email,
        birthday: @user.birthday,
        slug: @user.slug,
        success: true,
        admin: @user.admin,
        reviews: reviewsData
      }.to_json
    else
      render json: { 
        errors: "Can't update this user !",
        success: false
      }.to_json
    end
  end

  def is_admin
    @user = User.find_by id: params[:user_id]
    if @user.present?
      if @user.id == current_user.id
        render json: { is_admin: @user.admin }, status: 200
      else
        render json: { message: "Unauthorized" }, status: 401
      end
    else
      render json: { message: "Can't find this user!" }, status: 500
    end
  end

  private
  def update_user_params
    params.require(:user)
          .permit :name, :email
  end
end
