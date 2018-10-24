class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find_by id: params[:id]
    if @user.present?
      render json: @user
    else
      render json: {errors: "Can't find this user !",
                    success: false}.to_json
    end
  end
end
