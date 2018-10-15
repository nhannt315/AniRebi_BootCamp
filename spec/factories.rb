FactoryBot.define do
  factory :genre do
  end
  factory :anime do
    rating {rand(1..10)}
  end
end
