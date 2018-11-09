namespace :update do
  desc "Update review"
  task review: :environment do
    puts "Updating Review"
    Review.all.each do |f|
      f.user_name = User.find(f.user_id).name
      f.like = f.get_upvotes.size
      f.dislike = f.get_downvotes.size
      f.save
    end
    puts "Done"
  end
end
