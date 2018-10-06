class ReviewAction < ApplicationRecord
  enum type: {dislike: 0, like: 1}

  belongs_to :user
  belongs_to :review
end
