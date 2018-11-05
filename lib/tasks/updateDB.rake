namespace :update do
  desc "Update user"
  task user: :environment do
    puts "Updating User"
    User.find_each(&:save)
    puts "Done"
  end

  desc "Update anime"
  task anime: :environment do
    puts "Updating Anime"
    Anime.find_each(&:save)
    puts "Done"
  end

  desc "Update genre"
  task genre: :environment do
    puts "Updating Genre"
    Genre.find_each(&:save)
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
  task :all => [:user, :anime, :genre, :review]
end
