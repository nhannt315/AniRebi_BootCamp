class AddUserNameToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :user_name, :string
    Review.all.each do |f|
      f.user_name = User.find(f.user_id).name
      f.save
    end
  end
end
