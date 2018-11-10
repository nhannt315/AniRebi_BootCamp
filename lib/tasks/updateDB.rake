namespace :update do
  desc "Update anime"
  task anime: :environment do
    puts "Updating Anime"
    Anime.all.each do |f|
      f.rating = f.reviews.average(:rating) || 0
      f.reviews_count = f.reviews.count
      f.save
    end
    puts "Done"
  end

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

  desc "Update all"
  task :all => [:anime, :review]
end
